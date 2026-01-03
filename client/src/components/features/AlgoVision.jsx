import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, RotateCcw, BarChart2, Share2, Cpu, ArrowRightLeft, Network } from 'lucide-react';

const AlgoVision = () => {
  const navigate = useNavigate();
  
  // --- GLOBAL STATE ---
  const [mode, setMode] = useState('sorting'); // 'sorting' or 'graph'
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [statusText, setStatusText] = useState("System Ready");

  // --- SORTING STATE ---
  const [array, setArray] = useState([]);
  const [sortAlgo, setSortAlgo] = useState('bubble');
  const [compareIndices, setCompareIndices] = useState([]);
  const [swapIndices, setSwapIndices] = useState([]);

  // --- GRAPH STATE ---
  const [graphAlgo, setGraphAlgo] = useState('dijkstra');
  const [activeNode, setActiveNode] = useState(null); // Node currently processing
  const [visitedNodes, setVisitedNodes] = useState([]); // Nodes finalized
  const [highlightEdge, setHighlightEdge] = useState(null); // Edge currently processing
  const [distances, setDistances] = useState({}); // { 0: 0, 1: Infinity... }
  
  // Fixed Graph Structure (6 Nodes)
  const GRAPH_NODES = [
    { id: 0, x: 100, y: 150, label: 'A' },
    { id: 1, x: 300, y: 50,  label: 'B' },
    { id: 2, x: 300, y: 250, label: 'C' },
    { id: 3, x: 500, y: 50,  label: 'D' },
    { id: 4, x: 500, y: 250, label: 'E' },
    { id: 5, x: 700, y: 150, label: 'F' },
  ];

  const GRAPH_EDGES = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 2 },
    { from: 1, to: 2, weight: 1 }, // B->C
    { from: 1, to: 3, weight: 5 },
    { from: 2, to: 3, weight: 8 },
    { from: 2, to: 4, weight: 10 },
    { from: 3, to: 4, weight: 2 },
    { from: 3, to: 5, weight: 6 },
    { from: 4, to: 5, weight: 3 },
  ];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // ==============================
  // 📊 SORTING LOGIC
  // ==============================
  const resetArray = () => {
    if (isRunning) return;
    const newArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 80) + 10);
    setArray(newArray);
    setCompareIndices([]);
    setSwapIndices([]);
    setStatusText("Array Initialized");
  };

  useEffect(() => { resetArray(); }, []);

  const runBubbleSort = async () => {
    setIsRunning(true);
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setCompareIndices([j, j + 1]);
        setStatusText(`Comparing indices ${j} & ${j+1}`);
        await sleep(100 - speed);
        if (arr[j] > arr[j + 1]) {
          setSwapIndices([j, j + 1]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(100 - speed);
        }
        setSwapIndices([]);
      }
    }
    setIsRunning(false);
    setStatusText("Sort Complete");
  };

  const runQuickSort = async () => {
    setIsRunning(true);
    await quickSortHelper([...array], 0, array.length - 1);
    setIsRunning(false);
    setStatusText("Sort Complete");
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await Promise.all([quickSortHelper(arr, low, pi - 1), quickSortHelper(arr, pi + 1, high)]);
    }
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setCompareIndices([j, high]);
      await sleep(100 - speed);
      if (arr[j] < pivot) {
        i++;
        setSwapIndices([i, j]);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(100 - speed);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    return i + 1;
  };

  // ==============================
  // 🕸️ GRAPH LOGIC
  // ==============================
  const resetGraph = () => {
    setDistances({});
    setVisitedNodes([]);
    setActiveNode(null);
    setHighlightEdge(null);
    setStatusText("Graph Reset. Ready for Algorithms.");
  };

  // --- DIJKSTRA ---
  const runDijkstra = async () => {
    setIsRunning(true);
    setStatusText("Initializing Dijkstra...");
    
    const dist = {};
    const visited = new Set();
    GRAPH_NODES.forEach(n => dist[n.id] = Infinity);
    dist[0] = 0; // Start at A
    setDistances({...dist});

    const pq = [0]; // Priority Queue (Simplified)

    while (pq.length > 0) {
      // Find min distance node
      pq.sort((a, b) => dist[a] - dist[b]);
      const u = pq.shift();

      if (visited.has(u)) continue;
      visited.add(u);
      
      setActiveNode(u);
      setVisitedNodes(Array.from(visited));
      setStatusText(`Visiting Node ${GRAPH_NODES[u].label} (Dist: ${dist[u]})`);
      await sleep(1000 - speed * 8);

      // Check neighbors
      const neighbors = GRAPH_EDGES.filter(e => e.from === u);
      for (let edge of neighbors) {
        setHighlightEdge(edge);
        setStatusText(`Checking path ${GRAPH_NODES[edge.from].label} -> ${GRAPH_NODES[edge.to].label} (Weight: ${edge.weight})`);
        await sleep(1000 - speed * 8);

        if (dist[u] + edge.weight < dist[edge.to]) {
          dist[edge.to] = dist[u] + edge.weight;
          setDistances({...dist});
          pq.push(edge.to);
        }
      }
    }
    
    setHighlightEdge(null);
    setActiveNode(null);
    setIsRunning(false);
    setStatusText("Shortest Paths Found!");
  };

  // --- BELLMAN-FORD ---
  const runBellmanFord = async () => {
    setIsRunning(true);
    setStatusText("Initializing Bellman-Ford...");
    
    const dist = {};
    GRAPH_NODES.forEach(n => dist[n.id] = Infinity);
    dist[0] = 0;
    setDistances({...dist});

    // V-1 Iterations
    for (let i = 0; i < GRAPH_NODES.length - 1; i++) {
        setStatusText(`Iteration ${i + 1}: Relaxing Edges...`);
        let change = false;
        
        for (let edge of GRAPH_EDGES) {
            setHighlightEdge(edge);
            setActiveNode(edge.from);
            await sleep(500 - speed * 4);

            if (dist[edge.from] !== Infinity && dist[edge.from] + edge.weight < dist[edge.to]) {
                dist[edge.to] = dist[edge.from] + edge.weight;
                setDistances({...dist});
                change = true;
            }
        }
        if (!change) break; // Optimization
    }

    setIsRunning(false);
    setHighlightEdge(null);
    setActiveNode(null);
    setStatusText("Bellman-Ford Complete (Negative cycles check skipped)");
  };

  // --- FLOYD-WARSHALL ---
  const runFloydWarshall = async () => {
    setIsRunning(true);
    setStatusText("Initializing Floyd-Warshall Matrix...");

    // Initialize Matrix
    const dist = Array(6).fill(null).map(() => Array(6).fill(Infinity));
    GRAPH_NODES.forEach((n, i) => dist[i][i] = 0);
    GRAPH_EDGES.forEach(e => dist[e.from][e.to] = e.weight);

    // Visual hack: We only visualize distances from Source A (0) to keep UI consistent
    // but the algo computes ALL pairs in background.
    
    for (let k = 0; k < 6; k++) {
        setActiveNode(k); // Pivot Node
        setStatusText(`Pivoting through Node ${GRAPH_NODES[k].label}...`);
        
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                setHighlightEdge({ from: i, to: j }); // Virtual check
                
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    
                    // Update UI if Source is A (0)
                    if (i === 0) {
                        const currentDistances = {};
                        dist[0].forEach((d, idx) => currentDistances[idx] = d);
                        setDistances({...currentDistances});
                        await sleep(300 - speed * 2);
                    }
                }
            }
        }
    }
    setIsRunning(false);
    setHighlightEdge(null);
    setActiveNode(null);
    setStatusText("All-Pairs Shortest Paths Computed");
  };

  const handleStart = () => {
    if (mode === 'sorting') {
      if (sortAlgo === 'bubble') runBubbleSort();
      else runQuickSort();
    } else {
      if (graphAlgo === 'dijkstra') runDijkstra();
      else if (graphAlgo === 'bellman') runBellmanFord();
      else runFloydWarshall();
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 relative overflow-hidden flex flex-col items-center">
      
      {/* Background FX */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* HEADER & CONTROLS */}
      <div className="z-10 w-full max-w-5xl mb-8 flex flex-col md:flex-row justify-between items-end border-b border-green-500/30 pb-6 bg-black/40 backdrop-blur-md p-6 rounded-2xl">
        <div className="mb-4 md:mb-0">
            <button onClick={() => navigate('/dashboard')} className="text-green-500 hover:text-white mb-2 uppercase tracking-widest text-xs block text-left">← Return to Base</button>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 flex items-center gap-3">
                <Cpu size={40} /> Algo-Vision
            </h1>
            <p className="text-gray-400 font-mono text-sm mt-1">{statusText}</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
            {/* Mode Switcher */}
            <div className="bg-gray-900 rounded-lg p-1 border border-gray-700 flex">
                <button onClick={() => {setMode('sorting'); resetArray();}} className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 ${mode === 'sorting' ? 'bg-green-600 text-black' : 'text-gray-400'}`}>
                    <BarChart2 size={16} /> Sorting
                </button>
                <button onClick={() => {setMode('graph'); resetGraph();}} className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 ${mode === 'graph' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>
                    <Network size={16} /> Graphs
                </button>
            </div>

            <div className="h-8 w-[1px] bg-white/20 hidden md:block" />

            {/* Algorithm Select */}
            <select 
                disabled={isRunning}
                className="bg-black text-green-400 border border-green-500/30 rounded-lg px-4 py-2 outline-none font-mono text-sm"
                value={mode === 'sorting' ? sortAlgo : graphAlgo}
                onChange={(e) => mode === 'sorting' ? setSortAlgo(e.target.value) : setGraphAlgo(e.target.value)}
            >
                {mode === 'sorting' ? (
                    <>
                        <option value="bubble">Bubble Sort</option>
                        <option value="quick">Quick Sort</option>
                    </>
                ) : (
                    <>
                        <option value="dijkstra">Dijkstra (Greedy)</option>
                        <option value="bellman">Bellman-Ford (DP)</option>
                        <option value="floyd">Floyd-Warshall (All-Pairs)</option>
                    </>
                )}
            </select>

            <button onClick={handleStart} disabled={isRunning} className="px-6 py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.4)] disabled:opacity-50">
                <Play size={18} /> RUN
            </button>
            <button onClick={mode === 'sorting' ? resetArray : resetGraph} disabled={isRunning} className="p-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700">
                <RotateCcw size={18} />
            </button>
        </div>
      </div>

      {/* --- VISUALIZATION AREA --- */}
      <div className="w-full max-w-5xl h-[500px] bg-black/40 border border-green-500/20 rounded-2xl backdrop-blur-sm relative shadow-2xl flex items-center justify-center overflow-hidden">
        
        {/* SORTING VISUALIZER */}
        {mode === 'sorting' && (
            <div className="flex items-end justify-center gap-1 w-full h-full pb-4 px-8">
                {array.map((value, idx) => {
                    let color = "bg-green-500/30 border-green-500/50";
                    if (compareIndices.includes(idx)) color = "bg-yellow-500 border-yellow-400 shadow-[0_0_15px_gold]";
                    if (swapIndices.includes(idx)) color = "bg-red-600 border-red-500 shadow-[0_0_15px_red]";
                    return <div key={idx} className={`flex-1 border-t border-l border-r rounded-t-sm transition-all duration-100 ${color}`} style={{ height: `${value}%` }} />;
                })}
            </div>
        )}

        {/* GRAPH VISUALIZER */}
        {mode === 'graph' && (
            <div className="relative w-full h-full">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
                        </marker>
                    </defs>
                    {GRAPH_EDGES.map((edge, i) => {
                        const start = GRAPH_NODES[edge.from];
                        const end = GRAPH_NODES[edge.to];
                        const isActive = highlightEdge && highlightEdge.from === edge.from && highlightEdge.to === edge.to;
                        return (
                            <g key={i}>
                                <line 
                                    x1={start.x} y1={start.y} 
                                    x2={end.x} y2={end.y} 
                                    stroke={isActive ? '#facc15' : '#4b5563'} 
                                    strokeWidth={isActive ? 4 : 2}
                                    markerEnd="url(#arrowhead)"
                                />
                                {/* Weight Label */}
                                <text x={(start.x+end.x)/2} y={(start.y+end.y)/2 - 10} fill={isActive ? '#facc15' : '#9ca3af'} fontSize="14" fontWeight="bold">
                                    {edge.weight}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {GRAPH_NODES.map((node) => {
                    const isVisited = visitedNodes.includes(node.id);
                    const isActive = activeNode === node.id;
                    const distance = distances[node.id] === Infinity ? '∞' : distances[node.id];
                    
                    return (
                        <div 
                            key={node.id}
                            className={`absolute w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-500 z-10
                                ${isActive ? 'bg-yellow-900/80 border-yellow-400 scale-125 shadow-[0_0_20px_gold]' : 
                                  isVisited ? 'bg-blue-900/80 border-blue-400 shadow-[0_0_15px_blue]' : 
                                  'bg-gray-900 border-gray-600'}`}
                            style={{ left: node.x - 28, top: node.y - 28 }}
                        >
                            <span className="text-white font-bold text-lg">{node.label}</span>
                            <span className="text-[10px] text-cyan-300 font-mono bg-black/50 px-1 rounded">{distance}</span>
                        </div>
                    );
                })}
            </div>
        )}

      </div>
    </div>
  );
};

export default AlgoVision;