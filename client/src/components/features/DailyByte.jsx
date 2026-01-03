// import React, { useEffect, useState } from 'react';
// import { getTechNews } from '../../api/axios';
// import { Newspaper, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const DailyByte = () => {
//   const navigate = useNavigate();
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchNews = async () => {
//     setLoading(true);
//     try {
//       const res = await getTechNews();
//       // Handle response structure safely
//       if (res.data && res.data.news) setNews(res.data.news);
//       else if (res.data && res.data.data && res.data.data.news) setNews(res.data.data.news);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => { fetchNews(); }, []);

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-white p-8 pt-24 flex flex-col items-center">
//        <div className="w-full max-w-6xl">
//           <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
//               <div>
//                   <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-white text-xs uppercase mb-2">← Back</button>
//                   <h1 className="text-4xl font-bold flex items-center gap-3">
//                       <Newspaper className="text-green-400" /> The Daily Byte
//                   </h1>
//                   <p className="text-gray-400 mt-2">Curated tech intelligence for developers.</p>
//               </div>
//               <button onClick={fetchNews} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
//                   <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
//               </button>
//           </div>

//           {loading ? (
//               <div className="flex justify-center py-20"><Loader2 className="animate-spin text-green-500" size={40} /></div>
//           ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {news.map((item, i) => (
//                       <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-green-500/50 transition-all group">
//                           <div className="flex justify-between items-start mb-4">
//                               <span className="text-xs font-mono text-green-400 bg-green-900/20 px-2 py-1 rounded uppercase">{item.category}</span>
//                               <span className={`text-xs font-bold px-2 py-1 rounded ${item.impact === 'High' ? 'bg-red-900/20 text-red-400' : 'bg-blue-900/20 text-blue-400'}`}>
//                                   {item.impact} Impact
//                               </span>
//                           </div>
//                           <h3 className="text-xl font-bold mb-3 group-hover:text-green-300 transition-colors">{item.title}</h3>
//                           <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.summary}</p>
//                           <div className="w-full h-px bg-gray-800 group-hover:bg-green-500/30 transition-colors" />
//                       </div>
//                   ))}
//               </div>
//           )}
//        </div>
//     </div>
//   );
// };

// export default DailyByte;

import React, { useEffect, useState } from 'react';
import { getTechNews } from '../../api/axios'; // Ensure this matches your actual export
import { Newspaper, Loader2, RefreshCw, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DailyByte = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    setNews([]); // Clear old news while fetching
    try {
      // Set date for UI
      const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      setCurrentDate(date);

      const res = await getTechNews();
      
      // Robust data handling
      if (res.data?.data?.news) {
          setNews(res.data.data.news);
      } else if (res.data?.news) {
          setNews(res.data.news);
      } else {
          console.warn("Unexpected data structure:", res);
      }
    } catch (err) {
      console.error("News fetch failed:", err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 pt-24 flex flex-col items-center">
       <div className="w-full max-w-6xl">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-800 pb-6 gap-4">
              <div>
                  <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-white text-xs uppercase mb-2 transition-colors">← Back to Command</button>
                  <h1 className="text-4xl font-black flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 uppercase italic">
                      <Newspaper className="text-green-400" size={36} /> The Daily Byte
                  </h1>
                  <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm font-mono">
                      <Calendar size={14}/> {currentDate || "Loading Date..."}
                  </div>
              </div>
              <button 
                onClick={fetchNews} 
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 hover:border-green-500 hover:text-green-400 rounded-lg transition-all text-sm font-bold"
              >
                  <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                  {loading ? "Syncing..." : "Refresh Feed"}
              </button>
          </div>

          {/* News Grid */}
          {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                  <Loader2 className="animate-spin text-green-500" size={48} />
                  <p className="text-green-500/50 font-mono text-sm animate-pulse">Establishing Uplink to Tech News Stream...</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {news.map((item, i) => (
                      <div key={i} className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:bg-gray-900 hover:border-green-500/50 transition-all group relative overflow-hidden">
                          
                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                          <div className="flex justify-between items-start mb-4 relative z-10">
                              <span className="text-[10px] font-black font-mono text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-900/50 uppercase tracking-wider">
                                  {item.category}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide border ${item.impact === 'High' ? 'bg-red-950/30 text-red-400 border-red-900/30' : 'bg-blue-950/30 text-blue-400 border-blue-900/30'}`}>
                                  {item.impact} Priority
                              </span>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-green-400 transition-colors leading-tight relative z-10">
                              {item.title}
                          </h3>
                          
                          <p className="text-gray-400 text-sm leading-relaxed mb-6 relative z-10">
                              {item.summary}
                          </p>
                      </div>
                  ))}
              </div>
          )}
       </div>
    </div>
  );
};

export default DailyByte;