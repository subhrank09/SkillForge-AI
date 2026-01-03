import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import { getUserHistory } from '../../api/axios'; 
import { PieChart, Activity, Trophy, Zap, Code, Brain, Target, Loader2 } from 'lucide-react';

const QuantumAnalytics = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalXP: 0,
    rank: "Novice",
    hoursCoded: 0,
    gamesPlayed: 0,
    skillDistribution: [],
    recentActivity: []
  });

  // --- GAMIFICATION ENGINE ---
  const calculateStats = (history) => {
    let xp = 0;
    let hours = 0;
    let games = 0;
    let skills = { Frontend: 0, Backend: 0, DevOps: 0, AI: 0 };

    // 1. Process each history item
    const processedActivity = history.map(item => {
        let itemXP = 50; // Default XP
        let itemHours = 1; // Default Hours

        // Dynamic Scoring based on keywords
        const title = item.title || "";
        const lowerTitle = title.toLowerCase();

        if (lowerTitle.includes('project') || lowerTitle.includes('api')) {
            itemXP = 500; itemHours = 5;
        } else if (lowerTitle.includes('quiz') || lowerTitle.includes('test')) {
            itemXP = 100; itemHours = 0.5;
        } else if (lowerTitle.includes('deploy') || lowerTitle.includes('pipeline')) {
            itemXP = 300; itemHours = 2;
        } else if (lowerTitle.includes('game') || lowerTitle.includes('glitch')) {
            itemXP = 200; itemHours = 1; games++;
        }

        // Categorize Skills
        if (lowerTitle.includes('react') || lowerTitle.includes('css') || lowerTitle.includes('ui')) skills.Frontend += itemXP;
        else if (lowerTitle.includes('node') || lowerTitle.includes('db') || lowerTitle.includes('api')) skills.Backend += itemXP;
        else if (lowerTitle.includes('docker') || lowerTitle.includes('cloud')) skills.DevOps += itemXP;
        else if (lowerTitle.includes('ai') || lowerTitle.includes('gpt')) skills.AI += itemXP;
        else skills.Frontend += itemXP/2; // Fallback

        xp += itemXP;
        hours += itemHours;

        return {
            action: title,
            xp: `+${itemXP}`,
            time: new Date(item.date).toLocaleDateString() // Assuming date exists
        };
    }).reverse().slice(0, 5); // Get last 5 recent items

    // 2. Determine Rank
    let rank = "Novice Developer";
    if (xp > 1000) rank = "Junior Engineer";
    if (xp > 5000) rank = "Senior Architect";
    if (xp > 10000) rank = "Tech Lead";
    if (xp > 20000) rank = "Principal Engineer";

    // 3. Format Skills for Chart
    const totalSkillXP = Object.values(skills).reduce((a, b) => a + b, 0) || 1;
    const skillDist = [
        { name: "Frontend", val: Math.round((skills.Frontend / totalSkillXP) * 100), color: "bg-blue-500" },
        { name: "Backend", val: Math.round((skills.Backend / totalSkillXP) * 100), color: "bg-green-500" },
        { name: "DevOps", val: Math.round((skills.DevOps / totalSkillXP) * 100), color: "bg-orange-500" },
        { name: "AI/ML", val: Math.round((skills.AI / totalSkillXP) * 100), color: "bg-purple-500" },
    ];

    return {
        totalXP: xp,
        rank,
        hoursCoded: Math.round(hours),
        gamesPlayed: games,
        skillDistribution: skillDist,
        recentActivity: processedActivity
    };
  };

  useEffect(() => {
    if (user) {
        getUserHistory(user.id)
            .then(data => {
                const computed = calculateStats(data);
                setStats(computed);
                setLoading(false);
            })
            .catch(err => console.error("Analytics Error:", err));
    }
  }, [user]);

  if (loading) return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-500" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <button onClick={() => navigate('/dashboard')} className="text-gray-500 mb-6 hover:text-white transition">← Dashboard</button>
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <h1 className="text-4xl font-black text-cyan-400 uppercase italic flex items-center gap-3">
                <PieChart size={40}/> Quantum Analytics
            </h1>
            <div className="text-right">
                <div className="text-xs uppercase font-bold text-gray-500">Current Rank</div>
                <div className="text-2xl font-black text-white animate-pulse">{stats.rank}</div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Main Stats Cards */}
            <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard icon={<Zap/>} label="Total XP" value={stats.totalXP.toLocaleString()} color="text-yellow-400" />
                <StatCard icon={<Activity/>} label="Hours Coded (Est.)" value={stats.hoursCoded} color="text-green-400" />
                <StatCard icon={<Trophy/>} label="Arcade Wins" value={stats.gamesPlayed} color="text-pink-400" />
                <StatCard icon={<Brain/>} label="Knowledge Score" value="Top 5%" color="text-blue-400" />
            </div>

            {/* 2. Skill Radar */}
            <div className="md:col-span-2 bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-400 uppercase text-xs mb-6 flex items-center gap-2">
                    <Target size={16}/> Skill Matrix Distribution
                </h3>
                {stats.totalXP === 0 ? (
                    <div className="text-center text-gray-500 py-10 italic">Complete some courses to see your skill breakdown.</div>
                ) : (
                    <div className="space-y-6">
                        {stats.skillDistribution.map(skill => (
                            <div key={skill.name}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-bold">{skill.name}</span>
                                    <span className="text-xs text-gray-500">{skill.val}% Mastery</span>
                                </div>
                                <div className="w-full bg-black h-3 rounded-full overflow-hidden">
                                    <div className={`h-full ${skill.color} transition-all duration-1000`} style={{ width: `${skill.val}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Recent Activity Feed */}
            <div className="md:col-span-1 bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-400 uppercase text-xs mb-6 flex items-center gap-2">
                    <Code size={16}/> Neural Log
                </h3>
                <div className="space-y-4">
                    {stats.recentActivity.length === 0 ? (
                        <div className="text-gray-500 text-sm italic">No recent activity found.</div>
                    ) : (
                        stats.recentActivity.map((act, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-gray-800 animate-in slide-in-from-right">
                                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_cyan]" />
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-gray-200 truncate w-40">{act.action}</div>
                                    <div className="text-[10px] text-gray-500">{act.time}</div>
                                </div>
                                <div className="text-xs font-bold text-green-400">{act.xp}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4 hover:border-gray-600 transition-colors group">
        <div className={`p-3 bg-gray-800 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <div>
            <div className="text-xs uppercase font-bold text-gray-500">{label}</div>
            <div className="text-2xl font-black text-white">{value}</div>
        </div>
    </div>
);

export default QuantumAnalytics;