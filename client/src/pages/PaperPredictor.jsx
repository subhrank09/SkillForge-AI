import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictQuestions } from '../api/axios';
import { UploadCloud, FileText, ArrowRight, Loader2, Sparkles } from 'lucide-react';

const PaperPredictor = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const navigate = useNavigate();

  const handlePredict = async () => {
    if (!file) return alert("Please upload a question paper PDF");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('paper', file);
      const data = await predictQuestions(formData);
      setPredictions(data.predictions);
    } catch (error) {
      console.error(error);
      alert("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black z-0" />

      <div className="max-w-4xl w-full z-10">
        <button onClick={() => navigate('/home')} className="text-gray-500 hover:text-white mb-8">&larr; Back Home</button>
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Exam Oracle
          </h1>
          <p className="text-xl text-gray-400">Upload previous year papers. AI will predict what comes next.</p>
        </div>

        {!predictions ? (
          <div className="bg-gray-900/80 border border-gray-800 p-12 rounded-3xl text-center max-w-xl mx-auto">
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-10 hover:border-yellow-500 transition-colors relative group cursor-pointer">
              <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <UploadCloud className="mx-auto text-gray-500 group-hover:text-yellow-500 mb-4 transition-colors" size={48} />
              <p className="text-gray-300 font-medium text-lg">{file ? file.name : "Drop Question Paper PDF"}</p>
            </div>
            <button onClick={handlePredict} disabled={loading} className="w-full mt-8 bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : <>Predict Questions <Sparkles size={20} /></>}
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {predictions.map((item, idx) => (
              <div key={idx} className="bg-gray-900/90 border border-gray-800 p-6 rounded-xl flex gap-4 hover:border-yellow-500/50 transition-colors">
                <div className="text-4xl font-bold text-gray-700">#{idx + 1}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.question}</h3>
                  <div className="flex gap-3 text-sm">
                    <span className="text-yellow-400 px-2 py-1 bg-yellow-500/10 rounded border border-yellow-500/20">{item.probability} Probability</span>
                    <span className="text-gray-400">Reason: {item.reason}</span>
                  </div>
                </div>
              </div>
            ))}
             <button onClick={() => setPredictions(null)} className="mx-auto mt-8 text-gray-400 hover:text-white">Analyze Another</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperPredictor;