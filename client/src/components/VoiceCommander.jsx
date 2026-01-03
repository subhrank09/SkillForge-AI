import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Activity, Command } from 'lucide-react'; // Added Command icon for visual flair

const VoiceCommander = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Browser Support Check
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        processCommand(command);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const processCommand = (cmd) => {
    console.log("Heard:", cmd); // Debugging

    // --- 1. CORE NAVIGATION ---
    if (cmd.includes('home') || cmd.includes('dashboard')) {
      navigate('/dashboard');
      speak("Welcome home, Commander.");
    } 
    else if (cmd.includes('about')) {
      navigate('/about');
      speak("Accessing mission info.");
    }
    else if (cmd.includes('contact') || cmd.includes('message') || cmd.includes('email')) {
      navigate('/contact');
      speak("Opening comms channel.");
    }
    else if (cmd.includes('support') || cmd.includes('help')) {
      navigate('/support');
      speak("Loading support database.");
    }

    // --- 2. LEARNING TOOLS ---
    else if (cmd.includes('roadmap') || cmd.includes('plan')) {
      navigate('/roadmap');
      speak("Initializing Roadmap Generator.");
    }
    else if (cmd.includes('resume') || cmd.includes('career') || cmd.includes('ats')) {
      navigate('/career');
      speak("Analyzing resume protocols.");
    }
    else if (cmd.includes('mind map') || cmd.includes('explore')) {
      navigate('/mindmap');
      speak("Expanding Neural Map.");
    }
    else if (cmd.includes('flashcard') || cmd.includes('review')) {
      navigate('/review');
      speak("Retrieving flashcards.");
    }
    else if (cmd.includes('study room') || cmd.includes('chat')) {
      navigate('/study');
      speak("Connecting to study frequency.");
    }

    // --- 3. SKILL VERIFICATION ---
    else if (cmd.includes('github') || cmd.includes('rate my code') || cmd.includes('repo')) {
      navigate('/github-check');
      speak("Loading GitHub Analyzer.");
    }
    else if (cmd.includes('skill') || cmd.includes('weakness') || cmd.includes('gap')) {
      navigate('/skill-gap');
      speak("Running Skill Gap Analysis.");
    }
    else if (cmd.includes('interview') || cmd.includes('roleplay')) {
      navigate('/interview');
      speak("Mock Interview sequence initiated.");
    }
    else if (cmd.includes('exam') || cmd.includes('oracle') || cmd.includes('predict')) {
      navigate('/predictor');
      speak("Consulting the Oracle.");
    }

    // --- 4. ADVANCED & NEW FEATURES ---
    else if (cmd.includes('forge') || cmd.includes('scaffold') || cmd.includes('project')) {
      navigate('/forge');
      speak("Igniting The Forge.");
    }
    else if (cmd.includes('nexus') || cmd.includes('neural') || cmd.includes('brain')) {
      navigate('/nexus');
      speak("Entering Neural Nexus.");
    }
    else if (cmd.includes('algo') || cmd.includes('vision') || cmd.includes('sort')) {
      navigate('/algo-vision');
      speak("Visualizing Algorithms.");
    }

    // --- 5. GAMIFICATION ---
    else if (cmd.includes('battle') || cmd.includes('arena') || cmd.includes('quiz')) {
      navigate('/battle');
      speak("Entering Battle Arena.");
    }
    else if (cmd.includes('duel') || cmd.includes('fight') || cmd.includes('race')) {
      navigate('/duel');
      speak("Code Duel initialized. Prepare for combat.");
    }
    else if (cmd.includes('store') || cmd.includes('shop') || cmd.includes('redeem')) {
      navigate('/store');
      speak("Accessing XP Store.");
    }

    // --- FALLBACK ---
    else {
      setFeedback(`Unknown: "${cmd}"`);
      speak("Command not recognized.");
    }
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    // Cancel previous speech to avoid overlapping
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    // Prefer a female/robot voice like Google US English or Microsoft Zira
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.rate = 1.1; 
    utterance.pitch = 1.0;
    
    synth.speak(utterance);
    setFeedback(text);
    setTimeout(() => setFeedback(""), 4000);
  };

  const toggleListen = () => {
    if (!recognitionRef.current) {
        alert("Voice control requires Chrome or Edge.");
        return;
    }
    try {
        if (isListening) recognitionRef.current.stop();
        else recognitionRef.current.start();
    } catch (e) {
        console.warn("Mic Toggle Error", e);
        setIsListening(false);
    }
  };

  if (!recognitionRef.current) return null; 

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-4">
      {/* Listening Indicator */}
      {isListening && (
        <div className="flex items-center gap-1 h-8 px-4 bg-black/90 border border-cyan-500/50 rounded-full backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <div className="w-1 h-3 bg-cyan-400 animate-pulse delay-75" />
            <div className="w-1 h-5 bg-cyan-400 animate-pulse delay-150" />
            <div className="w-1 h-4 bg-cyan-400 animate-pulse delay-0" />
            <div className="w-1 h-6 bg-cyan-400 animate-pulse delay-100" />
            <span className="ml-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">Listening</span>
        </div>
      )}

      {/* Feedback Toast (Robot Response) */}
      {feedback && (
         <div className="absolute bottom-16 left-0 bg-gray-900/90 border border-cyan-500/50 text-cyan-300 text-xs font-mono py-3 px-5 rounded-tr-xl rounded-tl-xl rounded-br-xl whitespace-nowrap shadow-[0_0_20px_rgba(34,211,238,0.2)] animate-in slide-in-from-bottom-2 fade-in">
            <span className="text-gray-500 mr-2">{">"}</span> {feedback}
         </div>
      )}

      {/* Activation Button */}
      <button 
        onClick={toggleListen}
        className={`p-4 rounded-full border-2 transition-all duration-300 shadow-xl group hover:scale-110 active:scale-95 ${
          isListening 
            ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.6)] animate-pulse' 
            : 'bg-black/80 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
        }`}
      >
        {isListening ? <Activity size={24} /> : <Mic size={24} />}
      </button>
    </div>
  );
};

export default VoiceCommander;