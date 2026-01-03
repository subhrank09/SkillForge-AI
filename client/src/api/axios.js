// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// // --- User & History ---
// export const addToHistory = async (clerkId, courseId, title) => {
//   const response = await api.post('/users/add-course', { clerkId, courseId, title });
//   return response.data;
// };

// export const getUserHistory = async (clerkId) => {
//   const response = await api.get(`/users/${clerkId}/history`);
//   return response.data;
// };

// export const getUserCourseProgress = async (clerkId, courseId) => {
//   const response = await api.get(`/users/${clerkId}/course/${courseId}`);
//   return response.data;
// };

// export const updateCourseProgress = async (clerkId, courseId, progress, completedNodes) => {
//   const response = await api.post('/users/course-progress', { clerkId, courseId, progress, completedNodes });
//   return response.data;
// };

// export const updateXP = async (clerkId, xpAmount) => {
//   const response = await api.post('/users/xp', { clerkId, xpAmount });
//   return response.data;
// };

// export const getUserActivity = async (clerkId) => {
//   const response = await api.get(`/users/${clerkId}/activity`);
//   return response.data;
// };

// // --- Course Generators (CRITICAL UPDATES HERE) ---

// // Updated to accept 'language'
// export const generateCourse = async (topic, language) => {
//   const response = await api.post('/courses/generate', { topic, language });
//   return response.data;
// };

// export const getCourse = async (id) => {
//   const response = await api.get(`/courses/${id}`);
//   return response.data;
// };

// // CRITICAL FIX: Added 'language' parameter here
// export const getLesson = async (topic, nodeTitle, language) => {
//   const response = await api.post('/courses/lesson', { topic, nodeTitle, language });
//   return response.data;
// };

// // CRITICAL FIX: Added 'language' parameter here
// export const getQuiz = async (topic, nodeTitle, language) => {
//   const response = await api.post('/courses/quiz', { topic, nodeTitle, language });
//   return response.data;
// };

// // --- Career Gap Analyzer ---
// export const generateGapCourse = async (formData) => {
//   const response = await api.post('/career/analyze', formData);
//   return response.data;
// };

// // --- Flashcards ---
// // CRITICAL FIX: Added 'language' parameter here
// export const generateFlashcards = async (topic, nodeTitle, userId, courseId, language) => {
//   const response = await api.post('/flashcards/generate', { topic, nodeTitle, userId, courseId, language });
//   return response.data;
// };

// export const getDueFlashcards = async (userId) => {
//   const response = await api.get(`/flashcards/due/${userId}`);
//   return response.data;
// };

// export const reviewFlashcard = async (cardId, correct) => {
//   const response = await api.post('/flashcards/review', { cardId, correct });
//   return response.data;
// };

// export const sendContactMessage = async (data) => {
//   const response = await api.post('/contact', data);
//   return response.data;
// };

// export const getFlowchart = async (topic, nodeTitle, language) => {
//   const response = await api.post('/courses/flowchart', { topic, nodeTitle, language });
//   return response.data;
// };

// export const expandMindMap = async (topic, parentId) => {
//   const response = await api.post('/mindmap/expand', { topic, parentId });
//   return response.data;
// };

// export const getInterviewQuestion = async (role, difficulty) => {
//   const response = await api.post('/interview/question', { role, difficulty });
//   return response.data;
// };

// export const evaluateAnswer = async (question, userAnswer) => {
//   const response = await api.post('/interview/evaluate', { question, userAnswer });
//   return response.data;
// };

// // ... existing
// export const reviewCode = async (code, language) => {
//   const response = await api.post('/code/review', { code, language });
//   return response.data;
// };

// // ... existing imports

// export const askTutor = async (currentTopic, currentContext, userQuestion) => {
//   const response = await api.post('/tutor/ask', { currentTopic, currentContext, userQuestion });
//   return response.data;
// };

// export const predictQuestions = async (formData) => {
//   const response = await api.post('/predict/questions', formData);
//   return response.data;
// };

// // ... existing imports

// export const buyItem = async (clerkId, itemId, cost, category) => {
//   const response = await api.post('/store/buy', { clerkId, itemId, cost, category });
//   return response.data;
// };

