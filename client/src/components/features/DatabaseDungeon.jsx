import React from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { Database, AlertTriangle, Eye } from 'lucide-react';

const MOCK_DB = { query: "DROP TABLE Users;", type: "Destructive" };

const fetchDB = async () => {
    try {
        const data = await generateChallenge('db');
        if (!data || !data.query || !data.type) throw new Error("Invalid Data");
        return data;
    } catch (e) { return MOCK_DB; }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            <div className="bg-gray-900 border-2 border-blue-500/30 rounded-xl p-8 mb-8 relative shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-blue-500 px-4 py-1 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
                    Incoming Query
                </div>
                <code className="text-xl md:text-2xl font-mono text-white block">
                    {data.query}
                </code>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <button 
                    disabled={!!feedback}
                    onClick={() => data.type === 'Read' ? onSuccess() : onFail()}
                    className="group bg-gray-800 border border-gray-700 p-6 rounded-xl hover:bg-green-900/20 hover:border-green-500 transition-all"
                >
                    <Eye className="mx-auto mb-3 text-gray-400 group-hover:text-green-400" size={32}/>
                    <span className="block text-gray-400 font-bold group-hover:text-green-400">SAFE READ</span>
                </button>

                <button 
                    disabled={!!feedback}
                    onClick={() => data.type === 'Destructive' ? onSuccess() : onFail()}
                    className="group bg-gray-800 border border-gray-700 p-6 rounded-xl hover:bg-red-900/20 hover:border-red-500 transition-all"
                >
                    <AlertTriangle className="mx-auto mb-3 text-gray-400 group-hover:text-red-400" size={32}/>
                    <span className="block text-gray-400 font-bold group-hover:text-red-400">DESTRUCTIVE</span>
                </button>
            </div>
        </div>
    );
};

export default () => <ArcadeGameEngine title="Database Dungeon" icon={Database} color="text-blue-500" instructions="Analyze the SQL query. Execute if Safe, Block if Destructive." onGenerate={fetchDB} component={GameBoard} />;