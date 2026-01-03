// import React, { useState, useEffect } from 'react';
// import { generateLexiconTerm } from '../../api/axios';
// import { useNavigate } from 'react-router-dom';
// import { BookA, RefreshCw, Volume2, Share2, Loader2, Bookmark } from 'lucide-react';

// const LexiconUplink = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [saved, setSaved] = useState(false);

//   const fetchWord = async () => {
//     setLoading(true);
//     setSaved(false);
//     try {
//       const res = await generateLexiconTerm();
//       setData(res.data);
//     } catch (err) {
//       alert("Dictionary Service Unavailable");
//     }
//     setLoading(false);
//   };
//   // ✅ ADD THIS FUNCTION
//   const handleSpeak = () => {
//     if (!data) return;
    
//     // Stop any current speech
//     window.speechSynthesis.cancel();

//     // Create utterance
//     const utterance = new SpeechSynthesisUtterance(`${data.term}. ${data.definition}`);
//     utterance.rate = 0.9; 
    
//     // Try to find a good English voice
//     const voices = window.speechSynthesis.getVoices();
//     const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
//     if (preferredVoice) utterance.voice = preferredVoice;

//     window.speechSynthesis.speak(utterance);
//   };
//   useEffect(() => {
//     fetchWord();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center">
      
//       {/* Background Ambience */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none" />

//       <div className="w-full max-w-2xl relative z-10">
//         <button onClick={() => navigate('/arcade')} className="text-gray-500 mb-6 hover:text-white">← Arcade</button>
        
//         <div className="flex justify-between items-end mb-8">
//             <h1 className="text-4xl font-black text-indigo-400 uppercase italic flex items-center gap-3">
//                 <BookA size={40}/> Lexicon Uplink
//             </h1>
//             <button 
//                 onClick={fetchWord} 
//                 disabled={loading}
//                 className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
//             >
//                 <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> {loading ? "Fetching..." : "Next Term"}
//             </button>
//         </div>

//         {/* Main Card */}
//         <div className="bg-gray-900 border border-indigo-500/30 rounded-2xl p-10 shadow-[0_0_50px_rgba(99,102,241,0.15)] relative overflow-hidden min-h-[400px] flex flex-col justify-center">
            
//             {loading ? (
//                 <div className="flex flex-col items-center justify-center text-indigo-500 gap-4">
//                     <Loader2 size={48} className="animate-spin" />
//                     <p className="animate-pulse text-sm uppercase tracking-widest">Decryption in progress...</p>
//                 </div>
//             ) : data ? (
//                 <div className="animate-in fade-in zoom-in duration-300">
//                     <div className="flex justify-between items-start mb-2">
//                         <span className="bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/30">
//                             {data.category}
//                         </span>
//                         <div className="flex gap-2">
//                             {/* ✅ REPLACE THE OLD VOLUME BUTTON WITH THIS */}
//                         <button 
//                                 onClick={handleSpeak}
//                                 className="text-gray-500 hover:text-green-400 transition transform hover:scale-110"
//                                 title="Listen"
// >
//                         <Volume2 size={24}/>
//                         </button>
//                             <button 
//                                 onClick={() => setSaved(!saved)} 
//                                 className={`${saved ? 'text-yellow-400' : 'text-gray-500 hover:text-white'} transition`}
//                             >
//                                 <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
//                             </button>
//                         </div>
//                     </div>

//                     <h2 className="text-6xl font-black text-white mb-2 tracking-tight">{data.term}</h2>
//                     <p className="text-gray-500 text-xl font-serif italic mb-8">{data.pronunciation}</p>

//                     <div className="space-y-8">
//                         <div>
//                             <h3 className="text-indigo-400 font-bold uppercase text-xs mb-2">Definition</h3>
//                             <p className="text-xl text-gray-200 leading-relaxed font-light">
//                                 {data.definition}
//                             </p>
//                         </div>

//                         <div className="bg-black/30 p-6 rounded-xl border-l-4 border-indigo-500">
//                             <h3 className="text-gray-500 font-bold uppercase text-xs mb-2">Contextual Usage</h3>
//                             <p className="text-lg text-indigo-200 italic">"{data.example}"</p>
//                         </div>
                        
//                         {data.origin && (
//                             <div className="text-sm text-gray-500 pt-4 border-t border-gray-800">
//                                 <span className="font-bold text-gray-400">Origin/Notes: </span> {data.origin}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 <div className="text-center text-gray-500">
//                     Press "Next Term" to initialize the database.
//                 </div>
//             )}
//         </div>

