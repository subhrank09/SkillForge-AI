// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const http = require('http'); 
// const { Server } = require('socket.io'); 
// const helmet = require('helmet'); // 🛡️ Security Headers
// const rateLimit = require('express-rate-limit'); // 🛡️ DDOS Protection

// // --- MODELS ---
// const Course = require('./models/Course');
// const User = require('./models/User');
// const Flashcard = require('./models/FlashCard'); 
// const Contact = require('./models/ContactUs');

// // --- CONTROLLERS ---
// const { 
//   generateCourse, 
//   generateLesson, 
//   generateQuiz, 
//   generateGapCourse, 
//   generateFlashcards,
//   generateFlowchart,
//   generateMindMap,
//   generateInterviewQuestion,
//   evaluateInterviewAnswer,
//   reviewCode,
//   askTutor,
//   predictQuestions
// } = require('./controllers/aiController');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // --- CONFIGURATION ---
// const upload = multer({ storage: multer.memoryStorage() }); 

// // --- HELPER FUNCTION (Crucial Fix) ---
// const getTodayDate = () => new Date().toISOString().split('T')[0];
// // --- SECURITY MIDDLEWARE ---
// app.use(helmet()); 

// // Relaxed Rate Limiter for Development (5000 requests per 15m)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 5000, 
//   message: "Too many requests from this IP, please try again later."
// });
// app.use(limiter);

// // Middleware
// app.use(cors());
// app.use(express.json());

// // --- DATABASE CONNECTION ---
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected Successfully'))
//   .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// // --- SOCKET.IO SETUP (REAL-TIME FEATURES) ---
// const server = http.createServer(app); 
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", 
//     methods: ["GET", "POST"]
//   }
// });

// const rooms = {}; 

// io.on('connection', (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   // 1. Battle Mode Logic
//   socket.on('join_room', ({ roomId, username }) => {
//     socket.join(roomId);
//     if (!rooms[roomId]) {
//       rooms[roomId] = { players: [], questions: [], scores: {}, status: 'waiting' };
//     }
//     const room = rooms[roomId];
//     if (!room.players.find(p => p.username === username)) {
//       room.players.push({ id: socket.id, username });
//       room.scores[socket.id] = 0;
//     }
//     io.to(roomId).emit('room_update', { players: room.players, status: room.status });
//   });

//   socket.on('start_game', ({ roomId }) => {
//     const room = rooms[roomId];
//     if (!room) return;
//     room.status = 'playing';
    
//     // Mock Questions for Battle Mode
//     room.questions = [
//       { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Maker", "Hyper Links", "Home Tool"], ans: 0 },
//       { q: "CSS stands for?", options: ["Computer Style", "Creative Sheets", "Cascading Style Sheets", "Colorful Sheets"], ans: 2 },
//       { q: "JS is for?", options: ["Styling", "Structure", "Logic", "Database"], ans: 2 },
//       { q: "React is a?", options: ["Database", "Framework", "Library", "Language"], ans: 2 }
//     ];
//     io.to(roomId).emit('game_started', { questions: room.questions });
//   });

//   socket.on('submit_answer', ({ roomId, isCorrect }) => {
//     const room = rooms[roomId];
//     if (!room || room.status !== 'playing') return;
//     if (isCorrect) room.scores[socket.id] = (room.scores[socket.id] || 0) + 10;
//     io.to(roomId).emit('score_update', room.scores);
//   });

//   // --- STUDY ROOM LOGIC ---
//   socket.on('join_study_room', ({ roomId, username }) => {
//     socket.join(roomId);
//     console.log(`${username} joined study room ${roomId}`);
//     // Broadcast to room that user joined
//     io.to(roomId).emit('study_user_joined', { username, message: "has joined the room." });
//   });

//   socket.on('send_study_message', ({ roomId, username, message, time }) => {
//     io.to(roomId).emit('receive_study_message', { username, message, time });
//   });
// });

// // --- API ROUTES ---

// app.get('/', (req, res) => {
//   res.json({ status: 'Server Active', message: 'SkillForge AI' });
// });

// // 1. AI Generation
// app.post('/api/courses/generate', generateCourse); 
// app.post('/api/courses/lesson', generateLesson);
// app.post('/api/courses/quiz', generateQuiz);
// app.post('/api/courses/flowchart', generateFlowchart);
// app.post('/api/mindmap/expand', generateMindMap);
// app.post('/api/career/analyze', upload.single('resume'), generateGapCourse); 
// app.post('/api/flashcards/generate', generateFlashcards); 
// app.post('/api/interview/question', generateInterviewQuestion);
// app.post('/api/interview/evaluate', evaluateInterviewAnswer);

// // 2. Data Routes
// app.get('/api/courses/:id', async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ error: "Course not found" });
//     res.json(course);
//   } catch (error) { res.status(500).json({ error: "Server Error" }); }
// });

// // 3. User & Activity Routes

// // FIX: Log Activity on Login/Sync
// app.post('/api/users/sync', async (req, res) => {
//   const { clerkId, email, firstName, imageUrl } = req.body;
//   const today = getTodayDate();

//   try {
//     let user = await User.findOne({ clerkId });
    
//     if (!user) {
//       user = new User({ 
//         clerkId, email, firstName, imageUrl, 
//         activityLogs: [{ date: today, count: 1 }] 
//       });
//       console.log("🆕 New User Created");
//     } else {
//       user.email = email;
//       user.imageUrl = imageUrl;
      
//       // Update Activity Log for Today (Heatmap Fix)
//       const existingLog = user.activityLogs.find(log => log.date === today);
//       if (existingLog) {
//         // Do nothing or increment? Let's just ensure it exists so the day is marked.
//         // We won't increment count here to avoid spamming on every page refresh.
//       } else {
//         user.activityLogs.push({ date: today, count: 1 });
//       }
//     }
    
//     await user.save();
//     res.json(user);
//   } catch (error) {
//     console.error("Sync Error:", error);
//     res.status(500).json({ error: "Sync failed" });
//   }
// });

