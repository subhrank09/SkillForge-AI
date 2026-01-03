import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import api from '../api/axios';
import { motion } from 'framer-motion';
import { Check, X, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Flashcards = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.get(`/flashcards/due/${user.id}`)
        .then(res => {
            if (Array.isArray(res.data)) {
                setCards(res.data);
            } else {
                setCards([]);
            }
        })
        .catch(err => console.error("Flashcard Load Error:", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleReview = async (correct) => {
    const card = cards[currentIndex];
    
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 200);

    try {
        await api.post('/flashcards/review', { cardId: card._id, correct });
    } catch(err) {
        console.error("Review Failed", err);
    }
  };

  if (loading) return (
    <div className="h-screen bg-black flex items-center justify-center text-white">
        <Loader2 className="animate-spin" />
    </div>
  );

  if (currentIndex >= cards.length) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-green-500/10 p-6 rounded-full mb-6">
            <Check size={48} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4">All Caught Up! 🎉</h2>
        <p className="text-gray-400 mb-8">You have reviewed all your due flashcards for now.</p>
        <button 
            onClick={() => navigate('/')} 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors"
        >
            Back to Home
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-6 left-6 z-20">
        <button onClick={() => navigate('/home')} className="text-gray-400 hover:text-white flex items-center gap-2">
            <ArrowLeft size={20} /> Exit Review
        </button>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0" />
      
      <div className="z-10 w-full max-w-lg">
        <div className="flex justify-between items-center mb-8 text-gray-400 font-mono text-sm">
            <span>SESSION PROGRESS</span>
            <span>{currentIndex + 1} / {cards.length}</span>
        </div>

        {/* The Card Container */}
        <div className="relative h-80 w-full perspective-1000 group" onClick={() => setIsFlipped(!isFlipped)}>
          <motion.div
            className="w-full h-full relative preserve-3d cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }} // Explicit style just in case
          >
            {/* FRONT CARD (Question) */}
            <div className="absolute inset-0 bg-gray-900 border border-gray-700 rounded-3xl flex flex-col items-center justify-center p-8 backface-hidden shadow-2xl z-10">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-4">Question</span>
              <h3 className="text-2xl text-white font-bold text-center">{currentCard.front}</h3>
              <p className="absolute bottom-6 text-gray-600 text-xs animate-pulse">Tap to flip</p>
            </div>

            {/* BACK CARD (Answer) */}
            {/* Note: 'rotate-y-180' class flips this div so it faces AWAY initially */}
            <div 
              className="absolute inset-0 bg-blue-950/30 border border-blue-500/30 rounded-3xl flex flex-col items-center justify-center p-8 backface-hidden shadow-2xl rotate-y-180"
            >
              <span className="text-green-400 text-xs font-bold tracking-widest uppercase mb-4">Answer</span>
              <p className="text-xl text-blue-100 text-center leading-relaxed font-medium">{currentCard.back}</p>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-8 mt-12">
          <button 
            onClick={(e) => { e.stopPropagation(); handleReview(false); }}
            className="flex flex-col items-center gap-2 text-red-500 hover:text-red-400 transition-colors group"
          >
            <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20 group-hover:scale-110 transition-all">
                <X size={32} />
            </div>
            <span className="text-xs font-bold tracking-wide">FORGOT</span>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleReview(true); }}
            className="flex flex-col items-center gap-2 text-green-500 hover:text-green-400 transition-colors group"
          >
            <div className="p-4 rounded-full bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 group-hover:scale-110 transition-all">
                <Check size={32} />
            </div>
            <span className="text-xs font-bold tracking-wide">REMEMBERED</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;