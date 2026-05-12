import axios from 'axios';

// ==========================================
// 🌐 API CONFIG
// ==========================================

// ✅ Production-safe backend URL
const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:9000";

// ✅ Automatically prefixes all routes with /api
const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export default api;

// ==========================================
// 👤 USER & HISTORY ROUTES
// ==========================================

export const syncUser = async (userData) => {
  const res = await api.post('/users/sync', userData);
  return res.data;
};

export const syncUserStreak = async (clerkId) => {
  const res = await api.post('/users/sync-streak', {
    clerkId
  });
  return res.data;
};

export const getUserHistory = async (clerkId) => {
  const res = await api.get(`/users/${clerkId}/history`);
  return res.data;
};

export const addToHistory = async (
  clerkId,
  title,
  description
) => {
  const res = await api.post('/users/history', {
    clerkId,
    title,
    description
  });

  return res.data;
};

export const removeCourse = async (
  clerkId,
  itemId
) => {
  const res = await api.delete(
    `/users/${clerkId}/courses/${itemId}`
  );

  return res.data;
};

export const updateCourseProgress = async (
  clerkId,
  courseId,
  progress,
  completedNodes
) => {
  const res = await api.post(
    '/users/course-progress',
    {
      clerkId,
      courseId,
      progress,
      completedNodes
    }
  );

  return res.data;
};

export const getUserCourseProgress = async (
  clerkId,
  courseId
) => {
  const res = await api.get(
    `/users/${clerkId}/course/${courseId}`
  );

  return res.data;
};

// ✅ FIXED XP ROUTE
export const updateUserXP = async (
  clerkId,
  amount
) => {
  const res = await api.post('/users/xp', {
    clerkId,
    xp: amount
  });

  return res.data;
};

export const uploadUserAvatar = async (
  clerkId,
  file
) => {
  const formData = new FormData();

  formData.append('clerkId', clerkId);
  formData.append('avatar', file);

  const res = await api.post(
    '/users/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return res.data;
};

export const getPublicProfile = async (
  userId
) => {
  const res = await api.get(
    `/public/profile/${userId}`
  );

  return res.data;
};

// ==========================================
// 🧠 CORE LEARNING
// ==========================================

export const generateCourse = async (
  topic,
  language
) => {
  const res = await api.post(
    '/courses/generate',
    {
      topic,
      language
    }
  );

  return res.data;
};

export const getCourse = async (
  courseId
) => {
  const res = await api.get(
    `/courses/${courseId}`
  );

  return res.data;
};

export const getLesson = async (
  topic,
  nodeTitle,
  language
) => {
  const res = await api.post(
    '/courses/lesson',
    {
      topic,
      nodeTitle,
      language
    }
  );

  return res.data;
};

export const getQuiz = async (
  topic,
  nodeTitle,
  language
) => {
  const res = await api.post(
    '/courses/quiz',
    {
      topic,
      nodeTitle,
      language
    }
  );

  return res.data;
};

export const generateFlashcards = async (
  topic,
  nodeTitle,
  userId,
  courseId,
  language
) => {
  const res = await api.post(
    '/flashcards/generate',
    {
      topic,
      nodeTitle,
      userId,
      courseId,
      language
    }
  );

  return res.data;
};

export const getFlashcards = async (
  userId
) => {
  const res = await api.get(
    `/users/${userId}/flashcards`
  );

  return res.data;
};

export const getFlowchart = async (
  topic,
  nodeTitle,
  language
) => {
  const res = await api.post(
    '/courses/flowchart',
    {
      topic,
      nodeTitle,
      language
    }
  );

  return res.data;
};

export const generateMindMap = async (
  data
) => {
  const res = await api.post(
    '/mindmap/expand',
    data
  );

  return res.data;
};

export const askTutor = async (
  courseTitle,
  context,
  question
) => {
  const res = await api.post(
    '/tutor/ask',
    {
      courseTitle,
      context,
      question
    }
  );

  return res.data;
};

// ==========================================
// 🛠️ CAREER & TOOLS
// ==========================================

export const reviewCode = async (
  code,
  language
) => {
  const res = await api.post(
    '/courses/review-code',
    {
      code,
      language
    }
  );

  return res.data;
};

export const generateRoadmap = async (
  data
) => {
  const res = await api.post(
    '/roadmap/generate',
    data
  );

  return res.data;
};

export const analyzeRepo = async (
  repoUrl
) => {
  const res = await api.post(
    '/github/analyze',
    {
      repoUrl
    }
  );

  return res.data;
};

export const analyzeGap = async (
  quizResults,
  targetRole
) => {
  const res = await api.post(
    '/skills/gap-analysis',
    {
      quizResults,
      targetRole
    }
  );

  return res.data;
};

export const generateHackathonIdea = async (
  theme,
  techStack,
  difficulty
) => {
  const res = await api.post(
    '/hackathon/generate',
    {
      theme,
      techStack,
      difficulty
    }
  );

  return res.data;
};

export const generateProjectScaffold = async (
  techStack,
  level,
  customIdea = null
) => {
  const res = await api.post(
    '/forge/generate',
    {
      techStack,
      level,
      customIdea
    }
  );

  return res.data;
};

export const generateResumeContent = async (
  userInfo,
  courses,
  badges
) => {
  const res = await api.post(
    '/resume/generate',
    {
      userInfo,
      courses,
      badges
    }
  );

  return res.data;
};

// ==========================================
// 🎯 INTERVIEW
// ==========================================

export const generateInterviewQuestion = async (
  data
) => {
  const res = await api.post(
    '/interview/question',
    data
  );

  return res.data;
};

export const evaluateInterviewAnswer = async (
  data
) => {
  const res = await api.post(
    '/interview/evaluate',
    data
  );

  return res.data;
};

export const generateCompanyTest = async (
  company,
  role
) => {
  const res = await api.post(
    '/oracle/generate',
    {
      company,
      role
    }
  );

  return res.data;
};

// ==========================================
// 📰 NEWS
// ==========================================

export const getTechNews = async () => {
  const res = await api.get('/news/latest');
  return res.data;
};

// ==========================================
// 🏆 CERTIFICATES
// ==========================================

export const issueCertificate = async (
  data
) => {
  const res = await api.post(
    '/cert/issue',
    data
  );

  return res.data;
};

export const verifyCertificate = async (
  hash
) => {
  const res = await api.get(
    `/cert/verify/${hash}`
  );

  return res.data;
};

// ==========================================
// 🎮 STORE
// ==========================================

export const buyItem = async (
  clerkId,
  itemId,
  cost,
  category
) => {
  const res = await api.post(
    '/store/buy',
    {
      clerkId,
      itemId,
      cost,
      category
    }
  );

  return res.data;
};

export const equipItem = async (
  clerkId,
  itemId,
  category
) => {
  const res = await api.post(
    '/store/equip',
    {
      clerkId,
      itemId,
      category
    }
  );

  return res.data;
};

export const getUserInventory = async (
  clerkId
) => {
  const res = await api.get(
    `/users/${clerkId}/inventory`
  );

  return res.data;
};

// ==========================================
// 🏆 LEADERBOARD
// ==========================================

export const fetchLeaderboard = async () => {
  const res = await api.get('/leaderboard');
  return res.data;
};
