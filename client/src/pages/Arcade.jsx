import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bug, Zap, RefreshCw, ShieldAlert, Database, Radio, 
  History, Eye, PenTool, Globe, Terminal, Regex, Workflow, Trello, DollarSign, FileText, Briefcase, BookA, MessageCircle, TrendingDown, Rocket
} from 'lucide-react';

const GAMES = [
  // ZONE 1: THE ARENA
  { id: 'glitch', title: 'Glitch Hunt', icon: Bug, desc: 'Fix broken code against the clock.', color: 'red', path: '/arcade/glitch' },
  { id: 'speed', title: 'Syntax Speedster', icon: Zap, desc: 'Race to type complex syntax.', color: 'yellow', path: '/arcade/speedster' },
  { id: 'regex', title: 'Regex Rift', icon: Regex, desc: 'Solve pattern matching puzzles.', color: 'purple', path: '/arcade/regex' },
  
  // ZONE 2: THE GUARDIAN
  { id: 'refactor', title: 'Refactor Reactor', icon: RefreshCw, desc: 'Clean up messy code for XP.', color: 'green', path: '/arcade/refactor' },
  { id: 'sentinel', title: 'Sentinel Audit', icon: Eye, desc: 'Review AI code for vulnerabilities.', color: 'blue', path: '/audit' },
  { id: 'security', title: 'Security Breach', icon: ShieldAlert, desc: 'CTF: Hack and Patch.', color: 'red', path: '/arcade/security' },

  // ZONE 3: THE ARCHITECT
  { id: 'db', title: 'Database Dungeon', icon: Database, desc: 'Master SQL queries.', color: 'orange', path: '/arcade/db' },
  { id: 'pipeline', title: 'Pipeline Pulse', icon: Workflow, desc: 'Build valid CI/CD pipelines.', color: 'cyan', path: '/arcade/pipeline' },
  { id: 'shell', title: 'Shell-Shock', icon: Terminal, desc: 'Linux Terminal RPG.', color: 'green', path: '/shell' },
  // Add to GAMES array
{ id: 'negotiator', title: 'The Negotiator', icon: DollarSign, desc: 'Salary Negotiation Sim.', color: 'emerald', path: '/arcade/negotiator' },
{ id: 'lexicon', title: 'Lexicon Uplink', icon: BookA, desc: 'Tech Jargon Dictionary.', color: 'indigo', path: '/arcade/lexicon' },
  // ZONE 4: THE VISIONARY
  { id: 'chrono', title: 'Chrono-Shift', icon: History, desc: 'Modernize Legacy Code.', color: 'amber', path: '/arcade/chrono' },
  { id: 'oculus', title: 'Oculus', icon: PenTool, desc: 'Wireframe to Code.', color: 'indigo', path: '/arcade/oculus' },
  { id: 'freelance', title: 'Freelance Fortress', icon: Briefcase, desc: 'Proposal Generator.', color: 'yellow', path: '/arcade/freelance' },
  { id: 'pitch', title: 'The Pitch', icon: MessageCircle, desc: 'Explain Like I\'m 5.', color: 'pink', path: '/arcade/pitch' },
  { id: 'finops', title: 'FinOps Frontier', icon: TrendingDown, desc: 'Cloud Cost Optimization.', color: 'green', path: '/arcade/finops' },
];

const Arcade = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <button onClick={() => navigate('/dashboard')} className="text-gray-500 mb-6 hover:text-white">← Dashboard</button>
        <h1 className="text-5xl font-black uppercase italic mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">The Arcade</h1>
        <p className="text-gray-400 mb-12">Select your simulation module. Earn XP. Master the craft.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map((game) => (
            <div 
                key={game.id} 
                onClick={() => navigate(game.path)}
                className={`bg-gray-900/50 border border-${game.color}-500/30 p-6 rounded-xl cursor-pointer hover:scale-105 hover:bg-gray-800 transition-all group relative overflow-hidden`}
            >
                <div className={`absolute top-0 right-0 p-2 bg-${game.color}-500/20 rounded-bl-xl`}>
                    <game.icon size={20} className={`text-${game.color}-400`} />
                </div>
                <h3 className="font-bold text-xl mb-1">{game.title}</h3>
                <p className="text-xs text-gray-400">{game.desc}</p>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${game.color}-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arcade;