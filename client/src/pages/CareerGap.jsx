import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateGapCourse, addToHistory } from '../api/axios';
import { useUser } from "@clerk/clerk-react";
import { UploadCloud, FileText, Briefcase, ArrowRight, Loader2 } from 'lucide-react';

const CareerGap = () => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleAnalyze = async () => {
    if (!file || !jobDesc) return alert("Please upload a resume and job description");
    // Inside handleAnalyze function:
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDesc);
    formData.append('language', 'English'); // Default for now
    setLoading(true);
    try {
      // 1. Build FormData (Required for sending files)
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDesc);

      // 2. Send to Backend
      const data = await generateGapCourse(formData);

      // 3. Save to History
      if (user) await addToHistory(user.id, data._id, data.topic);

      // 4. Redirect to the generated Course Map
      navigate(`/course/${data._id}`);

    } catch (error) {
      console.error("Gap Analysis Failed:", error);
      alert("Analysis failed. Please try again with a simpler PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left: Text Info */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-700 text-sm text-purple-300 mb-6">
            <Briefcase size={14} />
            <span>Career Accelerator</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Bridge the Gap.
          </h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Don't study random topics. <br />
            Upload your resume and a target job description. <br />
            Our AI will find exactly what you are missing and build a custom curriculum to get you hired.
          </p>
          
          <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-white transition-colors">
            &larr; Back 
          </button>
        </div>

        {/* Right: The Form */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-2xl">
          
          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">1. Your Resume (PDF)</label>
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors relative group bg-black/20">
              <input 
                type="file" 
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="mx-auto text-gray-500 group-hover:text-blue-500 transition-colors mb-2" size={32} />
              <p className="text-gray-300 font-medium">{file ? file.name : "Click or Drag PDF Here"}</p>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-400 mb-2">2. Target Job Description</label>
            <textarea 
              className="w-full bg-black/50 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 h-32 resize-none placeholder:text-gray-600"
              placeholder="Paste the job requirements here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Analyze & Build Path"}
            {!loading && <ArrowRight />}
          </button>

        </div>
      </div>
    </div>
  );
};

export default CareerGap;