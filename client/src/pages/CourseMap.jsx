// // import React, { useEffect, useState, useCallback, useRef } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import ReactFlow, { 
// //   Controls, 
// //   Background, 
// //   useNodesState, 
// //   useEdgesState, 
// //   MarkerType 
// // } from 'reactflow';
// // import 'reactflow/dist/style.css';
// // import { getCourse, getLesson, getQuiz, updateXP, updateCourseProgress, getUserCourseProgress, generateFlashcards, getFlowchart, reviewCode } from '../api/axios';
// // import { useUser } from "@clerk/clerk-react";
// // import { downloadCertificate } from '../utils/generateCertificate'; 
// // import { 
// //   Loader2, ArrowLeft, Cpu, ShieldCheck, X, Trophy, Volume2, Share2, Download, Globe, Square, FileImage, Code, User, Lock, Linkedin, Maximize, Play, Pause, Music, VolumeX, Image as ImageIcon, Plus, Minus 
// // } from 'lucide-react'; 
// // import QuizView from '../components/QuizView';
// // import MermaidDiagram from '../components/MermaidDiagram';
// // import { Sandpack } from "@codesandbox/sandpack-react"; 

// // // --- MUSIC PLAYLIST ---
// // const PLAYLIST = [
// //   { 
// //     name: "Lofi Beats", 
// //     url: "/music/lofi.mp3" 
// //   },
// //   { 
// //     name: "Ambient Rain", 
// //     url: "/music/ambient.mp3" 
// //   },
// //   { 
// //     name: "Deep Focus", 
// //     url: "/music/calm.mp3" 
// //   }
// // ];

// // // --- SUPPORTED LANGUAGES CONFIG ---
// // const CODE_TEMPLATES = {
// //   react: {
// //     name: "React",
// //     template: "react",
// //     files: {
// //       "/App.js": `export default function App() {\n  return (\n    <div style={{ padding: 20 }}>\n      <h1>🚀 Happy Coding!</h1>\n      <p>Edit this to practice React.</p>\n    </div>\n  );\n}`
// //     }
// //   },
// //   vanilla: {
// //     name: "JavaScript",
// //     template: "vanilla",
// //     files: {
// //       "/index.js": `import "./styles.css";\n\ndocument.getElementById("app").innerHTML = \`\n<h1>⚡ Hello Vanilla JS!</h1>\n<div>\n  <p>Start writing logic here.</p>\n</div>\n\`;`,
// //       "/styles.css": `body {\n  font-family: sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}`
// //     }
// //   },
// //   vue: {
// //     name: "Vue",
// //     template: "vue",
// //     files: {
// //       "/src/App.vue": `<template>\n  <div id="app">\n    <h1>🐉 Hello Vue!</h1>\n    <h3>Start editing to see magic happen.</h3>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'App',\n};\n</script>\n\n<style>\n#app {\n  font-family: "Avenir", Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #2c3e50;\n  margin-top: 60px;\n}\n</style>`
// //     }
// //   },
// //   static: {
// //     name: "HTML/CSS",
// //     template: "static",
// //     files: {
// //       "/index.html": `<!DOCTYPE html>\n<html>\n<body>\n  <h1>🎨 Hello HTML/CSS</h1>\n  <p>Style me in styles.css!</p>\n</body>\n</html>`
// //     }
// //   },
// //   // --- NON-BROWSER LANGUAGES (Editor Only) ---
// //   python: {
// //     name: "Python",
// //     template: "vanilla", 
// //     files: {
// //       "/main.py": `# Python Code Editor\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Student"))`
// //     }
// //   },
// //   java: {
// //     name: "Java",
// //     template: "vanilla",
// //     files: {
// //       "/Main.java": `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`
// //     }
// //   },
// //   csharp: {
// //     name: "C#",
// //     template: "vanilla",
// //     files: {
// //       "/Program.cs": `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}`
// //     }
// //   },
// //   cpp: {
// //     name: "C++",
// //     template: "vanilla",
// //     files: {
// //       "/main.cpp": `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`
// //     }
// //   },
// //   ruby: {
// //     name: "Ruby",
// //     template: "vanilla",
// //     files: {
// //       "/main.rb": `def greet(name)\n  puts "Hello, #{name}!"\nend\n\ngreet("Student")`
// //     }
// //   },
// //   go: {
// //     name: "Go",
// //     template: "vanilla",
// //     files: {
// //       "/main.go": `package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}`
// //     }
// //   },
// //   php: {
// //     name: "PHP",
// //     template: "vanilla",
// //     files: {
// //       "/index.php": `<?php\n  echo "Hello, World!";\n?>`
// //     }
// //   },
// //   swift: {
// //     name: "Swift",
// //     template: "vanilla",
// //     files: {
// //       "/main.swift": `import Foundation\n\nprint("Hello, World!")`
// //     }
// //   },
// //   typescript: {
// //     name: "TypeScript",
// //     template: "vanilla-ts",
// //     files: {
// //       "/index.ts": `const message: string = "Hello TypeScript!";\n\ndocument.getElementById("app").innerHTML = \`<h1>\${message}</h1>\`;`
// //     }
// //   }
// // };

// // const FOCUS_THEMES = [
// //     { name: "Cosmic", class: "from-indigo-900/30 via-black to-black" },
// //     { name: "Nature", class: "from-emerald-900/30 via-black to-black" },
// //     { name: "Sunset", class: "from-orange-900/30 via-black to-black" },
// //     { name: "Ocean",  class: "from-cyan-900/30 via-black to-black" }
// // ];

// // const CourseMap = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { user } = useUser();
  
// //   const [nodes, setNodes, onNodesChange] = useNodesState([]);
// //   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [courseTitle, setCourseTitle] = useState('');
// //   const [currentLanguage, setCurrentLanguage] = useState('English');

// //   // Sidebar & Feature States
// //   const [selectedNode, setSelectedNode] = useState(null);
// //   const [viewMode, setViewMode] = useState('description'); 
// //   const [lessonContent, setLessonContent] = useState(null);
// //   const [lessonLoading, setLessonLoading] = useState(false);
// //   const [quizData, setQuizData] = useState(null);
// //   const [completedNodeIds, setCompletedNodeIds] = useState([]); 
  
// //   const [isSpeaking, setIsSpeaking] = useState(false);
// //   const [diagramCode, setDiagramCode] = useState(null);
// //   const [diagramLoading, setDiagramLoading] = useState(false);
// //   const [showCode, setShowCode] = useState(false); 
// //   const [codeLang, setCodeLang] = useState('react');

// //   // --- FOCUS MODE STATE ---
// //   const [focusMode, setFocusMode] = useState(false);
// //   const [focusTime, setFocusTime] = useState(25 * 60); 
// //   const [isTimerRunning, setIsTimerRunning] = useState(false);
// //   const [currentTheme, setCurrentTheme] = useState(0);
// //   const [isMuted, setIsMuted] = useState(false);
// //   const [currentTrack, setCurrentTrack] = useState(0);
  
// //   // Audio Ref (Initialized with first track)
// //   const audioRef = useRef(new Audio(PLAYLIST[0].url)); 

// //   // Code Review State
// //   const [reviewResult, setReviewResult] = useState(null);
// //   const [reviewLoading, setReviewLoading] = useState(false);

// //   // --- INITIAL LOAD ---
// //   useEffect(() => {
// //     if (user && id) {
// //       getUserCourseProgress(user.id, id).then(data => {
// //         if (data && data.completedNodes) setCompletedNodeIds(data.completedNodes);
// //       }).catch(err => console.error(err));
// //     }
// //   }, [user, id]);

// //   useEffect(() => {
// //     const fetchCourse = async () => {
// //       try {
// //         const data = await getCourse(id);
// //         setCourseTitle(data.topic);
// //         if (data.language) setCurrentLanguage(data.language);

// //         const formattedNodes = data.nodes.map((node) => {
// //           const isCompleted = completedNodeIds.includes(node.id);
// //           return {
// //             id: node.id,
// //             type: 'default',
// //             position: node.position,
// //             data: { label: node.data.label, description: node.data.description },
// //             style: {
// //               background: isCompleted ? '#064e3b' : '#0f172a',
// //               color: '#fff',
// //               border: isCompleted ? '1px solid #10b981' : '1px solid #3b82f6',
// //               boxShadow: isCompleted ? '0 0 15px rgba(16, 185, 129, 0.5)' : '0 0 15px rgba(59, 130, 246, 0.5)',
// //               borderRadius: '12px',
// //               padding: '10px',
// //               minWidth: '150px',
// //               textAlign: 'center',
// //               fontSize: '12px',
// //               fontFamily: 'monospace'
// //             }
// //           };
// //         });

// //         const formattedEdges = data.edges.map(edge => ({
// //           id: edge.id,
// //           source: edge.source,
// //           target: edge.target,
// //           animated: true,
// //           style: { stroke: '#60a5fa', strokeWidth: 2 },
// //           markerEnd: { type: MarkerType.ArrowClosed, color: '#60a5fa' },
// //         }));

// //         setNodes(formattedNodes);
// //         setEdges(formattedEdges);
// //       } catch (error) { console.error("Failed to load map:", error); } 
// //       finally { setLoading(false); }
// //     };
// //     fetchCourse();
// //   }, [id, setNodes, setEdges, completedNodeIds]);

// //   // --- PROGRESS CALCULATION ---
// //   const totalNodes = nodes.length;
// //   const completedCount = completedNodeIds.length;
// //   const progressPercent = totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100) : 0;
// //   const isCourseComplete = progressPercent === 100;

