import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Send, ArrowLeft, LogOut } from 'lucide-react';

// Connect to same socket server
const socket = io.connect("http://localhost:9000");

const StudyRoom = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Auto-scroll to bottom of chat
  const chatEndRef = useRef(null);
  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [chat]);

  useEffect(() => {
    socket.on('receive_study_message', (data) => {
      setChat((prev) => [...prev, data]);
    });
    
    socket.on('study_user_joined', (data) => {
        setChat((prev) => [...prev, { system: true, text: `${data.username} ${data.message}` }]);
    });

    return () => {
        socket.off('receive_study_message');
        socket.off('study_user_joined');
    };
  }, []);

  const joinRoom = () => {
    if (roomId !== "" && user) {
      socket.emit('join_study_room', { roomId, username: user.firstName });
      setJoined(true);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message !== "") {
      const msgData = {
        roomId,
        username: user.firstName,
        message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      await socket.emit('send_study_message', msgData);
      // setChat((prev) => [...prev, msgData]); // Optional: Optimistic update
      setMessage("");
    }
  };

  if (!joined) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0" />
        <div className="z-10 w-full max-w-md bg-gray-900/80 border border-gray-800 p-8 rounded-2xl text-center backdrop-blur-md">
           <Users size={64} className="mx-auto text-blue-500 mb-6" />
           <h1 className="text-3xl font-bold mb-2">Study Together</h1>
           <p className="text-gray-400 mb-8">Join a room to chat and learn with peers.</p>
           
           <input 
             className="w-full bg-black border border-gray-700 p-4 rounded-xl text-white mb-4 focus:border-blue-500 outline-none text-center" 
             placeholder="Enter Room ID (e.g., 'ReactGroup')" 
             onChange={(e) => setRoomId(e.target.value)} 
           />
           <button onClick={joinRoom} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold transition-all">
             JOIN ROOM
           </button>
           <button onClick={() => navigate('/home')} className="mt-4 text-gray-500 hover:text-white text-sm">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col relative">
      {/* Header */}
      <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900">
        <div className="flex items-center gap-3">
            <Users className="text-blue-500" />
            <h2 className="font-bold">Room: <span className="text-blue-400">{roomId}</span></h2>
        </div>
        <button onClick={() => window.location.reload()} className="text-red-400 hover:text-white flex items-center gap-2 text-sm">
            <LogOut size={16} /> Leave
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chat.map((msg, idx) => (
           msg.system ? (
               <div key={idx} className="text-center text-xs text-gray-600 my-2 italic">{msg.text}</div>
           ) : (
               <div key={idx} className={`flex flex-col ${msg.username === user.firstName ? 'items-end' : 'items-start'}`}>
                   <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.username === user.firstName ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none'}`}>
                       <p>{msg.message}</p>
                   </div>
                   <span className="text-[10px] text-gray-500 mt-1 px-1">{msg.username} • {msg.time}</span>
               </div>
           )
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-4 bg-gray-900 border-t border-gray-800 flex gap-2">
        <input 
            className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 p-3 rounded-xl transition-colors">
            <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default StudyRoom;