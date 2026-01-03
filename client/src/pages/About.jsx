import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Users, Globe, Zap, Target, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
      title: "AI-Powered Architecture",
      desc: "Curriculums generated in seconds using advanced LLMs like Llama-3 & Gemini. No two paths are the same.",
      color: "hover:border-yellow-500/50 hover:bg-yellow-500/10"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Community Driven",
      desc: "Compete in global leaderboards, join study rooms, and battle peers in real-time quiz arenas.",
      color: "hover:border-purple-500/50 hover:bg-purple-500/10"
    },
    {
      icon: <Target className="w-8 h-8 text-red-400" />,
      title: "Career Focused",
      desc: "Upload your resume and let our AI analyze gaps to build a custom bridge course for your dream job.",
      color: "hover:border-red-500/50 hover:bg-red-500/10"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: "Instant Feedback",
      desc: "Get real-time grading on your code and interview answers from our AI Tutor and Code Sensei.",
      color: "hover:border-blue-500/50 hover:bg-blue-500/10"
    },
    {
      icon: <Globe className="w-8 h-8 text-green-400" />,
      title: "Learn Anywhere",
      desc: "Multilingual support for 10+ languages and a responsive design that works on any device.",
      color: "hover:border-green-500/50 hover:bg-green-500/10"
    },
    {
      icon: <Rocket className="w-8 h-8 text-orange-400" />,
      title: "Gamified Growth",
      desc: "Earn XP, unlock themes, maintain streaks, and collect certificates to showcase your mastery.",
      color: "hover:border-orange-500/50 hover:bg-orange-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- Dynamic Background --- */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] -z-10" />

      {/* Header Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 px-4 py-2 rounded-full hover:bg-white/10 transition-all"
      >
        <ArrowLeft size={20} /> <span className="font-medium">Back Home</span>
      </motion.button>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Future of Learning
            </span>
            <br />
            <span className="text-white">Is Personalized.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-400 leading-relaxed mb-10">
            SkillForge AI wasn't built to replace traditional learning—it was built to <strong>evolve</strong> it. 
            We use advanced Generative AI to architect learning paths that adapt to you, not the other way around.
          </motion.p>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all"
          >
            Start Your Journey
          </motion.button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`p-8 bg-gray-900/40 border border-gray-800 rounded-3xl backdrop-blur-sm transition-all duration-300 group ${feature.color}`}
            >
              <div className="mb-6 p-4 bg-gray-800/50 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-100 group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats / Trust Section */}
        <motion.div variants={itemVariants} className="mt-24 pt-12 border-t border-gray-800 text-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold mb-8">Powering the Next Generation of Developers</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-white">10k+</span>
                    <span className="text-sm text-gray-500">Nodes Generated</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-white">50+</span>
                    <span className="text-sm text-gray-500">Languages Supported</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-white">24/7</span>
                    <span className="text-sm text-gray-500">AI Availability</span>
                </div>
            </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default About;