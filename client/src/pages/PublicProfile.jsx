import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Shield, Trophy, Flame } from 'lucide-react';

const PublicProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9000/api/public/profile/${userId}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  if (!profile) return <div className="text-white text-center pt-20">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24 flex flex-col items-center">
       <div className="w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-[0_0_50px_rgba(37,99,235,0.15)]">
          <div className="flex items-center gap-6 mb-8 border-b border-gray-800 pb-8">
              <img src={profile.avatar || "https://via.placeholder.com/150"} className="w-24 h-24 rounded-full border-4 border-blue-500" />
              <div>
                  <h1 className="text-4xl font-bold">{profile.name}</h1>
                  <div className="flex gap-4 mt-2">
                      <span className="flex items-center gap-1 text-yellow-400"><Trophy size={16}/> {profile.xp} XP</span>
                      <span className="flex items-center gap-1 text-orange-400">
                            <Flame size={16}/> {profile.streak} Day Streak
                      </span>
                  </div>
              </div>
              <div className="ml-auto bg-blue-900/30 px-4 py-2 rounded border border-blue-500/50 text-blue-400 font-mono text-xs">
                  VERIFIED CADET
              </div>
          </div>

          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Shield className="text-green-400"/> Mastered Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.history.map((course, i) => (
                  <div key={i} className="bg-black/40 p-4 rounded border border-gray-700 flex justify-between">
                      <span>{course.title}</span>
                      <span className={course.progress === 100 ? "text-green-400" : "text-gray-500"}>
                          {course.progress === 100 ? "COMPLETED" : `${course.progress}%`}
                      </span>
                  </div>
              ))}
          </div>
       </div>
    </div>
  );
};

export default PublicProfile;