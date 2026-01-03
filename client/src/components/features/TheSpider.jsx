import React, { useMemo } from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { Globe, MousePointer } from 'lucide-react';

// Use local mock since prompt wasn't in list, or add 'spider' prompt to generator
const MOCK_SPIDER = { target: "Submit Button", correct: "form button[type='submit']", wrong: "div.btn" };

const fetchSpider = async () => {
   // Simulating async for consistency
   return new Promise(resolve => setTimeout(() => resolve(MOCK_SPIDER), 500));
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    const { options } = useMemo(() => {
        const isCorrectLeft = Math.random() > 0.5;
        return {
            options: isCorrectLeft 
                ? [{ text: data.correct, isCorrect: true }, { text: data.wrong, isCorrect: false }]
                : [{ text: data.wrong, isCorrect: false }, { text: data.correct, isCorrect: true }]
        };
    }, [data]);

    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            <Globe className="mx-auto text-gray-500 mb-4" size={40}/>
            <h3 className="text-gray-400 uppercase text-xs font-bold">Target Element</h3>
            <p className="text-3xl font-bold text-white mb-8">{data.target}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((opt, i) => (
                    <button 
                        key={i}
                        disabled={!!feedback}
                        onClick={() => opt.isCorrect ? onSuccess() : onFail()}
                        className="bg-black border border-gray-800 p-6 rounded-xl hover:border-orange-500 text-gray-300 font-mono transition-all"
                    >
                        {opt.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default () => <ArcadeGameEngine title="The Spider" icon={MousePointer} color="text-orange-400" instructions="Select the most accurate CSS selector for the target." onGenerate={fetchSpider} component={GameBoard} />;