import React from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { TrendingUp, DollarSign } from 'lucide-react';

const MOCK_FIN = { resource: "Unattached EBS Volume", action: "Delete Volume" };

const fetchFin = async () => {
    try {
        const data = await generateChallenge('finops');
        if (!data || !data.action) throw new Error("Invalid Data");
        return data;
    } catch (e) { return MOCK_FIN; }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    return (
        <div className="w-full max-w-lg mx-auto bg-gray-900 border border-blue-400/30 p-8 rounded-xl text-center">
            <div className="flex justify-center items-center gap-2 text-blue-400 mb-2">
                <TrendingUp size={20}/>
                <span className="font-bold text-xs uppercase">Cost Anomaly Detected</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-8">{data.resource}</h3>

            <div className="space-y-3">
                <button 
                    disabled={!!feedback}
                    onClick={onSuccess} // The action provided by AI is the correct optimization
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
                >
                    {data.action}
                </button>
                <button 
                    disabled={!!feedback}
                    onClick={onFail}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-gray-400 py-4 rounded-xl font-bold transition-all"
                >
                    Ignore Alert
                </button>
            </div>
        </div>
    );
};

export default () => <ArcadeGameEngine title="FinOps Frontier" icon={DollarSign} color="text-blue-400" instructions="Optimize cloud spend. Take the correct action for the resource." onGenerate={fetchFin} component={GameBoard} />;