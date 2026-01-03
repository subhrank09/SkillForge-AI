import React, { useState } from 'react';
import { analyzeRepo } from '../../api/axios';
import { Github, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GithubAnalyzer = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if(!url) return;
    setLoading(true);
    setReport(null);
    try {
      const res = await analyzeRepo(url);
      setReport(res.data.data);
    } catch (err) {
      alert("Error analyzing. Ensure repo is public.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-20 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-gray-900/50 to-black z-0 pointer-events-none" />

      <div className="z-10 w-full max-w-3xl">
        <button onClick={() => navigate('/dashboard')} className="mb-6 text-gray-400 hover:text-white transition">← Back</button>
        
        <div className="text-center mb-10">
            <Github className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <h1 className="text-4xl font-bold">GitHub Repo Analyzer</h1>
            <p className="text-gray-400 mt-2">Get AI feedback on your code quality for resumes.</p>
        </div>

        <div className="flex gap-2 mb-8">
            <input 
              type="text" 
              placeholder="https://github.com/username/project-name" 
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-4 text-white focus:border-blue-500 outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleAnalyze} disabled={loading} className="bg-blue-600 hover:bg-blue-500 px-8 rounded-lg font-bold transition flex items-center">
              {loading ? <Loader2 className="animate-spin" /> : "Analyze"}
            </button>
        </div>

        {report && (
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl animate-fade-in">
                <div className="flex justify-between items-center border-b border-gray-700 pb-6 mb-6">
                    <h2 className="text-2xl font-bold">Analysis Report</h2>
                    <div className="text-center">
                        <span className="text-sm text-gray-400 uppercase tracking-wider">Rating</span>
                        <div className="text-4xl font-black text-green-400">{report.rating}/10</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="flex items-center gap-2 font-bold text-green-400 mb-4"><CheckCircle size={20}/> Strengths</h3>
                        <ul className="space-y-2">
                            {report.strengths.map((s, i) => (
                                <li key={i} className="text-gray-300 text-sm bg-green-900/10 p-2 rounded border border-green-900/30">{s}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="flex items-center gap-2 font-bold text-red-400 mb-4"><AlertCircle size={20}/> Improvements</h3>
                        <ul className="space-y-2">
                            {report.improvements.map((s, i) => (
                                <li key={i} className="text-gray-300 text-sm bg-red-900/10 p-2 rounded border border-red-900/30">{s}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default GithubAnalyzer;