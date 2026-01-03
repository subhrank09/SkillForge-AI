// import React, { useEffect, useState } from 'react';
// import { useUser } from "@clerk/clerk-react";
// import { buyItem, equipItem, getUserInventory } from '../api/axios';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, ShoppingBag, Lock, Check, Zap, Snowflake, Layout } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ITEMS = [
//   // Ensure IDs are simple strings with NO spaces
//   { id: 'Default', name: 'Default Dark', cost: 0, category: 'theme', icon: <Layout className="text-gray-400" /> },
//   { id: 'Neon', name: 'Neon Cyber', cost: 500, category: 'theme', icon: <Zap className="text-pink-400" /> },
//   { id: 'Forest', name: 'Zen Forest', cost: 750, category: 'theme', icon: <Zap className="text-green-400" /> },
//   { id: 'Ocean', name: 'Deep Ocean', cost: 1000, category: 'theme', icon: <Zap className="text-blue-400" /> },
//   // ...
// ];

// const Store = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const [xp, setXp] = useState(0);
//   const [inventory, setInventory] = useState({ themes: ['Default'], streakFreezes: 0 });
//   const [activeTheme, setActiveTheme] = useState('Default');

//   useEffect(() => {
//     if (user) {
//       getUserInventory(user.id).then(data => {
//         setXp(data.xp);
//         setInventory(data.inventory);
//         setActiveTheme(data.activeTheme || 'Default');
//       });
//     }
//   }, [user]);

