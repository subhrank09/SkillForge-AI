import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import { getUserActivity } from '../api/axios';
import { useUser } from "@clerk/clerk-react";
import { Flame } from 'lucide-react';

const ActivityHeatmap = () => {
  const { user } = useUser();
  const [activity, setActivity] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (user) {
      getUserActivity(user.id).then(data => {
        setActivity(data);
        calculateStreak(data);
      });
    }
  }, [user]);

  const calculateStreak = (data) => {
    // Sort dates descending
    const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    let currentStreak = 0;
    
    // Check from today backwards
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // If active today or yesterday, start counting
    if (sorted.length > 0) {
        // If last active date was today or yesterday, streak is alive
        if (sorted[0].date === today || sorted[0].date === yesterday) {
            currentStreak = 1; 
            // Iterate backwards (simplified for demo)
            // Real prod logic involves checking consecutive days via Date objects
            for (let i = 0; i < sorted.length - 1; i++) {
                const curr = new Date(sorted[i].date);
                const prev = new Date(sorted[i+1].date);
                const diffTime = Math.abs(curr - prev);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                
                if (diffDays === 1) currentStreak++;
                else break;
            }
        }
    }
    setStreak(currentStreak);
  };

  const today = new Date();
  const shiftDate = (date, numDays) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Learning Activity</h2>
        <div className="flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
            <Flame className="text-orange-500 fill-orange-500" size={20} />
            <span className="text-orange-400 font-bold">{streak} Day Streak</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <CalendarHeatmap
          startDate={shiftDate(today, -150)}
          endDate={today}
          values={activity}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            return `color-scale-${Math.min(value.count, 4)}`;
          }}
          tooltipDataAttrs={value => {
            return {
              'data-tooltip-id': 'heatmap-tooltip',
              'data-tooltip-content': value.date ? `${value.date}: ${value.count} activities` : 'No activity',
            };
          }}
          showWeekdayLabels={false} // <-- Removed weekday labels
          gutterSize={2} // <-- Added spacing between cells
        />
        <Tooltip id="heatmap-tooltip" />
      </div>

      {/* Custom Styles for Heatmap design */}
      <style>{`
        .react-calendar-heatmap text { font-size: 10px; fill: #6b7280; }
        /* Added rounded corners to cells */
        .react-calendar-heatmap rect { rx: 2px; ry: 2px; }
        
        .react-calendar-heatmap .color-empty { fill: #1f2937; }
        .react-calendar-heatmap .color-scale-1 { fill: #0e4429; }
        .react-calendar-heatmap .color-scale-2 { fill: #006d32; }
        .react-calendar-heatmap .color-scale-3 { fill: #26a641; }
        .react-calendar-heatmap .color-scale-4 { fill: #39d353; }
      `}</style>
    </div>
  );
};

export default ActivityHeatmap;