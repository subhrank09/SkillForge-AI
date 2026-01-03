import React, { useMemo } from 'react';
import ArcadeGameEngine from './ArcadeGameEngine';
import { generateChallenge } from '../../api/groqGenerator';
import { Workflow, GitPullRequest, RefreshCw } from 'lucide-react';

const MOCK_PIPE = { stage: "Build", status: "Failed", fix: "npm install" };

const fetchPipe = async () => {
    try {
        const data = await generateChallenge('pipeline');
        if (!data || !data.fix) throw new Error("Invalid Data");
        return data;
    } catch (e) { return MOCK_PIPE; }
};

const GameBoard = ({ data, onSuccess, onFail, feedback }) => {
    // Generate a distraction answer to make it a multiple choice
    const { options } = useMemo(() => {
        const wrongAnswers = ["Restart Server", "Force Push", "Clear Cache", "Ignore Warning", "Re-run Job"];
        const randomWrong = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        
        // Randomize order
        const isFixFirst = Math.random() > 0.5;
        return {
            options: isFixFirst 
                ? [{ text: data.fix, isCorrect: true }, { text: randomWrong, isCorrect: false }]
                : [{ text: randomWrong, isCorrect: false }, { text: data.fix, isCorrect: true }]
        };
    }, [data]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Pipeline Visual */}
            <div className="flex items-center justify-between mb-8 text-gray-500 text-xs font-mono uppercase tracking-widest">
                <div className="flex flex-col items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div>Checkout</div>
                <div className="h-0.5 flex-1 bg-gray-800 mx-2"></div>
                <div className="flex flex-col items-center gap-2 text-white"><div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>{data.stage}</div>
                <div className="h-0.5 flex-1 bg-gray-800 mx-2"></div>
                <div className="flex flex-col items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-700"></div>Deploy</div>
            </div>

            <div className="bg-red-900/10 border border-red-500/30 p-6 rounded-xl mb-8 text-center">
                <h3 className="text-red-400 font-bold text-xl mb-2">Pipeline Halted</h3>
                <p className="text-gray-400">Status: {data.status}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((opt, i) => (
                    <button 
                        key={i}
                        disabled={!!feedback}
                        onClick={() => opt.isCorrect ? onSuccess() : onFail()}
                        className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-orange-500 hover:text-white text-gray-400 font-mono text-sm transition-all"
                    >
                        $ {opt.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default () => <ArcadeGameEngine title="Pipeline Pulse" icon={Workflow} color="text-orange-500" instructions="The CI/CD pipeline has failed. Select the correct command to fix the stage." onGenerate={fetchPipe} component={GameBoard} />;