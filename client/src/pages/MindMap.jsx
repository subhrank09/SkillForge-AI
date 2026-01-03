import React, { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { expandMindMap } from '../api/axios';
import { Loader2, Zap, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialNodes = [
  {
    id: 'root',
    type: 'input',
    data: { label: 'Click to Start' },
    position: { x: 0, y: 0 },
    style: { background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '50%', width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }
  },
];

const MindMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const handleNodeClick = async (event, node) => {
    if (loading) return;
    
    let topic = node.data.label;
    if (node.id === 'root' && topic === 'Click to Start') {
        const input = prompt("What topic do you want to explore?");
        if (!input) return;
        topic = input;
        setNodes((nds) => nds.map(n => n.id === 'root' ? { ...n, data: { label: topic } } : n));
    }

    setLoading(true);
    try {
      const data = await expandMindMap(topic, node.id);
      const radius = 250;
      const angleStep = (2 * Math.PI) / data.nodes.length;
      
      const newNodes = data.nodes.map((sub, index) => {
        const angle = index * angleStep;
        const x = node.position.x + radius * Math.cos(angle);
        const y = node.position.y + radius * Math.sin(angle);
        return {
          id: `${node.id}-${index}-${Date.now()}`,
          data: { label: sub.label },
          position: { x, y },
          style: { background: '#1e293b', color: 'white', border: '1px solid #3b82f6', borderRadius: '20px', padding: '10px', minWidth: '100px', textAlign: 'center' }
        };
      });

      const newEdges = newNodes.map((newNode) => ({
        id: `e-${node.id}-${newNode.id}`,
        source: node.id,
        target: newNode.id,
        animated: true,
        style: { stroke: '#475569' }
      }));

      setNodes((nds) => [...nds, ...newNodes]);
      setEdges((eds) => [...eds, ...newEdges]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white relative">
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
        <button onClick={() => navigate('/dashboard')} className="bg-gray-800 p-2 rounded-full hover:bg-gray-700"><RotateCcw size={20} /></button>
        <h1 className="text-xl font-bold flex items-center gap-2"><Zap className="text-purple-500" /> Infinite Mind Map</h1>
      </div>
      {loading && <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md border border-purple-500/50"><Loader2 className="animate-spin" size={16} /> Expanding Universe...</div>}
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={handleNodeClick} fitView>
        <Background color="#8b5cf6" variant="dots" gap={30} style={{ opacity: 0.1 }} />
        <Controls className="bg-gray-900 border-gray-700 fill-white" />
      </ReactFlow>
    </div>
  );
};

export default MindMap;