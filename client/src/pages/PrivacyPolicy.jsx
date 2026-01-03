// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';

// const PrivacyPolicy = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
//       {/* Background Decor */}
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] -z-10" />
      
//       <div className="max-w-4xl mx-auto">
//         <button 
//           onClick={() => navigate('/')} 
//           className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
//         >
//           <ArrowLeft size={20} /> Back to Home
//         </button>

//         <div className="flex items-center gap-4 mb-8">
//           <div className="p-3 bg-blue-500/20 rounded-xl">
//             <Shield className="w-10 h-10 text-blue-400" />
//           </div>
//           <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
//         </div>

//         <div className="space-y-8 text-gray-300 leading-relaxed bg-gray-900/50 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm">
          
//           <section>
//             <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
//               <Eye size={20} className="text-purple-400" /> 1. Information We Collect
//             </h2>
//             <p className="mb-4">
//               We collect information you provide directly to us when you create an account, generate a course, or interact with our AI. This includes:
//             </p>
//             <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
//               <li><strong>Account Info:</strong> Name, email address, and profile picture (via Clerk Authentication).</li>
//               <li><strong>Usage Data:</strong> Learning topics, quiz scores, progress tracking, and flashcard history.</li>
//               <li><strong>User Content:</strong> Resumes and job descriptions uploaded for the Career Gap Analyzer.</li>
//             </ul>
//           </section>

//           <section>
//             <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
//               <Database size={20} className="text-green-400" /> 2. How We Use Your Data
//             </h2>
//             <p>
//               We use your information strictly to provide and improve the SkillForge AI experience:
//             </p>
//             <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400 mt-2">
//               <li>To generate personalized learning paths and lessons using LLMs (Llama-3, Gemini).</li>
//               <li>To maintain your learning history and "Daily Streak" on the dashboard.</li>
//               <li>To analyze uploaded resumes for the specific purpose of gap analysis.</li>
//             </ul>
//           </section>

//           <section>
//             <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
//               <Lock size={20} className="text-red-400" /> 3. Data Security
//             </h2>
//             <p>
//               We prioritize the security of your data. We do not sell your personal information to third parties. 
//               Uploaded files (PDFs) are processed in-memory for analysis and are not permanently stored on our servers.
//             </p>
//           </section>

//           <section className="pt-4 border-t border-gray-800">
//             <p className="text-xs text-gray-500">
//               Last Updated: December 2025. If you have questions, please contact us at support@skillforge.ai.
//             </p>
//           </section>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicy;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, Database, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <button onClick={() => navigate('/')} className="text-gray-500 mb-8 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft size={16}/> Back to Home
        </button>
        
        <div className="border-b border-gray-800 pb-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-gray-900 rounded-2xl text-green-500 border border-gray-800">
                    <Shield size={32}/>
                </div>
                <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter">Privacy Policy</h1>
                    <p className="text-gray-500 text-sm mt-1">Last Updated: December 2025</p>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
            
            <section>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Database size={18} className="text-purple-500"/> 1. Data Collection
                </h2>
                <p>
                    We collect information you provide directly to us, such as when you create an account, update your profile, or interact with our AI simulations. This includes:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-sm text-gray-400">
                    <li>Account Info: Name, email, and profile picture (via Clerk Auth).</li>
                    <li>Usage Data: Quiz scores, code submissions, and chat logs with the AI.</li>
                    <li>Technical Data: IP address, browser type, and operating system.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Eye size={18} className="text-blue-500"/> 2. AI & Data Usage
                </h2>
                <p>
                    SkillForge AI utilizes Large Language Models (LLMs) to generate content. Your inputs (e.g., code snippets, questions) may be processed by third-party AI providers (such as Groq, OpenAI, or Anthropic) solely for the purpose of generating a response. 
                </p>
                <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg mt-3 text-sm">
                    <strong>Note:</strong> We do not use your personal code submissions to train public AI models. Your learning data remains private to your session.
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Lock size={18} className="text-green-500"/> 3. Data Security
                </h2>
                <p>
                    We implement industry-standard security measures to protect your data. All sensitive information is encrypted in transit and at rest. However, no method of transmission over the Internet is 100% secure.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">4. Your Rights</h2>
                <p>
                    You have the right to access, correct, or delete your personal data. You can request a full data export or account deletion by contacting <span className="text-purple-400">privacy@skillforge.ai</span>.
                </p>
            </section>

        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-900 text-center text-gray-600 text-xs">
            © 2025 SkillForge AI Industries. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;