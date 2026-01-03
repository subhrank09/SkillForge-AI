import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Twitter, Linkedin, MessageSquare, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const navigate = useNavigate();
  
  // --- FORMSPREE HOOK ---
  // 🔴 REPLACE "YOUR_FORMSPREE_ID" WITH YOUR ACTUAL ID FROM FORMSPREE.IO
  const [state, handleSubmit] = useForm("xvzprlgp");

  // Local state for inputs (to clear them after sending)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Clear form when success happens
  useEffect(() => {
    if (state.succeeded) {
      setFormData({ name: '', email: '', message: '' });
    }
  }, [state.succeeded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen text-white p-8 pt-24 relative overflow-hidden flex justify-center items-center">
      
      {/* Back Home Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all cursor-pointer"
      >
        <ArrowLeft size={20} /> <span className="font-medium">Back Home</span>
      </motion.button>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 z-10">
        
        {/* LEFT: Info Panel */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center space-y-8"
        >
            <div>
                <h2 className="text-pink-500 font-bold tracking-widest text-sm mb-2">CONTACT CHANNEL // 接続</h2>
                <h1 className="text-6xl font-black italic uppercase leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                    Get In <br/> Touch
                </h1>
                <p className="text-gray-400 mt-6 text-lg max-w-md border-l-4 border-pink-500 pl-4">
                    Have a project in mind or just want to chat? Our comms lines are open 24/7.
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="p-4 bg-gray-900/50 border border-purple-500/30 rounded-xl group-hover:bg-purple-600 group-hover:border-purple-500 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <Mail className="text-purple-400 group-hover:text-white" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Email Us</p>
                        <p className="text-lg font-mono text-purple-200">contactskillforgeai@gmail.com</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="p-4 bg-gray-900/50 border border-pink-500/30 rounded-xl group-hover:bg-pink-600 group-hover:border-pink-500 transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                        <MapPin className="text-pink-400 group-hover:text-white" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">HQ Location</p>
                        <p className="text-lg font-mono text-pink-200">Neo-Tokyo, Sector 7</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                    <motion.a 
                        key={i}
                        whileHover={{ y: -5, scale: 1.1 }}
                        href="#" 
                        className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-colors"
                    >
                        <Icon size={20} />
                    </motion.a>
                ))}
            </div>
        </motion.div>

        {/* RIGHT: Form (Connected to Formspree) */}
        <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
        >
            <div className="absolute inset-0 border-2 border-purple-500/30 translate-x-4 translate-y-4 rounded-2xl pointer-events-none" />
            
            <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <MessageSquare size={120} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-xs font-bold text-purple-400 uppercase mb-2 tracking-widest">Operator Name</label>
                        <input 
                            id="name"
                            type="text" 
                            name="name" // Required for Formspree
                            required
                            className="w-full bg-black/40 border-b-2 border-gray-700 p-3 text-white focus:border-purple-500 focus:bg-purple-900/10 outline-none transition-all font-mono"
                            placeholder="Enter your name..."
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-pink-400 uppercase mb-2 tracking-widest">Comms ID (Email)</label>
                        <input 
                            id="email"
                            type="email" 
                            name="email" // Required for Formspree
                            required
                            className="w-full bg-black/40 border-b-2 border-gray-700 p-3 text-white focus:border-pink-500 focus:bg-pink-900/10 outline-none transition-all font-mono"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-blue-400 uppercase mb-2 tracking-widest">Transmission Data</label>
                        <textarea 
                            id="message"
                            name="message" // Required for Formspree
                            rows="4"
                            required
                            className="w-full bg-black/40 border-b-2 border-gray-700 p-3 text-white focus:border-blue-500 focus:bg-blue-900/10 outline-none transition-all font-mono resize-none"
                            placeholder="Type your message..."
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                    </div>

                    <button 
                        type="submit" 
                        disabled={state.submitting || state.succeeded}
                        className={`w-full py-4 font-bold uppercase tracking-widest transition-all duration-300 clip-path-polygon flex items-center justify-center gap-2 ${
                            state.succeeded
                            ? "bg-green-500 text-black cursor-default" 
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)" }}
                    >
                        {state.submitting ? (
                            <> <Loader2 className="animate-spin" size={20} /> Transmitting... </>
                        ) : state.succeeded ? (
                            <> <CheckCircle size={20} /> Transmission Sent </>
                        ) : (
                            "Initialize Send"
                        )}
                    </button>
                    
                    {state.succeeded && (
                        <motion.p 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="text-green-400 text-center text-xs uppercase tracking-widest mt-2"
                        >
                            Data received by SkillForge Command. Over.
                        </motion.p>
                    )}
                </form>
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;