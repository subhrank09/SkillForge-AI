import React, { useMemo } from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { Eye } from 'lucide-react';

const MOCK_OCULUS = { issue: "Centering a div", fix: "display: flex; justify-content: center;", bad: "float: center;" };

const fetchOculus = async () => {
    try {
        const data = await generateChallenge('oculus');
        if (!data || !data.fix) throw new Error("Invalid Data");
        return data;
    } catch (e) { return MOCK_OCULUS; }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    const { options } = useMemo(() => {
        const isFixLeft = Math.random() > 0.5;
        return {
            options: isFixLeft 
                ? [{ text: data.fix, isCorrect: true }, { text: data.bad, isCorrect: false }]
                : [{ text: data.bad, isCorrect: false }, { text: data.fix, isCorrect: true }]
        };
    }, [data]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-xl mb-8 flex items-center gap-4">
                <Eye className="text-indigo-400 shrink-0" size={32} />
                <div>
                    <h3 className="text-xs font-bold text-indigo-300 uppercase">Visual Bug Report</h3>
                    <p className="text-xl font-bold text-white">{data.issue}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {options.map((opt, i) => (
                    <button 
                        key={i}
                        disabled={!!feedback}
                        onClick={() => opt.isCorrect ? onSuccess() : onFail()}
                        className="bg-gray-800 p-4 rounded-lg border-l-4 border-gray-600 hover:border-indigo-500 hover:bg-gray-700 text-left font-mono transition-all"
                    >
                        {opt.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default () => <ArcadeGameEngine title="Oculus Vision" icon={Eye} color="text-indigo-400" instructions="Select the correct CSS to resolve the visual issue." onGenerate={fetchOculus} component={GameBoard} />;