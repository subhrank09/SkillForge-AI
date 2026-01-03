import React, { useState, useEffect, useRef } from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { Zap, Terminal, Clock, Trophy, RefreshCw } from 'lucide-react';

// Fallback Data
const MOCK_DATA = {
    code: "const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$/;",
    description: "Complex Regex pattern for email validation."
};

const fetchSyntax = async () => {
    try {
        const data = await generateChallenge('syntax');
        if (!data || !data.code) throw new Error("Invalid Data");
        return data;
    } catch (e) {
        return MOCK_DATA;
    }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const inputRef = useRef(null);

    // Safe Data
    const targetCode = data?.code || MOCK_DATA.code;
    const description = data?.description || MOCK_DATA.description;

    // Reset when new level loads
    useEffect(() => {
        setInput('');
        setStartTime(null);
        setWpm(0);
        // Auto-focus input
        if (inputRef.current) inputRef.current.focus();
    }, [data]);

    const handleInput = (e) => {
        const val = e.target.value;
        
        // 1. Start Timer on first keystroke
        if (!startTime && val.length > 0) {
            setStartTime(Date.now());
        }

        setInput(val);

        // 2. Check for Win Condition (Exact Match)
        if (val === targetCode) {
            const timeTaken = (Date.now() - startTime) / 1000 / 60; // in minutes
            const words = targetCode.length / 5; // Standard WPM calc
            setWpm(Math.round(words / timeTaken));
            onSuccess();
        }
    };

    // Calculate accuracy for styling
    // We check how many chars match the start of the target string
    const isCorrectSoFar = targetCode.startsWith(input);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Header / Stats */}
            <div className="flex items-center justify-between w-full mb-6 px-4">
                <div className="flex items-center gap-2 text-yellow-400">
                    <Zap size={24} className={startTime && !feedback ? "animate-pulse" : ""} />
                    <h2 className="text-xl font-bold uppercase italic tracking-widest">Syntax Racer</h2>
                </div>
                {feedback === 'success' && (
                    <div className="flex items-center gap-2 bg-green-900/50 px-4 py-2 rounded-lg border border-green-500 text-green-400 animate-bounce">
                        <Trophy size={18} />
                        <span className="font-mono font-bold">{wpm} WPM</span>
                    </div>
                )}
            </div>

            {/* Code Display Monitor */}
            <div className="w-full bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-2xl mb-6 relative group">
                {/* File Header */}
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                    <span className="text-xs font-mono text-gray-400">{description}</span>
                    <span className="text-xs font-mono text-gray-500">{input.length} / {targetCode.length} chars</span>
                </div>

                {/* The Code to Type */}
                <div className="p-8 relative">
                    {/* Ghost Text (The Target) */}
                    <div className="font-mono text-xl md:text-2xl text-gray-600 select-none absolute top-8 left-8 right-8 break-all pointer-events-none">
                        {targetCode}
                    </div>

                    {/* User Text Overlay */}
                    <div className={`font-mono text-xl md:text-2xl break-all relative z-10 ${
                        isCorrectSoFar ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                    }`}>
                        {input}
                        {/* Blinking Cursor */}
                        {!feedback && (
                             <span className="inline-block w-2 h-6 bg-white animate-pulse align-middle ml-0.5" />
                        )}
                    </div>
                </div>
            </div>

            {/* Input Area (Hidden but focused, or visible if you prefer) */}
            {/* We keep it visible but styled neutrally to act as the interaction point */}
            <input 
                ref={inputRef}
                autoFocus
                disabled={feedback === 'success'}
                className="w-full bg-black border border-gray-800 p-4 rounded-xl text-gray-500 font-mono focus:border-yellow-500 focus:text-white outline-none transition-all text-center placeholder:text-gray-700"
                placeholder="Start typing the code above..."
                value={input}
                onChange={handleInput}
                onPaste={(e) => e.preventDefault()} // Disable Copy/Paste to force typing
                autoComplete="off"
                spellCheck="false"
            />

            <p className="mt-4 text-xs text-gray-500 font-mono">
                {feedback === 'success' ? "Level Complete! Re-roll for next challenge." : "Pro Tip: Accuracy matters more than speed. Don't stop."}
            </p>

        </div>
    );
};

export default () => (
    <ArcadeGameEngine 
        title="Syntax Speedster" 
        icon={Terminal} 
        color="text-yellow-400" 
        instructions="Race against the clock. Type the complex syntax line exactly as shown. No copy-paste allowed." 
        onGenerate={fetchSyntax} 
        component={GameBoard} 
    />
);