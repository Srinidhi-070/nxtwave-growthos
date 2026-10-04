'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CharacterRenderer, { CharacterConfig } from '@/components/character/CharacterRenderer';

type LeaderboardEntry = {
  id: string;
  name: string;
  character: CharacterConfig;
  level: number;
  impact: number;
  referrals: number;
};

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchLeaders = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error('Fetch failed');
        const { data } = await res.json();
        if (isMounted && data) setLeaders(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLeaders();
    return () => { isMounted = false; };
  }, []);

  // Guarantee at least 3 dummy leaders if the DB is empty for visual effect
  const displayLeaders = leaders.length >= 3 ? leaders : [
    ...leaders,
    ...Array(Math.max(0, 3 - leaders.length)).fill(null).map((_, i) => ({
      id: `dummy-${i}`,
      name: 'ENCRYPTED NODE',
      level: 0,
      impact: 0,
      referrals: 0,
      character: { body: 'base', face: 'default', hair: 'none', hairColor: 'pink', outfit: 'explorer', accessory: 'none', effect: 'none' }
    }))
  ].sort((a, b) => b.impact - a.impact);

  const top3 = displayLeaders.slice(0, 3);
  const rest = displayLeaders.slice(3, 10);

  return (
    <div className="w-full h-full flex flex-col relative z-10 p-4 md:p-8 pb-20 md:pb-8 overflow-y-auto overflow-x-hidden scrollbar-hide">
      
      <div className="shrink-0 mb-6 z-20 text-center">
        <h1 className="text-4xl font-pixel text-white tracking-widest mb-2 uppercase text-shadow-glow-cyan drop-shadow-md">HALL OF FAME</h1>
        <p className="text-xs text-blue-300 font-pixel tracking-widest uppercase opacity-80">GLOBAL NETWORK IMPACT RANKINGS</p>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col gap-12 mt-8">
        
        {/* TOP 3 PEDESTALS */}
        <div className="relative flex justify-center items-end h-80 gap-4 md:gap-12 px-4 mt-12">
           
           {/* SECOND PLACE */}
           {top3[1] && (
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col items-center relative z-10 w-28 md:w-40"
             >
                <div className="absolute -top-12 font-pixel text-white text-xs tracking-widest">{top3[1].name.substring(0,10)}</div>
                <div className="absolute -top-6 font-pixel text-[8px] text-cyan-400">LVL {top3[1].level}</div>
                <div className="relative z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  <CharacterRenderer config={top3[1].character} size="md" animating={true} />
                </div>
                {/* Silver Pedestal */}
                <div className="w-full h-32 bg-slate-400 border-x-4 border-t-4 border-slate-300 relative shadow-[inset_0_-20px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
                  <div className="font-pixel text-4xl text-slate-200 opacity-50">2</div>
                  <div className="absolute bottom-4 font-pixel text-[10px] text-slate-800">{top3[1].impact} IMPACT</div>
                </div>
             </motion.div>
           )}

           {/* FIRST PLACE */}
           {top3[0] && (
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center relative z-20 w-32 md:w-48 -mb-4"
             >
                {/* Crown/Halo */}
                <div className="absolute -top-24 w-16 h-4 border-t-2 border-yellow-400 rounded-full animate-bounce shadow-[0_-5px_10px_#facc15]" />
                
                <div className="absolute -top-16 font-pixel text-white text-sm tracking-widest text-shadow-glow-cyan">{top3[0].name.substring(0,12)}</div>
                <div className="absolute -top-10 font-pixel text-[10px] text-yellow-400">LVL {top3[0].level}</div>
                <div className="relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
                  <CharacterRenderer config={top3[0].character} size="lg" animating={true} />
                </div>
                {/* Gold Pedestal */}
                <div className="w-full h-40 bg-yellow-500 border-x-4 border-t-4 border-yellow-400 relative shadow-[inset_0_-30px_30px_rgba(0,0,0,0.5),0_0_50px_rgba(234,179,8,0.2)] flex flex-col items-center justify-center">
                  <div className="font-pixel text-6xl text-yellow-200 opacity-50">1</div>
                  <div className="absolute bottom-6 font-pixel text-xs text-yellow-900">{top3[0].impact} IMPACT</div>
                </div>
             </motion.div>
           )}

           {/* THIRD PLACE */}
           {top3[2] && (
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="flex flex-col items-center relative z-10 w-28 md:w-40"
             >
                <div className="absolute -top-12 font-pixel text-white text-xs tracking-widest">{top3[2].name.substring(0,10)}</div>
                <div className="absolute -top-6 font-pixel text-[8px] text-amber-600">LVL {top3[2].level}</div>
                <div className="relative z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  <CharacterRenderer config={top3[2].character} size="md" animating={true} />
                </div>
                {/* Bronze Pedestal */}
                <div className="w-full h-24 bg-amber-700 border-x-4 border-t-4 border-amber-600 relative shadow-[inset_0_-20px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
                  <div className="font-pixel text-4xl text-amber-500 opacity-50">3</div>
                  <div className="absolute bottom-2 font-pixel text-[10px] text-amber-950">{top3[2].impact} IMPACT</div>
                </div>
             </motion.div>
           )}
           
           {/* Floor Line */}
           <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-700 z-0" />
        </div>

        {/* REST OF LEADERBOARD TABLE */}
        <div className="w-full bg-slate-900/80 border border-slate-700 backdrop-blur-md overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-700 bg-slate-950 font-pixel text-[10px] text-slate-500 tracking-widest uppercase">
             <div className="col-span-2 text-center">RANK</div>
             <div className="col-span-6">EXPLORER</div>
             <div className="col-span-2 text-right">LVL</div>
             <div className="col-span-2 text-right">IMPACT</div>
          </div>
          
          <div className="flex flex-col max-h-96 overflow-y-auto">
            {rest.map((leader, i) => (
               <div key={leader.id} className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 items-center hover:bg-slate-800/50 transition-colors">
                  <div className="col-span-2 text-center font-pixel text-sm text-slate-400">
                    #{i + 4}
                  </div>
                  <div className="col-span-6 flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-950 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                       <CharacterRenderer config={leader.character} size="sm" />
                     </div>
                     <span className="font-pixel text-xs text-white tracking-widest truncate">{leader.name}</span>
                  </div>
                  <div className="col-span-2 text-right font-pixel text-[10px] text-cyan-400">
                    {leader.level}
                  </div>
                  <div className="col-span-2 text-right font-pixel text-[10px] text-emerald-400">
                    {leader.impact}
                  </div>
               </div>
            ))}
            {rest.length === 0 && (
               <div className="p-12 text-center font-pixel text-[10px] text-slate-500 tracking-widest">
                  AWAITING FURTHER NETWORK EXPANSION...
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
