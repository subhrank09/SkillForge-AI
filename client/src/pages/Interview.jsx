import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInterviewQuestion, evaluateAnswer } from '../api/axios';
import { Mic, MicOff, Send, ArrowRight, Loader2, User, Bot, Volume2, VolumeX } from 'lucide-react';

const Interview = () => {
  const navigate = useNavigate();
  
  // -- STATE --
  const [role, setRole] = useState('Frontend Developer');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [started, setStarted] = useState(false);
  
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  // -- VOICE STATE --
  const [isListening, setIsListening] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false); // Toggle to enable auto-speak
  const recognitionRef = useRef(null);

  // -- INIT SPEECH RECOGNITION --
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswer(prev => transcript); // Simple overwrite for demo (or append if preferred)
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech Error:", event.error);
        setIsListening(false);
      };
    } else {
      console.warn("Browser does not support Speech Recognition");
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      window.speechSynthesis.cancel(); // Stop talking on unmount
    };
  }, []);

  // -- SPEAK FUNCTION --
  const speak = (text) => {
    if (!voiceMode) return;
    window.speechSynthesis.cancel(); // Stop previous
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  // -- HANDLERS --

  const startInterview = async () => {
    setLoading(true);
    try {
      const data = await getInterviewQuestion(role, difficulty);
      setQuestion(data.question);
      setStarted(true);
      speak(data.question); // Auto-speak question
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setAnswer(''); // Clear previous answer
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const submitAnswer = async () => {
    if (isListening) toggleListening(); // Stop mic
    setLoading(true);
    try {
      const data = await evaluateAnswer(question, answer);
      setFeedback(data);
      
      // Auto-speak feedback summary
      const spokenFeedback = `You scored ${data.score} out of 10. ${data.feedback}`;
      speak(spokenFeedback);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = async () => {
    setFeedback(null);
    setAnswer('');
    window.speechSynthesis.cancel();
    await startInterview();
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[120px] -z-10" />
      
      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="text-green-500" /> AI Interviewer
        </h1>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setVoiceMode(!voiceMode)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${voiceMode ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-gray-800 text-gray-500 border border-gray-700'}`}
          >
            {voiceMode ? <><Volume2 size={14} /> VOICE ON</> : <><VolumeX size={14} /> VOICE OFF</>}
          </button>
          <button onClick={() => navigate('/home')} className="text-gray-400 hover:text-white">Exit</button>
        </div>
      </div>

      {!started ? (
        <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 max-w-md w-full animate-in fade-in zoom-in">
          <h2 className="text-xl font-bold mb-6 text-center">Configure Session</h2>
          
          <label className="block text-sm text-gray-400 mb-2">Target Role</label>
          <input 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-black border border-gray-700 p-3 rounded-lg mb-4 text-white focus:border-green-500 outline-none" 
          />
          
          <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-black border border-gray-700 p-3 rounded-lg mb-8 text-white focus:border-green-500 outline-none"
          >
            <option>Junior</option>
            <option>Intermediate</option>
            <option>Senior</option>
          </select>

          <button onClick={startInterview} disabled={loading} className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-transform hover:scale-105">
            {loading ? <Loader2 className="animate-spin" /> : "Start Interview"}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          
          {/* AI Question Bubble */}
          <div className="flex gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 border border-green-500/30">
              <Bot className="text-green-500" size={24} />
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl rounded-tl-none border border-gray-800 text-lg shadow-lg relative group">
              {question}
              <button 
                onClick={() => speak(question)}
                className="absolute top-2 right-2 p-2 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-500/20 text-green-400"
              >
                <Volume2 size={16} />
              </button>
            </div>
          </div>

          {/* User Answer Area */}
          {!feedback && (
            <div className="mb-6 relative">
              <textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={isListening ? "Listening..." : "Type your answer or click the mic..."}
                className={`w-full bg-black border rounded-xl p-4 h-40 focus:border-green-500 outline-none resize-none transition-all ${isListening ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-gray-700'}`}
              />
              
              {/* Voice Controls */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <button 
                  onClick={toggleListening}
                  className={`p-3 rounded-full transition-all flex items-center gap-2 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  {isListening && <span className="text-xs font-bold">LISTENING...</span>}
                </button>
              </div>

              <button 
                onClick={submitAnswer} 
                disabled={loading || !answer}
                className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Submit <Send size={18} /></>}
              </button>
            </div>
          )}

          {/* Feedback Section */}
          {feedback && (
            <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className={`text-4xl font-bold ${feedback.score >= 7 ? 'text-green-400' : 'text-red-400'}`}>
                  {feedback.score}<span className="text-lg text-gray-600">/10</span>
                </div>
                <div className="flex-1">
                    <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full ${feedback.score >= 7 ? 'bg-green-500' : 'bg-red-500'} transition-all duration-1000`} style={{ width: `${feedback.score * 10}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-bold">
                        {feedback.score >= 7 ? "Passing Score" : "Needs Improvement"}
                    </p>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-black/30 rounded-xl border border-white/5">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">AI Feedback</h4>
                <p className="text-gray-300 leading-relaxed">{feedback.feedback}</p>
              </div>

              <div className="mb-8 p-4 bg-green-900/10 border border-green-500/20 rounded-xl">
                <h4 className="text-xs font-bold text-green-600 uppercase mb-2">Better Answer</h4>
                <p className="text-green-300/90 italic">"{feedback.betterAnswer}"</p>
              </div>

              <button onClick={nextQuestion} className="w-full bg-white text-black hover:bg-gray-200 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
                Next Question &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Interview;