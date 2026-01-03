import React, { useState } from 'react';
import { generateCompanyTest } from '../../api/axios';
import { Building2, Loader2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const POPULAR_COMPANIES = ["Google", "Amazon", "Microsoft", "Netflix", "Meta", "TCS"];

const CompanyOracle = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  // Default to empty so they are forced to choose or type
  const [form, setForm] = useState({ company: '', role: 'Full Stack Developer' });

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!form.company.trim()) {
        alert("Please enter a target company.");
        return;
    }
    setLoading(true);
    try {
      const res = await generateCompanyTest(form.company, form.role);
      setTestData(res.data);
      setAnswers({});
      setSubmitted(false);
    } catch (err) {
      alert("Oracle connection failed.");
    }
    setLoading(false);
  };

  const handleOptionSelect = (qId, optionIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    if (!testData) return 0;
    let score = 0;
    testData.questions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24 relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

      {/* Header */}
      <div className="z-10 text-center mb-10">
        <button onClick={() => navigate('/dashboard')} className="text-blue-500 hover:text-white mb-4 text-xs uppercase tracking-widest">← Dashboard</button>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-2 flex justify-center items-center gap-3">
            <Building2 size={48} className="text-blue-500" /> Company Oracle
        </h1>
        <p className="text-gray-400">Targeted interview calibration for your dream role.</p>
      </div>

      {/* Setup Form */}
      {!testData && (
        <div className="z-10 bg-gray-900/80 border border-blue-500/30 p-8 rounded-2xl w-full max-w-lg backdrop-blur-xl">
            <form onSubmit={handleGenerate} className="space-y-6">
                
                {/* 1. Company Selection */}
                <div>
                    <label className="block text-xs font-bold text-blue-400 uppercase mb-2">Target Company</label>
                    
                    {/* Custom Input */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            className="w-full bg-black border border-gray-700 p-3 pl-10 rounded text-white focus:border-blue-500 outline-none placeholder-gray-600"
                            placeholder="Type any company (e.g. SpaceX, Stripe, Zoho...)"
                            value={form.company}
                            onChange={(e) => setForm({...form, company: e.target.value})}
                        />
                    </div>

                    {/* Quick Select Chips */}
                    <div className="flex flex-wrap gap-2">
                        {POPULAR_COMPANIES.map(c => (
                            <button 
                                key={c} type="button"
                                onClick={() => setForm({...form, company: c})}
                                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${form.company === c ? 'bg-blue-600 border-blue-500 text-white' : 'border-gray-700 text-gray-400 hover:border-white'}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Role Selection */}
                <div>
                    <label className="block text-xs font-bold text-blue-400 uppercase mb-2">Role / Position</label>
                    <input 
                        type="text" 
                        className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-blue-500 outline-none"
                        placeholder="e.g. Frontend Engineer, Data Scientist"
                        value={form.role}
                        onChange={(e) => setForm({...form, role: e.target.value})}
                    />
                </div>

                <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-[1.02] transition-transform">
                    {loading ? <Loader2 className="animate-spin"/> : "Initialize Simulation"}
                </button>
            </form>
        </div>
      )}

      {/* Test Interface (Same as before) */}
      {testData && (
        <div className="z-10 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8">
            <div className="flex justify-between items-center mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                <div>
                    <h2 className="text-2xl font-bold text-white">{testData.testTitle}</h2>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{form.company} • {form.role}</p>
                </div>
                {!submitted && <button onClick={() => setSubmitted(true)} className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-bold shadow-lg shadow-green-900/20">Submit Test</button>}
                {submitted && <div className="text-xl font-bold text-yellow-400">Score: {calculateScore()} / 5</div>}
            </div>

            <div className="space-y-6 pb-20">
                {testData.questions.map((q, i) => (
                    <div key={q.id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                        <div className="flex gap-4 mb-4">
                            <span className="text-blue-500 font-mono text-xl">0{i+1}</span>
                            <h3 className="text-lg font-medium">{q.question}</h3>
                        </div>
                        <div className="space-y-2 pl-10">
                            {q.options.map((opt, idx) => {
                                let style = "border-gray-700 hover:bg-gray-800";
                                if (submitted) {
                                    if (idx === q.correctAnswer) style = "border-green-500 bg-green-900/20 text-green-400";
                                    else if (answers[q.id] === idx) style = "border-red-500 bg-red-900/20 text-red-400";
                                } else if (answers[q.id] === idx) {
                                    style = "border-blue-500 bg-blue-900/20 text-blue-400";
                                }

                                return (
                                    <button 
                                        key={idx} 
                                        onClick={() => handleOptionSelect(q.id, idx)}
                                        className={`w-full text-left p-3 rounded border transition-all ${style}`}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                        {submitted && (
                            <div className="mt-4 ml-10 p-4 bg-gray-800 rounded border-l-4 border-yellow-500 text-sm text-gray-300 animate-in fade-in">
                                <strong className="text-yellow-400 block mb-1">Explanation:</strong>
                                {q.explanation}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            {submitted && (
                 <button onClick={() => setTestData(null)} className="fixed bottom-8 right-8 bg-white text-black font-bold px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform">
                     Try Another Company →
                 </button>
            )}
        </div>
      )}
    </div>
  );
};

export default CompanyOracle;