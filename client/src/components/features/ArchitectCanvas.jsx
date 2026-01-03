import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, Background, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { evaluateArchitecture } from '../../api/axios'; // Ensure you have this API function
import { 
  Server, Database, Globe, Layers, Shield, Cpu, 
  Info, Play, CheckCircle, AlertTriangle, Loader2 
} from 'lucide-react';

// --- COMPONENT LIBRARY WITH HINTS ---
const TOOLS = [
  { 
    id: 'Load Balancer', 
    icon: <Layers size={16}/>, 
    hint: "Distributes incoming traffic across multiple servers to ensure reliability.", 
    type: 'default' 
  },
  { 
    id: 'API Gateway', 
    icon: <Globe size={16}/>, 
    hint: "Entry point for clients. Handles routing, authentication, and rate limiting.", 
    type: 'input' 
  },
  { 
    id: 'Microservice', 
    icon: <Cpu size={16}/>, 
    hint: "A small, autonomous service that performs a single task (e.g., User Auth, Payments).", 
    type: 'default' 
  },
  { 
    id: 'Database (SQL)', 
    icon: <Database size={16}/>, 
    hint: "Structured storage (e.g., PostgreSQL). Good for complex queries and transactions.", 
    type: 'output' 
  },
  { 
    id: 'Cache (Redis)', 
    icon: <Server size={16}/>, 
    hint: "High-speed storage layer to reduce database load and speed up read operations.", 
    type: 'default' 
  },
  { 
    id: 'CDN', 
    icon: <Globe size={16}/>, 
    hint: "Content Delivery Network. Serves static assets (images/video) from locations closer to user.", 
    type: 'default' 
  }
];

// --- CHALLENGES FOR TESTING MODE ---
const CHALLENGES = [
    {
        title: "Design a Scalable URL Shortener",
        desc: "Build a system like Bit.ly that handles 10M reads/day. Key: High read availability.",
        required: ["Load Balancer", "Cache (Redis)", "Database (SQL)"]
    },
    {
        title: "Design a Notification System",
        desc: "A system to send emails/SMS. Needs to handle retries and high volume.",
        required: ["Microservice", "Database (SQL)"] // Simplified requirements
    }
];

