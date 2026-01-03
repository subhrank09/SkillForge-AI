import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate
import { useAuth } from "@clerk/clerk-react"; // Import Clerk Hook
import { Loader2, Cpu } from 'lucide-react';

// --- 1. CORE PAGES (src/pages) ---
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CourseMap = lazy(() => import('./pages/CourseMap'));
const MindMap = lazy(() => import('./pages/MindMap'));
const Arcade = lazy(() => import('./pages/Arcade')); 

// --- 2. EXISTING ARCADE GAME PAGES (src/pages) ---
const Flashcards = lazy(() => import('./pages/Flashcards')); 
const Battle = lazy(() => import('./pages/Battle'));
const Interview = lazy(() => import('./pages/Interview'));
const Store = lazy(() => import('./pages/Store'));
const StudyRoom = lazy(() => import('./pages/StudyRoom'));
const PaperPredictor = lazy(() => import('./pages/PaperPredictor'));

// --- 3. FEATURE COMPONENTS (src/components/features) ---
const GithubAnalyzer = lazy(() => import('./components/features/GithubAnalyzer'));
const SkillGapResults = lazy(() => import('./components/features/SkillGapResults'));
const MentorHub = lazy(() => import('./components/features/MentorHub'));
const Resume = lazy(() => import('./components/features/Resume'));
const TheForge = lazy(() => import('./components/features/TheForge'));
const HackathonHub = lazy(() => import('./components/features/HackathonHub'));
const ArchitectCanvas = lazy(() => import('./components/features/ArchitectCanvas'));
const QuantumAnalytics = lazy(() => import('./components/features/QuantumAnalytics'));
const RoadmapGenerator = lazy(() => import('./components/features/RoadmapGenerator'));
const CompanyOracle = lazy(() => import('./components/features/CompanyOracle'));
const DailyByte = lazy(() => import('./components/features/DailyByte'));
const TitanResume = lazy(() => import('./components/features/TitanResume'));

// --- 4. NEW ARCADE TOOLS ---
const GlitchHunt = lazy(() => import('./components/features/GlitchHunt'));         
const SyntaxSpeedster = lazy(() => import('./components/features/SyntaxSpeedster')); 
const RegexRift = lazy(() => import('./components/features/RegexRift'));             
const RefactorReactor = lazy(() => import('./components/features/RefractorReactor')); 
const SentinelAudit = lazy(() => import('./components/features/SentinelAudit'));     
const SecurityBreach = lazy(() => import('./components/features/SecurityBreach'));   
const DatabaseDungeon = lazy(() => import('./components/features/DatabaseDungeon')); 
const PipelinePulse = lazy(() => import('./components/features/PipelinePulse'));     
const ShellShock = lazy(() => import('./components/features/ShellShock'));           
const TheNegotiator = lazy(() => import('./components/features/TheNegotiator'));     
const GhostRider = lazy(() => import('./components/features/GhostRider'));           
const LexiconUplink = lazy(() => import('./components/features/LexiconUplink'));     
const PayloadProtocol = lazy(() => import('./components/features/PayloadProtocol')); 
const ChronoShift = lazy(() => import('./components/features/ChronoShift'));         
const Oculus = lazy(() => import('./components/features/Oculus'));                   
const TheSpider = lazy(() => import('./components/features/TheSpider'));             
const SprintMaster = lazy(() => import('./components/features/SprintMaster'));       
const FreelanceFortress = lazy(() => import('./components/features/FreelanceFortress')); 
const ThePitch = lazy(() => import('./components/features/ThePitch'));               
const FinOpsFrontier = lazy(() => import('./components/features/FinOpsFrontier'));   

