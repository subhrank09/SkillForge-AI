import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, RefreshCw, CheckCircle, XCircle, Trophy, Loader2, AlertCircle } from 'lucide-react';
import { useUser } from "@clerk/clerk-react";
import { addToHistory, updateUserXP } from '../../api/axios'; 
import confetti from 'canvas-confetti';

const ArcadeGameEngine = ({ 
    title, 
    icon: Icon, 
    color, 
    instructions, 
    difficulty = "Medium",
    xpReward = 150,
    onGenerate, // Now accepts the async API caller
    component: GameComponent 
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState(null);
  const [feedback, setFeedback] = useState(null); 
  const [streak, setStreak] = useState(0);
  const [apiError, setApiError] = useState(false); // Track if we are using fallback data

  // Initial Load
  useEffect(() => {
    loadNewLevel();
  }, []);

  const loadNewLevel = async () => {
    setLoading(true);
    setFeedback(null);
    setApiError(false);
    
    try {
        // Attempt to fetch from API / Fallback
        const data = await onGenerate();
        
        if (!data) throw new Error("No data received");
        
        // Check if the data came with a "fallback" flag (optional pattern)
        if (data._isFallback) setApiError(true);
        
        setGameData(data);
    } catch (err) {
        console.error("Game Engine Error:", err);
        // If even the fallback fails, show an error state
        setGameData(null); 
    }
    setLoading(false);
  };

  const handleSuccess = async () => {
    setFeedback('success');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    
    if (user) {
        // Log the win to backend
        try {
            await addToHistory(user.id, `arcade-${title.toLowerCase().replace(/\s/g, '-')}`, `Completed ${title} Challenge`);
            await updateUserXP(user.id, xpReward);
            console.log(`Added ${xpReward} XP to user.`);
        } catch (e) {
            console.error("Failed to save progress", e);
        }
    }
    setStreak(p => p + 1);
  };

  const handleFail = () => {
    setFeedback('error');
    setStreak(0);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 pt-20 flex flex-col md:flex-row overflow-hidden relative">
      
      {/* --- SIDEBAR --- */}
      <div className="w-full md:w-80 bg-gray-900 border-r border-gray-800 p-6 flex flex-col z-10 h-auto md:h-screen sticky top-0">
        <button onClick={() => navigate('/arcade')} className="text-gray-500 hover:text-white flex items-center gap-2 mb-8 transition-colors">
            <ArrowLeft size={16}/> Exit Arcade
        </button>

        <div className={`p-4 rounded-xl bg-gray-800/50 border border-gray-700 mb-6 ${color}`}>
            <div className="flex items-center gap-3 mb-2">
                <Icon size={24} />
                <h1 className="font-bold text-xl uppercase italic">{title}</h1>
            </div>
            <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Diff: {difficulty}</span>
                <span>XP: +{xpReward}</span>
            </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mb-6">
            <h3 className="text-blue-400 font-bold text-xs uppercase mb-2 flex items-center gap-2">
                <Lightbulb size={14}/> Mission Brief
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
                {instructions}
            </p>
        </div>

        {apiError && (
             <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded-lg mb-4 text-xs text-yellow-500 flex items-center gap-2">
                <AlertCircle size={12}/> Offline Mode (Using Fallback Data)
             </div>
        )}

        <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-xs uppercase font-bold">Current Streak</span>
                <span className="text-yellow-400 font-black text-xl flex items-center gap-1">
                    {streak} <Trophy size={14}/>
                </span>
            </div>
            <button 
                onClick={loadNewLevel} 
                disabled={loading}
                className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold flex items-center justify-center gap-2 transition-all border border-gray-700 hover:border-gray-500"
            >
                {loading ? <Loader2 className="animate-spin" size={16}/> : <RefreshCw size={16}/>}
                Re-Roll Mission
            </button>
        </div>
      </div>

      {/* --- MAIN GAME AREA --- */}
      <div className="flex-1 p-6 relative flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black min-h-[80vh]">
        
        {loading ? (
            <div className="text-center">
                <Loader2 size={48} className={`animate-spin ${color.replace('text-', '')} mb-4`}/>
                <p className="text-gray-500 font-mono animate-pulse">Initializing Simulation...</p>
            </div>
        ) : gameData ? (
            <div className="w-full max-w-5xl animate-fade-in">
                <GameComponent 
                    data={gameData} 
                    onSuccess={handleSuccess} 
                    onFail={handleFail} 
                    feedback={feedback}
                />
            </div>
        ) : (
            <div className="text-center text-red-500">
                <AlertCircle size={48} className="mx-auto mb-4"/>
                <p>System Error: Could not load mission data.</p>
                <button onClick={loadNewLevel} className="mt-4 underline">Try Again</button>
            </div>
        )}

        {/* Feedback Overlay */}
        <AnimatePresence>
            {feedback === 'success' && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute bottom-10 bg-green-900/90 border border-green-500 px-8 py-4 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.3)] backdrop-blur-md z-50"
                >
                    <CheckCircle className="text-green-400" size={24} />
                    <div>
                        <h4 className="font-bold text-white">System Optimized!</h4>
                        <p className="text-xs text-green-300">XP Account Credited.</p>
                    </div>
                    <button onClick={loadNewLevel} className="ml-4 bg-white text-green-900 px-4 py-1 rounded-full font-bold text-sm hover:scale-105 transition">Next Level</button>
                </motion.div>
            )}
            {feedback === 'error' && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute bottom-10 bg-red-900/90 border border-red-500 px-8 py-4 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(239,68,68,0.3)] backdrop-blur-md z-50"
                >
                    <XCircle className="text-red-400" size={24} />
                    <div>
                        <h4 className="font-bold text-white">Execution Failed</h4>
                        <p className="text-xs text-red-300">Logic error detected.</p>
                    </div>
                    <button onClick={() => setFeedback(null)} className="ml-4 bg-white text-red-900 px-4 py-1 rounded-full font-bold text-sm hover:scale-105 transition">Retry</button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArcadeGameEngine;