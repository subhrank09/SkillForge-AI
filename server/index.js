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
const path = require('path');

// ==========================================
// MODELS
// ==========================================

const Course = require('./models/Course');
const User = require('./models/User');
const Flashcard = require('./models/FlashCard');

// ==========================================
// CONTROLLERS
// ==========================================

const {
  generateCourse,
  generateLesson,
  generateQuiz,
  generateFlowchart,
  generateMindMap,
  generateFlashcards,
  getFlashcards,

  askTutor,
  reviewCode,

  generateGapCourse,
  generateInterviewQuestion,
  evaluateInterviewAnswer,
  predictQuestions,
  generateRoadmap,
  analyzeGithubRepo,
  analyzeSkillGap,
  generateResumeJSON,
  analyzeResume,

  generateProjectScaffold,
  generateCompanyTest,
  getTechNews,
  generateHackathonIdea,
  analyzeRefactor,
  generateGlitchLevel,
  negotiateResponse,
  generateDocs,
  analyzeStandup,
  generateReadingChallenge,
  generateLexiconTerm,
  generateProposal,
  getGuildData,
  analyzePitch,
  generateFinOpsChallenge,
  evaluateFinOps

} = require('./controllers/aiController');

const {
  issueCertificate,
  verifyCertificate
} = require('./controllers/certController');


// ==========================================
// APP CONFIG
// ==========================================

const app = express();
const PORT = process.env.PORT || 9000;

const upload = multer({
  storage: multer.memoryStorage()
});


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(helmet());

app.use(cors({
  origin: [
    "http://localhost:5173",
    /^https:\/\/skill-forge-ai.*\.vercel\.app$/
  ],
  credentials: true
}));

app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000
}));

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);


// ==========================================
// DATABASE
// ==========================================

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));


// ==========================================
// SOCKET IO
// ==========================================

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


// ==========================================
// EMAIL
// ==========================================

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// ==========================================
// HELPERS
// ==========================================

const getTodayDate = () =>
  new Date().toISOString().split('T')[0];


// ==========================================
// ROOT
// ==========================================

app.get('/', (req, res) => {
  res.json({
    status: 'Online',
    message: 'SkillForge Backend Active'
  });
});


// ==========================================
// AI ROUTES
// ==========================================

app.post('/api/courses/generate', generateCourse);

app.post('/api/courses/lesson', generateLesson);

app.post('/api/courses/quiz', generateQuiz);

app.post('/api/courses/flowchart', generateFlowchart);

app.post('/api/mindmap/expand', generateMindMap);

app.post(
  '/api/career/analyze',
  upload.single('resume'),
  generateGapCourse
);

app.post(
  '/api/predict/questions',
  upload.single('paper'),
  predictQuestions
);

app.post('/api/interview/question', generateInterviewQuestion);

app.post('/api/interview/evaluate', evaluateInterviewAnswer);

app.post('/api/courses/review-code', reviewCode);

app.post('/api/tutor/ask', askTutor);

app.post('/api/roadmap/generate', generateRoadmap);

app.post('/api/github/analyze', analyzeGithubRepo);

app.post('/api/skills/gap-analysis', analyzeSkillGap);

app.post('/api/resume/generate', generateResumeJSON);

app.post('/api/forge/generate', generateProjectScaffold);

app.post('/api/oracle/generate', generateCompanyTest);

app.get('/api/news/latest', getTechNews);

app.post('/api/hackathon/generate', generateHackathonIdea);

app.post('/api/arcade/refactor', analyzeRefactor);

app.post('/api/arcade/glitch', generateGlitchLevel);

app.post('/api/arcade/negotiate', negotiateResponse);

app.post('/api/arcade/docs', generateDocs);

app.post('/api/arcade/standup', analyzeStandup);

app.post('/api/arcade/reading', generateReadingChallenge);

app.post('/api/arcade/lexicon', generateLexiconTerm);

app.post('/api/arcade/proposal', generateProposal);

app.get('/api/guild/data', getGuildData);

app.post('/api/arcade/pitch', analyzePitch);

