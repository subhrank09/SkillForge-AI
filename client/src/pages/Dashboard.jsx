// // // import React, { useEffect, useState } from 'react';
// // // import { useUser } from "@clerk/clerk-react";
// // // import { useNavigate } from 'react-router-dom';
// // // import { getUserHistory, removeCourse } from '../api/axios';
// // // import { BookOpen, Clock, Trash2, AlertCircle } from 'lucide-react';

// // // const Dashboard = () => {
// // //   const { user } = useUser();
// // //   const navigate = useNavigate();
// // //   const [history, setHistory] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     if (user) {
// // //       getUserHistory(user.id)
// // //         .then(data => setHistory(data))
// // //         .catch(err => console.error(err))
// // //         .finally(() => setLoading(false));
// // //     }
// // //   }, [user]);

// // //   const handleDelete = async (e, courseId) => {
// // //     e.stopPropagation();
// // //     const confirm = window.confirm("Are you sure you want to remove this course? All progress will be lost.");
// // //     if (!confirm) return;

// // //     try {
// // //       await removeCourse(user.id, courseId);
// // //       setHistory(prev => prev.filter(course => course.courseId !== courseId));
// // //     } catch (error) {
// // //       console.error("Failed to delete:", error);
// // //       alert("Could not delete course. Try again.");
// // //     }
// // //   };

// // //   return (
// // //     // FIX: Transparent background for Global Theme
// // //     <div className="min-h-screen text-white p-8 relative overflow-hidden flex flex-col items-center">
      
// // //       {/* Header */}
// // //       <div className="w-full max-w-6xl mb-12 border-b border-white/10 pb-6 flex justify-between items-center bg-black/20 backdrop-blur-md p-6 rounded-2xl">
// // //         <div>
// // //            <h1 className="text-3xl font-bold mb-2">My Learning Dashboard</h1>
// // //            <p className="text-gray-400">Welcome back, {user?.firstName}. Manage your active courses.</p>
// // //         </div>
// // //         <button 
// // //            onClick={() => navigate('/')}
// // //            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg"
// // //         >
// // //            + New Course
// // //         </button>
// // //       </div>

// // //       {/* Grid */}
// // //       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {loading ? (
// // //            <div className="text-gray-500 animate-pulse">Loading your journey...</div>
// // //         ) : history.length === 0 ? (
// // //            <div className="col-span-3 text-center py-20 bg-gray-900/40 rounded-2xl border border-dashed border-gray-700 backdrop-blur-sm">
// // //              <BookOpen className="mx-auto h-12 w-12 text-gray-600 mb-4" />
// // //              <h3 className="text-xl font-medium text-gray-300">No courses yet</h3>
// // //              <p className="text-gray-500 mt-2">Generate your first AI roadmap to get started.</p>
// // //            </div>
// // //         ) : (
// // //           history.map((item, index) => (
// // //             <div 
// // //               key={item.courseId || index} 
// // //               onClick={() => navigate(`/course/${item.courseId}`)}
// // //               // FIX: Glassmorphism Card Style
// // //               className="group bg-gray-900/40 border border-white/10 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-900/60 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all backdrop-blur-sm relative"
// // //             >
// // //               <div className="flex justify-between items-start mb-4">
// // //                 <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
// // //                   <BookOpen size={24} />
// // //                 </div>
                
// // //                 <button 
// // //                   onClick={(e) => handleDelete(e, item.courseId)}
// // //                   className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all z-10"
// // //                   title="Remove Course"
// // //                 >
// // //                   <Trash2 size={18} />
// // //                 </button>
// // //               </div>
              
// // //               <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors truncate pr-2">
// // //                 {item.title}
// // //               </h3>
              
// // //               <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
// // //                 <Clock size={14} />
// // //                 <span>Last accessed: {new Date(item.lastAccessed).toLocaleDateString()}</span>
// // //               </div>

// // //               <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
// // //                 <div 
// // //                   className="bg-blue-500 h-full transition-all duration-1000" 
// // //                   style={{ width: `${item.progress}%` }} 
// // //                 />
// // //               </div>
// // //               <p className="text-right text-xs text-gray-400 mt-2 font-mono">{item.progress}% Complete</p>
// // //             </div>
// // //           ))
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;

// // import React, { useEffect, useState } from 'react';
// // import { useUser } from "@clerk/clerk-react";
// // import { useNavigate } from 'react-router-dom';
// // import { getUserHistory, removeCourse } from '../api/axios';
// // import { BookOpen, Clock, Trash2, Map, Github, BrainCircuit } from 'lucide-react'; // Added new icons

