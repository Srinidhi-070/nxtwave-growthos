'use client';

import { useEffect, useState } from 'react';
import CharacterRenderer, { CharacterConfig } from '@/components/character/CharacterRenderer';
import PixelButton from '@/components/ui/PixelButton';
import Link from 'next/link';

export default function MyLabPage() {
  const [characterConfig, setCharacterConfig] = useState<CharacterConfig | null>(null);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      const userId = localStorage.getItem('growthos_user_id');
      if (!userId) return;
      try {
        const res = await fetch(`/api/user/profile?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const { data } = await res.json();
        if (!isMounted) return;
        
        if (data?.character) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCharacterConfig(data.character);
        } else {
          const saved = localStorage.getItem('growthos_character');
          // eslint-disable-next-line react-hooks/set-state-in-effect
          if (saved) setCharacterConfig(JSON.parse(saved));
        }
        if (data?.stats) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setLevel(data.stats.level);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchProfile();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-pixel text-white tracking-widest mb-1 uppercase">My Lab</h1>
        <p className="text-sm text-slate-400 font-sans">Your personal workspace in the GrowthOS network.</p>
      </div>

      <div className="flex-1 w-full bg-[#0a0f1c] border-2 border-slate-800 pixel-corners relative overflow-hidden flex items-end justify-center">
        
        {/* Lab Background Grid / Depth */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_top,rgba(59,130,246,0.3),transparent)]" />
          <div className="absolute bottom-0 w-full h-[1px] bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
        </div>

        {/* Level 1: Basic Workstation */}
        <div className="absolute left-2 md:left-[10%] bottom-8 w-24 md:w-48 h-20 md:h-32 border-2 border-slate-700 bg-slate-900 flex flex-col justify-end p-1 md:p-2 opacity-80">
          <div className="w-full h-8 md:h-16 bg-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.1)_50%)] bg-[size:100%_4px]" />
            <div className="text-[10px] md:text-xs text-green-500 font-mono p-1 leading-tight">INIT ENV...<br/>NODE ACTIVE</div>
          </div>
          <div className="text-[10px] md:text-xs text-slate-500 font-pixel text-center mt-1 md:mt-2">TERMINAL L1</div>
        </div>

        {/* Level 2: Referral Terminal (Unlocked) */}
        {level >= 2 && (
          <div className="absolute right-2 md:right-[10%] bottom-8 w-20 md:w-32 h-24 md:h-48 border-2 border-blue-900 bg-slate-900 flex flex-col items-center justify-start p-1 md:p-2 z-20">
            <div className="w-full h-12 md:h-24 bg-blue-950 border border-blue-500 relative flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <div className="text-blue-400 text-[8px] md:text-xs font-pixel text-center leading-tight">NETWORK<br/>LINK<br/>ACTIVE</div>
            </div>
            <Link href="/crew" className="mt-2 md:mt-4">
              <PixelButton variant="secondary" className="text-[10px] md:text-xs py-1 px-1 md:px-2">ACCESS</PixelButton>
            </Link>
          </div>
        )}

        {/* Level 3: AI Model Display (Locked) */}
        {level < 3 && (
          <div className="absolute top-[10%] md:top-[20%] right-10 md:right-[30%] opacity-20">
            <div className="w-20 h-20 md:w-40 md:h-40 border-2 border-dashed border-slate-600 rounded-full flex items-center justify-center">
              <span className="text-[10px] md:text-xs font-pixel text-slate-500">LVL 3 REQ</span>
            </div>
          </div>
        )}

        {/* Character */}
        <div className="relative z-10 mb-8 md:mb-8 pointer-events-none">
           {characterConfig && (
             <CharacterRenderer config={characterConfig} size="lg" className="scale-75 md:scale-100" />
           )}
           {/* Shadow */}
           <div className="w-24 md:w-32 h-4 bg-black/50 blur-sm rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2 -z-10" />
        </div>
      </div>
    </div>
  );
}
