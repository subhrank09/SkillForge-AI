const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: String,
  imageUrl: String,
  
  // --- GAMIFICATION STATS ---
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 }, 
  lastActiveDate: { type: String, default: "" }, // Stores "YYYY-MM-DD"

  // --- THEMES & INVENTORY ---
  activeTheme: { type: String, default: 'Default' }, 
  inventory: {
    themes: [{ type: String, default: 'Default' }], 
    badges: [{ type: String }],
    streakFreezes: { type: Number, default: 0 }
  },

  // --- ACTIVITY LOGS (For Heatmap) ---
  activityLogs: [{
      date: { type: String }, 
      count: { type: Number, default: 1 } 
  }],
  
  // --- ARCADE HISTORY ---
  history: [{
    title: String,
    description: String,
    score: Number,
    date: { type: Date, default: Date.now }
  }],
  
  // --- COURSE PROGRESS ---
  courses: [{ 
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    title: String,
    progress: { type: Number, default: 0 },
    completedNodes: [{ type: String }],
    lastAccessed: { type: Date, default: Date.now }
  }]
});

// 🚨 CRITICAL FIX: This line was likely missing or wrong
module.exports = mongoose.model('User', UserSchema);