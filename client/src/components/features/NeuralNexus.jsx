// import React, { useEffect, useState, useMemo } from 'react';
// import ForceGraph3D from 'react-force-graph-3d';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from "@clerk/clerk-react";
// import { getUserHistory } from '../../api/axios';
// import { ArrowLeft, Share2, BrainCircuit } from 'lucide-react';

// // --- STATIC KNOWLEDGE GRAPH DATA ---
// // This represents the "Universe of Skills" available in the app.
// const MASTER_GRAPH = {
//   nodes: [
//     { id: "Computer Science", group: 1, level: 10 },
//     { id: "Web Development", group: 2, level: 8 },
//     { id: "AI & ML", group: 3, level: 8 },
//     { id: "Data Science", group: 4, level: 8 },
    
//     // Web Dev Branch
//     { id: "React", group: 2, level: 5 },
//     { id: "Node.js", group: 2, level: 5 },
//     { id: "TypeScript", group: 2, level: 5 },
//     { id: "CSS", group: 2, level: 4 },
//     { id: "Next.js", group: 2, level: 6 },

//     // AI Branch
//     { id: "Python", group: 3, level: 6 },
//     { id: "TensorFlow", group: 3, level: 6 },
//     { id: "Groq", group: 3, level: 6 },
//     { id: "LLMs", group: 3, level: 7 },

//     // Data Branch
//     { id: "SQL", group: 4, level: 5 },
//     { id: "MongoDB", group: 4, level: 5 },
//     { id: "Pandas", group: 4, level: 5 },
//   ],
//   links: [
//     { source: "Computer Science", target: "Web Development" },
//     { source: "Computer Science", target: "AI & ML" },
//     { source: "Computer Science", target: "Data Science" },
//     { source: "Web Development", target: "React" },
//     { source: "Web Development", target: "Node.js" },
//     { source: "Web Development", target: "CSS" },
//     { source: "React", target: "Next.js" },
//     { source: "Node.js", target: "MongoDB" }, // Cross-link
//     { source: "AI & ML", target: "Python" },
//     { source: "Python", target: "TensorFlow" },
//     { source: "Python", target: "Pandas" },
//     { source: "AI & ML", target: "Groq" },
//     { source: "Groq", target: "LLMs" },
//     { source: "Data Science", target: "SQL" },
//     { source: "Data Science", target: "Pandas" },
//   ]
// };

// const NeuralNexus = () => {
//   const navigate = useNavigate();
//   const { user } = useUser();
//   const [graphData, setGraphData] = useState({ nodes: [], links: [] });
//   const [activeSkills, setActiveSkills] = useState([]);

//   useEffect(() => {
//     if (user) {
//       getUserHistory(user.id).then(history => {
//         // Extract topics user is actually learning
//         const userTopics = history.map(h => h.title); // e.g. "Advanced Python", "React Basics"
//         setActiveSkills(userTopics);
        
//         // Enhance graph data: Check if node exists in user history
//         const processedNodes = MASTER_GRAPH.nodes.map(node => ({
//             ...node,
//             // Simple check: does user history contain the node name?
//             isActive: userTopics.some(topic => topic.toLowerCase().includes(node.id.toLowerCase())),
//             val: node.level // Node size
//         }));

//         setGraphData({ nodes: processedNodes, links: MASTER_GRAPH.links });
//       });
//     }
//   }, [user]);

//   return (
//     <div className="h-screen w-screen bg-black relative overflow-hidden">
      
//       {/* Header UI */}
//       <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none">
//         <div className="pointer-events-auto">
//             <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-cyan-400 hover:text-white uppercase tracking-widest text-xs mb-4">
//                 <ArrowLeft size={16} /> Dashboard
//             </button>
//             <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 uppercase italic">
//                 Neural Nexus
//             </h1>
//             <p className="text-gray-400 text-sm max-w-sm mt-2">
//                 Visualizing the global knowledge graph. Active neural pathways indicate acquired skills.
//             </p>
//         </div>

//         <div className="pointer-events-auto flex flex-col gap-2">
//             <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-black/50 p-2 rounded border border-white/10">
//                 <div className="w-3 h-3 rounded-full bg-purple-600 shadow-[0_0_10px_purple]" /> Active Skill
//             </div>
//             <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-black/50 p-2 rounded border border-white/10">
//                 <div className="w-3 h-3 rounded-full bg-gray-700" /> Locked Node
//             </div>
//         </div>
//       </div>

//       {/* 3D Force Graph */}
//       <ForceGraph3D
//         graphData={graphData}
//         nodeLabel="id"
//         nodeColor={node => node.isActive ? "#a855f7" : "#374151"} // Purple if active, Dark Grey if not
//         nodeAutoColorBy="group"
        
//         // Make active nodes glow
//         nodeThreeObjectExtend={true}
//         nodeResolution={16}
        
//         // Custom Link Styling
//         linkWidth={link => 2}
//         linkColor={() => "rgba(100, 100, 255, 0.2)"}
        
