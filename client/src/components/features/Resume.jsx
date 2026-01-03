import React, { useState } from 'react';
import { analyzeResume } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, AlertCircle, CheckCircle, Loader2, Target } from 'lucide-react';

const ResumeReactor = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!resume.trim() || !jobDesc.trim()) {
        alert("Please paste both your Resume and the Job Description.");
        return;
    }
    setLoading(true);
    try {
        const res = await analyzeResume(resume, jobDesc);
        setResult(res.data);
    } catch (err) { alert("Scan Failed."); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <button onClick={() => navigate('/dashboard')} className="text-gray-500 mb-6 hover:text-white">← Dashboards</button>
        <h1 className="text-4xl font-black text-purple-400 uppercase italic mb-8 flex items-center gap-3">
            <FileText size={40}/> Resume Reactor
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* INPUT SECTION */}
            <div className="space-y-6">
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">1. Paste Resume Text</label>
                    <textarea 
                        className="w-full h-40 bg-black border border-gray-700 p-3 rounded-lg text-sm text-gray-300 focus:border-purple-500 outline-none resize-none"
                        placeholder="Copy/Paste your full resume here..."
                        value={resume} onChange={e => setResume(e.target.value)}
                    />
                </div>

                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">2. Paste Job Description</label>
                    <textarea 
                        className="w-full h-40 bg-black border border-gray-700 p-3 rounded-lg text-sm text-gray-300 focus:border-purple-500 outline-none resize-none"
                        placeholder="Copy/Paste the job listing here..."
                        value={jobDesc} onChange={e => setJobDesc(e.target.value)}
                    />
                </div>

                <button 
                    onClick={handleScan} 
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                >
                    {loading ? <Loader2 className="animate-spin"/> : <>Run ATS Scan <Search size={20}/></>}
                </button>
            </div>

            {/* RESULTS SECTION */}
            <div className="bg-gray-900 border border-purple-900/50 p-8 rounded-xl min-h-[500px] relative">
                {!result ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600 text-center">
                        <Target size={64} className="mb-4 opacity-50"/>
                        <p>Waiting for data to analyze...</p>
                    </div>
                ) : (
                    <div className="animate-in fade-in space-y-8">
                        {/* Score Header */}
                        <div className="text-center">
                            <div className="text-xs font-bold text-gray-500 uppercase mb-2">ATS Match Score</div>
                            <div className={`text-6xl font-black ${result.score > 75 ? 'text-green-400' : result.score > 50 ? 'text-yellow-400' : 'text-red-500'}`}>
                                {result.score}%
                            </div>
                            <p className="text-sm text-gray-300 mt-2 italic">"{result.summary}"</p>
                        </div>

                        {/* Missing Keywords */}
                        <div>
                            <h3 className="text-red-400 font-bold uppercase text-xs mb-3 flex items-center gap-2">
                                <AlertCircle size={16}/> Missing Keywords
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {result.missingKeywords.length > 0 ? (
                                    result.missingKeywords.map((kw, i) => (
                                        <span key={i} className="bg-red-900/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-sm">
                                            {kw}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-green-500 text-sm">None! You matched everything.</span>
                                )}
                            </div>
                        </div>

                        {/* Red Flags */}
                        <div>
                            <h3 className="text-yellow-400 font-bold uppercase text-xs mb-3 flex items-center gap-2">
                                <AlertCircle size={16}/> Potential Red Flags
                            </h3>
                            <ul className="space-y-2">
                                {result.redFlags.length > 0 ? (
                                    result.redFlags.map((flag, i) => (
                                        <li key={i} className="flex gap-2 text-sm text-gray-300">
                                            <span className="text-yellow-500">•</span> {flag}
                                        </li>
                                    ))
                                ) : (
                                    <span className="text-green-500 text-sm">Clean resume! No red flags detected.</span>
                                )}
                            </ul>
                        </div>

                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeReactor;