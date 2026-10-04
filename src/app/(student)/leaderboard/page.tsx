'use client';

import { useState, useEffect } from 'react';
import PixelPanel from '@/components/ui/PixelPanel';
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
    const fetchLeaders = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error('Fetch failed');
        const { data } = await res.json();
        if (data) setLeaders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      <div className="shrink-0 mb-2">
        <h1 className="text-3xl font-pixel text-white tracking-widest mb-1 uppercase">Global Leaderboard</h1>
        <p className="text-sm text-slate-400 font-sans">Top explorers in the GrowthOS network ranked by Impact.</p>
      </div>

      <PixelPanel className="bg-slate-900 border-slate-700 w-full lg:w-3/4 mx-auto">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-800">
           <div className="text-[10px] text-slate-500 font-pixel tracking-widest uppercase">RANK & EXPLORER</div>
           <div className="text-[10px] text-slate-500 font-pixel tracking-widest uppercase">IMPACT</div>
        </div>

        {loading ? (
           <div className="py-12 text-center text-slate-500 font-pixel animate-pulse">LOADING SECURE DATA...</div>
        ) : leaders.length === 0 ? (
           <div className="py-12 text-center text-slate-500 font-pixel">NO EXPLORERS FOUND</div>
        ) : (
          <div className="space-y-3">
            {leaders.map((entry, idx) => {
               const isTop3 = idx < 3;
               return (
                 <div key={entry.id} className={`flex items-center justify-between p-3 pixel-corners border ${isTop3 ? 'bg-slate-800 border-blue-500/30' : 'bg-slate-950 border-slate-800'}`}>
                   
                   <div className="flex items-center gap-4">
                     {/* Rank Number */}
                     <div className={`font-pixel w-8 text-right ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-orange-400' : 'text-slate-600'}`}>
                       #{idx + 1}
                     </div>
                     
                     {/* Avatar */}
                     <div className="w-12 h-12 bg-slate-900 border border-slate-700 pixel-corners flex items-center justify-center shrink-0 overflow-hidden relative">
                        <CharacterRenderer config={entry.character} size="sm" className="scale-75 translate-y-1" />
                     </div>
                     
                     {/* Name & Level */}
                     <div>
                       <div className={`font-pixel uppercase text-sm tracking-widest ${isTop3 ? 'text-white' : 'text-slate-300'}`}>
                         {entry.name}
                       </div>
                       <div className="text-[10px] text-blue-400 font-pixel mt-1">LVL {entry.level.toString().padStart(2, '0')}</div>
                     </div>
                   </div>

                   {/* Impact Score */}
                   <div className="text-right">
                     <div className={`font-pixel text-lg ${isTop3 ? 'text-blue-400' : 'text-slate-400'}`}>
                       {entry.impact}
                     </div>
                   </div>

                 </div>
               );
            })}
          </div>
        )}
      </PixelPanel>
    </div>
  );
}

