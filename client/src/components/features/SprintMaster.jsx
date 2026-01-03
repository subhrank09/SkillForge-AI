import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trello, Clock, User, AlertCircle, CheckCircle } from 'lucide-react';

const INITIAL_TEAM = [
  { id: 1, name: "Dev Sarah", skill: 0.9, speed: 0.5, burnout: 0, status: 'idle' }, // High quality, slow
  { id: 2, name: "Intern Mike", skill: 0.4, speed: 0.9, burnout: 0, status: 'idle' }, // Fast, buggy
  { id: 3, name: "Senior Ken", skill: 0.95, speed: 0.8, burnout: 20, status: 'idle' }, // Balanced
];

const INITIAL_BACKLOG = [
  { id: 101, title: "Fix Login Bug", difficulty: 3, type: "bug" },
  { id: 102, title: "Dark Mode", difficulty: 5, type: "feature" },
  { id: 103, title: "Refactor DB", difficulty: 8, type: "debt" },
  { id: 104, title: "Update Deps", difficulty: 2, type: "debt" },
];

const SprintMaster = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState(1);
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [backlog, setBacklog] = useState(INITIAL_BACKLOG);
  const [inProgress, setInProgress] = useState([]); // { ticket, devId, progress }
  const [completed, setCompleted] = useState([]);
  const [logs, setLogs] = useState(["Sprint started. Day 1."]);
  const [gameStatus, setGameStatus] = useState("PLAYING"); // PLAYING, WON, LOST

  // Game Loop (Ticks every 1 second = 1 hour)
  useEffect(() => {
    if (gameStatus !== "PLAYING") return;

    const tick = setInterval(() => {
      setInProgress(prev => {
        const nextState = [];
        const completedNow = [];

        prev.forEach(task => {
          const dev = team.find(d => d.id === task.devId);
          // Calculate progress based on dev speed + randomness
          const progressMade = (dev.speed * 2) + (Math.random() * 2);
          
          if (task.progress + progressMade >= 100) {
            // Task Done
            // Check for bugs based on dev skill (lower skill = higher bug chance)
            const isBuggy = Math.random() > dev.skill;
            completedNow.push({ ...task.ticket, quality: isBuggy ? 'buggy' : 'clean', doneBy: dev.name });
            
            // Free up dev
            setTeam(t => t.map(d => d.id === dev.id ? { ...d, status: 'idle', burnout: d.burnout + 5 } : d));
            setLogs(l => [...l, `✅ ${dev.name} finished ${task.ticket.title} (${isBuggy ? '⚠️ Buggy' : '✨ Clean'})`]);
          } else {
            nextState.push({ ...task, progress: task.progress + progressMade });
          }
        });

        if (completedNow.length > 0) {
            setCompleted(c => [...c, ...completedNow]);
        }
        return nextState;
      });

      // Burnout Recovery logic could go here
    }, 1000);

    return () => clearInterval(tick);
  }, [team, gameStatus]);

  const assignTask = (ticket, devId) => {
    if (inProgress.find(t => t.devId === devId)) {
        alert("Dev is busy!");
        return;
    }
    
    // Remove from backlog
    setBacklog(prev => prev.filter(t => t.id !== ticket.id));
    // Add to In Progress
    setInProgress(prev => [...prev, { ticket, devId, progress: 0 }]);
    // Set Dev Busy
    setTeam(prev => prev.map(d => d.id === devId ? { ...d, status: 'busy' } : d));
    setLogs(l => [...l, `🚀 Assigned ${ticket.title} to ${team.find(d=>d.id===devId).name}`]);
  };

  const endSprint = () => {
    setGameStatus("SUMMARY");
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8 pt-24 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <button onClick={() => navigate('/arcade')} className="text-gray-500 mb-6 hover:text-white">← Arcade</button>
        
        <div className="flex justify-between items-end mb-8">
            <h1 className="text-4xl font-black text-blue-400 uppercase italic flex items-center gap-3">
                <Trello size={40}/> Sprint Master
            </h1>
            <div className="text-right">
                <div className="text-sm text-gray-400 uppercase font-bold">Sprint Deadline</div>
                <div className="text-2xl font-mono text-red-500 flex items-center gap-2 justify-end">
                    <Clock /> Day {day} / 5
                </div>
            </div>
        </div>

        {gameStatus === "SUMMARY" ? (
            <div className="bg-gray-900 p-8 rounded-xl border border-blue-500 text-center">
                <h2 className="text-3xl font-bold mb-4">Sprint Retrospective</h2>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-black p-4 rounded">
                        <div className="text-gray-500 text-xs uppercase">Features Shipped</div>
                        <div className="text-4xl font-bold text-green-400">{completed.length}</div>
                    </div>
                    <div className="bg-black p-4 rounded">
                        <div className="text-gray-500 text-xs uppercase">Bugs Created</div>
                        <div className="text-4xl font-bold text-red-500">{completed.filter(c => c.quality === 'buggy').length}</div>
                    </div>
                    <div className="bg-black p-4 rounded">
                        <div className="text-gray-500 text-xs uppercase">Remaining Backlog</div>
                        <div className="text-4xl font-bold text-yellow-500">{backlog.length}</div>
                    </div>
                </div>
                <button onClick={() => window.location.reload()} className="bg-blue-600 px-8 py-3 rounded-full font-bold">Start Next Sprint</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                
                {/* COLUMN 1: BACKLOG */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 flex flex-col">
                    <h3 className="font-bold text-gray-400 uppercase text-xs mb-4 flex justify-between">
                        Backlog <span>{backlog.length}</span>
                    </h3>
                    <div className="space-y-3 overflow-y-auto flex-1">
                        {backlog.map(ticket => (
                            <div key={ticket.id} className="bg-black border border-gray-800 p-3 rounded hover:border-blue-500 transition-colors group">
                                <div className="flex justify-between mb-2">
                                    <span className={`text-[10px] uppercase px-1 rounded ${ticket.type === 'bug' ? 'bg-red-900 text-red-400' : 'bg-blue-900 text-blue-400'}`}>{ticket.type}</span>
                                    <span className="text-xs text-gray-500">Diff: {ticket.difficulty}</span>
                                </div>
                                <div className="font-bold text-sm mb-2">{ticket.title}</div>
                                
                                {/* Assign Buttons */}
                                <div className="grid grid-cols-3 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {team.map(dev => (
                                        <button 
                                            key={dev.id} 
                                            disabled={dev.status === 'busy'}
                                            onClick={() => assignTask(ticket, dev.id)}
                                            className="text-[10px] bg-gray-800 hover:bg-gray-700 py-1 rounded disabled:opacity-20"
                                        >
                                            {dev.name.split(' ')[1]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COLUMN 2: TEAM STATUS */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 flex flex-col">
                    <h3 className="font-bold text-gray-400 uppercase text-xs mb-4">Engineering Team</h3>
                    <div className="space-y-4">
                        {team.map(dev => {
                            const activeTask = inProgress.find(t => t.devId === dev.id);
                            return (
                                <div key={dev.id} className="bg-black border border-gray-800 p-4 rounded relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-2 relative z-10">
                                        <div className="flex items-center gap-2 font-bold">
                                            <User size={16} className={dev.status === 'busy' ? 'text-yellow-500' : 'text-green-500'} />
                                            {dev.name}
                                        </div>
                                        <div className="text-xs text-gray-500">Burnout: {dev.burnout}%</div>
                                    </div>
                                    
                                    {activeTask ? (
                                        <div className="relative z-10">
                                            <div className="text-xs text-blue-300 mb-1">Working on: {activeTask.ticket.title}</div>
                                            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${activeTask.progress}%` }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-xs text-gray-600 italic relative z-10">Idle... Waiting for tickets</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-800">
                        <div className="bg-black p-3 rounded text-xs font-mono h-32 overflow-y-auto text-green-400/80">
                            {logs.map((l, i) => <div key={i}>{l}</div>)}
                        </div>
                    </div>
                </div>

                {/* COLUMN 3: COMPLETED */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 flex flex-col">
                    <h3 className="font-bold text-gray-400 uppercase text-xs mb-4 flex justify-between">
                        Done <span>{completed.length}</span>
                    </h3>
                    <div className="space-y-2 overflow-y-auto flex-1">
                        {completed.map((c, i) => (
                            <div key={i} className={`p-3 rounded border flex justify-between items-center ${c.quality === 'buggy' ? 'bg-red-900/10 border-red-900/30' : 'bg-green-900/10 border-green-900/30'}`}>
                                <div>
                                    <div className="text-sm font-bold text-gray-200">{c.title}</div>
                                    <div className="text-[10px] text-gray-500">by {c.doneBy}</div>
                                </div>
                                {c.quality === 'buggy' ? <AlertCircle size={16} className="text-red-500"/> : <CheckCircle size={16} className="text-green-500"/>}
                            </div>
                        ))}
                    </div>
                    <button onClick={endSprint} className="mt-4 w-full bg-red-600/20 text-red-400 border border-red-500/50 py-3 rounded font-bold hover:bg-red-600 hover:text-white transition">End Sprint Early</button>
                </div>

            </div>
        )}
      </div>
    </div>
  );
};

export default SprintMaster;