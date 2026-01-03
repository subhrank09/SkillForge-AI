import React, { useState, useEffect } from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator'; 
import { Bug, Code, Edit3, Check, X } from 'lucide-react';

// Fallback data updated with 'fix'
const MOCK_FALLBACK = {
    code: `function add(a, b) {\n return a * b;\n}`,
    bugLine: 1,
    fix: "return a + b;",
    explanation: "Incorrect operator used (* instead of +)."
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    const [editingLine, setEditingLine] = useState(null); // Which line is being edited?
    const [userFix, setUserFix] = useState(""); // What did the user type?

    // Safe data access
    const safeCode = data?.code || MOCK_FALLBACK.code;
    const safeBugLine = data?.bugLine ?? MOCK_FALLBACK.bugLine;
    const safeFix = data?.fix || MOCK_FALLBACK.fix;
    const lines = safeCode.split('\n');

    const handleLineClick = (index) => {
        // Only allow editing if we aren't already successful
        if (feedback === 'success') return;
        
        setEditingLine(index);
        setUserFix(lines[index]); // Pre-fill with the buggy code
    };

    const submitFix = () => {
        if (editingLine === null) return;

        // 1. Did they pick the correct line?
        if (editingLine !== safeBugLine) {
            onFail(); // Wrong line!
            return;
        }

        // 2. Did they fix the code?
        // Normalization: Remove all spaces to ignore formatting differences
        // e.g. "a+b" == "a + b"
        const cleanUser = userFix.replace(/\s/g, '');
        const cleanAnswer = safeFix.replace(/\s/g, '');

        if (cleanUser === cleanAnswer) {
            onSuccess();
            setEditingLine(null); // Exit edit mode
        } else {
            onFail(); // Code is still wrong
        }
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl w-full max-w-3xl">
            {/* Header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <Code size={14} className="text-red-400"/>
                    <span className="text-xs font-mono text-gray-400">
                        {data?.code ? "source_code.js" : "source_code.js (Offline)"}
                    </span>
                </div>
                <div className="text-xs text-blue-400 flex items-center gap-1">
                    <Edit3 size={12}/> Click a line to edit
                </div>
            </div>

            {/* Code Editor Area */}
            <div className="p-6 font-mono text-sm leading-relaxed relative">
                {lines.map((line, i) => (
                    <div key={i} className="min-h-[32px] flex items-center">
                        {/* Line Number */}
                        <span className="w-8 text-gray-600 select-none text-right pr-4 border-r border-gray-800 mr-4">
                            {i + 1}
                        </span>

                        {/* Line Content OR Input Field */}
                        {editingLine === i ? (
                            <div className="flex-1 flex items-center gap-2 animate-fade-in">
                                <input 
                                    autoFocus
                                    className="flex-1 bg-blue-900/30 border border-blue-500/50 text-white px-2 py-1 rounded outline-none focus:border-blue-400 font-mono"
                                    value={userFix}
                                    onChange={(e) => setUserFix(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && submitFix()}
                                />
                                <button 
                                    onClick={submitFix}
                                    className="p-1 bg-green-600 hover:bg-green-500 rounded text-white transition-colors"
                                    title="Submit Fix"
                                >
                                    <Check size={14}/>
                                </button>
                                <button 
                                    onClick={() => setEditingLine(null)}
                                    className="p-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
                                    title="Cancel"
                                >
                                    <X size={14}/>
                                </button>
                            </div>
                        ) : (
                            <div 
                                onClick={() => handleLineClick(i)}
                                className={`flex-1 cursor-text p-1 rounded transition-colors border border-transparent hover:border-gray-700 hover:bg-gray-800/50 ${
                                    // If success, highlight the fixed line in green
                                    feedback === 'success' && i === safeBugLine 
                                        ? 'text-green-400 bg-green-900/20' 
                                        : 'text-gray-300'
                                }`}
                            >
                                {/* Show the FIXED code if won, otherwise show buggy code */}
                                {feedback === 'success' && i === safeBugLine ? safeFix : line}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Hint / Instructions Footer */}
            <div className="p-3 bg-black/40 border-t border-gray-800 text-center">
                {feedback === 'error' ? (
                     <span className="text-xs text-red-400 flex items-center justify-center gap-2">
                        <Bug size={12}/> Logic Error Detected. Check your syntax and logic.
                     </span>
                ) : (
                    <span className="text-xs text-gray-500">
                        {editingLine !== null ? "Press Enter to submit patch" : "Select the buggy line to rewrite it"}
                    </span>
                )}
            </div>
        </div>
    );
};

// Fetcher Wrapper
const fetchGroqGlitch = async () => {
    try {
        const data = await generateChallenge('glitch');
        if (!data || !data.code || !data.fix) throw new Error("Incomplete Data");
        return data;
    } catch (e) {
        return MOCK_FALLBACK;
    }
};

export default () => (
    <ArcadeGameEngine 
        title="Glitch Hunt" 
        icon={Bug} 
        color="text-red-400" 
        instructions="Debug Mode Active. Click the buggy line, rewrite the code to fix the logic, and press Enter to patch." 
        onGenerate={fetchGroqGlitch} 
        component={GameBoard} 
    />
);