import React from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { DollarSign, Briefcase } from 'lucide-react';

const MOCK_NEG = { offer: "$90,000", counter: "Ask for $105k", result: "Accepted" };

const fetchNeg = async () => {
    try {
        const data = await generateChallenge('negotiator');
        if (!data || !data.offer) throw new Error("Invalid Data");
        return data;
    } catch (e) { return MOCK_NEG; }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    // Logic: If result is 'Accepted', the correct move was to Counter. 
    // If result is 'Rejected', the correct move was to Accept the original.
    const correctMove = data.result === 'Accepted' ? 'counter' : 'accept';

    return (
        <div className="w-full max-w-lg mx-auto bg-gray-900 border border-green-500/30 p-8 rounded-xl text-center">
            <Briefcase className="mx-auto text-green-500 mb-4" size={40}/>
            <h3 className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-2">Initial Offer</h3>
            <p className="text-4xl font-black text-white mb-8">{data.offer}</p>

            <div className="grid grid-cols-1 gap-4">
                <button 
                    disabled={!!feedback}
                    onClick={() => correctMove === 'accept' ? onSuccess() : onFail()}
                    className="bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold transition-all"
                >
                    Accept Offer
                </button>
                <button 
                    disabled={!!feedback}
                    onClick={() => correctMove === 'counter' ? onSuccess() : onFail()}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 py-4 rounded-xl font-bold transition-all border border-gray-700"
                >
                    Counter: {data.counter}
                </button>
            </div>
        </div>
    );
};

export default () => <ArcadeGameEngine title="The Negotiator" icon={DollarSign} color="text-green-400" instructions="Maximize your income. Decide whether to accept the offer or risk a counter-offer." onGenerate={fetchNeg} component={GameBoard} />;