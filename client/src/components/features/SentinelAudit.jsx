import React from 'react';
import axios from 'axios';
import ArcadeGameEngine from './ArcadeGameEngine';
import { ShieldAlert } from 'lucide-react';

const MOCK_AUDIT = [
    { code: "const apiKey = '12345-SECRET';", issue: "Hardcoded Secrets", _isFallback: true },
    { code: "eval(userInput);", issue: "Arbitrary Code Execution", _isFallback: true }
];

const fetchAudit = async () => {
    try { return (await axios.post('http://localhost:5000/api/arcade/audit')).data; } 
    catch (e) { return MOCK_AUDIT[Math.floor(Math.random() * MOCK_AUDIT.length)]; }
};

const GameBoard = ({ data, onSuccess, onFail }) => (
    <div className="bg-gray-900 p-8 rounded-xl border border-red-500/30 text-center">
        <code className="block bg-black p-4 rounded border border-gray-800 font-mono text-red-300 mb-6">{data.code}</code>
        <h3 className="text-gray-400 mb-4">What is the vulnerability?</h3>
        <div className="grid grid-cols-2 gap-4">
            <button onClick={onSuccess} className="bg-red-900/40 border border-red-500/50 p-4 rounded hover:bg-red-500 hover:text-white transition">{data.issue}</button>
            <button onClick={onFail} className="bg-gray-800 border border-gray-700 p-4 rounded hover:bg-gray-700 transition">Syntax Error</button>
        </div>
    </div>
);

export default () => <ArcadeGameEngine title="Sentinel Audit" icon={ShieldAlert} color="text-red-500" instructions="Identify the security flaw." onGenerate={fetchAudit} component={GameBoard} />;