// // const Dashboard = () => {
// //   const { user } = useUser();
// //   const navigate = useNavigate();
// //   const [history, setHistory] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (user) {
// //       getUserHistory(user.id)
// //         .then(data => setHistory(data))
// //         .catch(err => console.error(err))
// //         .finally(() => setLoading(false));
// //     }
// //   }, [user]);

// //   const handleDelete = async (e, courseId) => {
// //     e.stopPropagation();
// //     const confirm = window.confirm("Are you sure you want to remove this course? All progress will be lost.");
// //     if (!confirm) return;

// //     try {
// //       await removeCourse(user.id, courseId);
// //       setHistory(prev => prev.filter(course => course.courseId !== courseId));
// //     } catch (error) {
// //       console.error("Failed to delete:", error);
// //       alert("Could not delete course. Try again.");
// //     }
// //   };

// //   return (
// //     // Global Theme Background wrapper
// //     <div className="min-h-screen text-white p-8 relative overflow-hidden flex flex-col items-center">
      
// //       {/* Header */}
// //       <div className="w-full max-w-6xl mb-8 border-b border-white/10 pb-6 flex justify-between items-center bg-black/20 backdrop-blur-md p-6 rounded-2xl">
// //         <div>
// //            <h1 className="text-3xl font-bold mb-2">My Learning Dashboard</h1>
// //            <p className="text-gray-400">Welcome back, {user?.firstName}. Track your progress and access AI tools.</p>
// //         </div>
// //         <button 
// //            onClick={() => navigate('/')}
// //            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg"
// //         >
// //            + New Course
// //         </button>
// //       </div>

// //       {/* --- NEW SECTION: Quick Tools --- */}
// //       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// //           {/* Card 1: Roadmap */}
// //           <div onClick={() => navigate('/roadmap')} className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 p-6 rounded-xl cursor-pointer hover:border-purple-500 transition-all backdrop-blur-md group">
// //               <div className="flex items-center gap-4 mb-2">
// //                   <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition">
// //                       <Map size={24} />
// //                   </div>
// //                   <h3 className="font-bold text-lg">AI Career Roadmap</h3>
// //               </div>
// //               <p className="text-sm text-gray-400">Generate a personalized week-by-week study plan.</p>
// //           </div>

// //           {/* Card 2: GitHub Analyzer */}
// //           <div onClick={() => navigate('/github-check')} className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-white/10 p-6 rounded-xl cursor-pointer hover:border-white transition-all backdrop-blur-md group">
// //               <div className="flex items-center gap-4 mb-2">
// //                   <div className="p-3 bg-gray-700/50 rounded-lg text-gray-300 group-hover:text-white group-hover:bg-gray-600 transition">
// //                       <Github size={24} />
// //                   </div>
// //                   <h3 className="font-bold text-lg">GitHub Analyzer</h3>
// //               </div>
// //               <p className="text-sm text-gray-400">Get AI feedback on your code quality and resume projects.</p>
// //           </div>

// //           {/* Card 3: Skill Gap (Placeholder link for now or direct access) */}
// //           <div onClick={() => navigate('/skill-gap')} className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border border-white/10 p-6 rounded-xl cursor-pointer hover:border-red-500 transition-all backdrop-blur-md group">
// //               <div className="flex items-center gap-4 mb-2">
// //                   <div className="p-3 bg-red-500/20 rounded-lg text-red-400 group-hover:text-white group-hover:bg-red-500 transition">
// //                       <BrainCircuit size={24} />
// //                   </div>
// //                   <h3 className="font-bold text-lg">Skill Gap Analysis</h3>
// //               </div>
// //               <p className="text-sm text-gray-400">Identify weak spots in your knowledge and fix them.</p>
// //           </div>
// //       </div>

// //       {/* Existing Courses Grid */}
// //       <h2 className="w-full max-w-6xl text-xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Your Active Courses</h2>
      
