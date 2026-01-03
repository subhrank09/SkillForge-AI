import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, SignInButton } from "@clerk/clerk-react";
import { 
    Cpu, Rocket, Brain, Shield, ArrowRight, Zap, 
    Gamepad2, Hammer, Newspaper // Added Gamepad2, Hammer, Newspaper
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
            <Cpu className="text-purple-500" size={32} />
            <span className="text-xl font-black tracking-tighter uppercase italic">SkillForge AI</span>
        </div>
        <div className="flex gap-4">
            {isSignedIn ? (
                <>
                    <button 
                        onClick={() => navigate('/home')}
                        className="text-gray-300 hover:text-white font-bold transition-colors hidden md:block"
                    >
                        Arcade
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
                    >
                        Dashboard
                    </button>
                </>
            ) : (
                <SignInButton mode="modal">
                    <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                        Sign In / Join
                    </button>
                </SignInButton>
            )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center mt-20 px-4">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">System Online v2.0</span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter max-w-5xl mx-auto">
            Forge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Digital Destiny.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The world's first AI-driven career architect. Simulate real-world engineering tasks, build a neural resume, and master the code.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-20">
            {isSignedIn ? (
                 <>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        Command Center <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    {/* ✅ NEW: Button to Enter Arcade (Home) */}
                    <button 
                        onClick={() => navigate('/home')}
                        className="px-8 py-4 bg-gray-900 border border-purple-500/50 text-purple-400 rounded-full font-bold text-lg hover:bg-purple-900/20 hover:text-white transition-all flex items-center gap-2"
                    >
                        <Gamepad2 size={20} /> Enter Arcade
                    </button>
                 </>
            ) : (
                <SignInButton mode="modal">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all">
                        Start Your Journey <Rocket className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                </SignInButton>
            )}
        </div>

        {/* Features Grid - NOW CLICKABLE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full px-4 mb-20">
            
            <FeatureCard 
                icon={<Hammer className="text-blue-400"/>}
                title="The Forge"
                desc="Instantly generate production-ready project boilerplates. From concept to code in seconds."
                onClick={() => navigate('/forge')}
            />
            
            <FeatureCard 
                icon={<Shield className="text-yellow-400"/>}
                title="Titan Resume"
                desc="Convert your simulated experience into a bulletproof resume that passes every ATS."
                onClick={() => navigate('/resume')}
            />

            <FeatureCard 
                icon={<Newspaper className="text-green-400"/>}
                title="The Daily Byte"
                desc="Receive AI-curated tech intelligence daily. Stay ahead of industry shifts with real-time updates."
                onClick={() => navigate('/news')}
            />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                    <Cpu className="text-purple-500" size={24} />
                    <span className="text-lg font-bold uppercase italic tracking-tighter text-white">SkillForge AI</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                    Architecting the next generation of software engineers.
                </p>
            </div>
            <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                    <li><button onClick={() => navigate('/about')} className="hover:text-purple-400 transition">About Us</button></li>
                    <li><button onClick={() => navigate('/contact')} className="hover:text-purple-400 transition">Contact</button></li>
                    <li><button onClick={() => navigate('/privacy')} className="hover:text-purple-400 transition">Privacy Policy</button></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                    <li><button onClick={() => navigate('/support')} className="hover:text-purple-400 transition">Help Center</button></li>
                    <li><button onClick={() => navigate('/terms')} className="hover:text-purple-400 transition">Terms Of Service</button></li>
                </ul>
            </div>
        </div>
        <div className="text-center text-gray-800 text-xs mt-12 pt-8 border-t border-gray-900">
            © 2025 SkillForge AI Industries. All Systems Operational.
        </div>
      </footer>
    </div>
  );
};

// ✅ UPDATED: FeatureCard now accepts onClick
const FeatureCard = ({ icon, title, desc, onClick }) => (
    <div 
        onClick={onClick}
        className={`bg-white/5 border border-white/5 p-8 rounded-2xl text-left hover:bg-white/10 transition-all group ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}`}
    >
        <div className="mb-4 p-3 bg-black/50 w-fit rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/10">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
    </div>
);

export default LandingPage;