// app.post('/api/users/add-course', async (req, res) => {
//   const { clerkId, courseId, title } = req.body;
  
//   // 1. Validation Check (Prevents crash if frontend sends bad data)
//   if (!clerkId || !courseId || !title) {
//       console.error("Missing required fields:", { clerkId, courseId, title });
//       return res.status(400).json({ error: "Missing fields" });
//   }

//   try {
//     const user = await User.findOne({ clerkId });
//     if (!user) {
//         return res.status(404).json({ error: "User not found" });
//     }

//     // 2. Safe Duplicate Check (Handles bad DB data)
//     // We check if c.courseId exists before calling toString()
//     const exists = user.courses.some(c => 
//         c.courseId && c.courseId.toString() === courseId.toString()
//     );
    
//     if (!exists) {
//       user.courses.push({ 
//           courseId: courseId, 
//           title: title, 
//           progress: 0,
//           completedNodes: [],
//           lastAccessed: new Date()
//       });
//       await user.save();
//       console.log(`Course added for ${user.firstName}: ${title}`);
//     }
    
//     res.json(user.courses);
//   } catch (error) {
//     console.error("❌ Failed to add course:", error);
//     res.status(500).json({ error: "Failed to add course" });
//   }
// });

// app.get('/api/users/:clerkId/history', async (req, res) => {
//   try {
//     const user = await User.findOne({ clerkId: req.params.clerkId });
//     res.json(user ? user.courses : []);
//   } catch (error) { res.status(500).json({ error: "Fetch error" }); }
// });

// // Remove a Course from History
// app.delete('/api/users/:clerkId/course/:courseId', async (req, res) => {
//   try {
//     const { clerkId, courseId } = req.params;
    
//     // Use MongoDB $pull operator to remove the item from the array
//     await User.updateOne(
//       { clerkId },
//       { $pull: { courses: { courseId: courseId } } }
//     );
    
//     res.json({ success: true });
//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.status(500).json({ error: "Failed to remove course" });
//   }
// });

// app.get('/api/users/:clerkId/course/:courseId', async (req, res) => {
//   try {
//     const user = await User.findOne(
//       { clerkId: req.params.clerkId },
//       { 'courses': { $elemMatch: { courseId: req.params.courseId } } }
//     );
//     if (!user || !user.courses.length) return res.json({ progress: 0, completedNodes: [] });
//     res.json(user.courses[0]);
//   } catch (error) { res.status(500).json({ error: "Fetch error" }); }
// });

// app.post('/api/users/course-progress', async (req, res) => {
//   const { clerkId, courseId, progress, completedNodes } = req.body;
//   try {
//     await User.updateOne(
//       { clerkId, "courses.courseId": courseId },
//       { $set: { "courses.$.progress": progress, "courses.$.completedNodes": completedNodes, "courses.$.lastAccessed": new Date() } }
//     );
//     res.json({ success: true });
//   } catch (error) { res.status(500).json({ error: "Update failed" }); }
// });

// app.post('/api/users/xp', async (req, res) => {
//   const { clerkId, xpAmount } = req.body;
//   const today = getTodayDate();

//   try {
//     const user = await User.findOne({ clerkId });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     user.xp += xpAmount;
    
//     // Log Activity for Heatmap
//     const existingLog = user.activityLogs.find(log => log.date === today);
//     if (existingLog) {
//       existingLog.count += 1;
//     } else {
//       user.activityLogs.push({ date: today, count: 1 });
//     }
//     await user.save();
//     res.json(user);
//   } catch (error) { res.status(500).json({ error: "XP failed" }); }
// });

// app.get('/api/users/:clerkId/activity', async (req, res) => {
//   try {
//     const user = await User.findOne({ clerkId: req.params.clerkId }).select('activityLogs');
//     res.json(user ? user.activityLogs : []);
//   } catch (error) { res.status(500).json({ error: "Fetch failed" }); }
// });

// app.get('/api/users/leaderboard', async (req, res) => {
//   try {
//     const topUsers = await User.find().sort({ xp: -1 }).limit(10).select('firstName xp imageUrl');
//     res.json(topUsers);
//   } catch (error) { res.status(500).json({ error: "Fetch failed" }); }
// });

// // 4. Flashcards
// app.get('/api/flashcards/due/:userId', async (req, res) => {
//   try {
//     const now = new Date();
//     const cards = await Flashcard.find({ userId: req.params.userId, nextReviewDate: { $lte: now } }).limit(20);
//     res.json(cards);
//   } catch (error) { res.status(500).json({ error: "Fetch failed" }); }
// });

// app.post('/api/flashcards/review', async (req, res) => {
//   const { cardId, correct } = req.body;
//   try {
//     const card = await Flashcard.findById(cardId);
//     if (!card) return res.status(404).json({ error: "Card not found" });

//     if (correct) card.box += 1;
//     else card.box = 1;

//     const daysToAdd = Math.pow(2, card.box - 1); 
//     const nextDate = new Date();
//     nextDate.setDate(nextDate.getDate() + daysToAdd);
    
//     card.nextReviewDate = nextDate;
//     await card.save();
//     res.json({ success: true, nextReview: nextDate });
//   } catch (error) { res.status(500).json({ error: "Update failed" }); }
// });

// // 5. Contact
// app.post('/api/contact', async (req, res) => {
//   // Save to DB if needed, currently Mock
//   res.json({ success: true, message: "Message received!" });
// });
// //ADD ONS
// app.post('/api/tutor/ask', askTutor);
// app.post('/api/predict/questions', upload.single('paper'), predictQuestions);

// // Store: Buy Item
// app.post('/api/store/buy', async (req, res) => {
//   const { clerkId, itemId, cost, category } = req.body;
//   try {
//     const user = await User.findOne({ clerkId });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     if (user.xp < cost) {
//       return res.status(400).json({ error: "Insufficient XP" });
//     }

//     // Deduct XP
//     user.xp -= cost;