// //       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {loading ? (
// //            <div className="col-span-3 text-center text-gray-500 animate-pulse py-10">Loading your journey...</div>
// //         ) : history.length === 0 ? (
// //            <div className="col-span-3 text-center py-20 bg-gray-900/40 rounded-2xl border border-dashed border-gray-700 backdrop-blur-sm">
// //              <BookOpen className="mx-auto h-12 w-12 text-gray-600 mb-4" />
// //              <h3 className="text-xl font-medium text-gray-300">No courses yet</h3>
// //              <p className="text-gray-500 mt-2">Generate your first AI roadmap to get started.</p>
// //            </div>
// //         ) : (
// //           history.map((item, index) => (
// //             <div 
// //               key={item.courseId || index} 
// //               onClick={() => navigate(`/course/${item.courseId}`)}
// //               className="group bg-gray-900/40 border border-white/10 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-900/60 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all backdrop-blur-sm relative"
// //             >
// //               <div className="flex justify-between items-start mb-4">
// //                 <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
// //                   <BookOpen size={24} />
// //                 </div>
                
// //                 <button 
// //                   onClick={(e) => handleDelete(e, item.courseId)}
// //                   className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all z-10"
// //                   title="Remove Course"
// //                 >
// //                   <Trash2 size={18} />
// //                 </button>
// //               </div>
              
// //               <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors truncate pr-2">
// //                 {item.title}
// //               </h3>
              
// //               <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
// //                 <Clock size={14} />
// //                 <span>Last accessed: {new Date(item.lastAccessed).toLocaleDateString()}</span>
// //               </div>

// //               <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
// //                 <div 
// //                   className="bg-blue-500 h-full transition-all duration-1000" 
// //                   style={{ width: `${item.progress}%` }} 
// //                 />
// //               </div>
// //               <p className="text-right text-xs text-gray-400 mt-2 font-mono">{item.progress}% Complete</p>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { useUser } from "@clerk/clerk-react";
// import { useNavigate } from 'react-router-dom';
// import { getUserHistory, removeCourse } from '../api/axios';
// import { BookOpen, Clock, Trash2, Map, Github, BrainCircuit, Box, Grid, Hammer, Swords,BarChart2 } from 'lucide-react'; // Added Box/Grid icons
// import SkillGalaxy from '../components/SkillGalaxy'; // Import the new component

// const Dashboard = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // New State for View Mode
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'galaxy'

//   useEffect(() => {
//     if (user) {
//       getUserHistory(user.id)
//         .then(data => setHistory(data))
//         .catch(err => console.error(err))
//         .finally(() => setLoading(false));
//     }
//   }, [user]);

//   const handleDelete = async (e, courseId) => {
//     e.stopPropagation();
//     const confirm = window.confirm("Are you sure you want to remove this course? All progress will be lost.");
//     if (!confirm) return;

//     try {
//       await removeCourse(user.id, courseId);
//       setHistory(prev => prev.filter(course => course.courseId !== courseId));
//     } catch (error) {
//       console.error("Failed to delete:", error);
//       alert("Could not delete course. Try again.");
//     }
//   };

//   return (
//     // Global Theme Background wrapper
//     <div className="min-h-screen text-white p-8 relative overflow-hidden flex flex-col items-center">
      
//       {/* Header */}
//       <div className="w-full max-w-6xl mb-8 border-b border-white/10 pb-6 flex justify-between items-center bg-black/20 backdrop-blur-md p-6 rounded-2xl">
//       <div className="flex items-center gap-4">
//            <div>
//                <h1 className="text-3xl font-bold mb-2">My Learning Dashboard</h1>
//                {/* Display Streak Here */}
//                <div className="flex items-center gap-2 text-orange-400 font-mono text-sm">
//                    <span>🔥 {user?.publicMetadata?.streak || 0} Day Streak</span>
//                </div>
//            </div>
//         </div>
//         <div>
//            <p className="text-gray-400">Welcome back, {user?.firstName}. Track your progress and access AI tools.</p>
//         </div>
//         <button 
//            onClick={() => navigate('/')}
//            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg"
//         >
//            + New Course
//         </button>
//       </div>

//       {/* --- QUICK TOOLS SECTION --- */}
//       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           {/* Card 1: Roadmap */}
//           <div onClick={() => navigate('/roadmap')} className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 p-6 rounded-xl cursor-pointer hover:border-purple-500 transition-all backdrop-blur-md group">
//               <div className="flex items-center gap-4 mb-2">
//                   <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition">
//                       <Map size={24} />
//                   </div>
//                   <h3 className="font-bold text-lg">AI Career Roadmap</h3>
//               </div>
//               <p className="text-sm text-gray-400">Generate a personalized week-by-week study plan.</p>
//           </div>