// export const getUserInventory = async (clerkId) => {
//   const response = await api.get(`/users/${clerkId}/inventory`);
//   return response.data;
// };

// export const equipItem = async (clerkId, itemId, category) => {
//   const response = await api.post('/store/equip', { clerkId, itemId, category });
//   return response.data;
// };

// // ... existing imports ...

// // Add this function
// export const removeCourse = async (clerkId, courseId) => {
//   const response = await api.delete(`/users/${clerkId}/course/${courseId}`);
//   return response.data;
// };

// // Feature 1: Dynamic Roadmap
// export const generateRoadmap = async (data) => {
//     // data = { targetRole, currentSkillLevel, durationWeeks }
//     return await axios.post(`${API_URL}/roadmap/generate`, data);
// };

// // Feature 2: GitHub Analyzer
// export const analyzeRepo = async (repoUrl) => {
//     return await axios.post(`${API_URL}/github/analyze`, { repoUrl });
// };

// // Feature 3: Skill Gap Analysis
// export const analyzeGap = async (quizResults, targetRole) => {
//     return await axios.post(`${API_URL}/skills/gap-analysis`, { quizResults, targetRole });
// };

// export default api;

// import axios from 'axios';

// // 1. Create the axios instance
// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // Ensure this matches your backend port
// });

// // 2. Export the instance (default)
// export default api;

// // ==========================================
// // 🚀 USER & HISTORY ROUTES
// // ==========================================
// export const getUserHistory = async (clerkId) => {
//   const res = await api.get(`/users/${clerkId}/history`);
//   return res.data;
// };

// export const removeCourse = async (clerkId, courseId) => {
//   const res = await api.delete(`/users/${clerkId}/course/${courseId}`);
//   return res.data;
// };

// export const addToHistory = async (clerkId, courseId, title) => {
//   const res = await api.post('/users/add-course', { clerkId, courseId, title });
//   return res.data;
// };

// export const syncUser = async (userData) => {
//   return await api.post('/users/sync', userData);
// };

// // ==========================================
// // 🧠 AI GENERATION ROUTES (OLD FEATURES)
// // ==========================================
// export const generateCourse = async (topic, language) => {
//   const res = await api.post('/courses/generate', { topic, language });
//   return res.data;
// };

// export const generateLesson = async (data) => {
//   return await api.post('/courses/lesson', data);
// };

// export const generateQuiz = async (data) => {
//   return await api.post('/courses/quiz', data);
// };

// export const generateFlashcards = async (data) => {
//   return await api.post('/flashcards/generate', data);
// };

// export const generateMindMap = async (data) => {
//   return await api.post('/mindmap/expand', data);
// };

// export const generateFlowchart = async (data) => {
//   return await api.post('/courses/flowchart', data);
// };

// export const askTutor = async (data) => {
//   return await api.post('/tutor/ask', data);
// };

// // --- FIX: This is the missing function causing your error ---
// export const reviewCode = async (code, language) => {
//   // ✅ FIX: Store response in 'res' and return 'res.data'
//   const res = await api.post('/courses/review-code', { code, language }); 
//   return res.data; 
// };
// export const generateInterviewQuestion = async (data) => {
//   return await api.post('/interview/question', data);
// };

// export const evaluateInterviewAnswer = async (data) => {
//   return await api.post('/interview/evaluate', data);
// };

// // ==========================================
// // 🚀 NEW FEATURES (ROADMAP, GITHUB, SKILL GAP)
// // ==========================================
// export const generateRoadmap = async (data) => {
//   // data = { targetRole, currentSkillLevel, durationWeeks }
//   return await api.post('/roadmap/generate', data);
// };

// export const analyzeRepo = async (repoUrl) => {
//   return await api.post('/github/analyze', { repoUrl });
// };

// export const analyzeGap = async (quizResults, targetRole) => {
//   return await api.post('/skills/gap-analysis', { quizResults, targetRole });
// };

// // Add this missing function to src/api/axios.js

// export const updateCourseProgress = async (clerkId, courseId, progress, completedNodes) => {
//   // Matches the backend route: app.post('/api/users/course-progress', ...)
//   const res = await api.post('/users/course-progress', { 
//     clerkId, 
//     courseId, 
//     progress, 
//     completedNodes 
//   });
//   return res.data;
// };

