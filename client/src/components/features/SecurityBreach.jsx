import React, { useState } from 'react';
import axios from 'axios';
import ArcadeGameEngine from './ArcadeGameEngine';
import { Lock } from 'lucide-react';

const MOCK_BREACH = [
    { target: "SQL Injection", payload: "' OR 1=1 --", hint: "Bypass login via truthy statement", _isFallback: true },
    { target: "XSS", payload: "<script>alert(1)</script>", hint: "Inject script tag", _isFallback: true }
];

const fetchBreach = async () => {
    try { return (await axios.post('http://localhost:5000/api/arcade/breach')).data; } 
    catch (e) { return MOCK_BREACH[Math.floor(Math.random() * MOCK_BREACH.length)]; }
};

const GameBoard = ({ data, onSuccess, onFail }) => {
    const [input, setInput] = useState('');
    return (
        <div className="bg-black border border-green-500/30 p-8 rounded-xl font-mono">
            <div className="text-green-500 mb-4">Target System: {data.target}</div>
            <input className="w-full bg-gray-900 border border-gray-700 p-3 rounded text-white" placeholder="Enter Payload..." value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => input === data.payload ? onSuccess() : onFail()} className="mt-4 w-full bg-green-600 hover:bg-green-500 text-black font-bold py-2 rounded">Execute Exploit</button>
        </div>
    );
};

export default () => <ArcadeGameEngine title="Security Breach" icon={Lock} color="text-green-500" instructions="Enter the correct exploit payload." onGenerate={fetchBreach} component={GameBoard} />;