// //   // --- FOCUS MODE LOGIC ---
// //   useEffect(() => {
// //     let interval;
// //     if (isTimerRunning && focusTime > 0) {
// //       interval = setInterval(() => setFocusTime((prev) => prev - 1), 1000);
// //     } else if (focusTime === 0 && isTimerRunning) {
// //       setIsTimerRunning(false);
// //       audioRef.current.pause();
// //       alert("Focus Session Complete! Take a break.");
// //     }
// //     return () => clearInterval(interval);
// //   }, [isTimerRunning, focusTime]);

// //   useEffect(() => {
// //     if(audioRef.current) {
// //         audioRef.current.src = PLAYLIST[currentTrack].url;
// //         audioRef.current.muted = isMuted;
// //         if (isTimerRunning && !isMuted) audioRef.current.play().catch(e => console.log("Auto-play prevented"));
// //     }
// //   }, [currentTrack, isMuted]);

// //   const toggleFocusMode = () => {
// //     if (!focusMode) {
// //       setFocusMode(true);
// //       audioRef.current.loop = true;
// //       audioRef.current.volume = 0.5;
// //       audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed)"));
// //       setIsTimerRunning(true);
// //     } else {
// //       setFocusMode(false);
// //       audioRef.current.pause();
// //       setIsTimerRunning(false);
// //     }
// //   };

// //   const adjustTime = (minutes) => {
// //     setFocusTime((prev) => Math.max(0, prev + minutes * 60));
// //   };

// //   const cycleTheme = () => {
// //     setCurrentTheme((prev) => (prev + 1) % FOCUS_THEMES.length);
// //   };

// //   const nextTrack = () => {
// //     setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
// //   };

// //   const formatTime = (seconds) => {
// //     const mins = Math.floor(seconds / 60);
// //     const secs = seconds % 60;
// //     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
// //   };

// //   // --- CODE REVIEW HANDLER ---
// //   const handleCodeReview = async () => {
// //     setReviewLoading(true);
// //     try {
// //       // Get template code (In a real app, you'd capture user input)
// //       const files = CODE_TEMPLATES[codeLang].files;
// //       const mainFileKey = Object.keys(files)[0];
// //       const codeToReview = files[mainFileKey];
      
// //       const data = await reviewCode(codeToReview, codeLang);
// //       setReviewResult(data);
// //     } catch (error) { console.error(error); } 
// //     finally { setReviewLoading(false); }
// //   };

// //   const onNodeClick = useCallback((event, node) => {
// //     setSelectedNode(node);
// //     setViewMode('description');
// //     setLessonContent(null);
// //     setQuizData(null);
// //     setDiagramCode(null);
// //     setShowCode(false);
// //     setReviewResult(null); 
// //     window.speechSynthesis.cancel();
// //     setIsSpeaking(false);
// //   }, []);

// //   const handleStartLesson = async () => {
// //     if (!selectedNode) return;
// //     setLessonLoading(true);
// //     try {
// //       const data = await getLesson(courseTitle, selectedNode.data.label, currentLanguage);
// //       setLessonContent(typeof data.content === 'string' ? data.content : JSON.stringify(data));
// //       setViewMode('lesson');
// //     } catch (error) { console.error(error); } 
// //     finally { setLessonLoading(false); }
// //   };

// //   const handleStartQuiz = async () => {
// //     setLessonLoading(true);
// //     window.speechSynthesis.cancel();
// //     setIsSpeaking(false);
// //     try {
// //       const data = await getQuiz(courseTitle, selectedNode.data.label, currentLanguage);
// //       setQuizData(data);
// //       setViewMode('quiz');
// //     } catch (error) { console.error(error); } 
// //     finally { setLessonLoading(false); }
// //   };

// //   const handleQuizComplete = async (score) => {
// //     if (!user) return;
// //     let xpAwarded = 0;
// //     if (score === 1) xpAwarded = 10;
// //     else if (score === 2) xpAwarded = 25;
// //     else if (score === 3) xpAwarded = 50;

// //     try {
// //       if (xpAwarded > 0) await updateXP(user.id, xpAwarded);
      
// //       if (score === 3) {
// //           generateFlashcards(courseTitle, selectedNode.data.label, user.id, id, currentLanguage);
// //           let newCompletedIds = [...completedNodeIds];
// //           if (!newCompletedIds.includes(selectedNode.id)) newCompletedIds.push(selectedNode.id);
// //           setCompletedNodeIds(newCompletedIds); 
// //           const progress = Math.round((newCompletedIds.length / nodes.length) * 100);
// //           await updateCourseProgress(user.id, id, progress, newCompletedIds);
// //           alert(`PERFECT SCORE! 🏆\n\n🎉 +${xpAwarded} XP Earned!\n✅ Node Completed (Green)\n📚 Flashcards Generated`);
// //       } else {
// //           alert(`Quiz Results: ${score}/3 Correct\n\n⚠️ You need 3/3 correct to complete this node.\n+${xpAwarded} XP added for your effort.`);
// //       }
// //       setSelectedNode(null); 
// //       setViewMode('description');
// //     } catch (error) { console.error(error); }
// //   };

// //   const speakLesson = () => {
// //     if (!lessonContent) return;
// //     window.speechSynthesis.cancel();
// //     const utterance = new SpeechSynthesisUtterance(lessonContent);
// //     utterance.onend = () => setIsSpeaking(false);
// //     utterance.onerror = () => setIsSpeaking(false);
// //     const voices = window.speechSynthesis.getVoices();
// //     const langMap = { 'English': 'en', 'Hindi': 'hi', 'Spanish': 'es', 'French': 'fr', 'German': 'de' };
// //     const langCode = langMap[currentLanguage] || 'en';
// //     const voice = voices.find(v => v.lang.startsWith(langCode));
// //     if (voice) utterance.voice = voice;
// //     setIsSpeaking(true);
// //     window.speechSynthesis.speak(utterance);
// //   };

// //   const stopSpeaking = () => {
// //     window.speechSynthesis.cancel();
// //     setIsSpeaking(false);
// //   };

// //   const handleVisualize = async () => {
// //     setDiagramLoading(true);
// //     try {
// //       const data = await getFlowchart(courseTitle, selectedNode.data.label, currentLanguage);
// //       setDiagramCode(data.code);
// //     } catch (error) { console.error(error); } 
// //     finally { setDiagramLoading(false); }
// //   };

// //   const shareAchievement = () => {
// //     const title = `I just mastered ${courseTitle} on SkillForge AI!`;
// //     const summary = 'Check out my AI-generated learning path. #SkillForge #AI #Learning';
// //     const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(title + "\n" + summary)}`;
// //     window.open(url, '_blank');
// //   };

// //   if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;

// //   return (
// //     // FIX: Removed 'bg-black' to allow Global Theme
// //     <div className="h-screen w-screen relative overflow-hidden text-white font-sans selection:bg-blue-500/30">
      
// //       {/* FOCUS MODE OVERLAY */}
// //       {focusMode && (
// //         <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500 transition-colors">
// //           <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${FOCUS_THEMES[currentTheme].class} transition-all duration-1000 z-0`} />
// //           <div className="z-10 text-center w-full max-w-lg">
            
// //             {/* Theme Toggle */}
// //             <div className="flex justify-center gap-4 mb-8">
// //                 <button onClick={cycleTheme} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all text-sm">
// //                     <ImageIcon size={16} /> Theme: {FOCUS_THEMES[currentTheme].name}
// //                 </button>
// //             </div>

// //             <h2 className="text-gray-300 text-lg uppercase tracking-widest mb-4 font-light">Deep Work Session</h2>
// //             <div className="text-9xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-8 drop-shadow-2xl">{formatTime(focusTime)}</div>
            
// //             {/* Timer Controls */}
// //             <div className="flex gap-6 justify-center items-center mb-12">
// //               {!isTimerRunning && (
// //                   <button onClick={() => adjustTime(-5)} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"><Minus size={24} /></button>
// //               )}
// //               <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="p-6 rounded-full bg-white text-black hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
// //                 {isTimerRunning ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1" />}
// //               </button>
// //               {!isTimerRunning && (
// //                   <button onClick={() => adjustTime(5)} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"><Plus size={24} /></button>
// //               )}
// //             </div>

// //             {/* Music Controls */}
// //             <div className="flex items-center justify-between bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
// //                 <div className="flex items-center gap-3 text-indigo-300">
// //                     {isMuted ? <VolumeX size={20} /> : <Music size={20} className="animate-pulse" />}
// //                     <span className="text-sm font-medium">{PLAYLIST[currentTrack].name}</span>
// //                 </div>
// //                 <div className="flex gap-3">
// //                     <button onClick={nextTrack} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Next Track"><SkipForward size={20}/></button>
// //                     <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Mute/Unmute">
// //                         {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
// //                     </button>
// //                     <div className="w-[1px] h-6 bg-white/20 self-center"></div>
// //                     <button onClick={toggleFocusMode} className="text-red-400 font-bold text-sm px-2">EXIT</button>
// //                 </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* STANDARD UI */}
// //       <div className={`transition-opacity duration-500 ${focusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
// //         {/* Removed local background div so Global Theme shows through */}
        
// //         {/* HEADER */}
// //         <div className="absolute top-0 left-0 right-0 h-20 z-20 flex items-center px-8 border-b border-white/10 bg-black/40 backdrop-blur-md">
// //           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-white"><ArrowLeft size={18} /> Abort</button>
          
// //           <div className="flex-1 text-center font-bold text-xl flex justify-center items-center gap-2">
// //               <Cpu className="text-blue-500" /> {courseTitle} 
// //           </div>

// //           <button onClick={toggleFocusMode} className="flex items-center gap-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/50 px-3 py-1.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-all mr-4">
// //             <Maximize size={14} /> Focus Mode
// //           </button>