//     // Add Item
//     if (category === 'theme') {
//       if (!user.inventory.themes.includes(itemId)) {
//         user.inventory.themes.push(itemId);
//       }
//     } else if (category === 'freeze') {
//       user.inventory.streakFreezes = (user.inventory.streakFreezes || 0) + 1;
//     }

//     await user.save();
//     res.json({ success: true, xp: user.xp, inventory: user.inventory });
//   } catch (error) {
//     res.status(500).json({ error: "Purchase failed" });
//   }
// });

// // Get User Inventory
// // Get User Inventory & Theme
// app.get('/api/users/:clerkId/inventory', async (req, res) => {
//   try {
//     // FIX: Added 'activeTheme' to the select list
//     const user = await User.findOne({ clerkId: req.params.clerkId }).select('inventory xp activeTheme');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Fetch failed" });
//   }
// });

// // Store: Equip Item
// // Store: Equip Item
// app.post('/api/store/equip', async (req, res) => {
//   const { clerkId, itemId, category } = req.body;
//   try {
//     const user = await User.findOne({ clerkId });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     console.log(`User ${user.firstName} trying to equip: ${itemId}`);
//     console.log(`User Inventory:`, user.inventory.themes);

//     // Verify ownership
//     if (category === 'theme') {
//       // Default is always owned
//       if (itemId === 'Default') {
//          user.activeTheme = 'Default';
//          await user.save();
//          return res.json({ success: true, activeTheme: 'Default' });
//       }

//       if (user.inventory.themes.includes(itemId)) {
//         user.activeTheme = itemId;
//         await user.save();
//         return res.json({ success: true, activeTheme: user.activeTheme });
//       } else {
//         console.log("FAILED: Item ID not found in inventory array.");
//       }
//     }
    
//     res.status(400).json({ error: "Item not owned" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Equip failed" });
//   }
// });

// // START
// server.listen(PORT, () => {
//   console.log(`⚡ Server running on port ${PORT}`);
// });

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const http = require('http'); 
// const { Server } = require('socket.io'); 
// const helmet = require('helmet'); 
// const rateLimit = require('express-rate-limit'); 
// const nodemailer = require('nodemailer');
// const cron = require('node-cron');
// const path = require('path');
// const fs = require('fs');

// // --- MODELS ---
// // ⚠️ ENSURE your ./models/User.js has 'streak', 'lastActiveDate', and 'history' fields!
// const Course = require('./models/Course');
// const User = require('./models/User');
// const Flashcard = require('./models/FlashCard'); 
// const Contact = require('./models/ContactUs');

// // --- CONTROLLERS ---
// const { 
//   generateCourse, generateLesson, generateQuiz, generateGapCourse, generateFlashcards,
//   generateFlowchart, generateMindMap, generateInterviewQuestion, evaluateInterviewAnswer,
//   reviewCode, askTutor, predictQuestions, generateRoadmap, analyzeGithubRepo, 
//   analyzeSkillGap, generateProjectScaffold, generateCompanyTest, getTechNews, 
//   generateHackathonIdea, analyzeRefactor, generateGlitchLevel, negotiateResponse, 
//   generateDocs, analyzeStandup, generateReadingChallenge, generateLexiconTerm, 
//   generateProposal, getGuildData, analyzePitch, generateFinOpsChallenge, 
//   evaluateFinOps, analyzeResume, generateResumeJSON, getFlashcards
// } = require('./controllers/aiController');

// // Import Cert Controller
// const { issueCertificate, verifyCertificate } = require('./controllers/certController');

// const app = express();
// const PORT = process.env.PORT || 9000;

// // --- CONFIGURATION ---
// const upload = multer({ storage: multer.memoryStorage() }); 

// // --- HELPER FUNCTION ---
// const getTodayDate = () => new Date().toISOString().split('T')[0];

// // --- MIDDLEWARE (CRITICAL ORDER) ---
// app.use(helmet()); 
// // ✅ ULTIMATE CORS FIX
// app.use(cors({
//   origin: [
//     "http://localhost:5173",           // Localhost
//     /^https:\/\/skill-forge-ai.*\.vercel\.app$/ // ⚡ MAGIC LINE: Allows ANY Vercel sub-domain for your app
//   ],
//   credentials: true
// }));
// app.use(express.json()); // 👈 MUST be here to read req.body

// // Relaxed Rate Limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 5000, 
//   message: "Too many requests from this IP, please try again later."
// });
// app.use(limiter);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // --- DATABASE CONNECTION ---
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected Successfully'))
//   .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// // --- EMAIL TRANSPORTER ---
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // --- SOCKET.IO SETUP ---
// const server = http.createServer(app); 
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", 
//     methods: ["GET", "POST"]
//   }
// });

// const rooms = {}; 

// io.on('connection', (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   // Battle Mode Logic
//   socket.on('join_room', ({ roomId, username }) => {
//     socket.join(roomId);
//     if (!rooms[roomId]) {
//       rooms[roomId] = { players: [], questions: [], scores: {}, status: 'waiting' };
//     }
//     const room = rooms[roomId];
//     if (!room.players.find(p => p.username === username)) {
//       room.players.push({ id: socket.id, username });
//       room.scores[socket.id] = 0;
//     }
//     io.to(roomId).emit('room_update', { players: room.players, status: room.status });
//   });

//   socket.on('start_game', ({ roomId }) => {
//     const room = rooms[roomId];
//     if (!room) return;
//     room.status = 'playing';
//     room.questions = [
//       { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Maker", "Hyper Links", "Home Tool"], ans: 0 },
//       { q: "CSS stands for?", options: ["Computer Style", "Creative Sheets", "Cascading Style Sheets", "Colorful Sheets"], ans: 2 },
//       { q: "JS is for?", options: ["Styling", "Structure", "Logic", "Database"], ans: 2 },
//       { q: "React is a?", options: ["Database", "Framework", "Library", "Language"], ans: 2 }
//     ];
//     io.to(roomId).emit('game_started', { questions: room.questions });
//   });