// // Fetch a specific course's progress for the user
// export const getUserCourseProgress = async (clerkId, courseId) => {
//   // Matches backend: app.get('/api/users/:clerkId/course/:courseId', ...)
//   const res = await api.get(`/users/${clerkId}/course/${courseId}`);
//   return res.data;
// };

// export const getLesson = async (topic, nodeTitle, language) => {
//   const response = await api.post('/courses/lesson', { topic, nodeTitle, language });
//   return response.data;
// };

// export const getFlowchart = async (topic, nodeTitle, language) => {
//   const response = await api.post('/courses/flowchart', { topic, nodeTitle, language });
//   return response.data;
// };

// export const updateXP = async (clerkId, xpAmount) => {
//   const response = await api.post('/users/xp', { clerkId, xpAmount });
//   return response.data;
// };

// export const getCourse = async (id) => {
//   const response = await api.get(`/courses/${id}`);
//   return response.data;
// };

// export const getQuiz = async (topic, nodeTitle, language) => {
//   const response = await api.post('/courses/quiz', { topic, nodeTitle, language });
//   return response.data;
// };

// export const generateGapCourse = async (formData) => {
//   const response = await api.post('/career/analyze', formData);
//   return response.data;
// };

// export const expandMindMap = async (topic, parentId) => {
//   const response = await api.post('/mindmap/expand', { topic, parentId });
//   return response.data;
// };

// export const getInterviewQuestion = async (role, difficulty) => {
//   const response = await api.post('/interview/question', { role, difficulty });
//   return response.data;
// };

// export const evaluateAnswer = async (question, userAnswer) => {
//   const response = await api.post('/interview/evaluate', { question, userAnswer });
//   return response.data;
// };

// export const predictQuestions = async (formData) => {
//   const response = await api.post('/predict/questions', formData);
//   return response.data;
// };

// export const buyItem = async (clerkId, itemId, cost, category) => {
//   const response = await api.post('/store/buy', { clerkId, itemId, cost, category });
//   return response.data;
// };

// export const equipItem = async (clerkId, itemId, category) => {
//   const response = await api.post('/store/equip', { clerkId, itemId, category });
//   return response.data;
// };

// export const getUserInventory = async (clerkId) => {
//   const response = await api.get(`/users/${clerkId}/inventory`);
//   return response.data;
// };

// export const sendContactMessage = async (data) => {
//   const response = await api.post('/contact', data);
//   return response.data;
// };

// // src/api/axios.js

// export const generateProjectScaffold = async (techStack, level, customIdea = null) => {
//   // Pass customIdea if it exists
//   const res = await api.post('/forge/generate', { techStack, level, customIdea });
//   return res.data;
// };

// export const generateCompanyTest = async (company, role) => {
//   const res = await api.post('/oracle/generate', { company, role });
//   return res.data;
// };

// export const getTechNews = async () => {
//   const res = await api.get('/news/latest');
//   return res.data;
// };

// export const generateHackathonIdea = async (theme, techStack) => {
//   const res = await api.post('/hackathon/generate', { theme, techStack });
//   return res.data;
// };

import axios from 'axios';

// 1. Create the axios instance
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";

const api = axios.create({
  baseURL: API_URL,
});

// 2. Export the instance (default)
export default api;

// ==========================================
// 👤 USER & HISTORY ROUTES
// ==========================================
export const syncUser = async (userData) => {
  return await api.post('/users/sync', userData);
};
export const syncUserStreak = async (clerkId) => {
  const res = await api.post('/users/sync-streak', { clerkId });
  return res.data;
};

export const getUserHistory = async (clerkId) => {
  const res = await api.get(`/users/${clerkId}/history`);
  return res.data;
};

// src/api/axios.js

export const addToHistory = async (clerkId, title, description) => {
  // Changed endpoint from '/users/add-course' to '/users/history'
  // This allows it to work for Arcade games, Courses, or anything else.
  const res = await api.post('/users/history', { 
    clerkId, 
    title, 
    description 
  });
  return res.data;
};