app.post('/api/arcade/finops/new', generateFinOpsChallenge);

app.post('/api/arcade/finops/eval', evaluateFinOps);

app.post('/api/arcade/resume-scan', analyzeResume);


// ==========================================
// FLASHCARDS
// ==========================================

app.post('/api/flashcards/generate', generateFlashcards);

app.get('/api/flashcards/due/:userId', getFlashcards);

app.get('/api/users/:userId/flashcards', getFlashcards);

app.post('/api/flashcards/review', async (req, res) => {
  try {

    const { cardId, correct } = req.body;

    const update = correct
      ? {
          $inc: { box: 1 },
          nextReviewDate: new Date(
            Date.now() + 24 * 60 * 60 * 1000
          )
        }
      : {
          box: 1,
          nextReviewDate: new Date()
        };

    await Flashcard.findByIdAndUpdate(cardId, update);

    res.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Review failed'
    });
  }
});


// ==========================================
// USER ROUTES
// ==========================================

app.post('/api/users/sync', async (req, res) => {

  try {

    const {
      clerkId,
      email,
      firstName,
      imageUrl
    } = req.body;

    const today = getTodayDate();

    let user = await User.findOne({ clerkId });

    let streak = 1;
    let lastActiveDate = today;

    if (user) {

      const lastActive =
        user.lastActiveDate || "";

      if (lastActive !== today) {

        const yesterday = new Date();

        yesterday.setDate(
          yesterday.getDate() - 1
        );

        const yesterdayStr =
          yesterday.toISOString().split('T')[0];

        streak =
          lastActive === yesterdayStr
            ? (user.streak || 0) + 1
            : 1;
      } else {

        streak = user.streak;
        lastActiveDate =
          user.lastActiveDate;
      }
    }

    user = await User.findOneAndUpdate(
      { clerkId },
      {
        clerkId,
        email,
        firstName,
        imageUrl,
        streak,
        lastActiveDate,
        $setOnInsert: {
          history: [],
          courses: [],
          xp: 0
        }
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      success: true,
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Sync failed'
    });
  }
});


// ==========================================
// STREAK
// ==========================================

app.post('/api/users/sync-streak', async (req, res) => {

  try {

    const { clerkId } = req.body;

    const user = await User.findOne({
      clerkId
    });

    if (!user) {
      return res.json({
        success: true,
        streak: 0
      });
    }

    res.json({
      success: true,
      streak: user.streak
    });

  } catch (error) {

    res.status(500).json({
      error: 'Streak error'
    });
  }
});


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
// LEADERBOARD
// ==========================================

app.get('/api/leaderboard', async (req, res) => {

  try {

    const users = await User.find()
      .sort({ xp: -1 })
      .limit(10)
      .select('firstName xp imageUrl streak');

    res.json(users);

  } catch (error) {

    res.status(500).json({
      error: 'Leaderboard failed'
    });
  }
});


// ==========================================
// CERTIFICATES
// ==========================================

app.post('/api/cert/issue', issueCertificate);

app.get('/api/cert/verify/:hash', verifyCertificate);


// ==========================================
// SOCKET EVENTS
// ==========================================

io.on('connection', socket => {

  console.log('⚡ User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

// ==========================================
// GET COURSE BY ID
// ==========================================
app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        error: "Course not found"
      });
    }

    res.json(course);

  } catch (error) {
    console.error("GET COURSE ERROR:", error);

    res.status(500).json({
      error: "Failed to fetch course"
    });
  }
});

// ==========================================
// LEADERBOARD
// ==========================================
app.get('/api/users/leaderboard', async (req, res) => {
  try {
    const users = await User.find()
      .sort({ xp: -1 })
      .limit(10)
      .select('firstName xp imageUrl');

    res.json(users);

  } catch (error) {
    res.status(500).json({
      error: "Leaderboard failed"
    });
  }
});

// ==========================================
// SERVER
// ==========================================

server.listen(PORT, () => {
  console.log(`⚡ Server running on port ${PORT}`);
});