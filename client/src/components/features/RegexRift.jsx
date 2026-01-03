import React, { useState } from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator'; 
import { Search, Terminal, AlertTriangle } from 'lucide-react';

// Fallback in case AI is offline
const MOCK_DATA = { 
    target: "Find all digits", 
    testString: "Order #5521 costs $99.00", 
    answer: "\\d+" 
};

const fetchRegex = async () => {
    try {
        const data = await generateChallenge('regex');
        // Ensure data exists and has necessary fields
        if (!data || !data.target || !data.answer) throw new Error("Invalid AI Data");
        return data;
    } catch (e) {
        return MOCK_DATA;
    }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    const [userPattern, setUserPattern] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    // Safe data access
    const safeTarget = data?.target || MOCK_DATA.target;
    const safeString = data?.testString || MOCK_DATA.testString;
    const safeAnswer = data?.answer || MOCK_DATA.answer;

    const runRegex = (e) => {
        e.preventDefault();
        setErrorMsg(null);

        try {
            // 1. Compile User Regex
            // We use 'g' (global) flag by default for this game
            const userRegex = new RegExp(userPattern, 'g');
            
            // 2. Compile Correct Regex (from AI)
            const correctRegex = new RegExp(safeAnswer, 'g');

            // 3. Test both against the string
            const userMatches = safeString.match(userRegex);
            const correctMatches = safeString.match(correctRegex);

            // 4. Compare results
            // If userMatches is null (no match) and correct is null, it's a match (technically)
            // But usually we want them to find something.
            const userStr = JSON.stringify(userMatches);
            const correctStr = JSON.stringify(correctMatches);

            if (userStr === correctStr) {
                onSuccess();
            } else {
                onFail();
                // Optional: Show what they matched vs what was expected for debugging
                console.log(`User Matched: ${userStr} | Expected: ${correctStr}`);
            }

        } catch (err) {
            // Handle invalid regex syntax (e.g. open brackets)
            onFail();
            setErrorMsg("Invalid Regex Syntax");
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            
            {/* Target Card */}
            <div className="bg-gray-900 border border-purple-500/30 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Search size={100} className="text-purple-500"/>
                </div>
                <h3 className="text-purple-400 font-bold uppercase text-xs tracking-widest mb-2">Mission Objective</h3>
                <p className="text-2xl font-bold text-white mb-6">{safeTarget}</p>
                
                <div className="bg-black/50 p-4 rounded-lg border border-purple-500/20 font-mono text-gray-300">
                    <span className="text-gray-500 select-none">$ test_string = </span>
                    "{safeString}"
                </div>
            </div>

            {/* Regex Input Console */}
            <div className="bg-black border border-gray-700 p-6 rounded-xl shadow-2xl">
                <form onSubmit={runRegex} className="flex items-center gap-3">
                    <span className="text-gray-500 font-mono text-xl select-none">/</span>
                    <input 
                        autoFocus
                        className="flex-1 bg-transparent text-white font-mono text-xl outline-none placeholder:text-gray-700"
                        placeholder="pattern..."
                        value={userPattern}
                        onChange={(e) => setUserPattern(e.target.value)}
                    />
                    <span className="text-gray-500 font-mono text-xl select-none">/g</span>
                    
                    <button 
                        type="submit"
                        disabled={feedback === 'success'}
                        className="ml-4 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Run
                    </button>
                </form>

                {/* Error / Feedback Area */}
                {(feedback === 'error' || errorMsg) && (
                    <div className="mt-4 flex items-center gap-2 text-red-400 text-sm animate-fade-in">
                        <AlertTriangle size={16}/>
                        <span>{errorMsg || "Pattern did not capture the correct data."}</span>
                    </div>
                )}
            </div>

            {/* Quick Cheatsheet (Optional) */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs text-gray-500 font-mono">
                <div className="bg-gray-900 p-2 rounded border border-gray-800" title="Digit">\d</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-800" title="Word Char">\w</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-800" title="Whitespace">\s</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-800" title="Any Char">.</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-800" title="One or more">+</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-800" title="Zero or more">*</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-800" title="Start of Line">^</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-800" title="End of Line">$</div>
            </div>

        </div>
    );
};

export default () => (
    <ArcadeGameEngine 
        title="Regex Rift" 
        icon={Search} 
        color="text-purple-400" 
        instructions="Construct a Regex pattern to match the target data in the string. Use standard JavaScript Regex syntax." 
        onGenerate={fetchRegex} 
        component={GameBoard} 
    />
);