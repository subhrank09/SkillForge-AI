import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useUser, UserButton, useAuth } from "@clerk/clerk-react"; // Added useAuth
import { 
  Sparkles, 
  LayoutDashboard, 
  BrainCircuit, 
  Swords,       
  User,         
  FileText,     
  ShoppingBag,  
  Users,        
  Loader2
} from 'lucide-react'; 
import { motion } from 'framer-motion';
import { generateCourse, addToHistory } from '../api/axios'; 
import api from '../api/axios'; 
import Leaderboard from '../components/Leaderboard'; 
import Footer from '../components/Footer';

const Home = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate();
  const location = useLocation(); 
  const { user } = useUser();
  const { isSignedIn } = useAuth(); // Check auth status

  // 1. Sync User
  useEffect(() => {
    if (user) {
      const syncUser = async () => {
        try {
          await api.post('/users/sync', {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            imageUrl: user.imageUrl
          });
        } catch (error) {
          console.error("User Sync Failed:", error);
        }
      };
      syncUser();
    }
  }, [user]);
  
  // 2. Auto-fill topic
  useEffect(() => {
    if (location.state && location.state.topicToGenerate) {
      setTopic(location.state.topicToGenerate);
    }
  }, [location]);

  // --- PROTECTED NAVIGATION HANDLER ---
  const handleProtectedAction = (pathOrAction) => {
    if (!isSignedIn) {
      // Redirect to sign-in if not logged in
      navigate('/sign-in');
    } else {
      // Proceed if logged in
      if (typeof pathOrAction === 'function') {
        pathOrAction();
      } else {
        navigate(pathOrAction);
      }
    }
  };

const handleGenerate = async () => {
    // Wrap generation in auth check
    handleProtectedAction(async () => {
      if (!topic.trim()) return;
      setLoading(true);
      try {
        const data = await generateCourse(topic, language);
        
        // ✅ FIX: Save to 'Courses' list with the Topic Name (not ID)
        if (user) {
           await api.post('/users/add-course', {
             clerkId: user.id,
             courseId: data._id,
             title: data.topic // ✅ This ensures the Name shows, not the ID
           });
        }
        
        navigate(`/course/${data._id}`);
      } catch (error) {
        console.error("Error generating course:", error);
        alert("AI is busy! Check the console.");
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden flex flex-col items-center p-6">
      
      {/* --- Header --- */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <button 
          onClick={() => handleProtectedAction('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700 hover:border-blue-500 transition-all text-sm font-medium backdrop-blur-md"
        >
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </button>
        {/* Only show UserButton if signed in, else show Sign In button */}
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button 
            onClick={() => navigate('/sign-in')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-bold"
          >
            Sign In
          </button>
        )}
      </div>

      {/* --- Main Content --- */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 mt-12 flex-grow">
        
        {/* LEFT COLUMN */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700 text-sm text-blue-400 mb-6 backdrop-blur-sm">
            <Sparkles size={14} />
            <span>AI-Powered Learning Architect</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight">
            Master Any Skill <br /> in Minutes.
          </h1>
          
          {/* Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8">
            <input 
              type="text" 
              placeholder="e.g. 'Advanced Python'" 
              className="flex-1 bg-gray-900/80 border border-gray-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500 backdrop-blur-sm"
              value={topic} 
              onChange={(e) => setTopic(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()} 
            />
            <button 
              onClick={handleGenerate} 
              disabled={loading} 
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Generate"}
            </button>
          </div>
            
          {/* === ARCADE FEATURES GRID === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700">
            
            {/* 1. Flashcards */}
            <FeatureBtn 
                title="Flashcards" 
                sub="Review Now" 
                icon={<BrainCircuit size={20} className="text-green-400"/>} 
                bg="bg-green-500/20" 
                border="hover:border-green-500"
                onClick={() => handleProtectedAction('/review')} 
            />

            {/* 2. Battle Arena */}
            <FeatureBtn 
                title="Battle Arena" 
                sub="Multiplayer Quiz" 
                icon={<Swords size={20} className="text-red-400"/>} 
                bg="bg-red-500/20" 
                border="hover:border-red-500"
                onClick={() => handleProtectedAction('/battle')} 
            />

            {/* 3. AI Interview */}
            <FeatureBtn 
                title="AI Interview" 
                sub="Roleplay & Grade" 
                icon={<User size={20} className="text-blue-400"/>} 
                bg="bg-blue-500/20" 
                border="hover:border-blue-500"
                onClick={() => handleProtectedAction('/interview')} 
            />

            {/* 4. Exam Oracle */}
            <FeatureBtn 
                title="Exam Oracle" 
                sub="Predict Questions" 
                icon={<FileText size={20} className="text-orange-400"/>} 
                bg="bg-orange-500/20" 
                border="hover:border-orange-500"
                onClick={() => handleProtectedAction('/exam-oracle')} 
            />

            {/* 5. XP Store */}
            <FeatureBtn 
                title="XP Store" 
                sub="Redeem Points" 
                icon={<ShoppingBag size={20} className="text-pink-400"/>} 
                bg="bg-pink-500/20" 
                border="hover:border-pink-500"
                onClick={() => handleProtectedAction('/store')} 
            />

            {/* 6. Study Room */}
            <FeatureBtn 
                title="Study Room" 
                sub="Chat & Collab" 
                icon={<Users size={20} className="text-indigo-400"/>} 
                bg="bg-indigo-500/20" 
                border="hover:border-indigo-500"
                onClick={() => handleProtectedAction('/study')} 
            />

          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex justify-center lg:justify-end">
          <Leaderboard />
        </motion.div>

      </div>
      <Footer />
    </div>
  );
};

// Helper Component
const FeatureBtn = ({ title, sub, icon, bg, border, onClick }) => (
    <div 
        onClick={onClick}
        className={`p-4 rounded-2xl bg-gray-900/40 border border-gray-800 flex items-center gap-3 cursor-pointer transition-all backdrop-blur-sm ${border} hover:bg-gray-900/60`}
    >
        <div className={`p-2 rounded-lg ${bg}`}>
            {icon}
        </div>
        <div>
            <h3 className="font-bold text-sm text-gray-200">{title}</h3>
            <p className="text-xs text-gray-400">{sub}</p>
        </div>
    </div>
);

export default Home;