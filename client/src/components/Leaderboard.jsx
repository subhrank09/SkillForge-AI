import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Trophy, Medal } from 'lucide-react';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users/leaderboard').then(res => setUsers(res.data));
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Global Ranking</h2>
      </div>
      
      <div className="space-y-4">
        {users.map((user, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-4">
              <span className={`font-mono font-bold w-6 ${idx < 3 ? 'text-yellow-400' : 'text-gray-500'}`}>
                #{idx + 1}
              </span>
              <img src={user.imageUrl} alt={user.firstName} className="w-10 h-10 rounded-full border-2 border-gray-700" />
              <span className="text-white font-medium">{user.firstName || "Anonymous"}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-mono">
              <Medal size={16} />
              <span>{user.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;