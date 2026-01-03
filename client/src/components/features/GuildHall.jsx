import React, { useState, useEffect } from 'react';
import { getGuildData } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Users, Star, MessageSquare, Award, GitPullRequest, ThumbsUp, X, Check, FileCode } from 'lucide-react';

const GuildHall = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ feed: [], leaderboard: [] });
  
  // ✅ NEW STATE: Controls for Modals
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  
  // Form State
  const [submission, setSubmission] = useState({ title: '', stack: 'React', link: '' });

  useEffect(() => {
    getGuildData().then(res => setData(res));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Project "${submission.title}" Submitted! It is now live for peer review.`);
    setShowSubmitModal(false);
    setSubmission({ title: '', stack: 'React', link: '' }); // Reset form
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center relative">
      <div className="w-full max-w-6xl">
        <button onClick={() => navigate('/dashboard')} className="text-gray-500 mb-6 hover:text-white">← Dashboard</button>
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-10 mb-12 overflow-hidden border border-indigo-500/30">
            <div className="absolute top-0 right-0 p-10 opacity-10"><Users size={200} /></div>
            <h1 className="text-5xl font-black uppercase italic mb-4 flex items-center gap-4 relative z-10">
                <Users size={48} className="text-yellow-400"/> The Guild Hall
            </h1>
            <p className="text-indigo-200 text-lg max-w-xl relative z-10">
                Review code. Earn Reputation. Become a Legend.<br/>
                The ultimate peer-review ecosystem for elite developers.
            </p>
            <div className="mt-8 flex gap-4 relative z-10">
                {/* ✅ ATTACHED ONCLICK EVENTS */}
                <button onClick={() => setShowSubmitModal(true)} className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition shadow-lg hover:scale-105 transform">
                    Submit Your Project
                </button>
                <button onClick={() => setShowRulesModal(true)} className="bg-indigo-700/50 border border-indigo-400 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition">
                    Read Guild Rules
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Feed */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2"><GitPullRequest className="text-green-400"/> Open Review Requests</h3>
                    <div className="flex gap-2 text-sm">
                        <span className="text-gray-400 cursor-pointer hover:text-white">Newest</span>
                        <span className="text-gray-600">|</span>
                        <span className="text-gray-400 cursor-pointer hover:text-white">Highest Bounty</span>
                    </div>
                </div>

                {data.feed.map((item) => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-indigo-500 transition-all group cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-2xl border border-gray-700">
                                    {item.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg group-hover:text-indigo-400 transition">{item.project}</h4>
                                    <div className="flex gap-2 text-xs mt-1">
                                        <span className="text-blue-400">@{item.user}</span>
                                        <span className="text-gray-600">•</span>
                                        <span className="bg-gray-800 px-2 rounded text-gray-400">{item.stack}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="bg-yellow-900/30 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold border border-yellow-600/30">
                                    Reward: {item.bounty} XP
                                </div>
                                <div className="text-xs text-gray-600 mt-2">{item.time}</div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
                            <div className="text-sm text-gray-400 flex gap-4">
                                <span className="flex items-center gap-1 hover:text-white"><MessageSquare size={14}/> 3 Comments</span>
                                <span className="flex items-center gap-1 hover:text-white"><ThumbsUp size={14}/> 12 Likes</span>
                            </div>
                            <button className="text-sm font-bold text-indigo-400 hover:text-white transition">Review Code →</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT: Leaderboard */}
            <div className="lg:col-span-1">
                <div className="bg-gray-900 border border-yellow-600/30 rounded-2xl p-6 sticky top-24">
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-yellow-500"><Award/> Top Contributors</h3>
                    <div className="space-y-4">
                        {data.leaderboard.map((user, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className={`font-black text-lg w-6 ${i===0?'text-yellow-400':i===1?'text-gray-300':'text-orange-700'}`}>#{user.rank}</div>
                                    <div className="font-bold">{user.user}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-indigo-400">{user.rep} Rep</div>
                                    <div className="text-[10px] text-gray-500 uppercase">{user.badge}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. SUBMIT PROJECT MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-indigo-500 rounded-2xl p-8 max-w-lg w-full relative animate-in zoom-in duration-200">
                <button onClick={() => setShowSubmitModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
                
                <h2 className="text-3xl font-black italic mb-6 flex items-center gap-2"><FileCode className="text-yellow-400"/> Submit Project</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Project Title</label>
                        <input required className="w-full bg-black border border-gray-700 p-3 rounded text-white mt-1" 
                            placeholder="e.g. Netflix Clone"
                            value={submission.title} onChange={e => setSubmission({...submission, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Tech Stack</label>
                        <select className="w-full bg-black border border-gray-700 p-3 rounded text-white mt-1"
                             value={submission.stack} onChange={e => setSubmission({...submission, stack: e.target.value})}
                        >
                            <option>React</option>
                            <option>Node.js</option>
                            <option>Python</option>
                            <option>Java</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">GitHub Repo Link</label>
                        <input required className="w-full bg-black border border-gray-700 p-3 rounded text-white mt-1" 
                            placeholder="https://github.com/username/repo"
                            value={submission.link} onChange={e => setSubmission({...submission, link: e.target.value})}
                        />
                    </div>
                    
                    <div className="bg-indigo-900/20 p-4 rounded text-xs text-indigo-200 border border-indigo-500/20">
                        <p>ℹ️ Submission Cost: <strong>50 XP</strong></p>
                        <p>Your code will be publicly visible for review.</p>
                    </div>

                    <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition">
                        Confirm Submission
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* 2. RULES MODAL */}
      {showRulesModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-lg w-full relative animate-in zoom-in duration-200">
                <button onClick={() => setShowRulesModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
                
                <h2 className="text-3xl font-black italic mb-6">Guild Rules</h2>
                
                <ul className="space-y-4 text-gray-300">
                    <li className="flex gap-3">
                        <Check className="text-green-500 shrink-0" /> 
                        <span><strong>Be Constructive:</strong> Harsh criticism is banned. Offer solutions, not just problems.</span>
                    </li>
                    <li className="flex gap-3">
                        <Check className="text-green-500 shrink-0" /> 
                        <span><strong>Security First:</strong> Do not post API keys or personal data.</span>
                    </li>
                    <li className="flex gap-3">
                        <Check className="text-green-500 shrink-0" /> 
                        <span><strong>Reputation System:</strong> Earn points by giving helpful reviews. Lose points for spam.</span>
                    </li>
                    <li className="flex gap-3">
                        <Check className="text-green-500 shrink-0" /> 
                        <span><strong>No Plagiarism:</strong> Only submit code you wrote yourself.</span>
                    </li>
                </ul>

                <button onClick={() => setShowRulesModal(false)} className="mt-8 w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition">
                    I Understand
                </button>
            </div>
        </div>
      )}

    </div>
  );
};

export default GuildHall;