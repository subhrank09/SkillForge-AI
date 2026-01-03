import React, { useEffect, useState } from 'react';
import { analyzeGap, getUserHistory } from '../../api/axios'; // Import getUserHistory
import { useUser } from "@clerk/clerk-react"; // Import Clerk to get User ID
import { TrendingUp, ArrowRight, Loader2, Youtube, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkillGapResults = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Get current user
  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    const performAnalysis = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // 1. Fetch Real User History (Selected Courses)
        const history = await getUserHistory(user.id);
        
        if (!history || history.length === 0) {
            setLoading(false);
            return; // No courses to analyze
        }

        // 2. Extract Course Titles
        // We filter for "course" type if your history has multiple types, 
        // otherwise just map the titles.
        const courseTitles = history.map(h => h.title);
        setUserCourses(courseTitles);

        // 3. Prepare Data for AI
        // We send the courses as "topics" and ask AI to find common gaps in them.
        // We default 'score' to a neutral value if we don't have real quiz data yet,
        // triggering the AI to suggest "Advanced Concepts" you might miss.
        const analysisPayload = courseTitles.map(title => ({
            topic: title,
            score: 5 // Neutral score prompts AI to look for "Next Level" gaps
        }));

        const role = "Software Engineer"; // General target role

        // 4. Call AI Analysis
        const res = await analyzeGap(analysisPayload, role);

        // 5. Handle Response
        if (res.data?.data?.gaps) {
            setGaps(res.data.data.gaps);
        } else if (res.data?.gaps) {
            setGaps(res.data.gaps);
        }

      } catch (err) {
        console.error("Gap Analysis Error:", err);
      }
      setLoading(false);
    };

    performAnalysis();
  }, [user]);

  const handleResourceClick = (topic) => {
    const query = encodeURIComponent(`${topic} advanced tutorial`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-20 flex flex-col items-center relative">
       {/* Background Ambience */}
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-gray-900/50 to-black z-0 pointer-events-none" />

       <div className="z-10 w-full max-w-5xl">
         <button onClick={() => navigate('/dashboard')} className="mb-6 text-gray-400 hover:text-white transition flex items-center gap-2">
            ← Back to Dashboard
         </button>
         
         <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 border-b border-gray-800 pb-8">
            <div className="p-5 bg-red-500/10 rounded-2xl text-red-500 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <TrendingUp size={40} />
            </div>
            <div>
                <h1 className="text-4xl font-black text-white mb-2">Skill Gap Matrix</h1>
                <p className="text-gray-400 max-w-xl text-lg">
                    {userCourses.length > 0 
                        ? `Analyzing your ${userCourses.length} active courses to identify missing knowledge.` 
                        : "AI-driven analysis of your learning trajectory."}
                </p>
            </div>
         </div>

         {loading ? (
             <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin h-12 w-12 text-red-500 mb-4" />
                <p className="text-red-500/50 font-mono animate-pulse">Scanning Neural Pathways...</p>
             </div>
         ) : userCourses.length === 0 ? (
             // Empty State
             <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-gray-800">
                <BookOpen className="mx-auto text-gray-600 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-300">No Courses Found</h3>
                <p className="text-gray-500 mt-2">Start a course in the Roadmap to unlock Gap Analysis.</p>
                <button onClick={() => navigate('/')} className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold">
                    Go to Roadmap
                </button>
             </div>
         ) : (
             // Results Grid
             <div className="grid grid-cols-1 gap-6">
                {gaps && gaps.map((gap, index) => (
                  <div key={index} className="bg-gray-900/60 border border-gray-800 p-8 rounded-2xl hover:border-red-500/50 transition-all group relative overflow-hidden">
                     
                     {/* Hover Effect */}
                     <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-red-900/30 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20 uppercase tracking-wider">
                                    Detected Gap
                                </span>
                                <h4 className="font-bold text-2xl text-white">{gap.topic}</h4>
                            </div>
                            <p className="text-gray-400 text-base leading-relaxed">{gap.advice}</p>
                        </div>
                        
                        <button 
                            onClick={() => handleResourceClick(gap.topic)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 shrink-0"
                        >
                            <Youtube size={20} /> Fix This Gap
                        </button>
                     </div>
                  </div>
                ))}
             </div>
         )}
       </div>
    </div>
  );
};

export default SkillGapResults;