import React, { useMemo } from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { Mic } from 'lucide-react';

const MOCK_PITCH = { concept: "AI Toaster", goodPitch: "Smart toasting based on bread type.", badPitch: "It uses blockchain to heat bread." };

const fetchPitch = async () => {
    try {
        const data = await generateChallenge('pitch');
        if (!data || !data.goodPitch) throw new Error("Invalid Data");
        return data;
    } catch (e) { return MOCK_PITCH; }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    const { options } = useMemo(() => {
        const isGoodLeft = Math.random() > 0.5;
        return {
            options: isGoodLeft 
                ? [{ text: data.goodPitch, isCorrect: true }, { text: data.badPitch, isCorrect: false }]
                : [{ text: data.badPitch, isCorrect: false }, { text: data.goodPitch, isCorrect: true }]
        };
    }, [data]);

    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            <h3 className="text-yellow-400 font-bold uppercase tracking-widest text-xs mb-2">Startup Concept</h3>
            <h2 className="text-3xl font-black text-white mb-8">{data.concept}</h2>

            <div className="grid grid-cols-1 gap-4">
                {options.map((opt, i) => (
                    <button 
                        key={i}
                        disabled={!!feedback}
                        onClick={() => opt.isCorrect ? onSuccess() : onFail()}
                        className="bg-gray-800 border border-gray-700 p-6 rounded-xl hover:bg-yellow-900/20 hover:border-yellow-500 hover:text-white text-gray-400 transition-all text-lg"
                    >
                        "{opt.text}"
                    </button>
                ))}
            </div>
        </div>
    );
};

export default () => <ArcadeGameEngine title="The Pitch" icon={Mic} color="text-yellow-400" instructions="Select the winning elevator pitch. Avoid buzzword soup." onGenerate={fetchPitch} component={GameBoard} />;