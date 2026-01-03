import React, { useState } from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { Terminal } from 'lucide-react';

const fetchShell = async () => {
    const mock = { task: "List all files including hidden ones", cmd: "ls -la" };
    try {
        const data = await generateChallenge('shell');
        return data || mock;
    } catch (e) { return mock; }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            if (input.trim() === data.cmd.trim()) onSuccess();
            else onFail();
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-900 border border-gray-700 rounded-lg overflow-hidden font-mono shadow-2xl">
            <div className="bg-gray-800 px-4 py-2 flex gap-2 items-center border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-gray-400">bash — root@server</span>
            </div>
            <div className="p-6 min-h-[200px]">
                <div className="text-gray-500 mb-4"># {data.task}</div>
                <div className="flex gap-3 items-center">
                    <span className="text-green-500 font-bold">$</span>
                    <input 
                        autoFocus
                        disabled={!!feedback}
                        className="bg-transparent outline-none text-white flex-1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleSubmit}
                        autoComplete="off"
                    />
                </div>
                {feedback === 'error' && (
                    <div className="mt-4 text-xs text-gray-400">
                        Expected: <span className="text-yellow-400">{data.cmd}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default () => <ArcadeGameEngine title="Shell Shock" icon={Terminal} color="text-green-400" instructions="Type the exact Linux command to perform the task." onGenerate={fetchShell} component={GameBoard} />;