// //           <div className="flex items-center gap-2 bg-gray-800/80 border border-gray-700 px-3 py-1.5 rounded-lg">
// //             <Globe size={14} className="text-gray-400" />
// //             <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)} className="bg-transparent text-xs text-white outline-none cursor-pointer uppercase tracking-wide font-mono">
// //                 <option value="English">ENG</option>
// //                 <option value="Hindi">HIN</option>
// //                 <option value="Spanish">ESP</option>
// //                 <option value="French">FRA</option>
// //                 <option value="Bengali">BEN</option>
// //                 <option value="German">GER</option>
// //                 <option value="Chinese">CHI</option>
// //                 <option value="Japanese">JPN</option>
// //                 <option value="Russian">RUS</option>
// //                 <option value="Arabic">ARA</option>
// //                 <option value="Portuguese">POR</option>
// //             </select>
// //           </div>

// //           <div className="w-[20px]"></div>
// //         </div>

// //         {/* GRAPH */}
// //         <div className="absolute inset-0 z-10 pt-20">
// //           <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onNodeClick={onNodeClick} fitView className="bg-transparent">
// //             <Background color="#3b82f6" variant="dots" gap={25} style={{ opacity: 0.2 }} />
// //             <Controls className="bg-gray-900 border-gray-700 fill-white" />
// //           </ReactFlow>
// //         </div>

// //         {/* SIDEBAR */}
// //         {selectedNode && (
// //           <div className="absolute right-0 top-20 bottom-0 w-[500px] bg-gray-900/95 backdrop-blur-xl border-l border-blue-500/30 p-8 shadow-2xl z-30 overflow-y-auto">
// //             <button onClick={() => setSelectedNode(null)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white"><X size={24} /></button>
// //             <h2 className="text-2xl font-bold text-white mb-6">{selectedNode.data.label}</h2>