//           {/* Card 2: GitHub Analyzer */}
//           <div onClick={() => navigate('/github-check')} className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-white/10 p-6 rounded-xl cursor-pointer hover:border-white transition-all backdrop-blur-md group">
//               <div className="flex items-center gap-4 mb-2">
//                   <div className="p-3 bg-gray-700/50 rounded-lg text-gray-300 group-hover:text-white group-hover:bg-gray-600 transition">
//                       <Github size={24} />
//                   </div>
//                   <h3 className="font-bold text-lg">GitHub Analyzer</h3>
//               </div>
//               <p className="text-sm text-gray-400">Get AI feedback on your code quality and resume projects.</p>
//           </div>

//           {/* Card 3: Skill Gap */}
//           <div onClick={() => navigate('/skill-gap')} className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border border-white/10 p-6 rounded-xl cursor-pointer hover:border-red-500 transition-all backdrop-blur-md group">
//               <div className="flex items-center gap-4 mb-2">
//                   <div className="p-3 bg-red-500/20 rounded-lg text-red-400 group-hover:text-white group-hover:bg-red-500 transition">
//                       <BrainCircuit size={24} />
//                   </div>
//                   <h3 className="font-bold text-lg">Skill Gap Analysis</h3>
//               </div>
//               <p className="text-sm text-gray-400">Identify weak spots in your knowledge and fix them.</p>
//           </div>
//           {/* Card: The Forge */}
// <div onClick={() => navigate('/forge')} className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-white/10 p-6 rounded-xl cursor-pointer hover:border-orange-500 transition-all backdrop-blur-md group">
//     <div className="flex items-center gap-4 mb-2">
//         <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400 group-hover:text-white group-hover:bg-orange-500 transition">
//             <Hammer size={24} /> {/* Import Hammer from lucide-react */}
//         </div>
//         <h3 className="font-bold text-lg">The Forge</h3>
//     </div>
//     <p className="text-sm text-gray-400">Generate unique project ideas & starter code instantly.</p>
// </div>
//       {/* Card: Code Duel */}
// <div onClick={() => navigate('/duel')} className="bg-gradient-to-br from-red-900/40 to-pink-900/40 border border-white/10 p-6 rounded-xl cursor-pointer hover:border-red-500 transition-all backdrop-blur-md group">
//     <div className="flex items-center gap-4 mb-2">
//         <div className="p-3 bg-red-500/20 rounded-lg text-red-400 group-hover:text-white group-hover:bg-red-500 transition">
//             <Swords size={24} /> 
//         </div>
//         <h3 className="font-bold text-lg">Code Duel</h3>
//     </div>
//     <p className="text-sm text-gray-400">1v1 Real-time coding battles. Fix bugs faster than your opponent.</p>
// </div>
// {/* Card: Neural Nexus */}
// <div onClick={() => navigate('/nexus')} className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-white/10 p-6 rounded-xl cursor-pointer hover:border-cyan-500 transition-all backdrop-blur-md group">
//     <div className="flex items-center gap-4 mb-2">
//         <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition">
//             <BrainCircuit size={24} /> 
//         </div>
//         <h3 className="font-bold text-lg">Neural Nexus</h3>
//     </div>
//     <p className="text-sm text-gray-400">Explore your 3D knowledge graph and skill connections.</p>
// </div>
// {/* Card: Algo-Vision */}
// <div onClick={() => navigate('/algo-vision')} className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-white/10 p-6 rounded-xl cursor-pointer hover:border-green-500 transition-all backdrop-blur-md group">
//     <div className="flex items-center gap-4 mb-2">
//         <div className="p-3 bg-green-500/20 rounded-lg text-green-400 group-hover:text-white group-hover:bg-green-500 transition">
//             <BarChart2 size={24} /> 
//         </div>
//         <h3 className="font-bold text-lg">Algo-Vision</h3>
//     </div>
//     <p className="text-sm text-gray-400">Interactive Sorting Algorithm Visualizer.</p>
// </div>
//       </div>

//       {/* --- COURSES SECTION HEADER --- */}
//       <div className="w-full max-w-6xl flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold border-l-4 border-blue-500 pl-4">Your Active Courses</h2>
        