//         // Interaction
//         // Inside ForceGraph3D props:
// onNodeClick={node => {
//     // Navigate to Home but pass the topic via state
//     navigate('/', { state: { topicToGenerate: node.id } });
// }}
        
//         // Background
//         backgroundColor="#050510"
//         showNavInfo={false}
//       />

//       <div className="absolute bottom-10 w-full text-center pointer-events-none">
//         <p className="text-cyan-500/50 text-xs font-mono animate-pulse">
//             <BrainCircuit className="inline-block mr-2" size={14}/> 
//             FORCE_DIRECTED_LAYOUT // RENDERING_NODES...
//         </p>
//       </div>

//     </div>
//   );
// };

// export default NeuralNexus;

import React, { useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import { getUserHistory } from '../../api/axios';
import { ArrowLeft, BrainCircuit } from 'lucide-react';

// --- STATIC KNOWLEDGE GRAPH DATA ---
const MASTER_GRAPH = {
  nodes: [
    { id: "Computer Science", group: 1, level: 10 },
    { id: "Web Development", group: 2, level: 8 },
    { id: "AI & ML", group: 3, level: 8 },
    { id: "Data Science", group: 4, level: 8 },
    
    // Web Dev Branch
    { id: "React", group: 2, level: 5 },
    { id: "Node.js", group: 2, level: 5 },
    { id: "TypeScript", group: 2, level: 5 },
    { id: "CSS", group: 2, level: 4 },
    { id: "Next.js", group: 2, level: 6 },

    // AI Branch
    { id: "Python", group: 3, level: 6 },
    { id: "TensorFlow", group: 3, level: 6 },
    { id: "Groq", group: 3, level: 6 },
    { id: "LLMs", group: 3, level: 7 },

    // Data Branch
    { id: "SQL", group: 4, level: 5 },
    { id: "MongoDB", group: 4, level: 5 },
    { id: "Pandas", group: 4, level: 5 },
  ],
  links: [
    { source: "Computer Science", target: "Web Development" },
    { source: "Computer Science", target: "AI & ML" },
    { source: "Computer Science", target: "Data Science" },
    { source: "Web Development", target: "React" },
    { source: "Web Development", target: "Node.js" },
    { source: "Web Development", target: "CSS" },
    { source: "React", target: "Next.js" },
    { source: "Node.js", target: "MongoDB" },
    { source: "AI & ML", target: "Python" },
    { source: "Python", target: "TensorFlow" },
    { source: "Python", target: "Pandas" },
    { source: "AI & ML", target: "Groq" },
    { source: "Groq", target: "LLMs" },
    { source: "Data Science", target: "SQL" },
    { source: "Data Science", target: "Pandas" },
  ]
};

const NeuralNexus = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    if (user) {
      getUserHistory(user.id).then(history => {
        // ✅ FIX 1: Filter out null/undefined titles immediately
        const userTopics = history
            .map(h => h.title)
            .filter(t => t && typeof t === 'string'); 

        // Enhance graph data
        const processedNodes = MASTER_GRAPH.nodes.map(node => ({
            ...node,
            // ✅ FIX 2: Use optional chaining (?.) and ensure topic exists
            isActive: userTopics.some(topic => 
                topic?.toLowerCase().includes(node.id.toLowerCase())
            ),
            val: node.level
        }));

        setGraphData({ nodes: processedNodes, links: MASTER_GRAPH.links });
      }).catch(err => console.error("Graph Error:", err));
    }
  }, [user]);

  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden">
      
      {/* Header UI */}
      <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-cyan-400 hover:text-white uppercase tracking-widest text-xs mb-4">
                <ArrowLeft size={16} /> Dashboard
            </button>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 uppercase italic">
                Neural Nexus
            </h1>
            <p className="text-gray-400 text-sm max-w-sm mt-2">
                Visualizing the global knowledge graph. Active neural pathways indicate acquired skills.
            </p>
        </div>

        <div className="pointer-events-auto flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-black/50 p-2 rounded border border-white/10">
                <div className="w-3 h-3 rounded-full bg-purple-600 shadow-[0_0_10px_purple]" /> Active Skill
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-black/50 p-2 rounded border border-white/10">
                <div className="w-3 h-3 rounded-full bg-gray-700" /> Locked Node
            </div>
        </div>
      </div>

      {/* 3D Force Graph */}
      <ForceGraph3D
        graphData={graphData}
        nodeLabel="id"
        nodeColor={node => node.isActive ? "#a855f7" : "#374151"}
        nodeResolution={16}
        linkWidth={link => 2}
        linkColor={() => "rgba(100, 100, 255, 0.2)"}
        
        onNodeClick={node => {
            navigate('/', { state: { topicToGenerate: node.id } });
        }}
        
        backgroundColor="#050510"
        showNavInfo={false}
      />

      <div className="absolute bottom-10 w-full text-center pointer-events-none">
        <p className="text-cyan-500/50 text-xs font-mono animate-pulse">
            <BrainCircuit className="inline-block mr-2" size={14}/> 
            FORCE_DIRECTED_LAYOUT // RENDERING_NODES...
        </p>
      </div>

    </div>
  );
};

export default NeuralNexus;