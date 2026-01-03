import React, { useState } from 'react';
import { Radio, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const PayloadProtocol = () => {
  const [headers, setHeaders] = useState("");
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const sendRequest = () => {
    if (headers.includes("Authorization: Bearer SECRET")) {
      setResponse({ status: 200, data: { secret: "NUCLEAR_LAUNCH_CODE_992" } });
    } else {
      setResponse({ status: 403, error: "Unauthorized. Missing Token." });
    }
  };

  return (
    <div className="min-h-screen bg-black text-pink-500 p-8 pt-24 flex flex-col items-center font-mono">
      <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-lg border border-pink-900">
        <button onClick={() => navigate('/arcade')} className="text-gray-500 mb-6 hover:text-white">← Arcade</button>
        <h1 className="text-3xl font-bold mb-6 flex gap-2"><Radio/> Payload Protocol</h1>
        <div className="mb-4">
          <div className="bg-black p-2 text-white mb-2">GET /api/classified</div>
          <textarea 
            value={headers} onChange={(e) => setHeaders(e.target.value)}
            className="w-full bg-black border border-pink-700 p-3 text-white h-32"
            placeholder="Enter Headers (e.g. Content-Type: application/json)"
          />
        </div>
        <button onClick={sendRequest} className="w-full bg-pink-700 text-white py-3 font-bold hover:bg-pink-600 flex justify-center gap-2"><Send/> Send Request</button>
        
        {response && (
          <div className={`mt-6 p-4 border ${response.status === 200 ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}`}>
            <div className="font-bold mb-2">{response.status === 200 ? "200 OK" : "403 FORBIDDEN"}</div>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
export default PayloadProtocol;