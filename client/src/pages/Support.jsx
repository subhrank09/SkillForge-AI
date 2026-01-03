import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Bug, FileText, Zap, X, ChevronRight, ChevronLeft, Map, Swords, Github, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQS = [
  { id: 1, q: "How does the AI Roadmap work?", a: "Our AI analyzes your goal and current skill level to generate a week-by-week plan using data from thousands of successful developer paths." },
  { id: 2, q: "Is the GitHub Analyzer free?", a: "Yes! Currently, all beta features including the GitHub Analyzer are free to use for registered SkillForge cadets." },
  { id: 3, q: "Can I use Battle Mode with friends?", a: "Absolutely. Create a room ID, share it with your squad, and compete in real-time coding quizzes." },
  { id: 4, q: "My progress isn't saving.", a: "Ensure you are logged in. Progress saves automatically every time you complete a node or quiz." },
];

// --- MANUAL SLIDES DATA ---
const MANUAL_STEPS = [
    { 
        title: "Initialize Roadmap", 
        desc: "Go to Dashboard > Create New Course. Enter course you want to learn (e.g. Advanced Python), and let AI build your custom curriculum.",
        icon: Map, color: "text-purple-400"
    },
    { 
        title: "Enter Battle Arena", 
        desc: "Challenge friends or AI in real-time coding battles. Earn XP to climb the global leaderboard.",
        icon: Swords, color: "text-red-400"
    },
    { 
        title: "AI Code Analysis", 
        desc: "Paste your GitHub repo link to get an instant audit. Find bugs, security flaws, and resume-ready improvements.",
        icon: Github, color: "text-gray-300"
    }
];

const Support = () => {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [showManual, setShowManual] = useState(false); 
  const [currentStep, setCurrentStep] = useState(0);   

  const toggleFAQ = (id) => setOpenId(openId === id ? null : id);

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % MANUAL_STEPS.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + MANUAL_STEPS.length) % MANUAL_STEPS.length);

  return (
    <div className="min-h-screen text-white p-8 pt-24 flex flex-col items-center relative overflow-hidden">
      
      {/* --- ADDED: Back Home Button positioned Absolutely Top-Left --- */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all cursor-pointer"
      >
        <ArrowLeft size={20} /> <span className="font-medium">Back Home</span>
      </motion.button>

      {/* Background Decor */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 z-10">
        <motion.div 
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1 rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-400 text-xs tracking-[0.2em] mb-4 backdrop-blur-md"
        >
            SYSTEM HELP // サポート
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black uppercase italic mb-4 drop-shadow-lg">
            Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Support</span>
        </h1>
        <p className="text-gray-300 max-w-lg mx-auto">Briefing data and operational assistance.</p>
      </div>

      {/* FAQs */}
      <div className="w-full max-w-3xl z-10 mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
            <Zap className="text-yellow-400" /> FAQ DATABASE
        </h2>
        <div className="space-y-4">
            {FAQS.map((faq) => (
                <motion.div 
                    key={faq.id}
                    initial={false}
                    className={`border rounded-xl overflow-hidden backdrop-blur-lg transition-all duration-300 ${openId === faq.id ? 'bg-blue-900/30 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                    <button onClick={() => toggleFAQ(faq.id)} className="w-full p-5 flex justify-between items-center text-left">
                        <span className={`font-medium text-lg ${openId === faq.id ? 'text-blue-200' : 'text-gray-200'}`}>{faq.q}</span>
                        <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }}><ChevronDown className="text-gray-400" /></motion.div>
                    </button>
                    <AnimatePresence>
                        {openId === faq.id && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="p-5 pt-0 text-gray-300 text-sm leading-relaxed border-t border-white/10">{faq.a}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl z-10">
         {/* Manual Card - Triggers Modal */}
         <motion.div 
            onClick={() => setShowManual(true)}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl cursor-pointer backdrop-blur-md flex flex-col items-center text-center group transition-all"
         >
            <div className="p-4 bg-blue-500/20 rounded-full mb-4 group-hover:bg-blue-500/40 transition">
                <FileText size={40} className="text-blue-400 group-hover:text-white transition" />
            </div>
            <h3 className="font-bold text-xl mb-2">Mission Manual</h3>
            <p className="text-gray-400 text-sm">Launch interactive system tutorial.</p>
         </motion.div>

         {/* Bug Report Card */}
         <motion.div 
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            className="bg-white/5 border border-red-500/20 p-8 rounded-2xl cursor-pointer backdrop-blur-md flex flex-col items-center text-center group transition-all hover:border-red-500/50"
         >
            <div className="p-4 bg-red-500/20 rounded-full mb-4 group-hover:bg-red-500/40 transition">
                <Bug size={40} className="text-red-400 group-hover:text-white transition" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-red-100">Report Glitch</h3>
            <p className="text-gray-400 text-sm">Encountered an anomaly? Contact command.</p>
         </motion.div>
      </div>

      {/* --- MANUAL MODAL (The Demo) --- */}
      <AnimatePresence>
        {showManual && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    className="bg-gray-900 border border-white/20 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl overflow-hidden"
                >
                    {/* Close Button */}
                    <button onClick={() => setShowManual(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>

                    {/* Step Content */}
                    <div className="text-center py-8 px-4">
                        <div className="mb-6 flex justify-center">
                            {/* Dynamic Icon */}
                            {React.createElement(MANUAL_STEPS[currentStep].icon, { 
                                size: 64, 
                                className: `${MANUAL_STEPS[currentStep].color} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]` 
                            })}
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-3">{MANUAL_STEPS[currentStep].title}</h2>
                        <p className="text-gray-300 text-sm leading-relaxed min-h-[60px]">
                            {MANUAL_STEPS[currentStep].desc}
                        </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
                        <button onClick={prevStep} className="p-2 hover:bg-white/10 rounded-full transition">
                            <ChevronLeft size={24} />
                        </button>
                        
                        {/* Dots Indicator */}
                        <div className="flex gap-2">
                            {MANUAL_STEPS.map((_, i) => (
                                <div key={i} className={`h-2 w-2 rounded-full transition-colors ${i === currentStep ? 'bg-blue-500' : 'bg-gray-700'}`} />
                            ))}
                        </div>

                        <button onClick={nextStep} className="p-2 hover:bg-white/10 rounded-full transition">
                            <ChevronRight size={24} />
                        </button>
                    </div>

                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Support;