//         {/* 3D TOGGLE SWITCH */}
//         {history.length > 0 && (
//             <div className="flex bg-gray-900 rounded-lg p-1 border border-white/10">
//                 <button 
//                     onClick={() => setViewMode('grid')}
//                     className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
//                 >
//                     <Grid size={16} /> Grid
//                 </button>
//                 <button 
//                     onClick={() => setViewMode('galaxy')}
//                     className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${viewMode === 'galaxy' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
//                 >
//                     <Box size={16} /> Galaxy 3D
//                 </button>
//             </div>
//         )}
//       </div>
      
//       {/* --- CONTENT AREA (Grid vs Galaxy) --- */}
//       {viewMode === 'galaxy' && history.length > 0 ? (
//           <div className="w-full max-w-6xl mb-12 animate-in fade-in zoom-in duration-500">
//               <SkillGalaxy courses={history} />
//           </div>
//       ) : (
//           <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {loading ? (
//                <div className="col-span-3 text-center text-gray-500 animate-pulse py-10">Loading your journey...</div>
//             ) : history.length === 0 ? (
//                <div className="col-span-3 text-center py-20 bg-gray-900/40 rounded-2xl border border-dashed border-gray-700 backdrop-blur-sm">
//                  <BookOpen className="mx-auto h-12 w-12 text-gray-600 mb-4" />
//                  <h3 className="text-xl font-medium text-gray-300">No courses yet</h3>
//                  <p className="text-gray-500 mt-2">Generate your first AI roadmap to get started.</p>
//                </div>
//             ) : (
//               history.map((item, index) => (
//                 <div 
//                   key={item.courseId || index} 
//                   onClick={() => navigate(`/course/${item.courseId}`)}
//                   className="group bg-gray-900/40 border border-white/10 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-900/60 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all backdrop-blur-sm relative"
//                 >
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
//                       <BookOpen size={24} />
//                     </div>
                    
//                     <button 
//                       onClick={(e) => handleDelete(e, item.courseId)}
//                       className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all z-10"
//                       title="Remove Course"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
                  
//                   <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors truncate pr-2">
//                     {item.title}
//                   </h3>
                  
//                   <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
//                     <Clock size={14} />
//                     <span>Last accessed: {new Date(item.lastAccessed).toLocaleDateString()}</span>
//                   </div>

