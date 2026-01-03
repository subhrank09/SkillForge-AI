import React, { useMemo } from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { RefreshCw, CheckCircle, XCircle, Code2, ArrowRight } from 'lucide-react';

// Fallback data if AI is offline
const MOCK_DATA = {
    bad: "for (var i = 0; i < arr.length; i++) { console.log(arr[i]); }",
    good: "arr.forEach(item => console.log(item));",
    context: "Use array methods like forEach() for cleaner iteration over raw loops."
};

const fetchRefactor = async () => {
    try {
        const data = await generateChallenge('refactor');
        if (!data || !data.bad || !data.good) throw new Error("Invalid Data");
        return data;
    } catch (e) {
        return MOCK_DATA;
    }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    // Randomize which side is "Good" so it's not predictable
    // useMemo ensures this only calculates once per new data load
    const { left, right, correctSide } = useMemo(() => {
        // Safe access to props
        const badCode = data?.bad || MOCK_DATA.bad;
        const goodCode = data?.good || MOCK_DATA.good;
        
        const isLeftGood = Math.random() > 0.5;
        return {
            left: isLeftGood ? goodCode : badCode,
            right: isLeftGood ? badCode : goodCode,
            correctSide: isLeftGood ? 'left' : 'right'
        };
    }, [data]);

    const handleSelect = (side) => {
        if (feedback) return; // Prevent clicking after decision
        
        if (side === correctSide) {
            onSuccess();
        } else {
            onFail();
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            
            {/* Context / Hint Header */}
            <div className="mb-8 text-center max-w-2xl">
                <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Optimization Challenge</h3>
                <p className="text-gray-400 text-sm">
                    Analyze both snippets below. Select the one that represents <span className="text-white font-bold">modern best practices</span>, better performance, or cleaner readability.
                </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                
                {/* LEFT OPTION */}
                <button 
                    onClick={() => handleSelect('left')}
                    disabled={!!feedback}
                    className={`group relative text-left p-6 rounded-xl border-2 transition-all duration-300 h-full flex flex-col ${
                        feedback && correctSide === 'left' 
                            ? 'bg-green-900/20 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                            : feedback && correctSide !== 'left'
                            ? 'bg-red-900/10 border-gray-800 opacity-50'
                            : 'bg-gray-900 border-gray-800 hover:border-blue-500 hover:bg-gray-800/80 hover:shadow-2xl hover:-translate-y-1'
                    }`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase group-hover:text-blue-400 transition-colors">Snippet A</span>
                        <Code2 size={16} className="text-gray-600 group-hover:text-blue-400"/>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-300 border border-gray-800 group-hover:border-gray-700 flex-1 overflow-x-auto">
                        <pre className="whitespace-pre-wrap">{left}</pre>
                    </div>

                    {/* Result Icon Overlay */}
                    {feedback && (
                        <div className="absolute top-4 right-4">
                            {correctSide === 'left' 
                                ? <CheckCircle className="text-green-500 animate-bounce" size={24}/>
                                : <XCircle className="text-red-500" size={24}/>
                            }
                        </div>
                    )}
                </button>

                {/* VS Badge (Desktop only) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black border border-gray-700 rounded-full w-10 h-10 items-center justify-center font-black text-gray-600 italic">
                    VS
                </div>

                {/* RIGHT OPTION */}
                <button 
                    onClick={() => handleSelect('right')}
                    disabled={!!feedback}
                    className={`group relative text-left p-6 rounded-xl border-2 transition-all duration-300 h-full flex flex-col ${
                        feedback && correctSide === 'right' 
                            ? 'bg-green-900/20 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                            : feedback && correctSide !== 'right'
                            ? 'bg-red-900/10 border-gray-800 opacity-50'
                            : 'bg-gray-900 border-gray-800 hover:border-blue-500 hover:bg-gray-800/80 hover:shadow-2xl hover:-translate-y-1'
                    }`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase group-hover:text-blue-400 transition-colors">Snippet B</span>
                        <Code2 size={16} className="text-gray-600 group-hover:text-blue-400"/>
                    </div>

                    <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-300 border border-gray-800 group-hover:border-gray-700 flex-1 overflow-x-auto">
                        <pre className="whitespace-pre-wrap">{right}</pre>
                    </div>

                    {/* Result Icon Overlay */}
                    {feedback && (
                        <div className="absolute top-4 right-4">
                            {correctSide === 'right' 
                                ? <CheckCircle className="text-green-500 animate-bounce" size={24}/>
                                : <XCircle className="text-red-500" size={24}/>
                            }
                        </div>
                    )}
                </button>
            </div>

            {/* Explanation Footer (Revealed on completion) */}
            {feedback && (
                <div className="mt-8 animate-fade-in bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex items-start gap-3 max-w-2xl">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <RefreshCw size={20}/>
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-100 text-sm mb-1">Refactoring Insight</h4>
                        <p className="text-blue-200/80 text-sm leading-relaxed">
                            {data?.context || MOCK_DATA.context}
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default () => (
    <ArcadeGameEngine 
        title="Refactor Reactor" 
        icon={RefreshCw} 
        color="text-blue-400" 
        instructions="Two code snippets perform the same task. Choose the one that is cleaner, more modern, or more efficient." 
        onGenerate={fetchRefactor} 
        component={GameBoard} 
    />
);