import React, { useState, useEffect, useRef } from 'react';
import { generateDeployConfig } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Rocket, Server, Code, Terminal, CheckCircle, Download, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const DeployDroid = () => {
  const navigate = useNavigate();
  const [stack, setStack] = useState("React + Vite");
  const [platform, setPlatform] = useState("Vercel");
  const [status, setStatus] = useState("IDLE"); // IDLE, BUILDING, SUCCESS
  const [logs, setLogs] = useState([]);
  const [configContent, setConfigContent] = useState("");
  
  const logEndRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (msg) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleDeploy = async () => {
    setStatus("BUILDING");
    setLogs(["Initializing Launch Sequence...", "Connecting to Cloud Provider..."]);
    
    try {
        // 1. Simulate Build Steps
        setTimeout(() => addLog(`Analyzing ${stack} structure...`), 800);
        setTimeout(() => addLog("Optimizing assets..."), 1600);
        setTimeout(() => addLog("Minifying bundles..."), 2400);
        
        // 2. Fetch Config from AI
        const res = await generateDeployConfig(stack, platform);
        setConfigContent(res.data);
        
        setTimeout(() => {
            addLog(`Generating ${platform} configuration...`);
            addLog("Validating build artifacts...");
        }, 3200);

        setTimeout(() => {
            setStatus("SUCCESS");
            addLog("🚀 DEPLOYMENT READY FOR DOWNLOAD");
        }, 4500);

    } catch (err) {
        setStatus("IDLE");
        alert("Deployment Simulation Failed.");
    }
  };

  const downloadPackage = async () => {
    const zip = new JSZip();
    
    // Add the AI generated config file
    const filename = platform === "Vercel" ? "vercel.json" : platform === "Netlify" ? "netlify.toml" : "Dockerfile";
    zip.file(filename, configContent);
    
    // Add a dummy readme
    zip.file("README.md", `# Deployment Instructions\n\n1. This project is configured for ${platform}.\n2. Upload this folder to your provider.\n3. Enjoy!`);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${stack.replace(/ /g, '_')}_deploy_kit.zip`);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <button onClick={() => navigate('/arcade')} className="text-gray-500 mb-6 hover:text-white">← Arcade</button>
        <h1 className="text-4xl font-black text-orange-500 uppercase italic mb-8 flex items-center gap-3">
            <Rocket size={40}/> Deploy Droid
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Control Panel */}
            <div className="bg-gray-900 border border-orange-900/50 p-8 rounded-xl h-fit">
                <div className="mb-6">
                    <label className="text-xs font-bold text-gray-500 uppercase">Project Stack</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {["React + Vite", "Next.js", "Node.js API", "Python Flask"].map(s => (
                            <button 
                                key={s} 
                                onClick={() => setStack(s)}
                                className={`p-3 rounded border text-sm font-bold transition-all ${stack === s ? 'bg-orange-600 border-orange-500 text-black' : 'bg-black border-gray-700 text-gray-400'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <label className="text-xs font-bold text-gray-500 uppercase">Target Platform</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {["Vercel", "Netlify", "Docker"].map(p => (
                            <button 
                                key={p} 
                                onClick={() => setPlatform(p)}
                                className={`p-3 rounded border text-sm font-bold transition-all ${platform === p ? 'bg-blue-600 border-blue-500 text-white' : 'bg-black border-gray-700 text-gray-400'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleDeploy} 
                    disabled={status === "BUILDING" || status === "SUCCESS"}
                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                        status === "SUCCESS" ? "bg-green-600 text-white" : "bg-gradient-to-r from-orange-600 to-red-600 hover:scale-105 text-white"
                    }`}
                >
                    {status === "BUILDING" ? <Loader2 className="animate-spin"/> : status === "SUCCESS" ? <CheckCircle/> : <Rocket/>}
                    {status === "BUILDING" ? "Initializing..." : status === "SUCCESS" ? "Ready" : "Launch Deployment"}
                </button>
            </div>

            {/* Holographic Terminal */}
            <div className="bg-black border border-gray-800 rounded-xl p-6 font-mono text-sm relative overflow-hidden flex flex-col h-[500px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-purple-500 animate-pulse"/>
                <div className="flex items-center gap-2 mb-4 text-gray-500 border-b border-gray-800 pb-2">
                    <Terminal size={14}/>
                    <span>deploy_logs.txt</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-2 text-green-400/80">
                    {logs.length === 0 && <div className="text-gray-700 italic">Waiting for launch command...</div>}
                    {logs.map((log, i) => (
                        <div key={i} className="animate-in slide-in-from-left-2">{log}</div>
                    ))}
                    <div ref={logEndRef} />
                </div>

                {status === "SUCCESS" && (
                    <div className="mt-4 pt-4 border-t border-gray-800 animate-in fade-in slide-in-from-bottom-4">
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg mb-4">
                            <h3 className="text-green-400 font-bold mb-1">Configuration Generated</h3>
                            <p className="text-xs text-gray-400">Your {platform} config file is ready.</p>
                        </div>
                        <button 
                            onClick={downloadPackage}
                            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                        >
                            <Download size={18}/> Download Deployment Kit (.zip)
                        </button>
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};

export default DeployDroid;