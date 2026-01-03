import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  const mainLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Support", path: "/support" },
    { name: "Career Gap", path: "/career" }
  ];

  return (
    // FIX: Removed 'bg-black'. Added 'bg-black/10 backdrop-blur-sm' for transparency.
    <footer className="w-full py-10 mt-20 border-t border-white/10 bg-black/10 backdrop-blur-sm text-center relative z-10">
      
      {/* Main Navigation */}
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        {mainLinks.map((link) => (
          <button 
            key={link.name}
            onClick={() => navigate(link.path)}
            className="text-gray-400 hover:text-white font-medium transition-colors"
          >
            {link.name}
          </button>
        ))}
      </div>

      {/* Legal Links (Smaller, darker) */}
      <div className="flex justify-center gap-6 text-xs text-gray-400/80 mb-4">
        <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">
          Privacy Policy
        </button>
        <span>•</span>
        <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">
          Terms of Service
        </button>
      </div>

      <p className="text-gray-500 text-xs">
        © 2025 SkillForge AI. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;