// src/api/axios.js

export const removeCourse = async (clerkId, itemId) => {
  // ✅ FIX: Ensure this says '/courses/' (plural), NOT '/course/'
  // This URL pattern must match your server.js route exactly.
  const res = await api.delete(`/users/${clerkId}/courses/${itemId}`);
  return res.data;
};

export const updateCourseProgress = async (clerkId, courseId, progress, completedNodes) => {
  const res = await api.post('/users/course-progress', { clerkId, courseId, progress, completedNodes });
  return res.data;
};

export const getUserCourseProgress = async (clerkId, courseId) => {
  const res = await api.get(`/users/${clerkId}/course/${courseId}`);
  return res.data;
};

export const updateXP = async (clerkId, xpAmount) => {
  const res = await api.post('/users/xp', { clerkId, xpAmount });
  return res.data;
};

export const uploadUserAvatar = async (clerkId, file) => {
  const formData = new FormData();
  formData.append('clerkId', clerkId);
  formData.append('avatar', file);
  
  const res = await api.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const getPublicProfile = async (userId) => {
  // Public route, no auth needed usually
  const res = await api.get(`/public/profile/${userId}`);
  return res.data;
};

// ==========================================
// 🧠 CORE LEARNING & AI GENERATION
// ==========================================
export const generateCourse = async (topic, language) => {
  const res = await api.post('/courses/generate', { topic, language });
  return res.data;
};

export const getCourse = async (courseId) => {
  // Fetches existing course structure from DB
  const res = await api.get(`/courses/${courseId}`);
  return res.data;
};

export const getLesson = async (topic, nodeTitle, language) => {
  // Often post to generate on fly if not cached
  const res = await api.post('/courses/lesson', { topic, nodeTitle, language });
  return res.data;
};

export const getQuiz = async (topic, nodeTitle, language) => {
  const res = await api.post('/courses/quiz', { topic, nodeTitle, language });
  return res.data;
};

export const generateFlashcards = async (topic, nodeTitle, userId, courseId, language) => {
  const res = await api.post('/flashcards/generate', { topic, nodeTitle, userId, courseId, language });
  return res.data;
};

export const getFlowchart = async (topic, nodeTitle, language) => {
  const res = await api.post('/courses/flowchart', { topic, nodeTitle, language });
  return res.data;
};

export const generateMindMap = async (data) => {
  return await api.post('/mindmap/expand', data);
};

export const askTutor = async (courseTitle, context, question) => {
  const res = await api.post('/tutor/ask', { courseTitle, context, question });
  return res.data;
};

// ==========================================
// 🛠️ CAREER & TECH TOOLS
// ==========================================
export const reviewCode = async (code, language) => {
  const res = await api.post('/courses/review-code', { code, language });
  return res.data;
};

export const generateRoadmap = async (data) => {
  // data = { targetRole, currentSkillLevel, durationWeeks }
  const res = await api.post('/roadmap/generate', data);
  return res; 
};

export const analyzeRepo = async (repoUrl) => {
  const res = await api.post('/github/analyze', { repoUrl });
  return res;
};

export const analyzeGap = async (quizResults, targetRole) => {
  const res = await api.post('/skills/gap-analysis', { quizResults, targetRole });
  return res;
};

// src/api/axios.js

export const generateHackathonIdea = async (theme, techStack, difficulty) => {
  // ✅ NOW sending all 3 parameters to the backend
  const res = await api.post('/hackathon/generate', { theme, techStack, difficulty });
  return res.data;
};

export const generateProjectScaffold = async (techStack, level, customIdea = null) => {
  const res = await api.post('/forge/generate', { techStack, level, customIdea });
  return res.data;
};

export const generateResumeContent = async (userInfo, courses, badges) => {
  // Note: Pass data as one object if backend expects req.body.userInfo etc.
  const res = await api.post('/resume/generate', { userInfo, courses, badges });
  return res.data; // or res depending on backend return structure
};

// Correct
export const getFlashcards = async (userId) => {
  // 👇 It must match the backend route I gave you above
  return api.get(`/users/${userId}/flashcards`); 
};
// ==========================================
// 🎯 INTERVIEW & PREP
// ==========================================
export const generateInterviewQuestion = async (data) => {
  // data = { role, difficulty }
  return await api.post('/interview/question', data);
};

export const evaluateInterviewAnswer = async (data) => {
  // data = { question, userAnswer }
  return await api.post('/interview/evaluate', data);
};

export const generateCompanyTest = async (company, role) => {
  const res = await api.post('/oracle/generate', { company, role });
  return res.data;
};

export const getTechNews = async () => {
  const res = await api.get('/news/latest');
  return res.data;
};

// ==========================================
// 🏆 CERTIFICATES
// ==========================================
export const issueCertificate = async (data) => {
  // data = { userId, userName, title, type }
  const res = await api.post('/cert/issue', data);
  return res.data;
};

export const verifyCertificate = async (hash) => {
  const res = await api.get(`/cert/verify/${hash}`);
  return res;
};

export const generateGapCourse = async (formData) => {
  const response = await api.post('/career/analyze', formData);
  return response.data;
};

export const expandMindMap = async (topic, parentId) => {
  const response = await api.post('/mindmap/expand', { topic, parentId });
  return response.data;
};

export const getInterviewQuestion = async (role, difficulty) => {
  const response = await api.post('/interview/question', { role, difficulty });
  return response.data;
};

export const evaluateAnswer = async (question, userAnswer) => {
  const response = await api.post('/interview/evaluate', { question, userAnswer });
  return response.data;
};

export const predictQuestions = async (formData) => {
  const response = await api.post('/predict/questions', formData);
  return response.data;
};

export const buyItem = async (clerkId, itemId, cost, category) => {
  const response = await api.post('/store/buy', { clerkId, itemId, cost, category });
  return response.data;
};

export const equipItem = async (clerkId, itemId, category) => {
  const response = await api.post('/store/equip', { clerkId, itemId, category });
  return response.data;
};

export const getUserInventory = async (clerkId) => {
  const response = await api.get(`/users/${clerkId}/inventory`);
  return response.data;
};

// Add to your existing axios.js
export const analyzeRefactor = async (originalCode, refactoredCode, language) => {
  const res = await api.post('/arcade/refactor', { originalCode, refactoredCode, language });
  return res.data;
};

export const generateGlitchLevel = async (level, language) => {
  const res = await api.post('/arcade/glitch', { level, language });
  return res.data;
};

// Add to src/api/axios.js

export const negotiateSalary = async (history, currentOffer) => {
  const res = await api.post('/arcade/negotiate', { history, currentOffer });
  return res.data;
};

export const generateDocumentation = async (code) => {
  const res = await api.post('/arcade/docs', { code });
  return res.data;
};

export const generateLexiconTerm = async () => {
  const res = await api.post('/arcade/lexicon');
  return res.data;
};

export const generateProposal = async (data) => {
  const res = await api.post('/arcade/proposal', data);
  return res.data;
};

export const getGuildData = async () => {
  const res = await api.get('/guild/data');
  return res.data;
};

export const analyzePitch = async (topic, explanation, persona) => {
  const res = await api.post('/arcade/pitch', { topic, explanation, persona });
  return res.data;
};

export const generateFinOpsChallenge = async () => {
  const res = await api.post('/arcade/finops/new');
  return res.data;
};

export const evaluateFinOps = async (scenario, choices) => {
  const res = await api.post('/arcade/finops/eval', { scenario, choices });
  return res.data;
};

export const analyzeResume = async (resumeText, jobDescription) => {
  const res = await api.post('/arcade/resume-scan', { resumeText, jobDescription });
  return res.data;
};


// Call this function when a game is won
export const updateUserXP = async (clerkId, amount) => {
  const res = await api.put('/users/xp', { 
    clerkId, 
    xp: amount 
  });
  return res.data;
};

// Call this to populate the dashboard table
export const fetchLeaderboard = async () => {
  const res = await api.get('/leaderboard');
  return res.data;
};

export const evaluateArchitecture = async (scenario, nodes, connections) => {
  // We send the current scenario description, the list of nodes, and how they are connected
  const res = await api.post('/arcade/architect', { 
    scenario, 
    nodes, 
    connections 
  });
  return res.data;
};