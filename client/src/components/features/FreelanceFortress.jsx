import React from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { Briefcase } from 'lucide-react';

const MOCK_FREE = { client: "I need a clone of Amazon for $500.", action: "Decline" };

const fetchFreelance = async () => {
    try {
        const data = await generateChallenge('freelance');
        if (!data || !data.action) throw new Error("Invalid Data");
        return data;
    } catch (e) { return MOCK_FREE; }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-900 border border-purple-500/30 p-8 rounded-xl text-center">
            <div className="bg-purple-900/20 text-purple-300 inline-block px-4 py-1 rounded-full text-xs font-bold mb-6">NEW MESSAGE</div>
            <p className="text-xl md:text-2xl font-serif italic text-white mb-8">"{data.client}"</p>

            <div className="flex gap-4 justify-center">
                <button 
                    disabled={!!feedback}
                    onClick={() => data.action === 'Accept' ? onSuccess() : onFail()}
                    className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-bold transition-all"
                >
                    Accept Job
                </button>
                <button 
                    disabled={!!feedback}
                    onClick={() => data.action === 'Decline' ? onSuccess() : onFail()}
                    className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg font-bold transition-all"
                >
                    Decline
                </button>
            </div>
        </div>
    );
};

export default () => <ArcadeGameEngine title="Freelance Fortress" icon={Briefcase} color="text-purple-500" instructions="Evaluate the client request. Accept good opportunities, decline red flags." onGenerate={fetchFreelance} component={GameBoard} />;