//   socket.on('submit_answer', ({ roomId, isCorrect }) => {
//     const room = rooms[roomId];
//     if (!room || room.status !== 'playing') return;
//     if (isCorrect) room.scores[socket.id] = (room.scores[socket.id] || 0) + 10;
//     io.to(roomId).emit('score_update', room.scores);
//   });

//   // Study Room Logic
//   socket.on('join_study_room', ({ roomId, username }) => {
//     socket.join(roomId);
//     io.to(roomId).emit('study_user_joined', { username, message: "has joined the room." });
//   });

//   socket.on('send_study_message', ({ roomId, username, message, time }) => {
//     io.to(roomId).emit('receive_study_message', { username, message, time });
//   });

//   // Code Duel Logic
//   socket.on('join_duel', ({ roomId, username }) => {
//     socket.join(roomId);
//     if (!rooms[roomId]) rooms[roomId] = { type: 'duel', players: [], status: 'waiting', challenge: null };
//     const room = rooms[roomId];

//     if (room.players.length < 2) {
//       room.players.push({ id: socket.id, username, score: 0 });
//       io.to(roomId).emit('duel_update', { players: room.players, status: room.status, message: `${username} entered the arena.` });

//       if (room.players.length === 2) {
//         room.status = 'playing';
//         const CHALLENGES = [
//           { id: 1, title: "Broken Array", desc: "Filter even numbers.", startCode: `function getEvens(arr) { return arr.filter(n => n % 2 !== 0); }`, testCase: "n % 2 === 0" },
//           { id: 2, title: "String Reverse", desc: "Reverse the string.", startCode: `function reverseString(str) { return str; }`, testCase: ".split('').reverse().join('')" }
//         ];
//         room.challenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
//         setTimeout(() => io.to(roomId).emit('duel_start', { challenge: room.challenge }), 1000);
//       }
//     } else {
//       socket.emit('error', { message: "Room is full!" });
//     }
//   });

//   socket.on('submit_duel_code', ({ roomId, code, username }) => {
//     const room = rooms[roomId];
//     if (!room || room.status !== 'playing') return;
//     const passed = code.includes(room.challenge.testCase) || code.includes(room.challenge.testCase.replace(/\s/g, ''));
//     if (passed) {
//       room.status = 'finished';
//       io.to(roomId).emit('duel_game_over', { winner: username });
//     }
//   });

//   socket.on('disconnect', () => {});
// });

// // --- API ROUTES ---

// app.get('/', (req, res) => {
//   res.json({ status: 'Server Active', message: 'SkillForge AI System Online' });
// });

// // 1. AI Routes
// app.post('/api/courses/generate', generateCourse); 
// app.post('/api/courses/lesson', generateLesson);
// app.post('/api/courses/quiz', generateQuiz);
// app.post('/api/courses/flowchart', generateFlowchart);
// app.post('/api/mindmap/expand', generateMindMap);
// app.post('/api/career/analyze', upload.single('resume'), generateGapCourse); 
// app.post('/api/flashcards/generate', generateFlashcards); 
// app.post('/api/interview/question', generateInterviewQuestion);
// app.post('/api/interview/evaluate', evaluateInterviewAnswer);
// app.post('/api/courses/review-code', reviewCode);
// app.post('/api/tutor/ask', askTutor);
// app.post('/api/predict/questions', upload.single('paper'), predictQuestions);
// app.post('/api/roadmap/generate', generateRoadmap); 
// app.post('/api/github/analyze', analyzeGithubRepo); 
// app.post('/api/skills/gap-analysis', analyzeSkillGap); 
// app.post('/api/forge/generate', generateProjectScaffold);

// // ==========================================
// // 🚨 CRITICAL FIX: SYNC & STREAK ROUTES 🚨
// // ==========================================

// // 1. FULL SYNC (Used on Login/Signup)
// app.post('/api/users/sync', async (req, res) => {
//   const { clerkId, email, firstName, imageUrl } = req.body;
//   const today = getTodayDate();

//   try {
//     let user = await User.findOne({ clerkId });

//     if (!user) {
//       // Create new user with initialized streak/history
//       user = new User({ 
//         clerkId, 
//         email, 
//         firstName, 
//         imageUrl, 
//         streak: 1, 
//         lastActiveDate: today,
//         activityLogs: [{ date: today, count: 1 }],
//         history: [],
//         courses: []
//       });
//       console.log("🆕 New User Created");
//     } else {
//       // Update info
//       user.email = email;
//       user.imageUrl = imageUrl;
//       if (firstName) user.firstName = firstName;

//       // Update Streak Logic
//       const lastActive = user.lastActiveDate ? String(user.lastActiveDate) : "";
      
//       if (lastActive !== today) {
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         const yesterdayStr = yesterday.toISOString().split('T')[0];

//         if (lastActive === yesterdayStr) {
//           user.streak = (user.streak || 0) + 1;
//         } else {
//           user.streak = 1;
//         }
//         user.lastActiveDate = today;
//         user.activityLogs.push({ date: today, count: 1 });
//       }
//     }

//     await user.save();
//     res.json({ success: true, user });

//   } catch (error) {
//     console.error("Sync Error:", error);
//     res.status(500).json({ error: "Sync failed" });
//   }
// });

// // 2. LIGHTWEIGHT STREAK SYNC (Used on Dashboard Load)
// // ✅ Fixes the 404 and 500 Errors
// app.post('/api/users/sync-streak', async (req, res) => {
//   try {
//     const { clerkId } = req.body;
//     if (!clerkId) return res.status(400).json({ error: "Missing clerkId" });

//     const user = await User.findOne({ clerkId });
//     if (!user) return res.json({ success: true, streak: 0 }); // Don't crash if user missing

//     const today = new Date().toISOString().split('T')[0];
//     const lastActive = user.lastActiveDate ? String(user.lastActiveDate) : "";

//     if (lastActive !== today) {
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         const yesterdayStr = yesterday.toISOString().split('T')[0];

//         if (lastActive === yesterdayStr) {
//             user.streak = (user.streak || 0) + 1;
//         } else {
//             user.streak = 1;
//         }
        
