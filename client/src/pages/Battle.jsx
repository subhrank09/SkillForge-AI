
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { Swords, Loader2, Trophy, User } from 'lucide-react';

const socket = io.connect("http://localhost:9000");

const Battle = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Game States: 'join' | 'lobby' | 'playing' | 'gameover'
  const [gameState, setGameState] = useState('join'); 
  const [roomId, setRoomId] = useState("");
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [timeLeft, setTimeLeft] = useState(10);

  // --- Socket Listeners ---
  useEffect(() => {
    socket.on('room_update', (data) => {
      setPlayers(data.players);
      if (data.status === 'playing') setGameState('playing');
    });

    socket.on('game_started', (data) => {
      setQuestions(data.questions);
      setGameState('playing');
      setCurrentQIndex(0);
    });

    socket.on('score_update', (newScores) => {
      setScores(newScores);
    });

    return () => {
      socket.off('room_update');
      socket.off('game_started');
      socket.off('score_update');
    };
  }, []);

  // --- Actions ---
  const joinRoom = () => {
    if (roomId && user) {
      socket.emit('join_room', { roomId, username: user.firstName });
      setGameState('lobby');
    }
  };

  const startGame = () => {
    socket.emit('start_game', { roomId, topic: "General Tech" });
  };

  const handleAnswer = (optionIndex) => {
    const isCorrect = optionIndex === questions[currentQIndex].ans;
    socket.emit('submit_answer', { roomId, isCorrect });
    
    // Move to next question after delay
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setGameState('gameover');
    }
  };

  // --- RENDERERS ---

  // 1. Join Screen
  if (gameState === 'join') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <Swords size={64} className="text-red-500 mb-6" />
        <h1 className="text-4xl font-bold mb-8">Battle Arena</h1>
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md">
          <label className="block text-gray-400 mb-2 text-sm">ENTER ROOM ID</label>
          <input 
            className="w-full bg-black border border-gray-700 p-4 rounded-xl text-white mb-6 focus:border-red-500 outline-none" 
            placeholder="e.g. 1234" 
            onChange={(e) => setRoomId(e.target.value)} 
          />
          <button 
            onClick={joinRoom} 
            className="w-full bg-red-600 hover:bg-red-500 py-4 rounded-xl font-bold transition-all"
          >
            ENTER ARENA
          </button>
          <button onClick={() => navigate('/home')} className="w-full flex justify-center mt-8 text-gray-400 hover:text-white hover: transition-all text-sm uppercase tracking-widest">
            Exit to Home
          </button>
        </div>
      </div>
    );
  }

  // 2. Lobby Screen
  if (gameState === 'lobby') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6">Lobby: {roomId}</h2>
          <div className="space-y-4 mb-8">
            {players.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-black p-3 rounded-lg border border-gray-700">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                  {p.username[0]}
                </div>
                <span>{p.username}</span>
                {idx === 0 && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded ml-auto">HOST</span>}
              </div>
            ))}
            {players.length === 0 && <p className="text-gray-500">Waiting for players...</p>}
          </div>
          
          {/* Only Show Start button if you are the host (first player) */}
          {players.length > 0 && players[0].username === user?.firstName && (
             <button 
               onClick={startGame} 
               className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-xl font-bold"
             >
               START MATCH
             </button>
          )}
          {players.length > 0 && players[0].username !== user?.firstName && (
             <div className="flex items-center justify-center gap-2 text-gray-400 animate-pulse">
               <Loader2 className="animate-spin" /> Waiting for host to start...
             </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Playing Screen
  if (gameState === 'playing' && questions.length > 0) {
    const q = questions[currentQIndex];
    return (
      <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
        {/* Scoreboard */}
        <div className="flex gap-8 mb-12">
          {players.map(p => (
            <div key={p.id} className="text-center">
              <div className="text-sm text-gray-400 mb-1">{p.username}</div>
              <div className="text-3xl font-mono font-bold">{scores[p.id] || 0}</div>
            </div>
          ))}
        </div>

        {/* Question Card */}
        <div className="w-full max-w-2xl">
          <div className="mb-4 text-blue-500 font-mono">QUESTION {currentQIndex + 1}</div>
          <h2 className="text-3xl font-bold mb-8">{q.q}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="p-6 bg-gray-900 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-blue-500 text-left transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. Game Over
  if (gameState === 'gameover') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <Trophy size={80} className="text-yellow-400 mb-6" />
        <h1 className="text-5xl font-bold mb-4">MATCH FINISHED</h1>
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md mb-8">
           {players.map(p => (
             <div key={p.id} className="flex justify-between items-center py-4 border-b border-gray-800 last:border-0">
               <span className="text-xl">{p.username}</span>
               <span className="text-2xl font-bold text-blue-400">{scores[p.id] || 0} pts</span>
             </div>
           ))}
        </div>
        <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white">Exit to Home</button>
      </div>
    );
  }

  return <div className="min-h-screen bg-black text-white flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
};

export default Battle;