
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useUser } from "@clerk/clerk-react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Swords, User, Play, Trophy, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti'; // Optional: npm install canvas-confetti

const SOCKET_URL = "http://localhost:9000"; // Ensure matches your backend

const CodeDuel = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  
  // Game State
  const [step, setStep] = useState('lobby'); // lobby, waiting, playing, gameover
  const [roomId, setRoomId] = useState("");
  const [players, setPlayers] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [winner, setWinner] = useState(null);
  const [code, setCode] = useState(""); // Current code in editor

  // Connect to Socket on mount
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Listeners
    newSocket.on('duel_update', (data) => {
      setPlayers(data.players);
      if (data.players.length === 1) setStep('waiting');
    });

    newSocket.on('duel_start', (data) => {
      setChallenge(data.challenge);
      setCode(data.challenge.startCode);
      setStep('playing');
    });

    newSocket.on('duel_game_over', (data) => {
      setWinner(data.winner);
      setStep('gameover');
      if (data.winner === user?.firstName) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      }
    });

    return () => newSocket.close();
  }, [user]);

  const joinRoom = () => {
    if (!roomId.trim() || !socket) return;
    socket.emit('join_duel', { roomId, username: user?.firstName || "Guest" });
  };

  const submitCode = () => {
    // Send current code to server to check
    socket.emit('submit_duel_code', { roomId, code, username: user?.firstName });
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 relative flex flex-col items-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none" />

      {/* --- LOBBY VIEW --- */}
      {step === 'lobby' && (
        <div className="z-10 w-full max-w-md bg-gray-900/80 border border-red-500/30 p-8 rounded-2xl backdrop-blur-xl text-center shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <Swords size={64} className="mx-auto text-red-500 mb-6 animate-pulse" />
          <h1 className="text-3xl font-black uppercase italic mb-2">Code Duel Arena</h1>
          <p className="text-gray-400 mb-8 text-sm">1v1 Real-time Coding Race. First to fix the bug wins.</p>
          
          <input 
            type="text" 
            placeholder="Enter Room ID (e.g. 'ROOM1')"
            className="w-full bg-black/50 border border-gray-700 p-4 rounded-lg mb-4 text-center text-white tracking-widest uppercase focus:border-red-500 outline-none transition-all"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button 
            onClick={joinRoom}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-lg uppercase tracking-widest transition-all shadow-lg"
          >
            Enter Arena
          </button>
        </div>
      )}

      {/* --- WAITING VIEW --- */}
      {step === 'waiting' && (
        <div className="z-10 text-center animate-in fade-in">
          <Loader2 size={64} className="mx-auto text-red-500 animate-spin mb-6" />
          <h2 className="text-2xl font-bold mb-2">Waiting for Opponent...</h2>
          <p className="text-gray-400">Share Room ID: <span className="font-mono text-red-400 bg-red-900/20 px-2 py-1 rounded">{roomId}</span></p>
          
          <div className="mt-8 flex justify-center gap-4">
            {players.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border-2 border-red-500/50">
                        <User size={32} />
                    </div>
                    <span className="mt-2 text-sm font-bold">{p.username}</span>
                </div>
            ))}
            {players.length < 2 && (
                <div className="flex flex-col items-center opacity-50">
                    <div className="w-16 h-16 bg-gray-800 rounded-full border-2 border-dashed border-gray-600 animate-pulse" />
                    <span className="mt-2 text-sm">Scanning...</span>
                </div>
            )}
          </div>
        </div>
      )}

      {/* --- GAMEPLAY VIEW --- */}
      {(step === 'playing' || step === 'gameover') && challenge && (
        <div className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in zoom-in duration-300">
            
            {/* Left: Challenge Info */}
            <div className="lg:col-span-1 bg-gray-900/90 border border-gray-700 p-6 rounded-2xl h-fit">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono text-red-400 border border-red-500/30 px-2 py-1 rounded uppercase">Live Match</span>
                    <div className="flex gap-2">
                        {players.map((p,i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_lime]" title={p.username} />
                        ))}
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{challenge.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 border-l-2 border-red-500 pl-4">{challenge.desc}</p>
                
                <div className="bg-black/40 p-4 rounded-lg border border-gray-800 mb-6">
                    <h4 className="text-xs text-gray-500 uppercase mb-2">Objective</h4>
                    <code className="text-sm font-mono text-red-200 block break-all">
                        Fix the bug so it passes: {challenge.testCase}
                    </code>
                </div>

                <button 
                    onClick={submitCode}
                    disabled={step === 'gameover'}
                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                        step === 'gameover' 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-red-600 to-orange-600 hover:scale-105 shadow-lg text-white'
                    }`}
                >
                    {step === 'gameover' ? 'Duel Ended' : <>Deploy Fix <Play size={18} /></>}
                </button>
            </div>

            {/* Right: Code Editor */}
            <div className="lg:col-span-2 relative">
                {step === 'gameover' && (
                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl animate-in fade-in">
                        <Trophy size={80} className="text-yellow-400 mb-4 drop-shadow-[0_0_30px_gold]" />
                        <h2 className="text-4xl font-black uppercase italic mb-2">Winner: {winner}</h2>
                        <p className="text-gray-400 mb-8">Victory Achieved</p>
                        <button onClick={() => navigate('/dashboard')} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200">Return to Base</button>
                    </div>
                )}

                <div className="border border-gray-700 rounded-2xl overflow-hidden shadow-2xl h-[500px]">
                    <Sandpack 
                        template="vanilla"
                        theme="dark"
                        files={{
                            "/index.js": code,
                            "/index.html": `<div id="app"></div>`
                        }}
                        options={{
                            showNavigator: false,
                            showTabs: false,
                            editorHeight: 500,
                            showLineNumbers: true
                        }}
                        // Update local code state on change
                        onCodeUpdate={(newCode) => setCode(newCode)}
                    />
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default CodeDuel;