//   const handleBuy = async (item) => {
//     if (xp < item.cost) return alert("Not enough XP!");
//     try {
//       const data = await buyItem(user.id, item.id, item.cost, item.category);
//       setXp(data.xp);
//       setInventory(data.inventory);
//       alert(`Bought ${item.name}!`);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEquip = async (item) => {
//     if (item.category !== 'theme') return;
//     try {
//       const data = await equipItem(user.id, item.id, item.category);
//       setActiveTheme(data.activeTheme);
//       // Force reload to apply theme globally (simple way)
//       window.location.reload(); 
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const isOwned = (item) => {
//     if (item.id === 'Default') return true;
//     if (item.category === 'theme') return inventory.themes.includes(item.id);
//     return false; 
//   };

//   return (
//     <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black z-0" />
      
//       <div className="max-w-5xl mx-auto z-10 relative">
//         <div className="flex justify-between items-center mb-12">
//             <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-white"><ArrowLeft /> Back</button>
//             <div className="bg-yellow-500/20 border border-yellow-500/50 px-6 py-2 rounded-full flex items-center gap-2">
//                 <span className="text-yellow-400 font-bold text-xl">{xp} XP</span>
//             </div>
//         </div>

//         <h1 className="text-5xl font-bold mb-4 flex items-center gap-3"><ShoppingBag className="text-yellow-500" size={48} /> XP Store</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {ITEMS.map((item) => {
//             const owned = isOwned(item);
//             const equipped = activeTheme === item.id;
//             const isConsumable = item.category === 'freeze';

//             return (
//             <motion.div whileHover={{ scale: 1.02 }} key={item.id} className={`border p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden ${equipped ? 'border-green-500 bg-green-900/10' : 'border-gray-800 bg-gray-900'}`}>
//                {equipped && <div className="absolute top-4 right-4 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Check size={12}/> ACTIVE</div>}
               
//                <div>
//                    <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-4 text-2xl border border-gray-700">
//                        {item.icon}
//                    </div>
//                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
//                    <p className="text-gray-500 text-sm mb-6">{isConsumable ? "Save your streak if you miss a day." : "Unlock a new visual style."}</p>
//                </div>

//                {owned && !isConsumable ? (
//                    <button 
//                      onClick={() => handleEquip(item)}
//                      disabled={equipped}
//                      className={`w-full py-3 rounded-xl font-bold transition-all ${equipped ? 'bg-green-600 text-white cursor-default' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
//                    >
//                      {equipped ? "Equipped" : "Equip"}
//                    </button>
//                ) : (
//                    <button 
//                      onClick={() => handleBuy(item)}
//                      disabled={xp < item.cost}
//                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${xp >= item.cost ? 'bg-yellow-600 hover:bg-yellow-500 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
//                    >
//                      {item.cost} XP {xp < item.cost && <Lock size={14} />}
//                    </button>
//                )}
//             </motion.div>
//           )})}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Store;

import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { buyItem, equipItem, getUserInventory } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Lock, Check, Zap, Snowflake, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

const ITEMS = [
  { id: 'Default', name: 'Default Dark', cost: 0, category: 'theme', icon: <Layout className="text-gray-400" /> },
  { id: 'Neon', name: 'Neon Cyber', cost: 500, category: 'theme', icon: <Zap className="text-pink-400" /> },
  { id: 'Forest', name: 'Zen Forest', cost: 750, category: 'theme', icon: <Zap className="text-green-400" /> },
  { id: 'Ocean', name: 'Deep Ocean', cost: 1000, category: 'theme', icon: <Zap className="text-blue-400" /> },
  { id: 'Freeze', name: 'Streak Freeze', cost: 200, category: 'freeze', icon: <Snowflake className="text-blue-400" /> }
];

const Store = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [inventory, setInventory] = useState({ themes: ['Default'], streakFreezes: 0 });
  const [activeTheme, setActiveTheme] = useState('Default');

  useEffect(() => {
    if (user) {
      getUserInventory(user.id).then(data => {
        setXp(data.xp);
        setInventory(data.inventory);
        setActiveTheme(data.activeTheme || 'Default');
      });
    }
  }, [user]);

  const handleBuy = async (item) => {
    if (xp < item.cost) return alert("Not enough XP!");
    try {
      const data = await buyItem(user.id, item.id, item.cost, item.category);
      setXp(data.xp);
      setInventory(data.inventory);
      alert(`Bought ${item.name}!`);
    } catch (error) { console.error(error); }
  };

  const handleEquip = async (item) => {
    if (item.category !== 'theme') return;
    try {
      const data = await equipItem(user.id, item.id, item.category);
      setActiveTheme(data.activeTheme);
      window.location.reload(); // Reload to apply theme globally
    } catch (error) { console.error(error); }
  };

  const isOwned = (item) => {
    if (item.id === 'Default') return true;
    if (item.category === 'theme') return inventory.themes.includes(item.id);
    return false; 
  };

  // FIX: Removed 'bg-black' and the absolute background div so Global Theme shows through
  return (
    <div className="min-h-screen text-white p-8 relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto z-10 relative">
        <div className="flex justify-between items-center mb-12">
            <button onClick={() => navigate('/home')} className="flex items-center gap-2 text-gray-400 hover:text-white"><ArrowLeft /> Back</button>
            <div className="bg-yellow-500/20 border border-yellow-500/50 px-6 py-2 rounded-full flex items-center gap-2">
                <span className="text-yellow-400 font-bold text-xl">{xp} XP</span>
            </div>
        </div>

        <h1 className="text-5xl font-bold mb-4 flex items-center gap-3"><ShoppingBag className="text-yellow-500" size={48} /> XP Store</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => {
            const owned = isOwned(item);
            const equipped = activeTheme === item.id;
            const isConsumable = item.category === 'freeze';

            return (
            <motion.div whileHover={{ scale: 1.02 }} key={item.id} className={`border p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden ${equipped ? 'border-green-500 bg-green-900/20' : 'border-gray-800 bg-gray-900/80 backdrop-blur-sm'}`}>
               {equipped && <div className="absolute top-4 right-4 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Check size={12}/> ACTIVE</div>}
               
               <div>
                   <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-4 text-2xl border border-gray-700">
                       {item.icon}
                   </div>
                   <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                   <p className="text-gray-500 text-sm mb-6">{isConsumable ? "Save your streak if you miss a day." : "Unlock a new visual style."}</p>
               </div>

               {owned && !isConsumable ? (
                   <button 
                     onClick={() => handleEquip(item)}
                     disabled={equipped}
                     className={`w-full py-3 rounded-xl font-bold transition-all ${equipped ? 'bg-green-600 text-white cursor-default' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                   >
                     {equipped ? "Equipped" : "Equip"}
                   </button>
               ) : (
                   <button 
                     onClick={() => handleBuy(item)}
                     disabled={xp < item.cost}
                     className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${xp >= item.cost ? 'bg-yellow-600 hover:bg-yellow-500 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                   >
                     {item.cost} XP {xp < item.cost && <Lock size={14} />}
                   </button>
               )}
            </motion.div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default Store;