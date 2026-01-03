import React, { useState } from 'react';
import { generateHackathonIdea } from '../../api/axios';
import { Lightbulb, Rocket, Loader2, Hammer, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HackathonHub = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState(null);
  
  // ✅ Added difficulty to state
  const [form, setForm] = useState({ 
      theme: 'Sustainability', 
      techStack: 'MERN Stack', 
      difficulty: 'Intermediate' 
  });

const handleGenerate = async (e) => {
    e.preventDefault();
    console.log("🟢 1. Button Clicked! Form Data:", form); // Check if button works
    
    setLoading(true);
    setIdea(null);

    try {
      console.log("🟡 2. Sending Request to Backend...");
      
      // Call the API
      const res = await generateHackathonIdea(form.theme, form.techStack, form.difficulty);
      
      console.log("🟢 3. Response Received:", res); // Check what came back

      if (res) {
          setIdea(res); // If res.data is already handled in axios
      } else {
          console.error("🔴 4. Response was empty!");
      }

    } catch (err) {
      console.error("🔴 ERROR CAUGHT:", err);
      alert("Error: " + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  const handleBuild = () => {
    if (!idea) return;
    navigate('/forge', { 
        state: { 
            prefillStack: form.techStack,
            customProject: {
                title: idea.title,
                description: idea.solution 
            }
        } 
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <button onClick={() => navigate('/dashboard')} className="text-purple-400 mb-6 hover:text-white flex items-center gap-2">← Back to Dashboard</button>
        
        <div className="text-center mb-10">
            <h1 className="text-5xl font-black uppercase italic flex justify-center items-center gap-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                <Rocket size={48} className="text-purple-500" /> Hackathon Hub
            </h1>
            <p className="text-gray-400 mt-2 text-lg">Generate winning ideas tailored to your skill level.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Input Form */}
            <div className="bg-gray-900/80 p-8 rounded-2xl border border-purple-500/30 h-fit backdrop-blur-sm shadow-xl">
                <form onSubmit={handleGenerate} className="space-y-6">
                    
                    {/* Theme Input */}
                    <div>
                        <label className="text-purple-400 font-bold uppercase text-xs tracking-wider">Hackathon Theme</label>
                        <input 
                            className="w-full bg-black border border-gray-700 p-4 rounded-xl text-white mt-2 focus:border-purple-500 outline-none transition-all placeholder-gray-600"
                            value={form.theme}
                            onChange={e => setForm({...form, theme: e.target.value})}
                            placeholder="e.g. FinTech, Healthcare, EdTech..."
                        />
                    </div>

                    {/* Tech Stack & Difficulty Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-purple-400 font-bold uppercase text-xs tracking-wider">Tech Stack</label>
                            <select 
                                className="w-full bg-black border border-gray-700 p-4 rounded-xl text-white mt-2 focus:border-purple-500 outline-none cursor-pointer"
                                value={form.techStack}
                                onChange={e => setForm({...form, techStack: e.target.value})}
                            >
                                <option>MERN Stack</option>
                                <option>React + Vite</option>
                                <option>Python (Flask)</option>
                                <option>Next.js Full Stack</option>
                                <option>Java Spring Boot</option>
                            </select>
                        </div>
                        
                        {/* ✅ New Difficulty Selector */}
                        <div>
                            <label className="text-purple-400 font-bold uppercase text-xs tracking-wider flex items-center gap-1">
                                <BarChart size={12}/> Difficulty
                            </label>
                            <select 
                                className="w-full bg-black border border-gray-700 p-4 rounded-xl text-white mt-2 focus:border-purple-500 outline-none cursor-pointer"
                                value={form.difficulty}
                                onChange={e => setForm({...form, difficulty: e.target.value})}
                            >
                                <option value="Beginner">Beginner (Level 1)</option>
                                <option value="Intermediate">Intermediate (Level 2)</option>
                                <option value="Advanced">Advanced (Level 3)</option>
                            </select>
                        </div>
                    </div>

                    <button disabled={loading} className="w-full bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg hover:shadow-purple-500/25">
                        {loading ? <Loader2 className="animate-spin" /> : "Generate Unique Idea"}
                    </button>
                </form>
            </div>

            {/* Output Display */}
            <div className="relative min-h-[450px]">
                {!idea ? (
                    <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-800 rounded-2xl text-gray-600 bg-gray-900/30">
                        <Lightbulb size={64} className="mb-4 opacity-20" />
                        <p className="font-mono text-sm">Enter theme & difficulty to spark innovation...</p>
                    </div>
                ) : (
                    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/50 p-8 rounded-2xl h-full animate-in fade-in slide-in-from-bottom-4 flex flex-col shadow-2xl backdrop-blur-md">
                        
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-3xl font-black text-white leading-tight">{idea.title}</h2>
                                <p className="text-purple-300 italic text-sm mt-1 opacity-80">"{idea.tagline}"</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                                form.difficulty === 'Beginner' ? 'bg-green-900/30 border-green-500 text-green-400' :
                                form.difficulty === 'Intermediate' ? 'bg-yellow-900/30 border-yellow-500 text-yellow-400' :
                                'bg-red-900/30 border-red-500 text-red-400'
                            }`}>
                                {form.difficulty}
                            </span>
                        </div>
                        
                        <div className="space-y-5 flex-1">
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <h4 className="font-bold text-gray-400 text-xs uppercase mb-1">The Problem</h4>
                                <p className="text-sm text-gray-200 leading-relaxed">{idea.problem}</p>
                            </div>
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <h4 className="font-bold text-gray-400 text-xs uppercase mb-1">The Solution</h4>
                                <p className="text-sm text-gray-200 leading-relaxed">{idea.solution}</p>
                            </div>
                            <div className="pl-4 border-l-2 border-purple-500">
                                <h4 className="font-bold text-purple-400 text-xs uppercase mb-1">Pitch It</h4>
                                <p className="text-gray-400 text-sm italic">"{idea.pitch}"</p>
                            </div>
                        </div>

                        <button 
                            onClick={handleBuild}
                            className="w-full mt-6 bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-orange-500/20 group"
                        >
                            <Hammer size={18} className="group-hover:-rotate-12 transition-transform"/> Build This in The Forge
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonHub;