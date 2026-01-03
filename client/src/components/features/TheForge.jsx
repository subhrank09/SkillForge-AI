import React, { useState, useEffect } from 'react';
import { generateProjectScaffold } from '../../api/axios';
import { Hammer, Download, Loader2, Code, Terminal, Cpu, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const TheForge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState(null);
  
  // ✅ New State to hold the specific Hackathon Idea
  const [customProject, setCustomProject] = useState(null);

  const [formData, setFormData] = useState({ 
    techStack: 'React + Vite', 
    level: 'Beginner' 
  });

  // ✅ EFFECT: Check for passed state from Hackathon Hub
  useEffect(() => {
    if (location.state) {
      // 1. Set Tech Stack
      if (location.state.prefillStack) {
         setFormData(prev => ({ ...prev, techStack: location.state.prefillStack }));
      }
      // 2. Set Custom Project Data
      if (location.state.customProject) {
         setCustomProject(location.state.customProject);
      }
    }
  }, [location]);

  const handleForge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProjectData(null);
    try {
      // ✅ Pass customProject (if it exists) to the API
      const res = await generateProjectScaffold(formData.techStack, formData.level, customProject);
      const data = res.data?.data || res.data || res;
      setProjectData(data);
    } catch (err) {
      console.error(err);
      alert("The Forge is overheated (API Error). Try again.");
    }
    setLoading(false);
  };

  const downloadProject = async () => {
    if (!projectData || !projectData.files) return;
    const zip = new JSZip();
    zip.file("README.md", projectData.readme);
    Object.entries(projectData.files).forEach(([filename, content]) => {
        zip.file(filename, content);
    });
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${projectData.title.replace(/\s+/g, '-').toLowerCase()}.zip`);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 relative overflow-hidden flex flex-col items-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black pointer-events-none" />
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-600/10 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="z-10 text-center mb-12">
        <button onClick={() => navigate('/dashboard')} className="text-orange-500 hover:text-white mb-6 uppercase tracking-widest text-xs">← Return to Base</button>
        <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-2 flex items-center justify-center gap-4">
            <Hammer size={64} className="text-orange-500" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">The Forge</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto border-l-2 border-orange-500/50 pl-4 text-left font-mono text-sm">
            Initialize Project Scaffolding Protocol.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 z-10">
        
        {/* LEFT: CONTROLS */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl h-fit">
            <form onSubmit={handleForge} className="space-y-6">
                
                {/* ✅ VISUAL INDICATOR: If using a Hackathon Idea */}
                {customProject && (
                    <div className="bg-purple-900/30 border border-purple-500/50 p-4 rounded-xl mb-4 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 text-purple-400 mb-1">
                            <Sparkles size={16} /> <span className="text-xs font-bold uppercase tracking-widest">Hackathon Blueprint Loaded</span>
                        </div>
                        <p className="text-white font-bold text-lg">{customProject.title}</p>
                        <p className="text-gray-400 text-xs truncate">{customProject.description}</p>
                        <button 
                            type="button" 
                            onClick={() => setCustomProject(null)} 
                            className="text-[10px] text-red-400 mt-2 underline hover:text-red-300"
                        >
                            Clear (Generate Random Instead)
                        </button>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-orange-400 uppercase mb-2 tracking-widest">Tech Stack</label>
                    <select 
                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-4 text-white focus:border-orange-500 outline-none font-mono"
                        value={formData.techStack}
                        onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                    >
                        <option>React + Vite</option>
                        <option>MERN Stack (Mongo, Express, React, Node)</option>
                        <option>Python (Flask)</option>
                        <option>Next.js Full Stack</option>
                        <option>HTML/CSS/JS (Vanilla)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-red-400 uppercase mb-2 tracking-widest">Difficulty Class</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Beginner', 'Intermediate', 'Expert'].map((lvl) => (
                            <button 
                                key={lvl}
                                type="button"
                                onClick={() => setFormData({...formData, level: lvl})}
                                className={`p-3 rounded-lg border text-sm font-bold transition-all ${
                                    formData.level === lvl 
                                    ? 'bg-orange-600 border-orange-500 text-black' 
                                    : 'bg-transparent border-gray-700 text-gray-400 hover:border-white'
                                }`}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black uppercase tracking-[0.2em] py-5 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all flex justify-center items-center gap-3"
                >
                    {loading ? <Loader2 className="animate-spin" /> : (
                        customProject ? <>Forge "{customProject.title}" <Cpu /></> : <>Ignite Forge <Cpu /></>
                    )}
                </button>
            </form>
        </div>

        {/* RIGHT: OUTPUT TERMINAL */}
        <div className="relative">
            <div className="absolute inset-0 border border-orange-500/30 rounded-2xl bg-black/80 backdrop-blur-xl flex flex-col overflow-hidden min-h-[400px]">
                
                {/* Terminal Header */}
                <div className="bg-white/5 p-3 flex items-center gap-2 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-auto text-xs text-gray-500 font-mono">output_stream.log</span>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 overflow-y-auto font-mono text-sm">
                    {!projectData && !loading && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
                            <Terminal size={48} className="opacity-50" />
                            <p>Waiting for input...</p>
                        </div>
                    )}

                    {loading && (
                        <div className="space-y-2">
                            <p className="text-orange-400 animate-pulse">{">"} Reading blueprints...</p>
                            <p className="text-orange-400 animate-pulse delay-75">{">"} Fabricating file structure...</p>
                            <p className="text-orange-400 animate-pulse delay-150">{">"} Writing boilerplate code...</p>
                        </div>
                    )}

                    {projectData && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{projectData.title}</h3>
                                <p className="text-gray-400 text-xs border-l-2 border-gray-600 pl-3">{projectData.description}</p>
                            </div>

                            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                                <h4 className="text-gray-500 text-xs uppercase mb-3">Generated Files:</h4>
                                <ul className="space-y-1">
                                    <li className="text-green-400 flex items-center gap-2"><Code size={12}/> README.md</li>
                                    {projectData.files && Object.keys(projectData.files).map((file, i) => (
                                        <li key={i} className="text-blue-300 flex items-center gap-2">
                                            <Code size={12}/> {file}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button 
                                onClick={downloadProject}
                                className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition flex justify-center items-center gap-2"
                            >
                                <Download size={18} /> Download Starter Kit (.zip)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default TheForge;