//         user.lastActiveDate = today;
//         await user.save();
//     }

//     res.json({ success: true, streak: user.streak });
//   } catch (error) {
//     console.error("🔥 Streak Route Error:", error);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // ==========================================
// // 🚨 CRITICAL FIX: HISTORY & DATA 🚨
// // ==========================================

// // GET: Fetch User Enrolled/Generated Courses ONLY (No Arcade History)
// app.get('/api/users/:clerkId/history', async (req, res) => {
//   try {
//     const user = await User.findOne({ clerkId: req.params.clerkId });
//     if (!user) return res.json([]);

//     // ✅ FIX: Only return 'user.courses' so Arcade games don't show up.
//     // We reverse it so the newest courses appear at the top.
//     const courses = (user.courses || []).reverse();
    
//     res.json(courses);
    
//   } catch (error) {
//     console.error("Fetch History Error:", error);
//     res.status(500).json({ error: "Fetch error" }); 
//   }
// });

// // POST: Save History
// app.post('/api/users/history', async (req, res) => {
//   const { clerkId, title, description, score } = req.body;
//   try {
//     const user = await User.findOne({ clerkId });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     const newEntry = {
//       title: title || "Activity",
//       description: description || "Completed an action",
//       date: new Date(),
//       score: score || 0
//     };

//     if (!user.history) user.history = []; 
//     user.history.push(newEntry);
//     await user.save();

//     res.json({ success: true, history: user.history });
//   } catch (error) {
//     console.error("Save History Error:", error);
//     res.status(500).json({ error: "Failed to save history" });
//   }
// });

// // DELETE: Robust Delete (Courses + Arcade)
// app.delete('/api/users/:clerkId/courses/:itemId', async (req, res) => {
//   const { clerkId, itemId } = req.params;
//   try {
//     // 1. Remove from Courses
//     const pullCourse = await User.updateOne(
//       { clerkId },
//       { $pull: { courses: { $or: [{ _id: itemId }, { courseId: itemId }] } } }
//     );

//     // 2. Remove from History
//     const pullHistory = await User.updateOne(
//       { clerkId },
//       { $pull: { history: { _id: itemId } } }
//     );

//     res.json({ success: true, message: "Deleted successfully" });
//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // --- ADD COURSE (Legacy) ---
// app.post('/api/users/add-course', async (req, res) => {
//   const { clerkId, courseId, title } = req.body;
//   if (!clerkId || !courseId || !title) return res.status(400).json({ error: "Missing fields" });

//   try {
//     const user = await User.findOne({ clerkId });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     const exists = user.courses.some(c => c.courseId && c.courseId.toString() === courseId.toString());
//     if (!exists) {
//       user.courses.push({ 
//           courseId, title, progress: 0, completedNodes: [], lastAccessed: new Date()
//       });
//       await user.save();
//     }
//     res.json(user.courses);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add course" });
//   }
// });

// // --- COURSE READ ---
// app.get('/api/courses/:id', async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ error: "Course not found" });
//     res.json(course);
//   } catch (error) { res.status(500).json({ error: "Server Error" }); }
// });

// // --- SPECIFIC USER COURSE PROGRESS ---
// app.get('/api/users/:clerkId/course/:courseId', async (req, res) => {
//   try {
//     const user = await User.findOne(
//       { clerkId: req.params.clerkId },
//       { 'courses': { $elemMatch: { courseId: req.params.courseId } } }
//     );
//     if (!user || !user.courses.length) return res.json({ progress: 0, completedNodes: [] });
//     res.json(user.courses[0]);
//   } catch (error) { res.status(500).json({ error: "Fetch error" }); }
// });

// app.post('/api/users/course-progress', async (req, res) => {
//   const { clerkId, courseId, progress, completedNodes } = req.body;
//   try {
//     await User.updateOne(
//       { clerkId, "courses.courseId": courseId },
//       { $set: { "courses.$.progress": progress, "courses.$.completedNodes": completedNodes, "courses.$.lastAccessed": new Date() } }
//     );
//     res.json({ success: true });
//   } catch (error) { res.status(500).json({ error: "Update failed" }); }
// });

// // --- CERTIFICATES ---
// app.post('/api/cert/issue', issueCertificate);
// app.get('/api/cert/verify/:hash', verifyCertificate);

// // --- XP & LEADERBOARD ---
// // ✅ 1. ROBUST XP UPDATE ROUTE (Fixes 500 Error)
// app.post('/api/users/xp', async (req, res) => {
//   const { clerkId, xp } = req.body;

//   // Safety Check: Stop immediately if no ID is sent
//   if (!clerkId) {
//     console.error("❌ XP Update Failed: Missing 'clerkId' in request body.");
//     return res.status(400).json({ error: "Missing clerkId" });
//   }

//   try {
//     const user = await User.findOneAndUpdate(
//       { clerkId: clerkId },
//       { $inc: { xp: xp } },
//       { new: true }
//     );

//     if (!user) {
//       console.error(`❌ XP Update Failed: User ${clerkId} not found in DB.`);
//       return res.status(404).json({ error: "User not found" });
//     }

//     console.log(`✅ XP Updated: ${user.firstName} now has ${user.xp} XP`);
//     res.json({ success: true, newXP: user.xp });
//   } catch (error) {
//     console.error("🔥 XP Route Server Error:", error);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// app.get('/api/users/leaderboard', async (req, res) => {
//   try {
//     const topUsers = await User.find().sort({ xp: -1 }).limit(10).select('firstName xp imageUrl');
//     res.json(topUsers);
//   } catch (error) { res.status(500).json({ error: "Fetch error" }); }
// });

// // --- PUBLIC PROFILE ---
// app.get('/api/public/profile/:userId', async (req, res) => {
//   try {
//     const user = await User.findOne({ clerkId: req.params.userId });
//     if (!user) return res.status(404).json({ error: "User not found" });
//     res.json({
//         name: user.firstName,
//         xp: user.xp,
//         streak: user.streak,
//         history: user.history.map(h => ({ title: h.title, progress: h.progress })),
//         avatar: user.imageUrl
//     });
//   } catch (error) { res.status(500).json({ error: "Profile fetch failed" }); }
// });

