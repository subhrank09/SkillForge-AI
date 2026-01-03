import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, XCircle, Search, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CertVerify = () => {
  const { hashId } = useParams(); // Allow verifying via URL /verify/:hashId
  const [hash, setHash] = useState(hashId || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.get(`http://localhost:9000/api/cert/verify/${hash}`);
      if (res.data.valid) setResult({ valid: true, ...res.data.data });
      else setResult({ valid: false });
    } catch (err) {
      setResult({ valid: false });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (hashId) handleVerify();
  }, [hashId]);

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24 flex flex-col items-center">
       <div className="w-full max-w-2xl text-center">
          <button onClick={() => navigate('/dashboard')} className="text-gray-500 mb-6 hover:text-white">← Dashboard</button>
          <Award size={64} className="mx-auto text-green-500 mb-6" />
          <h1 className="text-4xl font-black uppercase italic mb-8">Certi-Vault Verification</h1>
          
          <form onSubmit={handleVerify} className="relative mb-12">
             <input 
                value={hash} 
                onChange={(e) => setHash(e.target.value)}
                placeholder="Paste Certificate Hash ID..."
                className="w-full bg-gray-900 border border-gray-700 p-4 rounded-full text-center font-mono text-cyan-400 focus:border-green-500 outline-none"
             />
             <button disabled={loading} className="absolute right-2 top-2 bg-gray-800 p-2 rounded-full hover:bg-green-600 transition">
                <Search size={20} />
             </button>
          </form>

          {result && (
              <div className={`p-8 rounded-2xl border-2 animate-in zoom-in ${result.valid ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}>
                  {result.valid ? (
                      <div className="text-left">
                          <div className="flex items-center gap-3 mb-4 text-green-400 font-bold uppercase tracking-widest">
                              <ShieldCheck /> Verified Authentic
                          </div>
                          <p className="text-gray-400 text-sm">Issued To:</p>
                          <h2 className="text-3xl font-bold text-white mb-4">{result.userName}</h2>
                          
                          <p className="text-gray-400 text-sm">Achievement:</p>
                          <h3 className="text-xl text-white mb-4">{result.title} <span className="text-xs bg-gray-700 px-2 py-1 rounded ml-2">{result.type}</span></h3>
                          
                          <p className="text-gray-400 text-sm">Issue Date:</p>
                          <p className="font-mono text-green-300">{new Date(result.issueDate).toLocaleString()}</p>
                          
                          <div className="mt-6 pt-6 border-t border-green-500/30">
                              <p className="text-[10px] text-gray-500 font-mono break-all">ID: {result.hash}</p>
                          </div>
                      </div>
                  ) : (
                      <div className="text-red-500 flex flex-col items-center gap-4">
                          <XCircle size={48} />
                          <h3 className="text-2xl font-bold">Invalid Certificate</h3>
                          <p className="text-red-300">This hash does not exist in the ledger.</p>
                      </div>
                  )}
              </div>
          )}
       </div>
    </div>
  );
};

export default CertVerify;