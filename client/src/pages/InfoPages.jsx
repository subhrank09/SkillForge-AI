import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, LifeBuoy, Users, CheckCircle } from 'lucide-react';

const InfoLayout = ({ title, icon, children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <button onClick={() => navigate('/')} className="text-gray-500 mb-8 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft size={16}/> Back to Home
        </button>
        
        <div className="border-b border-gray-800 pb-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-gray-900 rounded-2xl text-purple-500 border border-gray-800">
                    {icon}
                </div>
                <h1 className="text-5xl font-black uppercase italic tracking-tighter">{title}</h1>
            </div>
        </div>
        
        <div className="text-gray-300 leading-relaxed text-lg space-y-6">
            {children}
        </div>
      </div>
    </div>
  );
};

// --- EXPORTED PAGES ---

export const AboutPage = () => (
    <InfoLayout title="About Us" icon={<Users size={32}/>}>
        <p>
            SkillForge AI was born from a simple observation: <strong>Traditional education is too slow for the speed of tech.</strong>
        </p>
        <p>
            We built a "Career Flight Simulator" that allows developers to practice real-world scenarios before they step into an interview. 
            By combining Generative AI with gamified simulation, we bridge the gap between "Tutorial Hell" and "Senior Engineer."
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="font-bold text-white mb-2">Our Mission</h3>
                <p className="text-sm">To democratize senior-level mentorship for every developer on Earth.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="font-bold text-white mb-2">The Engine</h3>
                <p className="text-sm">Powered by advanced LLMs (Groq/Llama-3) and real-time evaluation logic.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="font-bold text-white mb-2">The Future</h3>
                <p className="text-sm">Expanding into DevOps, Cybersecurity, and System Architecture simulations.</p>
            </div>
        </div>
    </InfoLayout>
);

export const ContactPage = () => (
    <InfoLayout title="Contact" icon={<Mail size={32}/>}>
        <p>We'd love to hear from you. Whether you have a feature request, a bug report, or just want to say hi.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">General Inquiries</h3>
                <a href="mailto:hello@skillforge.ai" className="text-purple-400 hover:text-purple-300 text-lg font-mono">hello@skillforge.ai</a>
                <p className="text-sm text-gray-500 mt-2">Response time: 24-48 hours</p>
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Socials</h3>
                <div className="flex flex-col gap-2">
                    <a href="#" className="text-gray-400 hover:text-white transition">Twitter / X</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">LinkedIn</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">GitHub</a>
                </div>
            </div>
        </div>
    </InfoLayout>
);

export const SupportPage = () => (
    <InfoLayout title="Support" icon={<LifeBuoy size={32}/>}>
        <p className="text-xl text-white font-bold mb-4">Having trouble with the simulation?</p>
        
        <div className="space-y-4">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex gap-4">
                <CheckCircle className="text-green-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-white">System Requirements</h4>
                    <p className="text-sm mt-1">SkillForge runs best on Chrome/Edge (Desktop). Mobile support is currently in beta.</p>
                </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex gap-4">
                <CheckCircle className="text-green-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-white">AI Rate Limits</h4>
                    <p className="text-sm mt-1">If generation fails, wait 30 seconds and try again. Free tier users have 50 generations/day.</p>
                </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex gap-4">
                <CheckCircle className="text-green-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-white">Report a Bug</h4>
                    <p className="text-sm mt-1">Found a glitch in the matrix? Email <span className="text-purple-400">bugs@skillforge.ai</span> with screenshots.</p>
                </div>
            </div>
        </div>
    </InfoLayout>
);