// // --- STORE ROUTES ---
// app.post('/api/store/buy', async (req, res) => {
//   const { clerkId, itemId, cost, category } = req.body;
//   try {
//     const user = await User.findOne({ clerkId });
//     if (!user) return res.status(404).json({ error: "User not found" });
//     if (user.xp < cost) return res.status(400).json({ error: "Insufficient XP" });

//     user.xp -= cost;
//     if (category === 'theme') {
//       if (!user.inventory.themes.includes(itemId)) user.inventory.themes.push(itemId);
//     } else if (category === 'freeze') {
//       user.inventory.streakFreezes = (user.inventory.streakFreezes || 0) + 1;
//     }
//     await user.save();
//     res.json({ success: true, xp: user.xp, inventory: user.inventory });
//   } catch (error) { res.status(500).json({ error: "Purchase failed" }); }
// });

// app.get('/api/users/:clerkId/inventory', async (req, res) => {
//   try {
//     const user = await User.findOne({ clerkId: req.params.clerkId }).select('inventory xp activeTheme');
//     res.json(user);
//   } catch (error) { res.status(500).json({ error: "Fetch failed" }); }
// });

// app.post('/api/store/equip', async (req, res) => {
//   const { clerkId, itemId, category } = req.body;
//   try {
//     const user = await User.findOne({ clerkId });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     if (category === 'theme') {
//       if (itemId === 'Default' || user.inventory.themes.includes(itemId)) {
//         user.activeTheme = itemId;
//         await user.save();
//         return res.json({ success: true, activeTheme: user.activeTheme });
//       }
//     }
//     res.status(400).json({ error: "Item not owned" });
//   } catch (error) { res.status(500).json({ error: "Equip failed" }); }
// });

// // --- ARCADE & MISC ROUTES ---
// app.post('/api/contact', async (req, res) => {
//   res.json({ success: true, message: "Message received!" });
// });
// app.post('/api/oracle/generate', generateCompanyTest);
// app.get('/api/news/latest', getTechNews);
// app.post('/api/hackathon/generate', generateHackathonIdea);
// app.post('/api/arcade/refactor', analyzeRefactor);
// app.post('/api/arcade/glitch', generateGlitchLevel);
// app.post('/api/arcade/negotiate', negotiateResponse);
// app.post('/api/arcade/docs', generateDocs);
// app.post('/api/arcade/standup', analyzeStandup);
// app.post('/api/arcade/reading', generateReadingChallenge);
// app.post('/api/arcade/lexicon', generateLexiconTerm);
// app.post('/api/arcade/proposal', generateProposal);
// app.get('/api/guild/data', getGuildData);
// app.post('/api/arcade/pitch', analyzePitch);
// app.post('/api/arcade/finops/new', generateFinOpsChallenge);
// app.post('/api/arcade/finops/eval', evaluateFinOps);
// app.post('/api/arcade/resume-scan', upload.single('resume'), analyzeResume);
// app.post('/api/resume/generate', generateResumeJSON);
// app.post('/api/send-email', async (req, res) => {
//   const { to, subject, message } = req.body;
//   try {
//     await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text: message });
//     res.status(200).json({ success: true, message: 'Email sent successfully!' });
//   } catch (error) { res.status(500).json({ success: false, error: error.message }); }
// });

// // ==========================================
// // ⚡️ UNIVERSAL FLASHCARD ROUTES (The Fix)
// // ==========================================

// // Match: /api/users/user_123/flashcards
// app.get('/api/users/:userId/flashcards', getFlashcards);

// // Match: /api/flashcards/user_123
// app.get('/api/flashcards/:userId', getFlashcards);

// // --- CRON JOBS ---
// cron.schedule('0 9 * * *', async () => {
//   console.log("⏳ Running Daily Streak Check...");
//   try {
//     const users = await User.find({});
//     for (const user of users) {
//         const lastActive = new Date(user.lastActiveDate || user.updatedAt);
//         lastActive.setHours(0, 0, 0, 0);
//         const diffDays = (new Date().setHours(0,0,0,0) - lastActive) / (1000 * 60 * 60 * 24);
        
//         if (diffDays > 1 && user.streak > 0) {
//             user.streak = 0;
//             await user.save();
//         }
//         if (diffDays === 1 && user.email) {
//             await transporter.sendMail({
//                 from: process.env.EMAIL_USER, to: user.email, subject: '🔥 Your Streak is in Danger!',
//                 html: `<p>Hi ${user.firstName}, Save your ${user.streak}-day streak now!</p>`
//             });
//         }
//     }
//   } catch (error) { console.error("Streak Check Failed:", error); }
// });

// // --- SERVER START ---
// server.listen(PORT, () => {
//   console.log(`⚡ Server running on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const http = require('http'); 
const { Server } = require('socket.io'); 
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Required for strict quiz fix

// --- MODELS ---
const Course = require('./models/Course');
const User = require('./models/User');
const Flashcard = require('./models/FlashCard'); 
const Contact = require('./models/ContactUs');

// --- CONTROLLERS ---
// ✅ IMPORTANT: Make sure 'getFlashcards' is in this list!
// --- CONTROLLERS ---
const { 
  // Core Learning
  generateCourse, generateLesson, generateQuiz, generateFlowchart, generateMindMap,
  generateFlashcards, getFlashcards, 
  
  // Tutor & Code
  askTutor, reviewCode, 
  
  // Career & Interview
  generateGapCourse, generateInterviewQuestion, evaluateInterviewAnswer, 
  predictQuestions, generateRoadmap, analyzeGithubRepo, analyzeSkillGap,
  generateResumeJSON, analyzeResume,
  
  // Arcade & Tools
  generateProjectScaffold, generateCompanyTest, getTechNews, generateHackathonIdea,
  analyzeRefactor, generateGlitchLevel, negotiateResponse, generateDocs,
  analyzeStandup, generateReadingChallenge, generateLexiconTerm, generateProposal,
  getGuildData, analyzePitch, generateFinOpsChallenge, evaluateFinOps
} = require('./controllers/aiController');

