import React, { useState } from 'react';
import { generateRoadmap } from '../../api/axios';
import { 
  Map, Loader2, AlertCircle, Calendar, Clock, 
  Target, BarChart2, ChevronRight, Minus, Plus, Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RoadmapGenerator = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    targetRole: '', 
    currentSkillLevel: 'Beginner', 
    months: 1 
  });
  
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper to safely update months
  const adjustMonths = (amount) => {
    setFormData(prev => ({
        ...prev,
        months: Math.max(1, Math.min(24, prev.months + amount)) // Clamp between 1 and 24
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.targetRole.trim()) return;

    setLoading(true);
    setError('');
    setRoadmap(null);

    try {
      const weeksDuration = formData.months * 4;

      const payload = {
          targetRole: formData.targetRole,
          currentSkillLevel: formData.currentSkillLevel,
          durationWeeks: weeksDuration 
      };

      const res = await generateRoadmap(payload);
      
      let roadmapData = [];
      if (res.data && res.data.data && res.data.data.roadmap) {
          roadmapData = res.data.data.roadmap;
      } else if (res.data && res.data.roadmap) {
          roadmapData = res.data.roadmap;
      }

      if (roadmapData.length > 0) {
        setRoadmap(roadmapData);
      } else {
        setError("AI returned an empty plan. Please try again.");
      }
      
    } catch (err) {
      console.error("Roadmap Error:", err);
      setError("Failed to generate roadmap. Please check your connection.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 pt-24 flex flex-col items-center relative overflow-x-hidden font-sans">
       
       {/* Background Ambience */}
       <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_rgba(120,50,255,0.15),_rgba(0,0,0,1))] pointer-events-none z-0" />
       <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none z-0" />

       <div className="z-10 w-full max-w-5xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-white transition text-sm font-mono mb-2 flex items-center gap-1">
                    <ChevronRight className="rotate-180" size={14} /> BACK TO BASE
                </button>
                <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                    <Map className="text-purple-500" size={32} /> Career Architect
                </h2>
                <p className="text-gray-400 mt-2 text-sm md:text-base max-w-xl">
                    Define your target. Set your timeline. Let AI engineer your path to mastery.
                </p>
            </div>
          </div>
          
          {/* Control Panel / Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit} 
            className="bg-[#0f0f12] border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            {/* Top Border Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* 1. Target Role (Span 5) */}
                <div className="md:col-span-5 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <Target size={14} className="text-purple-400" /> Target Role
                    </label>
                    <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                        <input 
                          required
                          type="text" 
                          className="w-full bg-black/40 border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder-gray-700 font-medium" 
                          placeholder="e.g. Senior DevOps Engineer"
                          value={formData.targetRole}
                          onChange={(e) => setFormData({...formData, targetRole: e.target.value})} 
                        />
                    </div>
                </div>

                {/* 2. Current Level (Span 3) */}
                <div className="md:col-span-3 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <BarChart2 size={14} className="text-blue-400" /> Current Level
                    </label>
                    <div className="relative">
                        <select 
                          className="w-full bg-black/40 border border-gray-800 rounded-xl py-4 px-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer font-medium"
                          value={formData.currentSkillLevel}
                          onChange={(e) => setFormData({...formData, currentSkillLevel: e.target.value})}
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* 3. Time Available (Span 4) */}
                <div className="md:col-span-4 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <Clock size={14} className="text-cyan-400" /> Timeframe
                    </label>
                    <div className="flex items-center bg-black/40 border border-gray-800 rounded-xl p-1 h-[58px]">
                        <button 
                            type="button" 
                            onClick={() => adjustMonths(-1)}
                            className="h-full px-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <Minus size={18} />
                        </button>
                        
                        <div className="flex-1 text-center border-l border-r border-gray-800 h-full flex flex-col justify-center">
                            <span className="font-bold text-xl text-white leading-none">{formData.months}</span>
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Months</span>
                        </div>
                        
                        <button 
                            type="button" 
                            onClick={() => adjustMonths(1)}
                            className="h-full px-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 flex justify-end items-center gap-4 border-t border-white/5 pt-6">
                <div className="text-xs text-gray-500 font-mono hidden md:block">
                    ESTIMATED OUTPUT: <span className="text-cyan-400">{formData.months * 4} WEEK PLAN</span>
                </div>
                <button 
                    disabled={loading} 
                    className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <>Generate Strategy <ChevronRight size={18}/></>}
                </button>
            </div>
          </motion.form>

          {/* Error Message */}
          {error && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-200 flex items-center gap-3">
               <AlertCircle size={20} className="text-red-500" /> {error}
            </motion.div>
          )}

          {/* Roadmap Display */}
          {roadmap && (
            <div className="mt-16 pb-20">
              <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                  <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Strategic Timeline</h3>
                      <p className="text-gray-500 text-sm">Tailored path for {formData.targetRole}</p>
                  </div>
                  <div className="text-right hidden md:block">
                     <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">{roadmap.length}</div>
                     <div className="text-xs text-purple-400 font-bold tracking-widest uppercase">Modules</div>
                  </div>
              </div>

              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-purple-500/20 before:to-transparent">
                {roadmap.map((week, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    {/* Timeline Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-[#0a0a0a] group-hover:bg-purple-500/20 group-hover:border-purple-500 transition-colors shadow-[0_0_0_8px_#050505] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-gray-500 group-hover:text-purple-400">
                        <Calendar size={18} />
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#0f0f12] p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all shadow-xl group-hover:shadow-purple-500/5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Week {week.week}</span>
                            {week.project && <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">BUILD</span>}
                        </div>
                        <h3 className="font-bold text-lg text-white mb-2 group-hover:text-purple-200 transition-colors">{week.topic}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{week.details}</p>
                        
                        {week.project && (
                            <div className="bg-black/40 rounded-lg p-3 border border-white/5 flex gap-3 items-start">
                                <div className="mt-1 min-w-[4px] h-4 bg-yellow-500 rounded-full" />
                                <div>
                                    <div className="text-xs text-gray-500 font-bold uppercase mb-0.5">Micro-Project</div>
                                    <div className="text-sm text-gray-300 font-mono">{week.project}</div>
                                </div>
                            </div>
                        )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
       </div>
    </div>
  );
};

export default RoadmapGenerator;