// --- 5. AUTH & INFO ---
const { SignInPage, SignUpPage } = await import('./pages/Auth').catch(() => ({ SignInPage: () => null, SignUpPage: () => null }));
const SignInRoute = lazy(() => import('./pages/Auth').then(m => ({ default: m.SignInPage })));
const SignUpRoute = lazy(() => import('./pages/Auth').then(m => ({ default: m.SignUpPage })));
const About = lazy(() => import('./pages/About')); 
const Contact = lazy(() => import('./pages/Contact')); 
const Support = lazy(() => import('./pages/Support')); 
const TermsOfService = lazy(() => import('./pages/TermsOfService')); 
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// --- LOADING SCREEN ---
const LoadingScreen = () => (
  <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white">
    <div className="relative">
        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
        <Cpu size={64} className="text-blue-500 relative z-10 animate-bounce" />
    </div>
    <div className="flex items-center gap-3 mt-8">
        <Loader2 className="animate-spin text-blue-400" size={24} />
        <span className="text-xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Initializing System...
        </span>
    </div>
  </div>
);

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // 1. Wait for Clerk to load auth state
  if (!isLoaded) {
    return <LoadingScreen />;
  }

  // 2. If not signed in, redirect to Sign In page
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // 3. Render the protected page
  return children;
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/sign-in/*" element={<SignInRoute />} />
          <Route path="/sign-up/*" element={<SignUpRoute />} />

          {/* --- PROTECTED ROUTES (Require Login) --- */}
          {/* Main Apps */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/course/:id" element={<ProtectedRoute><CourseMap /></ProtectedRoute>} />
          <Route path="/arcade" element={<ProtectedRoute><Arcade /></ProtectedRoute>} />

          {/* Features */}
          <Route path="/mindmap" element={<ProtectedRoute><MindMap /></ProtectedRoute>} />
          <Route path="/github-check" element={<ProtectedRoute><GithubAnalyzer /></ProtectedRoute>} />
          <Route path="/skill-gap" element={<ProtectedRoute><SkillGapResults /></ProtectedRoute>} />
          <Route path="/mentor" element={<ProtectedRoute><MentorHub /></ProtectedRoute>} />
          <Route path="/career" element={<ProtectedRoute><Resume /></ProtectedRoute>} />

          {/* Arcade Games */}
          <Route path="/review" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
          <Route path="/battle" element={<ProtectedRoute><Battle /></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
          <Route path="/store" element={<ProtectedRoute><Store /></ProtectedRoute>} />
          <Route path="/study" element={<ProtectedRoute><StudyRoom /></ProtectedRoute>} />
          <Route path="/exam-oracle" element={<ProtectedRoute><PaperPredictor /></ProtectedRoute>} />

          {/* Advanced Arcade Tools */}
          <Route path="/arcade/glitch" element={<ProtectedRoute><GlitchHunt /></ProtectedRoute>} />
          <Route path="/arcade/speedster" element={<ProtectedRoute><SyntaxSpeedster /></ProtectedRoute>} />
          <Route path="/arcade/regex" element={<ProtectedRoute><RegexRift /></ProtectedRoute>} />
          <Route path="/arcade/refactor" element={<ProtectedRoute><RefactorReactor /></ProtectedRoute>} />
          <Route path="/audit" element={<ProtectedRoute><SentinelAudit /></ProtectedRoute>} />
          <Route path="/arcade/security" element={<ProtectedRoute><SecurityBreach /></ProtectedRoute>} />
          <Route path="/arcade/db" element={<ProtectedRoute><DatabaseDungeon /></ProtectedRoute>} />
          <Route path="/arcade/pipeline" element={<ProtectedRoute><PipelinePulse /></ProtectedRoute>} />
          <Route path="/shell" element={<ProtectedRoute><ShellShock /></ProtectedRoute>} />
          <Route path="/arcade/negotiator" element={<ProtectedRoute><TheNegotiator /></ProtectedRoute>} />
          <Route path="/arcade/docs" element={<ProtectedRoute><GhostRider /></ProtectedRoute>} />
          <Route path="/arcade/lexicon" element={<ProtectedRoute><LexiconUplink /></ProtectedRoute>} />
          <Route path="/arcade/payload" element={<ProtectedRoute><PayloadProtocol /></ProtectedRoute>} />
          <Route path="/arcade/chrono" element={<ProtectedRoute><ChronoShift /></ProtectedRoute>} />
          <Route path="/arcade/oculus" element={<ProtectedRoute><Oculus /></ProtectedRoute>} />
          <Route path="/arcade/spider" element={<ProtectedRoute><TheSpider /></ProtectedRoute>} />
          <Route path="/arcade/sprint" element={<ProtectedRoute><SprintMaster /></ProtectedRoute>} />
          <Route path="/arcade/freelance" element={<ProtectedRoute><FreelanceFortress /></ProtectedRoute>} />
          <Route path="/arcade/pitch" element={<ProtectedRoute><ThePitch /></ProtectedRoute>} />
          <Route path="/arcade/finops" element={<ProtectedRoute><FinOpsFrontier /></ProtectedRoute>} />

          {/* Tools */}
          <Route path="/forge" element={<ProtectedRoute><TheForge /></ProtectedRoute>} />
          <Route path="/hackathon" element={<ProtectedRoute><HackathonHub /></ProtectedRoute>} />
          <Route path="/architect" element={<ProtectedRoute><ArchitectCanvas /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><QuantumAnalytics /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><RoadmapGenerator /></ProtectedRoute>} />
          <Route path="/oracle" element={<ProtectedRoute><CompanyOracle /></ProtectedRoute>} />
          <Route path="/news" element={<ProtectedRoute><DailyByte /></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute><TitanResume /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;