const ArchitectCanvas = () => {
  const navigate = useNavigate();
  const reactFlowWrapper = useRef(null);
  
  // State
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const [mode, setMode] = useState('LEARN'); // 'LEARN' or 'TEST'
  const [selectedTool, setSelectedTool] = useState(null); // For showing hints
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- REACT FLOW HANDLERS ---
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
        y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
      });

      const newNode = {
        id: `node_${Date.now()}`,
        type: 'default',
        position,
        data: { label: type },
        style: { 
            border: '1px solid #3b82f6', 
            padding: '10px', 
            borderRadius: '8px', 
            background: '#1e293b', 
            color: 'white',
            fontSize: '12px',
            textAlign: 'center',
            minWidth: '100px'
        }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // --- AI EVALUATION HANDLER ---
  const handleEvaluate = async () => {
    if (nodes.length === 0) {
        alert("Canvas is empty. Build something first!");
        return;
    }
    setLoading(true);
    setFeedback(null);

    try {
        // Prepare data for AI
        const nodeList = nodes.map(n => ({ id: n.id, type: n.data.label }));
        const connectionList = edges.map(e => ({ from: e.source, to: e.target }));
        const scenario = mode === 'TEST' ? CHALLENGES[currentChallenge].desc : "General Sandbox Architecture";

        const res = await evaluateArchitecture(scenario, nodeList, connectionList);
        
        if (res.success) {
            setFeedback(res.data);
        }
    } catch (err) {
        console.error(err);
        alert("Evaluation failed. Check backend connection.");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-gray-950 flex flex-col pt-20 overflow-hidden text-white">
      
      {/* 1. TOP BAR */}
      <div className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center z-20 shadow-lg">
        <div className="flex items-center gap-6">
            <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white text-xs uppercase tracking-widest transition">← Exit</button>
            
            {/* Mode Switcher */}
            <div className="flex bg-black p-1 rounded-lg border border-gray-700">
                <button 
                    onClick={() => { setMode('LEARN'); setFeedback(null); }}
                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${mode === 'LEARN' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Sandbox / Learn
                </button>
                <button 
                    onClick={() => { setMode('TEST'); setNodes([]); setEdges([]); setFeedback(null); }}
                    className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${mode === 'TEST' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Challenge Mode
                </button>
            </div>
        </div>

        {/* Action Button */}
        <button 
            onClick={handleEvaluate}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/20'}`}
        >
            {loading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>}
            {mode === 'TEST' ? 'Submit Design' : 'Analyze Architecture'}
        </button>
      </div>

      <div className="flex-1 flex relative">
        
        {/* 2. LEFT SIDEBAR (TOOLBOX & HINTS) */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col gap-6 z-10">
            
            {/* Draggable Tools */}
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Components</h3>
                <div className="grid grid-cols-1 gap-2">
                    {TOOLS.map((tool) => (
                        <div 
                            key={tool.id}
                            onDragStart={(event) => {
                                event.dataTransfer.setData('application/reactflow', tool.id);
                                setSelectedTool(tool);
                            }} 
                            onMouseEnter={() => setSelectedTool(tool)}
                            draggable 
                            className="bg-gray-800 border border-gray-700 p-3 rounded flex items-center gap-3 cursor-grab hover:border-blue-500 hover:bg-gray-750 transition active:cursor-grabbing"
                        >
                            <span className="text-blue-400">{tool.icon}</span>
                            <span className="text-sm font-medium">{tool.id}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Smart Hints Panel */}
            <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl flex-1">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Info size={16} />
                    <span className="text-xs font-bold uppercase">Component Info</span>
                </div>
                {selectedTool ? (
                    <div className="animate-in fade-in">
                        <h4 className="font-bold text-white mb-1">{selectedTool.id}</h4>
                        <p className="text-xs text-blue-200 leading-relaxed">{selectedTool.hint}</p>
                    </div>
                ) : (
                    <p className="text-xs text-gray-500 italic">Hover over a component to learn what it does.</p>
                )}
            </div>
        </div>

        {/* 3. MAIN CANVAS AREA */}
        <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
            
            {/* Challenge Header (Only in Test Mode) */}
            {mode === 'TEST' && (
                <div className="absolute top-4 left-4 right-4 z-10 bg-red-900/90 backdrop-blur-md border border-red-500/30 p-4 rounded-xl flex justify-between items-center shadow-2xl">
                    <div>
                        <h2 className="font-bold text-lg text-white flex items-center gap-2">
                            <AlertTriangle size={20} className="text-red-400"/> {CHALLENGES[currentChallenge].title}
                        </h2>
                        <p className="text-sm text-red-200">{CHALLENGES[currentChallenge].desc}</p>
                    </div>
                    {/* Challenge Navigator (Optional improvement: Add Next/Prev buttons) */}
                    <div className="text-xs font-bold bg-black/30 px-3 py-1 rounded text-red-300">
                        Challenge {currentChallenge + 1} / {CHALLENGES.length}
                    </div>
                </div>
            )}

            {/* The React Flow Canvas */}
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    snapToGrid={true}
                    snapGrid={[15, 15]}
                >
                    <Background color="#333" gap={20} />
                    <Controls className="bg-gray-800 border-gray-700 text-white" />
                    <MiniMap className="bg-gray-800 border-gray-700" nodeColor="#3b82f6" />
                </ReactFlow>
            </ReactFlowProvider>
        </div>

        {/* 4. FEEDBACK MODAL (AI RESULTS) */}
        {feedback && (
            <div className="absolute top-0 right-0 h-full w-80 bg-gray-900/95 border-l border-gray-700 p-6 z-30 shadow-2xl backdrop-blur-xl overflow-y-auto animate-in slide-in-from-right">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl uppercase italic">Architect Report</h3>
                    <button onClick={() => setFeedback(null)} className="text-gray-500 hover:text-white">✕</button>
                </div>

                {/* Score */}
                <div className="flex items-center gap-4 mb-8 bg-black/40 p-4 rounded-xl border border-gray-800">
                    <div className={`text-4xl font-black ${feedback.score > 70 ? 'text-green-500' : 'text-yellow-500'}`}>
                        {feedback.score}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">System Design Score</div>
                </div>

                {/* Strengths */}
                <div className="mb-6">
                    <h4 className="text-green-400 font-bold text-xs uppercase mb-2">Build Strengths</h4>
                    <ul className="space-y-2">
                        {feedback.strengths?.map((s, i) => (
                            <li key={i} className="text-xs text-gray-300 flex gap-2">
                                <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0"/> {s}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Weaknesses */}
                <div className="mb-6">
                    <h4 className="text-red-400 font-bold text-xs uppercase mb-2">Critical Flaws</h4>
                    <ul className="space-y-2">
                        {feedback.weaknesses?.map((w, i) => (
                            <li key={i} className="text-xs text-gray-300 flex gap-2">
                                <AlertTriangle size={12} className="text-red-500 mt-0.5 shrink-0"/> {w}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Suggestion */}
                <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="text-blue-400 font-bold text-xs uppercase mb-1">Architect's Note</h4>
                    <p className="text-xs text-blue-200 italic">"{feedback.suggestion}"</p>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default ArchitectCanvas;