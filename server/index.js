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
// XP
// ==========================================

app.post('/api/users/xp', async (req, res) => {

  try {

    const { clerkId, xp } = req.body;

    const user = await User.findOneAndUpdate(
      { clerkId },
      { $inc: { xp } },
      { new: true }
    );

    res.json({
      success: true,
      xp: user.xp
    });

  } catch (error) {

    res.status(500).json({
      error: 'XP failed'
    });
  }
});


// ==========================================
// HISTORY
// ==========================================

app.get('/api/users/:clerkId/history', async (req, res) => {

  try {

    const user = await User.findOne({
      clerkId: req.params.clerkId
    });

    res.json(
      user
        ? (user.courses || []).reverse()
        : []
    );

  } catch (error) {

    res.status(500).json({
      error: 'History failed'
    });
  }
});


// ==========================================
// ADD COURSE
// ==========================================

app.post('/api/users/add-course', async (req, res) => {

  try {

    const {
      clerkId,
      courseId,
      title
    } = req.body;

    const user = await User.findOne({
      clerkId
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const exists = user.courses.some(
      c =>
        c.courseId &&
        c.courseId.toString() ===
        courseId.toString()
    );

    if (!exists) {

      user.courses.push({
        courseId,
        title,
        progress: 0,
        completedNodes: [],
        lastAccessed: new Date()
      });

      await user.save();
    }

    res.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Add course failed'
    });
  }
});


// ==========================================
// DELETE COURSE
// ==========================================
app.delete('/api/users/:clerkId/course/:courseId', async (req, res) => {
  try {
    const { clerkId, courseId } = req.params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    user.courses = user.courses.filter(
      c =>
        c._id.toString() !== courseId &&
        c.courseId?.toString() !== courseId
    );

    await user.save();

    res.json({
      success: true
    });

  } catch (error) {
    res.status(500).json({
      error: "Delete failed"
    });
  }
});



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
