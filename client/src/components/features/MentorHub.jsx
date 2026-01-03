import React, { useState } from 'react';
import { Bot, Users, MessageSquare, Star } from 'lucide-react';
import { askTutor } from '../../api/axios'; // Reuse your existing tutor API
import { useNavigate } from 'react-router-dom';

const MENTOR_PERSONAS = [
    { id: 'senior', name: 'The Senior Dev', role: 'Strict & Technical', prompt: 'You are a Senior Engineer. Be strict, concise, and focus on clean code. Critique ruthlessly.' },
    { id: 'cto', name: 'The Visionary CTO', role: 'System Design & Career', prompt: 'You are a CTO. Focus on scalability, business value, and long-term career advice.' },
    { id: 'peer', name: 'The Study Buddy', role: 'Encouraging & Simple', prompt: 'You are a fellow student. Be encouraging, explain things simply, and use emojis.' }
];

const MOCK_HUMANS = [
    { name: 'Sarah Jenkins', role: 'S-Rank | Google', skills: ['React', 'System Design'], rating: 4.9 },
    { name: 'David Chen', role: 'A-Rank | Amazon', skills: ['Python', 'DSA'], rating: 4.8 },
];

const MentorHub = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('ai'); // 'ai' or 'human'
    const [selectedPersona, setSelectedPersona] = useState(MENTOR_PERSONAS[0]);
    const [chat, setChat] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAiChat = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const newHistory = [...chat, { role: 'user', text: input }];
        setChat(newHistory);
        setInput("");
        setLoading(true);

        // We use the 'askTutor' API but inject the persona into the prompt
        try {
            const context = `(PERSONA INSTRUCTION: ${selectedPersona.prompt})`;
            const res = await askTutor("General", context, input);
            setChat([...newHistory, { role: 'ai', text: res.answer }]);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <button onClick={() => navigate('/dashboard')} className="text-gray-500 mb-6 hover:text-white">← Dashboard</button>
                
                {/* Header */}
                <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-6">
                    <div>
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <Users className="text-yellow-500" /> Mentor Match
                        </h1>
                        <p className="text-gray-400 mt-2">Get guidance from AI Personas or S-Rank Humans.</p>
                    </div>
                    <div className="flex bg-gray-900 p-1 rounded-lg">
                        <button onClick={() => setMode('ai')} className={`px-4 py-2 rounded font-bold flex items-center gap-2 ${mode === 'ai' ? 'bg-yellow-600 text-black' : 'text-gray-400'}`}>
                            <Bot size={18} /> AI Mentors
                        </button>
                        <button onClick={() => setMode('human')} className={`px-4 py-2 rounded font-bold flex items-center gap-2 ${mode === 'human' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>
                            <Users size={18} /> Human Hub
                        </button>
                    </div>
                </div>

                {/* --- AI MODE --- */}
                {mode === 'ai' && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[500px]">
                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-3 overflow-y-auto">
                            {MENTOR_PERSONAS.map(p => (
                                <div 
                                    key={p.id} 
                                    onClick={() => { setSelectedPersona(p); setChat([]); }}
                                    className={`p-4 rounded-xl cursor-pointer border transition-all ${selectedPersona.id === p.id ? 'bg-yellow-900/20 border-yellow-500 text-yellow-100' : 'bg-gray-900 border-gray-800 hover:bg-gray-800'}`}
                                >
                                    <h3 className="font-bold">{p.name}</h3>
                                    <p className="text-xs opacity-70">{p.role}</p>
                                </div>
                            ))}
                        </div>

                        {/* Chat Window */}
                        <div className="lg:col-span-3 bg-gray-900/50 border border-gray-700 rounded-2xl flex flex-col overflow-hidden">
                            <div className="bg-gray-800 p-4 border-b border-gray-700 font-bold flex items-center gap-2">
                                <Bot className="text-yellow-500" /> Chatting with {selectedPersona.name}
                            </div>
                            
                            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                {chat.length === 0 && <div className="text-center text-gray-500 mt-10">Start the conversation...</div>}
                                {chat.map((msg, i) => (
                                    <div key={i} className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 ml-auto' : 'bg-gray-800 border border-gray-700'}`}>
                                        {msg.text}
                                    </div>
                                ))}
                                {loading && <div className="text-gray-500 text-xs animate-pulse">Typing...</div>}
                            </div>

                            <form onSubmit={handleAiChat} className="p-4 border-t border-gray-700 flex gap-2">
                                <input 
                                    className="flex-1 bg-black border border-gray-600 rounded p-3 focus:border-yellow-500 outline-none"
                                    placeholder="Ask for advice..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                />
                                <button className="bg-yellow-600 hover:bg-yellow-500 text-black px-6 rounded font-bold">Send</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* --- HUMAN MODE (Mock for MVP) --- */}
                {mode === 'human' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                        {MOCK_HUMANS.map((human, i) => (
                            <div key={i} className="bg-gray-900 border border-blue-500/30 p-6 rounded-xl flex items-center justify-between hover:border-blue-500 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-2xl">👤</div>
                                    <div>
                                        <h3 className="font-bold text-xl">{human.name}</h3>
                                        <p className="text-blue-400 text-sm font-mono">{human.role}</p>
                                        <div className="flex gap-2 mt-2">
                                            {human.skills.map(s => <span key={s} className="text-[10px] bg-gray-800 px-2 py-1 rounded">{s}</span>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1 text-yellow-400 font-bold">
                                        <Star size={16} fill="currentColor" /> {human.rating}
                                    </div>
                                    <button className="mt-3 bg-blue-600/20 text-blue-400 border border-blue-500 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition-all">
                                        Request
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="col-span-2 text-center py-10 border-2 border-dashed border-gray-800 rounded-xl text-gray-500">
                            More mentors joining soon...
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MentorHub;