const { issueCertificate, verifyCertificate } = require('./controllers/certController');

const app = express();
const PORT = process.env.PORT || 9000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- CONFIGURATION ---
const upload = multer({ storage: multer.memoryStorage() }); 

// --- MIDDLEWARE ---
app.use(helmet()); 
// ✅ ULTIMATE CORS FIX (Allows all Vercel previews)
app.use(cors({
  origin: [
    "http://localhost:5173",
    /^https:\/\/skill-forge-ai.*\.vercel\.app$/ 
  ],
  credentials: true
}));
app.use(express.json()); 
app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5000, 
  message: "Too many requests from this IP."
});
app.use(limiter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const server = http.createServer(app); 
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

// --- ROUTES ---

app.get('/', (req, res) => res.json({ status: 'Online', message: 'SkillForge Backend Active' }));

// 1. AI Routes (Standard)
app.post('/api/courses/generate', generateCourse); 
app.post('/api/courses/lesson', generateLesson);
// Note: Quiz route is defined manually below to fix the "Undefined Answer" bug
app.post('/api/courses/flowchart', generateFlowchart);
app.post('/api/mindmap/expand', generateMindMap);
app.post('/api/career/analyze', upload.single('resume'), generateGapCourse); 
app.post('/api/interview/question', generateInterviewQuestion);
app.post('/api/interview/evaluate', evaluateInterviewAnswer);
app.post('/api/courses/review-code', reviewCode);
app.post('/api/tutor/ask', askTutor);
app.post('/api/predict/questions', upload.single('paper'), predictQuestions);
app.post('/api/roadmap/generate', generateRoadmap); 
app.post('/api/github/analyze', analyzeGithubRepo); 
app.post('/api/skills/gap-analysis', analyzeSkillGap); 
app.post('/api/forge/generate', generateProjectScaffold);

// ==========================================
// 🚨 FLASHCARD FIX (Universal Routes)
// ==========================================
app.post('/api/flashcards/generate', generateFlashcards); // Generate


// ==========================================
// 🚨 QUIZ FIX (Strict JSON Answer Key)
// ==========================================
app.post('/api/courses/quiz', async (req, res) => {
  const { topic, subtopic, language } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      You are an expert tutor. Create a quiz about "${topic}: ${subtopic}" in ${language}.
      Generate exactly 3 multiple-choice questions.
      CRITICAL: Return ONLY raw JSON. You MUST include an "answer" field that EXACTLY matches one option.
      
      JSON Structure:
      {
        "questions": [
          {
            "question": "Question text?",
            "options": ["A", "B", "C", "D"],
            "answer": "C"
          }
        ]
      }
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanJson = response.text().replace(/```json|```/g, '').trim();
    res.json(JSON.parse(cleanJson));
  } catch (error) {
    console.error("Quiz Error:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

// ==========================================
// 🚨 XP & USER FIXES (Crash Proof)
// ==========================================

// Safe XP Update (Fixes 500 Crash)
app.post('/api/users/xp', async (req, res) => {
  const { clerkId, xp } = req.body;
  if (!clerkId) return res.status(400).json({ error: "Missing clerkId" });

  try {
    const user = await User.findOneAndUpdate(
      { clerkId }, { $inc: { xp: xp } }, { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, newXP: user.xp });
  } catch (error) {
    console.error("XP Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Sync User (Login)
app.post('/api/users/sync', async (req, res) => {
  const { clerkId, email, firstName, imageUrl } = req.body;
  const today = new Date().toISOString().split('T')[0];
  try {
    let user = await User.findOne({ clerkId });
    if (!user) {
      user = new User({ clerkId, email, firstName, imageUrl, streak: 1, lastActiveDate: today, history: [], courses: [] });
    } else {
      user.email = email;
      user.imageUrl = imageUrl;
      user.firstName = firstName || user.firstName;
      const lastActive = user.lastActiveDate ? String(user.lastActiveDate) : "";
      if (lastActive !== today) {
        // Simple streak logic
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        user.streak = (lastActive === yesterdayStr) ? (user.streak || 0) + 1 : 1;
        user.lastActiveDate = today;
      }
    }
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    console.error("Sync Error:", error);
    res.status(500).json({ error: "Sync failed" });
  }
});

// Streak Sync (Dashboard)
app.post('/api/users/sync-streak', async (req, res) => {
  try {
    const { clerkId } = req.body;
    if (!clerkId) return res.status(400).json({ error: "Missing ID" });
    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: true, streak: 0 });
    res.json({ success: true, streak: user.streak });
  } catch (error) {
    res.status(500).json({ error: "Streak Error" });
  }
});

// History (Fixes Arcade Display Issue)
app.get('/api/users/:clerkId/history', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    // Only return courses, reverse order
    res.json(user ? (user.courses || []).reverse() : []);
  } catch (error) { res.status(500).json({ error: "History Error" }); }
});

// --- MISC ROUTES ---
app.post('/api/users/history', async (req, res) => { /* ... keep your implementation if needed ... */ res.json({success:true}) });
app.post('/api/users/add-course', async (req, res) => {
    const { clerkId, courseId, title } = req.body;
    const user = await User.findOne({ clerkId });
    if(user) {
        user.courses.push({ courseId, title, progress: 0, completedNodes: [] });
        await user.save();
    }
    res.json({ success: true });
});
// ... Keep your other existing arcade/store/cert routes here ...
// (Paste the rest of your routes below if you have custom ones for Leaderboard, Store, etc.)

// =========================================================
// 🚨 EMERGENCY FLASHCARD FIX (Direct Injection)
// =========================================================

// This forces the server to recognize the flashcard route
// regardless of the controller file.
app.get('/api/users/:clerkId/flashcards', async (req, res) => {
  try {
    const { clerkId } = req.params;
    console.log(`🔍 [DEBUG] Fetching flashcards for ID: ${clerkId}`);

    // 1. Try to find cards in the Flashcard Collection (New Method)
    let cards = await Flashcard.find({ userId: clerkId }).sort({ createdAt: -1 });

    // 2. If none found, try to find in User Profile (Old Method - Backup)
    if (!cards || cards.length === 0) {
       console.log("⚠️ No cards in main collection, checking user profile backup...");
       const user = await User.findOne({ clerkId });
       if (user && user.flashcards && user.flashcards.length > 0) {
           cards = user.flashcards.reverse();
       }
    }

    console.log(`✅ [DEBUG] Returning ${cards.length} flashcards`);
    res.json(cards || []);

  } catch (error) {
    console.error("🔥 Flashcard Route Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Also add this variation just in case the frontend uses the other URL style
app.get('/api/flashcards/due/:userId', async (req, res) => {
  const { userId } = req.params;
  // Redirect logic to the function above would be cleaner, but let's copy-paste to be safe
  try {
    const cards = await Flashcard.find({ userId }).sort({ createdAt: -1 });
    res.json(cards || []);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
// =========================================================
// =========================================================
// 🚨 FORCE FIX: Review Route (Paste before server.listen)
// =========================================================
app.post('/api/flashcards/review', async (req, res) => {
  console.log("🔥 Review Route Hit!"); // This log proves it works
  
  try {
    const { cardId, correct } = req.body;
    
    // Simple Spaced Repetition Logic (SM-2 Lite)
    // If correct, move to next box. If wrong, reset to box 1.
    const update = correct 
      ? { $inc: { box: 1 }, nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000) } // +1 Day
      : { box: 1, nextReviewDate: new Date() }; // Reset

    await Flashcard.findByIdAndUpdate(cardId, update);
    
    res.json({ success: true });
  } catch (error) {
    console.error("Review Error:", error);
    res.status(500).json({ error: "Review Failed" });
  }
});
// =========================================================
// =========================================================
// 🏆 FORCE FIX: Leaderboard Route (Paste before server.listen)
// =========================================================
app.get('/api/leaderboard', async (req, res) => {
  try {
    // Get Top 10 Users sorted by XP (Descending)
    const topUsers = await User.find()
      .sort({ xp: -1 })
      .limit(10)
      .select('firstName xp imageUrl streak'); // Only get necessary fields
      
    res.json(topUsers);
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// ✅ ADD BACKUP ROUTE (Just in case frontend uses the old URL)
app.get('/api/users/leaderboard', async (req, res) => {
  try {
    const topUsers = await User.find().sort({ xp: -1 }).limit(10).select('firstName xp imageUrl streak');
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});
// =========================================================
// ✅ ARCADE: Resume Scanner (Text Input)
app.post('/api/arcade/resume-scan', analyzeResume);
// ==========================================
// 🧠 CORE LEARNING ROUTES
// ==========================================
app.post('/api/courses/generate', generateCourse); 
app.post('/api/courses/lesson', generateLesson);
app.post('/api/courses/quiz', generateQuiz); // Uses the new Groq Logic in controller
app.post('/api/courses/flowchart', generateFlowchart);
app.post('/api/mindmap/expand', generateMindMap);
app.post('/api/tutor/ask', askTutor);

// ==========================================
// ⚡️ FLASHCARD ROUTES
// ==========================================
app.post('/api/flashcards/generate', generateFlashcards);
// Fix for "Due" cards (Frontend uses this)
app.get('/api/flashcards/due/:userId', getFlashcards); 
// Backup/Universal fetch
app.get('/api/users/:userId/flashcards', getFlashcards);

// ==========================================
// 🛠️ CAREER & SKILLS ROUTES
// ==========================================
// Note: These use 'upload.single' for PDF parsing
app.post('/api/career/analyze', upload.single('resume'), generateGapCourse); 
app.post('/api/predict/questions', upload.single('paper'), predictQuestions);

app.post('/api/roadmap/generate', generateRoadmap); 
app.post('/api/github/analyze', analyzeGithubRepo); 
app.post('/api/skills/gap-analysis', analyzeSkillGap); 
app.post('/api/resume/generate', generateResumeJSON); // Titan Resume Builder

// ==========================================
// 🎯 INTERVIEW PREP ROUTES
// ==========================================
app.post('/api/interview/question', generateInterviewQuestion);
app.post('/api/interview/evaluate', evaluateInterviewAnswer);
app.post('/api/courses/review-code', reviewCode);
app.post('/api/oracle/generate', generateCompanyTest); // Company Oracle

// ==========================================
// 🕹️ ARCADE & TOOLS ROUTES
// ==========================================
app.post('/api/forge/generate', generateProjectScaffold); // The Forge
app.get('/api/news/latest', getTechNews); // Daily Byte
app.post('/api/hackathon/generate', generateHackathonIdea); // Hackathon Hub
app.post('/api/arcade/refactor', analyzeRefactor); // Refactor Reactor
app.post('/api/arcade/glitch', generateGlitchLevel); // Glitch Hunt
app.post('/api/arcade/negotiate', negotiateResponse); // The Negotiator
app.post('/api/arcade/docs', generateDocs); // Ghost Writer
app.post('/api/arcade/standup', analyzeStandup); // Standup Sentinel
app.post('/api/arcade/reading', generateReadingChallenge); // Docs Dojo
app.post('/api/arcade/lexicon', generateLexiconTerm); // Lexicon Uplink
app.post('/api/arcade/proposal', generateProposal); // Freelance Fortress
app.get('/api/guild/data', getGuildData); // The Guild Hall
app.post('/api/arcade/pitch', analyzePitch); // The Pitch
app.post('/api/arcade/finops/new', generateFinOpsChallenge); // FinOps Frontier
app.post('/api/arcade/finops/eval', evaluateFinOps); // FinOps Eval

// ✅ Resume Scanner (No file upload middleware needed, sends JSON text)
app.post('/api/arcade/resume-scan', analyzeResume);
server.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));