//                   <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
//                     <div 
//                       className="bg-blue-500 h-full transition-all duration-1000" 
//                       style={{ width: `${item.progress}%` }} 
//                     />
//                   </div>
//                   <p className="text-right text-xs text-gray-400 mt-2 font-mono">{item.progress}% Complete</p>
//                 </div>
//               ))
//             )}
//           </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { getUserHistory, removeCourse, syncUserStreak } from '../api/axios';
import { 
  BookOpen, Trash2, Map, Github, BrainCircuit, Box, Grid, Hammer, 
  FileText, PenTool, Globe, Building2, Newspaper, Rocket, Users, Zap, PieChart, Briefcase   
} from 'lucide-react'; 
import SkillGalaxy from '../components/SkillGalaxy'; 

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); 
  const [streak, setStreak] = useState(0);
  
  useEffect(() => {
    if (user) {
      // 1. Sync Streak (Backend calculates it)
      syncUserStreak(user.id)
        .then(data => setStreak(data.streak))
        .catch(err => console.error("Streak sync failed:", err));

      getUserHistory(user.id)
        .then(data => setHistory(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = async (e, itemId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this item?")) return;
    
    try {
      // 1. Call Backend to delete
      await removeCourse(user.id, itemId);

      // 2. Optimistically remove from UI immediately
      setHistory(prev => prev.filter(item => {
        // Check against both possible ID fields to be safe
        const currentId = item.courseId || item._id;
        return currentId !== itemId;
      }));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Could not delete item. Please try again.");
    }
  };

  return (
    <div className="min-h-screen text-white p-8 relative overflow-hidden flex flex-col items-center">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-6xl mb-8 border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-center bg-black/20 backdrop-blur-md p-6 rounded-2xl gap-4">
        
        {/* User Profile & Streak (No Upload Logic) */}
        <div className="flex items-center gap-4">
           <img 
             src={user?.imageUrl} 
             alt="Profile" 
             className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover"
           />
           <div>
               <h1 className="text-2xl md:text-3xl font-bold">My Dashboard</h1>
               <div className="flex gap-3 text-sm mt-1">
                  <span className="text-orange-400 font-mono">🔥 {streak} Day Streak</span>
                   <span className="text-gray-400">|</span>
                   <button 
                     onClick={() => window.open(`/u/${user.id}`, '_blank')}
                     className="flex items-center gap-1 text-blue-400 hover:text-white transition-colors"
                   >
                     <Globe size={14} /> Public Profile
                   </button>
               </div>
           </div>
        </div>

        {/* Action Button */}
        <button 
           onClick={() => navigate('/home')}
           className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg w-full md:w-auto"
        >
           + New Course
        </button>
      </div>

      {/* --- QUICK TOOLS GRID (Fully Restored) --- */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          
          {/* 1. Roadmap */}
          <div onClick={() => navigate('/roadmap')} className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-purple-500 transition-all backdrop-blur-md group">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition"><Map size={20} /></div>
                  <h3 className="font-bold">Career Roadmap</h3>
              </div>
              <p className="text-xs text-gray-400">Personalized study plan.</p>
          </div>

          {/* 2. The Forge */}
          <div onClick={() => navigate('/forge')} className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-orange-500 transition-all backdrop-blur-md group">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400 group-hover:text-white group-hover:bg-orange-500 transition"><Hammer size={20} /></div>
                  <h3 className="font-bold">The Forge</h3>
              </div>
              <p className="text-xs text-gray-400">Project Scaffolder.</p>
          </div>

          {/* 3. GitHub Analyzer */}
          <div onClick={() => navigate('/github-check')} className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-white transition-all backdrop-blur-md group">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-700/50 rounded-lg text-gray-300 group-hover:text-white group-hover:bg-gray-600 transition"><Github size={20} /></div>
                  <h3 className="font-bold">Code Analyzer</h3>
              </div>
              <p className="text-xs text-gray-400">Rate your repo quality.</p>
          </div>

          {/* 4. Skill Gap */}
          <div onClick={() => navigate('/skill-gap')} className="bg-gradient-to-br from-red-900/40 to-pink-900/40 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-red-500 transition-all backdrop-blur-md group">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-500/20 rounded-lg text-red-400 group-hover:text-white group-hover:bg-red-500 transition"><BrainCircuit size={20} /></div>
                  <h3 className="font-bold">Skill Gap</h3>
              </div>
              <p className="text-xs text-gray-400">Find & fix weak spots.</p>
          </div>

          {/* 5. Titan Resume */}
          <div onClick={() => navigate('/resume')} className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-blue-500 transition-all backdrop-blur-md group">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition"><FileText size={20} /></div>
                  <h3 className="font-bold">Titan Resume</h3>
              </div>
              <p className="text-xs text-gray-400">AI-generated PDF CV.</p>
          </div>

          {/* 6. Architect Canvas */}
          <div onClick={() => navigate('/architect')} className="bg-gradient-to-br from-teal-900/40 to-green-900/40 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-teal-500 transition-all backdrop-blur-md group">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-teal-500/20 rounded-lg text-teal-400 group-hover:text-white group-hover:bg-teal-500 transition"><PenTool size={20} /></div>
                  <h3 className="font-bold">System Design</h3>
              </div>
              <p className="text-xs text-gray-400">Architect's Canvas.</p>
          </div>

          {/* Company Oracle */}
          <div onClick={() => navigate('/oracle')} className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-blue-500 transition-all backdrop-blur-md group">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition"><Building2 size={20} /></div>
                  <h3 className="font-bold">Company Oracle</h3>
              </div>
              <p className="text-xs text-gray-400">Targeted mock tests.</p>
          </div>

          {/* Daily Byte */}
          <div onClick={() => navigate('/news')} className="bg-gradient-to-br from-green-900/40 to-teal-900/40 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-green-500 transition-all backdrop-blur-md group">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/20 rounded-lg text-green-400 group-hover:text-white group-hover:bg-green-500 transition"><Newspaper size={20} /></div>
                  <h3 className="font-bold">The Daily Byte</h3>
              </div>
              <p className="text-xs text-gray-400">Tech news & trends.</p>
          </div>

          {/* Hackathon Hub */}
          <div onClick={() => navigate('/hackathon')} className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-purple-500 transition-all backdrop-blur-md group">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition">
                      <Rocket size={20} />
                  </div>
                  <h3 className="font-bold">Hackathon Hub</h3>
              </div>
              <p className="text-xs text-gray-400">Generate ideas & pitches.</p>
          </div>

          {/* Mentor Match */}
          <div onClick={() => navigate('/mentor')} className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-yellow-500 transition-all backdrop-blur-md group">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400 group-hover:text-white group-hover:bg-yellow-500 transition"><Users size={20} /></div>
                  <h3 className="font-bold">Mentor Match</h3>
              </div>
              <p className="text-xs text-gray-400">Find help & personas.</p>
          </div>

          {/* Mind Map */}
          <div className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800 flex items-center gap-3 cursor-pointer hover:border-yellow-500 hover:bg-gray-900/60 transition-all backdrop-blur-sm" onClick={() => navigate('/mindmap')}>
               <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><Zap size={20} /></div>
               <div><h3 className="font-bold text-sm">Mind Map</h3><p className="text-xs text-gray-400">Infinite Explore</p></div>
          </div>

          {/* Resume Analysis */}
          <div className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800 flex items-center gap-3 cursor-pointer hover:border-blue-500 hover:bg-gray-900/60 transition-all backdrop-blur-sm" onClick={() => navigate('/career')}>
               <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Briefcase size={20} /></div>
               <div><h3 className="font-bold text-sm">Resume Analysis</h3><p className="text-xs text-gray-400">ATS Check</p></div>
          </div>

          {/* Card: The Arcade */}
          <div onClick={() => navigate('/arcade')} className="col-span-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 p-6 rounded-xl cursor-pointer hover:border-purple-500 transition-all backdrop-blur-md group flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-full text-purple-400"><Zap size={32} /></div>
                  <div>
                      <h3 className="font-black text-2xl text-white">THE ARCADE</h3>
                      <p className="text-sm text-gray-300">16 Advanced Sims: Glitch Hunt, DevOps, Hacking & More.</p>
                  </div>
              </div>
              <div className="bg-purple-600 px-6 py-2 rounded-full font-bold text-white group-hover:scale-105 transition-transform">PLAY NOW</div>
          </div>

      </div>

      {/* --- COURSES / HISTORY SECTION --- */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold border-l-4 border-blue-500 pl-4">Active Courses & Arcade History</h2>
        {history.length > 0 && (
            <div className="flex bg-gray-900 rounded-lg p-1 border border-white/10">
                <button onClick={() => setViewMode('grid')} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}><Grid size={16} /> Grid</button>
                <button onClick={() => setViewMode('galaxy')} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${viewMode === 'galaxy' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}><Box size={16} /> Galaxy 3D</button>
            </div>
        )}
      </div>
      
      {viewMode === 'galaxy' && history.length > 0 ? (
          <div className="w-full max-w-6xl mb-12 animate-in fade-in zoom-in duration-500">
              <SkillGalaxy courses={history} />
          </div>
      ) : (
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {loading ? (
               <div className="col-span-3 text-center text-gray-500 animate-pulse py-10">Loading...</div>
            ) : history.length === 0 ? (
               <div className="col-span-3 text-center py-20 bg-gray-900/40 rounded-2xl border border-dashed border-gray-700">
                 <BookOpen className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                 <h3 className="text-xl font-medium text-gray-300">No activity yet</h3>
               </div>
            ) : (
              history.map((item, index) => {
                // Safely determine ID and Date inside the loop
                const uniqueId = item.courseId || item._id; 
                const rawDate = item.lastAccessed || item.date || new Date(); 
                const dateLabel = new Date(rawDate).toLocaleDateString();

                return (
                  <div 
                    key={uniqueId || index} 
                    onClick={() => { if(item.courseId) navigate(`/course/${item.courseId}`) }}
                    className="group bg-gray-900/40 border border-white/10 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-900/60 transition-all backdrop-blur-sm relative"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          {/* Differentiate Icon based on type if possible, else default Book */}
                          {item.score ? <Zap size={24}/> : <BookOpen size={24} />}
                      </div>
                      
                      {/* DELETE BUTTON */}
                      <button 
                        onClick={(e) => handleDelete(e, uniqueId)} 
                        className="p-2 text-gray-600 hover:text-red-500 z-10 rounded-full hover:bg-white/5 transition-colors"
                        title="Remove from Dashboard"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors truncate">{item.title}</h3>
                    
                    <div className="flex justify-between items-end">
                        <span className="text-gray-500 text-xs">
                          {dateLabel}
                        </span>
                        {item.score && <span className="text-yellow-400 text-xs font-bold">{item.score} XP</span>}
                    </div>

                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mt-3">
                      <div className="bg-blue-500 h-full" style={{ width: `${item.progress || (item.score ? 100 : 0)}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
      )}
    </div>
  );
};

export default Dashboard;