import React, { useState } from 'react';
import { generateDocumentation } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'; // npm install react-markdown
import { FileText, ArrowRight, Loader2, Copy, Check } from 'lucide-react';

const GhostWriter = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [docs, setDocs] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setDocs(""); 
    try {
        const res = await generateDocumentation(code);
        setDocs(res.data);
    } catch (err) {
        alert("Documentation generation failed.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(docs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <button onClick={() => navigate('/arcade')} className="text-gray-500 mb-6 hover:text-white">← Arcade</button>
        <h1 className="text-4xl font-black text-teal-400 uppercase italic mb-8 flex items-center gap-3">
            <FileText size={40}/> Ghost Writer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
            
            {/* Input Column */}
            <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2">Paste Raw Code</label>
                <textarea 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-4 font-mono text-sm text-gray-300 focus:border-teal-500 outline-none resize-none"
                    placeholder="// Paste your complex function here..."
                />
            </div>

            {/* Action Button (Mobile: Middle, Desktop: Hidden logic handle via layout) */}
            <div className="lg:hidden flex justify-center">
                 <button onClick={handleGenerate} className="bg-teal-600 px-6 py-2 rounded-full font-bold">Generate Docs</button>
            </div>

            {/* Output Column */}
            <div className="flex flex-col relative">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Generated Documentation</label>
                    {docs && (
                        <button onClick={copyToClipboard} className="text-xs flex items-center gap-1 text-teal-400 hover:text-white transition">
                            {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? "Copied" : "Copy Markdown"}
                        </button>
                    )}
                </div>
                
                <div className="flex-1 bg-black border border-teal-900 rounded-xl p-6 overflow-y-auto prose prose-invert max-w-none">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center text-teal-500">
                            <Loader2 size={40} className="animate-spin mb-4" />
                            <p className="animate-pulse">Analyzing logic structure...</p>
                        </div>
                    ) : docs ? (
                        <ReactMarkdown>{docs}</ReactMarkdown>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-700 italic">
                            Waiting for code input...
                        </div>
                    )}
                </div>
            </div>

        </div>

        {/* Generate Button (Desktop) */}
        <div className="mt-8 flex justify-center hidden lg:flex">
             <button 
                onClick={handleGenerate} 
                disabled={loading}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:scale-105 transition-transform text-white px-10 py-4 rounded-full font-bold text-xl flex items-center gap-3 shadow-[0_0_30px_rgba(20,184,166,0.3)]"
            >
                {loading ? "Writing..." : <>Generate Docs <ArrowRight /></>}
            </button>
        </div>

      </div>
    </div>
  );
};

export default GhostWriter;