//         <div className="mt-8 text-center text-xs text-gray-500 font-mono">
//             Daily ingestion of technical vocabulary increases interview pass rates by 40%.
//         </div>

//       </div>
//     </div>
//   );
// };

// export default LexiconUplink;

import React, { useState, useEffect } from 'react';
import { generateLexiconTerm } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { BookA, RefreshCw, Volume2, VolumeX, Share2, Loader2, Bookmark } from 'lucide-react';

const LexiconUplink = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // ✅ New State for Mute
  const [isMuted, setIsMuted] = useState(false);

  const fetchWord = async () => {
    setLoading(true);
    setSaved(false);
    // Stop any previous speech when loading new word
    window.speechSynthesis.cancel();
    
    try {
      const res = await generateLexiconTerm();
      setData(res.data);
    } catch (err) {
      alert("Dictionary Service Unavailable");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWord();
    // Cleanup on unmount
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleSpeak = () => {
    // ✅ Check Mute State
    if (!data || isMuted) return;
    
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(`${data.term}. ${data.definition}`);
    utterance.rate = 0.9; 
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
    if (preferredVoice) utterance.voice = preferredVoice;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <button onClick={() => navigate('/arcade')} className="text-gray-500 mb-6 hover:text-white">← Arcade</button>
        
        <div className="flex justify-between items-end mb-8">
            <h1 className="text-4xl font-black text-indigo-400 uppercase italic flex items-center gap-3">
                <BookA size={40}/> Lexicon Uplink
            </h1>
            <div className="flex gap-2">
                {/* ✅ Global Mute Toggle */}
                <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all border ${isMuted ? 'bg-red-900/20 border-red-500 text-red-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
                    title={isMuted ? "Unmute" : "Mute Speaker"}
                >
                    {isMuted ? <VolumeX size={18}/> : <Volume2 size={18}/>}
                </button>

                <button 
                    onClick={fetchWord} 
                    disabled={loading}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
                >
                    <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> {loading ? "Fetching..." : "Next Term"}
                </button>
            </div>
        </div>

        <div className="bg-gray-900 border border-indigo-500/30 rounded-2xl p-10 shadow-[0_0_50px_rgba(99,102,241,0.15)] relative overflow-hidden min-h-[400px] flex flex-col justify-center">
            
            {loading ? (
                <div className="flex flex-col items-center justify-center text-indigo-500 gap-4">
                    <Loader2 size={48} className="animate-spin" />
                    <p className="animate-pulse text-sm uppercase tracking-widest">Decryption in progress...</p>
                </div>
            ) : data ? (
                <div className="animate-in fade-in zoom-in duration-300">
                    <div className="flex justify-between items-start mb-2">
                        <span className="bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/30">
                            {data.category}
                        </span>
                        <div className="flex gap-2">
                            {/* Speak Button (Disabled visually if muted) */}
                            <button 
                                onClick={handleSpeak}
                                className={`transition transform hover:scale-110 ${isMuted ? 'text-gray-700 cursor-not-allowed' : 'text-gray-500 hover:text-green-400'}`}
                                title={isMuted ? "Speaker Muted" : "Listen"}
                            >
                                {isMuted ? <VolumeX size={24}/> : <Volume2 size={24}/>}
                            </button>

                            <button 
                                onClick={() => setSaved(!saved)} 
                                className={`${saved ? 'text-yellow-400' : 'text-gray-500 hover:text-white'} transition`}
                            >
                                <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
                            </button>
                        </div>
                    </div>

                    <h2 className="text-6xl font-black text-white mb-2 tracking-tight">{data.term}</h2>
                    <p className="text-gray-500 text-xl font-serif italic mb-8">{data.pronunciation}</p>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-indigo-400 font-bold uppercase text-xs mb-2">Definition</h3>
                            <p className="text-xl text-gray-200 leading-relaxed font-light">
                                {data.definition}
                            </p>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-indigo-500">
                            <h3 className="text-gray-500 font-bold uppercase text-xs mb-2">Contextual Usage</h3>
                            <p className="text-lg text-indigo-200 italic">"{data.example}"</p>
                        </div>
                        
                        {data.origin && (
                            <div className="text-sm text-gray-500 pt-4 border-t border-gray-800">
                                <span className="font-bold text-gray-400">Origin/Notes: </span> {data.origin}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    Press "Next Term" to initialize the database.
                </div>
            )}
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 font-mono">
            Daily ingestion of technical vocabulary increases interview pass rates by 40%.
        </div>

      </div>
    </div>
  );
};

export default LexiconUplink;