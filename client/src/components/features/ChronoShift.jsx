import React, { useMemo } from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { Clock } from 'lucide-react';

const MOCK_CHRONO = { code: "for(i=0;i<n;i++) {}", answer: "O(n)", wrong: "O(1)" };

const fetchChrono = async () => {
    try {
        const data = await generateChallenge('chrono');
        if (!data || !data.answer) throw new Error("Invalid Data");
        return data;
    } catch (e) { return MOCK_CHRONO; }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    const { options } = useMemo(() => {
        const isAnswerLeft = Math.random() > 0.5;
        return {
            options: isAnswerLeft 
                ? [{ text: data.answer, isCorrect: true }, { text: data.wrong, isCorrect: false }]
                : [{ text: data.wrong, isCorrect: false }, { text: data.answer, isCorrect: true }]
        };
    }, [data]);

    return (
        <div className="w-full max-w-3xl mx-auto text-center">
            <div className="bg-black border border-yellow-500/30 p-6 rounded-xl font-mono text-yellow-100 mb-8 overflow-x-auto">
                {data.code}
            </div>
            
            <div className="flex justify-center gap-6">
                {options.map((opt, i) => (
                    <button 
                        key={i}
                        disabled={!!feedback}
                        onClick={() => opt.isCorrect ? onSuccess() : onFail()}
                        className="w-32 h-32 rounded-full bg-gray-800 border-4 border-gray-700 hover:border-yellow-500 hover:bg-gray-700 flex items-center justify-center text-xl font-bold font-mono transition-all"
                    >
                        {opt.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default () => <ArcadeGameEngine title="Chrono Shift" icon={Clock} color="text-yellow-500" instructions="Determine the Time Complexity of the code snippet." onGenerate={fetchChrono} component={GameBoard} />;