// //             {viewMode === 'description' && (
// //               <>
// //                 <p className="text-gray-300 mb-6">{selectedNode.data.description}</p>
// //                 <div className="space-y-4">
// //                   <button onClick={handleStartLesson} disabled={lessonLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex justify-center">
// //                     {lessonLoading ? <Loader2 className="animate-spin" /> : `Start Lesson (${currentLanguage})`}
// //                   </button>
// //                   <button onClick={() => navigate('/interview')} className="w-full border border-green-500/50 hover:bg-green-500/10 text-green-400 font-bold py-3 rounded-xl flex items-center justify-center gap-2">
// //                     <User size={18} /> Practice Mock Interview
// //                   </button>
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-800 mt-6">
// //                   <button onClick={() => isCourseComplete && downloadCertificate(user?.firstName, courseTitle)} disabled={!isCourseComplete} className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all group ${isCourseComplete ? 'border-gray-700 hover:bg-gray-800 hover:border-blue-500 cursor-pointer' : 'border-gray-800 opacity-50 cursor-not-allowed bg-black/20'}`}>
// //                     {isCourseComplete ? <Download size={24} className="mb-2 text-blue-400" /> : <Lock size={24} className="mb-2 text-gray-600" />}
// //                     <span className="text-xs font-mono">{isCourseComplete ? "CERTIFICATE" : `LOCKED (${progressPercent}%)`}</span>
// //                   </button>
// //                   <button onClick={shareAchievement} className="flex flex-col items-center justify-center p-4 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-purple-500 transition-all text-gray-400 hover:text-white group">
// //                     <Linkedin size={24} className="mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
// //                     <span className="text-xs font-mono">SHARE</span>
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {viewMode === 'lesson' && (
// //               <div className="animate-in fade-in">
// //                 <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
// //                   {showCode && (
// //                     <select value={codeLang} onChange={(e) => setCodeLang(e.target.value)} className="bg-gray-800 text-xs text-white border border-gray-700 rounded px-2 py-1 outline-none">
// //                       <option value="react">React</option>
// //                       <option value="vanilla">JavaScript</option>
// //                       <option value="vue">Vue</option>
// //                       <option value="static">HTML/CSS</option>
// //                       <option value="python">Python</option>
// //                       <option value="java">Java</option>
// //                       <option value="csharp">C#</option>
// //                       <option value="cpp">C++</option>
// //                       <option value="ruby">Ruby</option>
// //                       <option value="go">Go</option>
// //                       <option value="php">PHP</option> 
// //                       <option value="typescript">TypeScript</option>
// //                       <option value="swift">Swift</option>
// //                     </select>
// //                   )}
// //                   <div className="flex gap-2 ml-auto">
// //                     <button onClick={() => setShowCode(!showCode)} className={`p-2 rounded-full transition-colors group border ${showCode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'bg-gray-800 text-gray-400 border-gray-700'}`}><Code size={20} /></button>
// //                     <button onClick={handleVisualize} className="p-2 bg-purple-600/20 text-purple-400 rounded-full hover:bg-purple-600 transition-colors group border border-purple-500/50"><FileImage size={20} /></button>
// //                     <button onClick={isSpeaking ? stopSpeaking : speakLesson} className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors text-white group border border-gray-700">
// //                       {isSpeaking ? <Square size={20} fill="currentColor" /> : <Volume2 size={20} />}
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {showCode ? (
// //                   <div className="mt-4 mb-8">
// //                     <div className="border border-gray-700 rounded-xl overflow-hidden shadow-2xl mb-4">
// //                       <Sandpack template={CODE_TEMPLATES[codeLang].template} theme="dark" options={{ showNavigator: false, showTabs: true, editorHeight: 400 }} files={CODE_TEMPLATES[codeLang].files} />
// //                     </div>
// //                     {/* RESTORED: CODE REVIEW BUTTON & RESULTS */}
// //                     <button onClick={handleCodeReview} disabled={reviewLoading} className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2">
// //                       {reviewLoading ? <Loader2 className="animate-spin" /> : <>AI Code Sensei: Review My Code <ShieldCheck size={18}/></>}
// //                     </button>
// //                     {reviewResult && (
// //                       <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-yellow-500/30 text-sm">
// //                         <div className="flex justify-between items-center mb-2">
// //                           <span className="font-bold text-yellow-400">Quality Score</span>
// //                           <span className="text-2xl font-bold">{reviewResult.score}/100</span>
// //                         </div>
// //                         <div className="space-y-2">
// //                           <p className="text-red-300"><strong>🐛 Bugs:</strong> {reviewResult.bugs?.join(', ') || "None found!"}</p>
// //                           <p className="text-green-300"><strong>💡 Improvements:</strong> {reviewResult.improvements?.join(', ')}</p>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <div className="prose prose-invert prose-blue max-w-none whitespace-pre-wrap font-light text-gray-300">{lessonContent}</div>
// //                 )}

// //                 {diagramLoading && <div className="text-center text-purple-400 mt-4 animate-pulse text-sm">Generating Visuals...</div>}
// //                 {diagramCode && <div className="mt-6 animate-in fade-in"><MermaidDiagram chartCode={diagramCode} /></div>}
                
// //                 <div className="flex gap-4 mt-8">
// //                   <button onClick={() => { stopSpeaking(); setViewMode('description'); }} className="flex-1 border border-gray-600 hover:bg-gray-800 text-gray-300 py-3 rounded-lg transition-colors">Back</button>
// //                   <button onClick={handleStartQuiz} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg flex justify-center gap-2"><Trophy size={18} /> Take Quiz</button>
// //                 </div>
// //               </div>
// //             )}

// //             {viewMode === 'quiz' && quizData && <QuizView quizData={quizData} onComplete={handleQuizComplete} />}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseMap;

// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ReactFlow, { 
//   Controls, 
//   Background, 
//   useNodesState, 
//   useEdgesState, 
//   MarkerType 
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import { getCourse, getLesson, getQuiz, updateXP, updateCourseProgress, getUserCourseProgress, generateFlashcards, getFlowchart, reviewCode, askTutor } from '../api/axios';
// import { useUser } from "@clerk/clerk-react";
// import { downloadCertificate } from '../utils/generateCertificate'; 
// import { 
//   Loader2, ArrowLeft, Cpu, ShieldCheck, X, Trophy, Volume2, Share2, Download, Globe, Square, FileImage, Code, User, Lock, Linkedin, Maximize, Play, Pause, Music, VolumeX, Image as ImageIcon, Plus, Minus, MessageSquare, Send, SkipForward, Bot 
// } from 'lucide-react'; 
// import QuizView from '../components/QuizView';
// import MermaidDiagram from '../components/MermaidDiagram';
// import { Sandpack } from "@codesandbox/sandpack-react"; 

// // --- MUSIC PLAYLIST ---
// const PLAYLIST = [
//   { name: "Lofi Beats", url: "/music/lofi.mp3" },
//   { name: "Ambient Rain", url: "/music/ambient.mp3" },
//   { name: "Deep Focus", url: "/music/calm.mp3" }
// ];

// // --- SUPPORTED LANGUAGES CONFIG ---
// const CODE_TEMPLATES = {
//   react: { name: "React", template: "react", files: { "/App.js": `export default function App() {\n  return (\n    <div style={{ padding: 20 }}>\n      <h1>🚀 Happy Coding!</h1>\n      <p>Edit this to practice React.</p>\n    </div>\n  );\n}` } },
//   vanilla: { name: "JavaScript", template: "vanilla", files: { "/index.js": `import "./styles.css";\n\ndocument.getElementById("app").innerHTML = \`\n<h1>⚡ Hello Vanilla JS!</h1>\n<div>\n  <p>Start writing logic here.</p>\n</div>\n\`;`, "/styles.css": `body {\n  font-family: sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}` } },
//   vue: { name: "Vue", template: "vue", files: { "/src/App.vue": `<template>\n  <div id="app">\n    <h1>🐉 Hello Vue!</h1>\n    <h3>Start editing to see magic happen.</h3>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'App',\n};\n</script>\n\n<style>\n#app {\n  font-family: "Avenir", Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #2c3e50;\n  margin-top: 60px;\n}\n</style>` } },
//   static: { name: "HTML/CSS", template: "static", files: { "/index.html": `<!DOCTYPE html>\n<html>\n<body>\n  <h1>🎨 Hello HTML/CSS</h1>\n  <p>Style me in styles.css!</p>\n</body>\n</html>` } },
//   python: { name: "Python", template: "vanilla", files: { "/main.py": `# Python Code Editor\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Student"))` } },
//   java: { name: "Java", template: "vanilla", files: { "/Main.java": `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}` } },
//   csharp: { name: "C#", template: "vanilla", files: { "/Program.cs": `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}` } },
//   cpp: { name: "C++", template: "vanilla", files: { "/main.cpp": `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}` } },
//   ruby: { name: "Ruby", template: "vanilla", files: { "/main.rb": `def greet(name)\n  puts "Hello, #{name}!"\nend\n\ngreet("Student")` } },
//   go: { name: "Go", template: "vanilla", files: { "/main.go": `package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}` } },
//   php: { name: "PHP", template: "vanilla", files: { "/index.php": `<?php\n  echo "Hello, World!";\n?>` } },
//   swift: { name: "Swift", template: "vanilla", files: { "/main.swift": `import Foundation\n\nprint("Hello, World!")` } },
//   typescript: { name: "TypeScript", template: "vanilla-ts", files: { "/index.ts": `const message: string = "Hello TypeScript!";\n\ndocument.getElementById("app").innerHTML = \`<h1>\${message}</h1>\`;` } }
// };

// const FOCUS_THEMES = [
//     { name: "Cosmic", class: "from-indigo-900/30 via-black to-black" },
//     { name: "Nature", class: "from-emerald-900/30 via-black to-black" },
//     { name: "Sunset", class: "from-orange-900/30 via-black to-black" },
//     { name: "Ocean",  class: "from-cyan-900/30 via-black to-black" }
// ];

// const CourseMap = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useUser();
  
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [loading, setLoading] = useState(true);
//   const [courseTitle, setCourseTitle] = useState('');
//   const [currentLanguage, setCurrentLanguage] = useState('English');

//   const [selectedNode, setSelectedNode] = useState(null);
//   const [viewMode, setViewMode] = useState('description'); 
//   const [lessonContent, setLessonContent] = useState(null);
//   const [lessonLoading, setLessonLoading] = useState(false);
//   const [quizData, setQuizData] = useState(null);
//   const [completedNodeIds, setCompletedNodeIds] = useState([]); 
  
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [diagramCode, setDiagramCode] = useState(null);
//   const [diagramLoading, setDiagramLoading] = useState(false);
//   const [showCode, setShowCode] = useState(false); 
//   const [codeLang, setCodeLang] = useState('react');

//   const [focusMode, setFocusMode] = useState(false);
//   const [focusTime, setFocusTime] = useState(25 * 60); 
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [currentTheme, setCurrentTheme] = useState(0);
//   const [isMuted, setIsMuted] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState(0);
//   const audioRef = useRef(new Audio(PLAYLIST[0].url)); 

//   const [reviewResult, setReviewResult] = useState(null);
//   const [reviewLoading, setReviewLoading] = useState(false);

//   const [showChat, setShowChat] = useState(false);
//   const [chatHistory, setChatHistory] = useState([{ role: 'ai', text: "Hi! I'm your AI Tutor. Stuck on something? Ask me!" }]);
//   const [chatInput, setChatInput] = useState("");
//   const [chatLoading, setChatLoading] = useState(false);

//   useEffect(() => {
//     if (user && id) {
//       getUserCourseProgress(user.id, id).then(data => {
//         if (data && data.completedNodes) setCompletedNodeIds(data.completedNodes);
//       }).catch(err => console.error(err));
//     }
//   }, [user, id]);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const data = await getCourse(id);
//         setCourseTitle(data.topic);
//         if (data.language) setCurrentLanguage(data.language);

//         const formattedNodes = data.nodes.map((node) => {
//           const isCompleted = completedNodeIds.includes(node.id);
//           return {
//             id: node.id,
//             type: 'default',
//             position: node.position,
//             data: { label: node.data.label, description: node.data.description },
//             style: {
//               background: isCompleted ? '#064e3b' : '#0f172a',
//               color: '#fff',
//               border: isCompleted ? '1px solid #10b981' : '1px solid #3b82f6',
//               boxShadow: isCompleted ? '0 0 15px rgba(16, 185, 129, 0.5)' : '0 0 15px rgba(59, 130, 246, 0.5)',
//               borderRadius: '12px',
//               padding: '10px',
//               minWidth: '150px',
//               textAlign: 'center',
//               fontSize: '12px',
//               fontFamily: 'monospace'
//             }
//           };
//         });

//         const formattedEdges = data.edges.map(edge => ({
//           id: edge.id,
//           source: edge.source,
//           target: edge.target,
//           animated: true,
//           style: { stroke: '#60a5fa', strokeWidth: 2 },
//           markerEnd: { type: MarkerType.ArrowClosed, color: '#60a5fa' },
//         }));

//         setNodes(formattedNodes);
//         setEdges(formattedEdges);
//       } catch (error) { console.error("Failed to load map:", error); } 
//       finally { setLoading(false); }
//     };
//     fetchCourse();
//   }, [id, setNodes, setEdges, completedNodeIds]);

//   const totalNodes = nodes.length;
//   const completedCount = completedNodeIds.length;
//   const progressPercent = totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100) : 0;
//   const isCourseComplete = progressPercent === 100;

//   useEffect(() => {
//     let interval;
//     if (isTimerRunning && focusTime > 0) {
//       interval = setInterval(() => setFocusTime((prev) => prev - 1), 1000);
//     } else if (focusTime === 0 && isTimerRunning) {
//       setIsTimerRunning(false);
//       audioRef.current.pause();
//       alert("Focus Session Complete! Take a break.");
//     }
//     return () => clearInterval(interval);
//   }, [isTimerRunning, focusTime]);

//   useEffect(() => {
//     if(audioRef.current) {
//         audioRef.current.src = PLAYLIST[currentTrack].url;
//         audioRef.current.muted = isMuted;
//         if (isTimerRunning && !isMuted) audioRef.current.play().catch(e => console.log("Auto-play prevented"));
//     }
//   }, [currentTrack, isMuted]);

//   const toggleFocusMode = () => {
//     if (!focusMode) {
//       setFocusMode(true);
//       audioRef.current.loop = true;
//       audioRef.current.volume = 0.5;
//       audioRef.current.play().catch(e => console.log("Audio play failed"));
//       setIsTimerRunning(true);
//     } else {
//       setFocusMode(false);
//       audioRef.current.pause();
//       setIsTimerRunning(false);
//     }
//   };

//   const adjustTime = (minutes) => {
//     setFocusTime((prev) => Math.max(0, prev + minutes * 60));
//   };

//   const cycleTheme = () => {
//     setCurrentTheme((prev) => (prev + 1) % FOCUS_THEMES.length);
//   };
  
//   const nextTrack = () => {
//     setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const handleChatSubmit = async (e) => {
//     e.preventDefault();
//     if (!chatInput.trim()) return;
//     const newHistory = [...chatHistory, { role: 'user', text: chatInput }];
//     setChatHistory(newHistory);
//     setChatInput("");
//     setChatLoading(true);
//     try {
//         const context = lessonContent || selectedNode?.data?.description || courseTitle;
//         const data = await askTutor(courseTitle, context, chatInput);
//         setChatHistory([...newHistory, { role: 'ai', text: data.answer }]);
//     } catch (error) {
//         setChatHistory([...newHistory, { role: 'ai', text: "Sorry, I couldn't connect to the Tutor." }]);
//     } finally {
//         setChatLoading(false);
//     }
//   };

//   const handleCodeReview = async () => {
//     setReviewLoading(true);
//     try {
//       const files = CODE_TEMPLATES[codeLang].files;
//       const mainFileKey = Object.keys(files)[0];
//       const codeToReview = files[mainFileKey];
//       const data = await reviewCode(codeToReview, codeLang);
//       setReviewResult(data);
//     } catch (error) { console.error(error); } 
//     finally { setReviewLoading(false); }
//   };

//   const onNodeClick = useCallback((event, node) => {
//     setSelectedNode(node);
//     setViewMode('description');
//     setLessonContent(null);
//     setQuizData(null);
//     setDiagramCode(null);
//     setShowCode(false);
//     setReviewResult(null); 
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//   }, []);

//   const handleStartLesson = async () => {
//     if (!selectedNode) return;
//     setLessonLoading(true);
//     try {
//       const data = await getLesson(courseTitle, selectedNode.data.label, currentLanguage);
//       setLessonContent(typeof data.content === 'string' ? data.content : JSON.stringify(data));
//       setViewMode('lesson');
//     } catch (error) { console.error(error); } 
//     finally { setLessonLoading(false); }
//   };

//   const handleStartQuiz = async () => {
//     setLessonLoading(true);
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//     try {
//       const data = await getQuiz(courseTitle, selectedNode.data.label, currentLanguage);
//       setQuizData(data);
//       setViewMode('quiz');
//     } catch (error) { console.error(error); } 
//     finally { setLessonLoading(false); }
//   };

//   const handleQuizComplete = async (score) => {
//     if (!user) return;
//     let xpAwarded = 0;
//     if (score === 1) xpAwarded = 10;
//     else if (score === 2) xpAwarded = 25;
//     else if (score === 3) xpAwarded = 50;

//     try {
//       if (xpAwarded > 0) await updateXP(user.id, xpAwarded);
//       if (score === 3) {
//           generateFlashcards(courseTitle, selectedNode.data.label, user.id, id, currentLanguage);
//           let newCompletedIds = [...completedNodeIds];
//           if (!newCompletedIds.includes(selectedNode.id)) newCompletedIds.push(selectedNode.id);
//           setCompletedNodeIds(newCompletedIds); 
//           const progress = Math.round((newCompletedIds.length / nodes.length) * 100);
//           await updateCourseProgress(user.id, id, progress, newCompletedIds);
//           alert(`PERFECT SCORE! 🏆\n\n🎉 +${xpAwarded} XP Earned!\n✅ Node Completed (Green)\n📚 Flashcards Generated`);
//       } else {
//           alert(`Quiz Results: ${score}/3 Correct\n\n⚠️ You need 3/3 correct to complete this node.\n+${xpAwarded} XP added.`);
//       }
//       setSelectedNode(null); 
//       setViewMode('description');
//     } catch (error) { console.error(error); }
//   };

//   const speakLesson = () => {
//     if (!lessonContent) return;
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(lessonContent);
//     utterance.onend = () => setIsSpeaking(false);
//     utterance.onerror = () => setIsSpeaking(false);
//     const voices = window.speechSynthesis.getVoices();
//     const langMap = { 'English': 'en', 'Hindi': 'hi', 'Spanish': 'es', 'French': 'fr', 'German': 'de' };
//     const langCode = langMap[currentLanguage] || 'en';
//     const voice = voices.find(v => v.lang.startsWith(langCode));
//     if (voice) utterance.voice = voice;
//     setIsSpeaking(true);
//     window.speechSynthesis.speak(utterance);
//   };

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//   };

//   const handleVisualize = async () => {
//     setDiagramLoading(true);
//     try {
//       const data = await getFlowchart(courseTitle, selectedNode.data.label, currentLanguage);
//       setDiagramCode(data.code);
//     } catch (error) { console.error(error); } 
//     finally { setDiagramLoading(false); }
//   };

//   const shareAchievement = () => {
//     const title = `I just mastered ${courseTitle} on SkillForge AI!`;
//     const summary = 'Check out my AI-generated learning path. #SkillForge #AI #Learning';
//     const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(title + "\n" + summary)}`;
//     window.open(url, '_blank');
//   };

//   if (loading) return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;

//   return (
//     // FIX: Main container is transparent so global background shows
//     <div className="h-screen w-screen relative overflow-hidden text-white font-sans selection:bg-blue-500/30 flex flex-col">
      
//       {/* FOCUS MODE OVERLAY */}
//       {focusMode && (
//         <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500 transition-colors">
//             {/* Focus Mode BG */}
//             <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${FOCUS_THEMES[currentTheme].class} transition-all duration-1000 z-0`} />
//             <div className="z-10 text-center w-full max-w-lg">
//                 <div className="flex justify-center gap-4 mb-8">
//                     <button onClick={cycleTheme} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all text-sm">
//                         <ImageIcon size={16} /> Theme: {FOCUS_THEMES[currentTheme].name}
//                     </button>
//                 </div>
//                 <h2 className="text-gray-300 text-lg uppercase tracking-widest mb-4 font-light">Deep Work Session</h2>
//                 <div className="text-9xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-8 drop-shadow-2xl">{formatTime(focusTime)}</div>
//                 <div className="flex gap-6 justify-center items-center mb-12">
//                 {!isTimerRunning && (
//                     <button onClick={() => adjustTime(-5)} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"><Minus size={24} /></button>
//                 )}
//                 <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="p-6 rounded-full bg-white text-black hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
//                     {isTimerRunning ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1" />}
//                 </button>
//                 {!isTimerRunning && (
//                     <button onClick={() => adjustTime(5)} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"><Plus size={24} /></button>
//                 )}
//                 </div>
//                 <div className="flex items-center justify-between bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
//                     <div className="flex items-center gap-3 text-indigo-300">
//                         {isMuted ? <VolumeX size={20} /> : <Music size={20} className="animate-pulse" />}
//                         <span className="text-sm font-medium">{PLAYLIST[currentTrack].name}</span>
//                     </div>
//                     <div className="flex gap-3">
//                         <button onClick={nextTrack} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Next Track"><SkipForward size={20}/></button>
//                         <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Mute/Unmute">
//                             {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//                         </button>
//                         <div className="w-[1px] h-6 bg-white/20 self-center"></div>
//                         <button onClick={toggleFocusMode} className="text-red-400 hover:text-red-300 font-bold text-sm px-2">EXIT</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       )}

//       {/* STANDARD UI */}
//       <div className={`flex-1 flex flex-col relative transition-opacity duration-500 ${focusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
//         {/* HEADER */}
//         <div className="h-16 z-20 flex items-center px-8 border-b border-white/10 bg-black/40 backdrop-blur-md shrink-0">
//           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-white"><ArrowLeft size={18} /> Abort</button>
          
//           <div className="flex-1 text-center font-bold text-xl flex justify-center items-center gap-2">
//               <Cpu className="text-blue-500" /> {courseTitle} 
//           </div>

//           <button onClick={toggleFocusMode} className="flex items-center gap-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/50 px-3 py-1.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-all mr-4">
//             <Maximize size={14} /> Focus Mode
//           </button>

//           <div className="flex items-center gap-2 bg-gray-800/80 border border-gray-700 px-3 py-1.5 rounded-lg">
//             <Globe size={14} className="text-gray-400" />
//             <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)} className="bg-transparent text-xs text-white outline-none cursor-pointer uppercase tracking-wide font-mono">
//                 <option value="English">ENG</option>
//                 <option value="Hindi">HIN</option>
//                 <option value="Spanish">ESP</option>
//                 <option value="French">FRA</option>
//                 <option value="Bengali">BEN</option>
//                 <option value="German">GER</option>
//                 <option value="Chinese">CHI</option>
//                 <option value="Japanese">JPN</option>
//                 <option value="Russian">RUS</option>
//                 <option value="Arabic">ARA</option>
//                 <option value="Portuguese">POR</option>
//             </select>
//           </div>

//           <div className="w-[100px] flex justify-end">
//              <ShieldCheck className="text-green-500/50" />
//           </div>
//         </div>

//         {/* GRAPH */}
//         <div className="flex-1 relative">
//           <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onNodeClick={onNodeClick} fitView className="bg-transparent">
//             <Background color="#3b82f6" variant="dots" gap={25} style={{ opacity: 0.1 }} />
//             <Controls className="bg-gray-900 border-gray-700 fill-white" />
//           </ReactFlow>
//         </div>

//         {/* AI TUTOR & SIDEBAR ... */}
//         {/* Keeping existing logic for brevity - just ensure sidebar container uses bg-gray-900/95 backdrop-blur-xl */}
//         {/* ... */}
        
//         {/* AI TUTOR WIDGET */}
//         <div className="absolute bottom-6 right-6 z-50 flex flex-col items-end gap-4">
//             {showChat && (
//                 <div className="w-80 h-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in">
//                     <div className="bg-gray-800 p-3 border-b border-gray-700 flex justify-between items-center">
//                         <span className="font-bold flex items-center gap-2"><Bot size={16} className="text-green-400" /> AI Tutor</span>
//                         <button onClick={() => setShowChat(false)}><X size={16} /></button>
//                     </div>
//                     <div className="flex-1 p-4 overflow-y-auto space-y-4">
//                         {chatHistory.map((msg, idx) => (
//                             <div key={idx} className={`p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-blue-600 ml-auto max-w-[80%]' : 'bg-gray-800 mr-auto max-w-[80%]'}`}>
//                                 {msg.text}
//                             </div>
//                         ))}
//                         {chatLoading && <div className="text-xs text-gray-500 animate-pulse">Typing...</div>}
//                     </div>
//                     <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-700 flex gap-2">
//                         <input 
//                             className="flex-1 bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" 
//                             placeholder="Ask a doubt..."
//                             value={chatInput}
//                             onChange={(e) => setChatInput(e.target.value)}
//                         />
//                         <button type="submit" className="bg-green-600 p-2 rounded-lg hover:bg-green-500"><Send size={16} /></button>
//                     </form>
//                 </div>
//             )}
//             <button 
//                 onClick={() => setShowChat(!showChat)}
//                 className="p-4 bg-green-600 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
//             >
//                 {showChat ? <X size={24} /> : <MessageSquare size={24} />}
//             </button>
//         </div>

//         {/* SIDEBAR */}
//         {selectedNode && (
//           <div className="absolute right-0 top-16 bottom-0 w-[500px] bg-gray-900/95 backdrop-blur-xl border-l border-blue-500/30 p-8 shadow-2xl z-30 overflow-y-auto">
//             <button onClick={() => setSelectedNode(null)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white"><X size={24} /></button>
//             <h2 className="text-2xl font-bold text-white mb-6">{selectedNode.data.label}</h2>

//             {viewMode === 'description' && (
//               <>
//                 <p className="text-gray-300 mb-6">{selectedNode.data.description}</p>
//                 <div className="space-y-4">
//                   <button onClick={handleStartLesson} disabled={lessonLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex justify-center">
//                     {lessonLoading ? <Loader2 className="animate-spin" /> : `Start Lesson (${currentLanguage})`}
//                   </button>
//                   <button onClick={() => navigate('/interview')} className="w-full border border-green-500/50 hover:bg-green-500/10 text-green-400 font-bold py-3 rounded-xl flex items-center justify-center gap-2">
//                     <User size={18} /> Practice Mock Interview
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-800 mt-6">
//                   <button onClick={() => isCourseComplete && downloadCertificate(user?.firstName, courseTitle)} disabled={!isCourseComplete} className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all group ${isCourseComplete ? 'border-gray-700 hover:bg-gray-800 hover:border-blue-500 cursor-pointer' : 'border-gray-800 opacity-50 cursor-not-allowed bg-black/20'}`}>
//                     {isCourseComplete ? <Download size={24} className="mb-2 text-blue-400" /> : <Lock size={24} className="mb-2 text-gray-600" />}
//                     <span className="text-xs font-mono">{isCourseComplete ? "CERTIFICATE" : `LOCKED (${progressPercent}%)`}</span>
//                   </button>
//                   <button onClick={shareAchievement} className="flex flex-col items-center justify-center p-4 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-purple-500 transition-all text-gray-400 hover:text-white group">
//                     <Linkedin size={24} className="mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
//                     <span className="text-xs font-mono">SHARE</span>
//                   </button>
//                 </div>
//               </>
//             )}

//             {viewMode === 'lesson' && (
//               <div className="animate-in fade-in">
//                 <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
//                   {showCode && (
//                     <select value={codeLang} onChange={(e) => setCodeLang(e.target.value)} className="bg-gray-800 text-xs text-white border border-gray-700 rounded px-2 py-1 outline-none">
//                       <option value="react">React</option>
//                       <option value="vanilla">JavaScript</option>
//                       <option value="vue">Vue</option>
//                       <option value="static">HTML/CSS</option>
//                       <option value="python">Python</option>
//                       <option value="java">Java</option>
//                       <option value="csharp">C#</option>
//                       <option value="cpp">C++</option>
//                       <option value="ruby">Ruby</option>
//                       <option value="go">Go</option>
//                       <option value="php">PHP</option> 
//                       <option value="typescript">TypeScript</option>
//                       <option value="swift">Swift</option>
//                     </select>
//                   )}
//                   <div className="flex gap-2 ml-auto">
//                     <button onClick={() => setShowCode(!showCode)} className={`p-2 rounded-full transition-colors group border ${showCode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'bg-gray-800 text-gray-400 border-gray-700'}`}><Code size={20} /></button>
//                     <button onClick={handleVisualize} className="p-2 bg-purple-600/20 text-purple-400 rounded-full hover:bg-purple-600 transition-colors group border border-purple-500/50"><FileImage size={20} /></button>
//                     <button onClick={isSpeaking ? stopSpeaking : speakLesson} className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors text-white group border border-gray-700">
//                       {isSpeaking ? <Square size={20} fill="currentColor" /> : <Volume2 size={20} />}
//                     </button>
//                   </div>
//                 </div>

//                 {showCode ? (
//                   <div className="mt-4 mb-8">
//                     <div className="border border-gray-700 rounded-xl overflow-hidden shadow-2xl mb-4">
//                       <Sandpack template={CODE_TEMPLATES[codeLang].template} theme="dark" options={{ showNavigator: false, showTabs: true, editorHeight: 400 }} files={CODE_TEMPLATES[codeLang].files} />
//                     </div>
//                     <button onClick={handleCodeReview} disabled={reviewLoading} className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2">
//                       {reviewLoading ? <Loader2 className="animate-spin" /> : <>AI Code Sensei: Review My Code <ShieldCheck size={18}/></>}
//                     </button>
//                     {reviewResult && (
//                       <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-yellow-500/30 text-sm">
//                         <div className="flex justify-between items-center mb-2">
//                           <span className="font-bold text-yellow-400">Quality Score</span>
//                           <span className="text-2xl font-bold">{reviewResult.score}/100</span>
//                         </div>
//                         <div className="space-y-2">
//                           <p className="text-red-300"><strong>🐛 Bugs:</strong> {reviewResult.bugs?.join(', ') || "None found!"}</p>
//                           <p className="text-green-300"><strong>💡 Improvements:</strong> {reviewResult.improvements?.join(', ')}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="prose prose-invert prose-blue max-w-none whitespace-pre-wrap font-light text-gray-300">{lessonContent}</div>
//                 )}

//                 {diagramLoading && <div className="text-center text-purple-400 mt-4 animate-pulse text-sm">Generating Visuals...</div>}
//                 {diagramCode && <div className="mt-6 animate-in fade-in"><MermaidDiagram chartCode={diagramCode} /></div>}
                
//                 <div className="flex gap-4 mt-8">
//                   <button onClick={() => { stopSpeaking(); setViewMode('description'); }} className="flex-1 border border-gray-600 hover:bg-gray-800 text-gray-300 py-3 rounded-lg transition-colors">Back</button>
//                   <button onClick={handleStartQuiz} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg flex justify-center gap-2"><Trophy size={18} /> Take Quiz</button>
//                 </div>
//               </div>
//             )}

//             {viewMode === 'quiz' && quizData && <QuizView quizData={quizData} onComplete={handleQuizComplete} />}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseMap;

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  MarkerType 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  getCourse, 
  getLesson, 
  getQuiz, 
  updateXP, 
  updateCourseProgress, 
  getUserCourseProgress, 
  generateFlashcards, 
  getFlowchart, 
  reviewCode, 
  askTutor 
} from '../api/axios';
import { useUser } from "@clerk/clerk-react";
import { downloadCertificate } from '../utils/generateCertificate'; 
import { 
  Loader2, ArrowLeft, Cpu, ShieldCheck, X, Trophy, Volume2, 
  Download, Globe, Square, FileImage, Code, User, Lock, Linkedin, 
  Maximize, Play, Pause, Music, VolumeX, Image as ImageIcon, 
  Plus, Minus, MessageSquare, Send, SkipForward, Bot 
} from 'lucide-react'; 
import QuizView from '../components/QuizView';
import MermaidDiagram from '../components/MermaidDiagram';
import { Sandpack } from "@codesandbox/sandpack-react"; 

// --- MUSIC PLAYLIST ---
const PLAYLIST = [
  { name: "Lofi Beats", url: "/music/lofi.mp3" },
  { name: "Ambient Rain", url: "/music/ambient.mp3" },
  { name: "Deep Focus", url: "/music/calm.mp3" }
];

// --- SUPPORTED LANGUAGES CONFIG ---
const CODE_TEMPLATES = {
  react: { name: "React", template: "react", files: { "/App.js": `export default function App() {\n  return (\n    <div style={{ padding: 20 }}>\n      <h1>🚀 Happy Coding!</h1>\n      <p>Edit this to practice React.</p>\n    </div>\n  );\n}` } },
  vanilla: { name: "JavaScript", template: "vanilla", files: { "/index.js": `import "./styles.css";\n\ndocument.getElementById("app").innerHTML = \`\n<h1>⚡ Hello Vanilla JS!</h1>\n<div>\n  <p>Start writing logic here.</p>\n</div>\n\`;`, "/styles.css": `body {\n  font-family: sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}` } },
  vue: { name: "Vue", template: "vue", files: { "/src/App.vue": `<template>\n  <div id="app">\n    <h1>🐉 Hello Vue!</h1>\n    <h3>Start editing to see magic happen.</h3>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'App',\n};\n</script>\n\n<style>\n#app {\n  font-family: "Avenir", Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #2c3e50;\n  margin-top: 60px;\n}\n</style>` } },
  python: { name: "Python", template: "vanilla", files: { "/main.py": `# Python Code Editor\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Student"))` } },
  java: { name: "Java", template: "vanilla", files: { "/Main.java": `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}` } },
  cpp: { name: "C++", template: "vanilla", files: { "/main.cpp": `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}` } }
};

const FOCUS_THEMES = [
    { name: "Cosmic", class: "from-indigo-900/30 via-black to-black" },
    { name: "Nature", class: "from-emerald-900/30 via-black to-black" },
    { name: "Sunset", class: "from-orange-900/30 via-black to-black" },
    { name: "Ocean",  class: "from-cyan-900/30 via-black to-black" }
];

const CourseMap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const [selectedNode, setSelectedNode] = useState(null);
  const [viewMode, setViewMode] = useState('description'); 
  const [lessonContent, setLessonContent] = useState(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [completedNodeIds, setCompletedNodeIds] = useState([]); 
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]); 
  
  const [diagramCode, setDiagramCode] = useState(null);
  const [diagramLoading, setDiagramLoading] = useState(false);
  const [showCode, setShowCode] = useState(false); 
  const [codeLang, setCodeLang] = useState('react');

  const [focusMode, setFocusMode] = useState(false);
  const [focusTime, setFocusTime] = useState(25 * 60); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(new Audio(PLAYLIST[0].url)); 

  const [reviewResult, setReviewResult] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState([{ role: 'ai', text: "System Online. AI Tutor Ready." }]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // --- 1. LOAD USER PROGRESS ---
  useEffect(() => {
    if (user && id) {
      getUserCourseProgress(user.id, id).then(data => {
        if (data && data.completedNodes) setCompletedNodeIds(data.completedNodes);
      }).catch(err => console.error(err));
    }
  }, [user, id]);

  // --- 2. LOAD VOICES ---
  useEffect(() => {
    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };
    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();
  }, []);

  // --- 3. LOAD & STYLE NODES ---
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourse(id);
        setCourseTitle(data.topic);
        if (data.language) setCurrentLanguage(data.language);

        const formattedNodes = data.nodes.map((node) => {
          const isCompleted = completedNodeIds.includes(node.id);
          return {
            id: node.id,
            type: 'default',
            position: node.position,
            data: { label: node.data.label, description: node.data.description },
            style: {
              background: isCompleted ? 'rgba(0, 255, 128, 0.1)' : 'rgba(0, 195, 255, 0.1)',
              color: '#fff',
              border: isCompleted ? '1px solid #00ff80' : '1px solid #00c3ff',
              boxShadow: isCompleted ? '0 0 15px #00ff80, inset 0 0 10px rgba(0,255,128,0.2)' : '0 0 15px #00c3ff, inset 0 0 10px rgba(0,195,255,0.2)',
              borderRadius: '4px',
              padding: '12px',
              minWidth: '160px',
              textAlign: 'center',
              fontSize: '13px',
              fontFamily: '"Courier New", monospace',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              backdropFilter: 'blur(5px)'
            }
          };
        });

        const formattedEdges = data.edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          animated: true,
          style: { stroke: '#00c3ff', strokeWidth: 2, filter: 'drop-shadow(0 0 3px #00c3ff)' },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#00c3ff' },
        }));

        setNodes(formattedNodes);
        setEdges(formattedEdges);
      } catch (error) { console.error("Failed to load map:", error); } 
      finally { setLoading(false); }
    };
    fetchCourse();
  }, [id, setNodes, setEdges, completedNodeIds]);

  const totalNodes = nodes.length;
  const completedCount = completedNodeIds.length;
  const progressPercent = totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100) : 0;
  const isCourseComplete = progressPercent === 100;

  // --- TIMER LOGIC ---
  useEffect(() => {
    let interval;
    if (isTimerRunning && focusTime > 0) {
      interval = setInterval(() => setFocusTime((prev) => prev - 1), 1000);
    } else if (focusTime === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      audioRef.current.pause();
      alert("Mission Complete! Stand down.");
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, focusTime]);

  // --- MUSIC LOGIC ---
  useEffect(() => {
    if(audioRef.current) {
        audioRef.current.src = PLAYLIST[currentTrack].url;
        audioRef.current.muted = isMuted;
        if (isTimerRunning && !isMuted) {
             const playPromise = audioRef.current.play();
             if (playPromise !== undefined) {
                playPromise.catch(error => console.log("Auto-play prevented"));
             }
        }
    }
  }, [currentTrack, isMuted, isTimerRunning]);

  const toggleFocusMode = () => {
    if (!focusMode) {
      setFocusMode(true);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Audio play failed"));
      setIsTimerRunning(true);
    } else {
      setFocusMode(false);
      audioRef.current.pause();
      setIsTimerRunning(false);
    }
  };

  const adjustTime = (minutes) => {
    setFocusTime((prev) => Math.max(0, prev + minutes * 60));
  };

  const cycleTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % FOCUS_THEMES.length);
  };
  
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newHistory = [...chatHistory, { role: 'user', text: chatInput }];
    setChatHistory(newHistory);
    setChatInput("");
    setChatLoading(true);
    try {
        const context = lessonContent || selectedNode?.data?.description || courseTitle;
        const data = await askTutor(courseTitle, context, chatInput);
        setChatHistory([...newHistory, { role: 'ai', text: data.answer }]);
    } catch (error) {
        setChatHistory([...newHistory, { role: 'ai', text: "Connection Lost. Retrying..." }]);
    } finally {
        setChatLoading(false);
    }
  };

  const handleCodeReview = async () => {
    setReviewLoading(true);
    try {
      const files = CODE_TEMPLATES[codeLang].files;
      const mainFileKey = Object.keys(files)[0];
      const codeToReview = files[mainFileKey];
      const data = await reviewCode(codeToReview, codeLang);
      setReviewResult(data);
    } catch (error) { console.error(error); } 
    finally { setReviewLoading(false); }
  };

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setViewMode('description');
    setLessonContent(null);
    setQuizData(null);
    setDiagramCode(null);
    setShowCode(false);
    setReviewResult(null); 
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const handleStartLesson = async () => {
    if (!selectedNode) return;
    setLessonLoading(true);
    try {
      const data = await getLesson(courseTitle, selectedNode.data.label, currentLanguage);
      if (typeof data.content === 'string') {
          setLessonContent(data.content);
      } else if (data.content && typeof data.content.content === 'string') {
          setLessonContent(data.content.content);
      } else {
          setLessonContent(JSON.stringify(data));
      }
      setViewMode('lesson');
    } catch (error) { console.error(error); } 
    finally { setLessonLoading(false); }
  };

  const handleStartQuiz = async () => {
    setLessonLoading(true);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    try {
      const data = await getQuiz(courseTitle, selectedNode.data.label, currentLanguage);
      setQuizData(data);
      setViewMode('quiz');
    } catch (error) { console.error(error); } 
    finally { setLessonLoading(false); }
  };

  const handleQuizComplete = async (score) => {
    if (!user) return;
    
    // XP Logic
    let xpAwarded = 0;
    if (score === 1) xpAwarded = 10;
    else if (score === 2) xpAwarded = 25;
    else if (score === 3) xpAwarded = 50;

    try {
      // ✅ XP Update (Wrapped in try/catch to avoid freezing app on network error)
      if (xpAwarded > 0) {
          try {
              // Ensure updateXP matches your axios definition. 
              // If axios.js uses `post('/users/xp')`, this will work.
              await updateXP(user.id, xpAwarded);
          } catch (xpError) {
              console.error("XP Sync Failed:", xpError);
              // We continue execution so the user still gets credit for the course node
          }
      }
      
      // Completion Logic
      if (score >= 3) { 
          generateFlashcards(courseTitle, selectedNode.data.label, user.id, id, currentLanguage);
          
          let newCompletedIds = [...completedNodeIds];
          if (!newCompletedIds.includes(selectedNode.id)) {
              newCompletedIds.push(selectedNode.id);
              setCompletedNodeIds(newCompletedIds); 
              const progress = Math.round((newCompletedIds.length / nodes.length) * 100);
              await updateCourseProgress(user.id, id, progress, newCompletedIds);
          }
          alert(`S-RANK! 🏆\n\n🎉 +${xpAwarded} XP Sync Complete!\n✅ Data Node Unlocked\n📚 Memory Bank Updated`);
      } else {
          alert(`Simulation Result: ${score}/3\n\n⚠️ 100% Accuracy Required for Sync.\n+${xpAwarded} XP partial data acquired.`);
      }
      
      setSelectedNode(null); 
      setViewMode('description');
    } catch (error) { console.error("Global Error in Quiz Handler:", error); }
  };

  const speakLesson = () => {
    if (!lessonContent) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(lessonContent);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    const langMap = { 'English': 'en', 'Hindi': 'hi', 'Spanish': 'es', 'French': 'fr', 'German': 'de' };
    const targetLang = langMap[currentLanguage] || 'en';
    
    const voice = availableVoices.find(v => v.lang === targetLang) || 
                  availableVoices.find(v => v.lang.startsWith(targetLang));
    
    if (voice) utterance.voice = voice;
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleVisualize = async () => {
    setDiagramLoading(true);
    try {
      const data = await getFlowchart(courseTitle, selectedNode.data.label, currentLanguage);
      if (data && data.code) {
          const cleanCode = data.code.replace(/```mermaid/g, '').replace(/```/g, '').trim();
          setDiagramCode(cleanCode);
      }
    } catch (error) { console.error(error); } 
    finally { setDiagramLoading(false); }
  };

  const shareAchievement = () => {
    const title = `I just mastered ${courseTitle} on SkillForge AI!`;
    const summary = 'Check out my AI-generated learning path. #SkillForge #AI #Learning';
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(title + "\n" + summary)}`;
    window.open(url, '_blank');
  };

  if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-black"><Loader2 className="animate-spin text-cyan-400" /></div>;

  return (
    <div className="h-screen w-screen relative overflow-hidden text-white font-sans selection:bg-cyan-500/30 flex flex-col bg-[#050510]">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-top opacity-30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050510] to-[#050510]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px]" />
      </div>

      {/* FOCUS MODE */}
      {focusMode && (
        <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500 transition-colors">
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${FOCUS_THEMES[currentTheme].class} transition-all duration-1000 z-0`} />
            <div className="z-10 text-center w-full max-w-lg">
                <div className="flex justify-center gap-4 mb-8">
                    <button onClick={cycleTheme} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all text-sm">
                        <ImageIcon size={16} /> Theme: {FOCUS_THEMES[currentTheme].name}
                    </button>
                </div>
                <h2 className="text-cyan-300 text-lg uppercase tracking-[0.3em] mb-4 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">System Link Established</h2>
                <div className="text-9xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-8 drop-shadow-2xl">{formatTime(focusTime)}</div>
                
                <div className="flex gap-6 justify-center items-center mb-12">
                {!isTimerRunning && (
                    <button onClick={() => adjustTime(-5)} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/10"><Minus size={24} /></button>
                )}
                <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="p-6 rounded-full bg-white text-black hover:scale-110 transition-transform shadow-[0_0_30px_rgba(34,211,238,0.6)]">
                    {isTimerRunning ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1" />}
                </button>
                {!isTimerRunning && (
                    <button onClick={() => adjustTime(5)} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/10"><Plus size={24} /></button>
                )}
                </div>
                
                <div className="flex items-center justify-between bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-cyan-500/30">
                    <div className="flex items-center gap-3 text-cyan-300">
                        {isMuted ? <VolumeX size={20} /> : <Music size={20} className="animate-pulse" />}
                        <span className="text-sm font-medium font-mono">{PLAYLIST[currentTrack].name}</span>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={nextTrack} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Next Track"><SkipForward size={20}/></button>
                        <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <div className="w-[1px] h-6 bg-white/20 self-center"></div>
                        <button onClick={toggleFocusMode} className="text-red-400 hover:text-red-300 font-bold text-sm px-2 tracking-widest">ABORT</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* MAIN UI */}
      <div className={`flex-1 flex flex-col relative transition-opacity duration-500 ${focusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* HEADER */}
        <div className="h-16 z-20 flex items-center px-8 border-b border-cyan-500/20 bg-black/60 backdrop-blur-md shrink-0">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors font-mono uppercase text-xs tracking-widest">
            <ArrowLeft size={16} /> Base
          </button>
          
          <div className="flex-1 text-center font-bold text-xl flex justify-center items-center gap-3">
              <Cpu className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400 tracking-wide uppercase italic">
                {courseTitle}
              </span>
          </div>

          <button onClick={toggleFocusMode} className="flex items-center gap-2 bg-indigo-900/30 text-indigo-300 border border-indigo-500/50 px-3 py-1.5 rounded hover:bg-indigo-600 hover:text-white transition-all mr-4 text-xs font-bold uppercase tracking-wider">
            <Maximize size={14} /> Focus
          </button>

          <div className="flex items-center gap-2 bg-black/40 border border-gray-700 px-3 py-1.5 rounded">
            <Globe size={14} className="text-gray-400" />
            <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)} className="bg-transparent text-xs text-white outline-none cursor-pointer uppercase tracking-wide font-mono">
                <option value="English">ENG</option>
                <option value="Hindi">HIN</option>
                <option value="Spanish">ESP</option>
                <option value="French">FRA</option>
            </select>
          </div>

          <div className="w-[100px] flex justify-end">
             <ShieldCheck className="text-green-500/80 animate-pulse" />
          </div>
        </div>

        {/* GRAPH */}
        <div className="flex-1 relative z-10">
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onNodeClick={onNodeClick} fitView className="bg-transparent">
            <Background color="#00c3ff" variant="dots" gap={30} size={1} style={{ opacity: 0.1 }} />
            <Controls className="bg-gray-900 border-cyan-500/30 fill-cyan-400" />
          </ReactFlow>
        </div>

        {/* AI CHAT */}
        <div className="absolute bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {showChat && (
                <div className="w-80 h-96 bg-gray-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-t-2xl rounded-bl-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in">
                    <div className="bg-cyan-900/20 p-3 border-b border-cyan-500/30 flex justify-between items-center">
                        <span className="font-bold flex items-center gap-2 text-cyan-300 font-mono text-xs uppercase"><Bot size={16} /> AI_Tutor_Link</span>
                        <button onClick={() => setShowChat(false)} className="hover:text-cyan-400"><X size={16} /></button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-sm">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-cyan-600/20 border border-cyan-500/40 text-cyan-100 ml-auto max-w-[85%]' : 'bg-gray-800 border border-gray-700 mr-auto max-w-[85%]'}`}>
                                {msg.text}
                            </div>
                        ))}
                        {chatLoading && <div className="text-xs text-cyan-500 animate-pulse">Computing...</div>}
                    </div>
                    <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-700 flex gap-2">
                        <input 
                            className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500 text-cyan-200 placeholder:text-gray-600" 
                            placeholder="Input query..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                        />
                        <button type="submit" className="bg-cyan-600/30 border border-cyan-500/50 p-2 rounded-lg hover:bg-cyan-600 hover:text-black transition-all"><Send size={16} /></button>
                    </form>
                </div>
            )}
            <button 
                onClick={() => setShowChat(!showChat)}
                className="p-4 bg-cyan-600/20 border border-cyan-400 text-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:bg-cyan-400 hover:text-black hover:scale-110 transition-all"
            >
                {showChat ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>

        {/* SIDEBAR */}
        {selectedNode && (
          <div className="absolute right-0 top-16 bottom-0 w-[500px] bg-[#0a0a14]/95 backdrop-blur-xl border-l border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-40 overflow-y-auto">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
            
            <div className="relative z-10 p-8">
                <button onClick={() => setSelectedNode(null)} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white"><X size={24} /></button>
                
                <div className="mb-6">
                    <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest border border-cyan-500/30 px-2 py-1 rounded">Data Node Selected</span>
                    <h2 className="text-3xl font-black text-white mt-4 italic uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{selectedNode.data.label}</h2>
                </div>

                {viewMode === 'description' && (
                <>
                    <p className="text-gray-300 mb-8 leading-relaxed border-l-2 border-cyan-500/50 pl-4">{selectedNode.data.description}</p>
                    <div className="space-y-4">
                    <button 
                        onClick={handleStartLesson} 
                        disabled={lessonLoading} 
                        className="w-full relative overflow-hidden group bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-4 px-6 transition-all duration-300"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)" }} 
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                            {lessonLoading ? <Loader2 className="animate-spin" /> : <>Initiate Lesson <Cpu size={18} /></>}
                        </span>
                    </button>

                    <button 
                        onClick={() => navigate('/interview')} 
                        className="w-full border border-green-500/30 hover:bg-green-500/10 text-green-400 font-bold py-4 px-6 flex items-center justify-center gap-2 uppercase tracking-widest text-sm transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                        style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 15%)" }}
                    >
                        <User size={18} /> Simulation: Interview
                    </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-800 mt-8">
                    <button onClick={() => isCourseComplete && downloadCertificate(user?.firstName, courseTitle)} disabled={!isCourseComplete} className={`flex flex-col items-center justify-center p-4 border rounded transition-all group ${isCourseComplete ? 'border-gray-700 hover:bg-gray-800 hover:border-cyan-500 cursor-pointer' : 'border-gray-800 opacity-50 cursor-not-allowed bg-black/20'}`}>
                        {isCourseComplete ? <Download size={24} className="mb-2 text-cyan-400" /> : <Lock size={24} className="mb-2 text-gray-600" />}
                        <span className="text-[10px] font-mono uppercase text-gray-400">{isCourseComplete ? "Download Cert" : `Locked (${progressPercent}%)`}</span>
                    </button>
                    <button onClick={shareAchievement} className="flex flex-col items-center justify-center p-4 border border-gray-700 rounded hover:bg-gray-800 hover:border-purple-500 transition-all text-gray-400 hover:text-white group">
                        <Linkedin size={24} className="mb-2 text-purple-400 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)] rounded-full" />
                        <span className="text-[10px] font-mono uppercase">Broadcast</span>
                    </button>
                    </div>
                </>
                )}

                {viewMode === 'lesson' && (
                <div className="animate-in fade-in pb-10">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                    {showCode && (
                        <select value={codeLang} onChange={(e) => setCodeLang(e.target.value)} className="bg-black text-xs text-cyan-400 border border-cyan-900 rounded px-2 py-1 outline-none font-mono uppercase">
                        <option value="react">React</option>
                        <option value="vanilla">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        </select>
                    )}
                    <div className="flex gap-2 ml-auto">
                        <button onClick={() => setShowCode(!showCode)} className={`p-2 rounded transition-all group border ${showCode ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50' : 'bg-transparent text-gray-400 border-gray-800 hover:text-white'}`}><Code size={20} /></button>
                        <button onClick={handleVisualize} className="p-2 text-purple-400 rounded hover:bg-purple-900/20 transition-all border border-purple-900/50 hover:border-purple-500"><FileImage size={20} /></button>
                        <button onClick={isSpeaking ? stopSpeaking : speakLesson} className="p-2 rounded hover:bg-cyan-900/20 text-cyan-400 border border-cyan-900/50 hover:border-cyan-400 transition-all">
                        {isSpeaking ? <Square size={20} fill="currentColor" /> : <Volume2 size={20} />}
                        </button>
                    </div>
                    </div>

                    {showCode ? (
                    <div className="mt-4 mb-8">
                        <div className="border border-gray-700 rounded-lg overflow-hidden shadow-2xl mb-4">
                        <Sandpack template={CODE_TEMPLATES[codeLang].template} theme="dark" options={{ showNavigator: false, showTabs: true, editorHeight: 400 }} files={CODE_TEMPLATES[codeLang].files} />
                        </div>
                        <button onClick={handleCodeReview} disabled={reviewLoading} className="w-full bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/30 text-orange-200 font-bold py-3 rounded flex items-center justify-center gap-2 hover:border-orange-500 transition-all">
                        {reviewLoading ? <Loader2 className="animate-spin" /> : <>AI Code Sensei <ShieldCheck size={18}/></>}
                        </button>
                        {reviewResult && (
                        <div className="mt-4 p-4 bg-black/40 rounded border border-orange-500/30 text-sm font-mono">
                            <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-orange-400 uppercase">Integrity Score</span>
                            <span className="text-xl font-bold text-white">{reviewResult.score}%</span>
                            </div>
                            <div className="space-y-2 text-gray-300">
                            <p className="text-red-400"><strong>[BUGS]:</strong> {reviewResult.bugs?.join(', ') || "NULL"}</p>
                            <p className="text-green-400"><strong>[OPTIMIZATION]:</strong> {reviewResult.improvements?.join(', ')}</p>
                            </div>
                        </div>
                        )}
                    </div>
                    ) : (
                    <div className="prose prose-invert prose-cyan max-w-none whitespace-pre-wrap font-light text-gray-300 border-l-2 border-gray-800 pl-4">{lessonContent}</div>
                    )}

                    {/* DIAGRAM SECTION */}
                    {diagramLoading && <div className="text-center text-purple-400 mt-4 animate-pulse text-xs font-mono">RENDERING_VISUALS...</div>}
                    {diagramCode && (
                        <div className="mt-6 p-4 bg-gray-900/50 rounded border border-purple-500/20 animate-in fade-in">
                            <h4 className="text-xs font-mono text-purple-400 mb-2 uppercase">System Visualization</h4>
                            <MermaidDiagram chartCode={diagramCode} />
                        </div>
                    )}
                    
                    <div className="flex gap-4 mt-8">
                    <button onClick={() => { stopSpeaking(); setViewMode('description'); }} className="flex-1 border border-gray-700 hover:border-white text-gray-400 hover:text-white py-3 rounded transition-colors uppercase text-xs tracking-wider">Back</button>
                    <button onClick={handleStartQuiz} className="flex-1 bg-green-600/20 border border-green-500/50 hover:bg-green-500 hover:text-black text-green-400 py-3 rounded flex justify-center gap-2 transition-all uppercase text-xs tracking-wider font-bold"><Trophy size={16} /> Start Quiz</button>
                    </div>
                </div>
                )}

                {viewMode === 'quiz' && quizData && <QuizView quizData={quizData} onComplete={handleQuizComplete} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseMap;