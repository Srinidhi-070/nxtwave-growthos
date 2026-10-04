'use client';

import { useEffect, useState } from 'react';
import CharacterRenderer, { CharacterConfig } from '@/components/character/CharacterRenderer';
import PixelButton from '@/components/ui/PixelButton';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MyLabPage() {
  const [characterConfig, setCharacterConfig] = useState<CharacterConfig | null>(null);
  const [level, setLevel] = useState(1);
  const [stats, setStats] = useState<any>({});

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
          setCharacterConfig(data.character);
        } else {
          const saved = localStorage.getItem('growthos_character');
          if (saved) setCharacterConfig(JSON.parse(saved));
        }
        if (data?.stats) {
          setLevel(data.stats.level);
          setStats(data.stats);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchProfile();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="w-full h-full flex flex-col relative z-10 p-2 md:p-6 pb-20 md:pb-6 overflow-y-auto overflow-x-hidden scrollbar-hide">
      
      <div className="mb-6 shrink-0 z-20">
        <h1 className="text-3xl font-pixel text-white tracking-widest mb-2 uppercase drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">HOME BASE</h1>
        <p className="text-xs text-blue-300 font-pixel tracking-widest uppercase opacity-80">PERSONAL LABORATORY INSTANCE // ACTIVE</p>
      </div>

      {/* THE ROOM */}
      <div className="flex-1 w-full bg-slate-950/40 backdrop-blur-sm border border-slate-700 relative overflow-hidden flex flex-col items-center justify-end pb-8 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
        
        {/* ROOM LIGHTING & EFFECTS */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none" />

        {/* ROOM FLOOR */}
        <div className="absolute bottom-0 inset-x-0 h-32 border-t-2 border-slate-700 bg-[linear-gradient(to_bottom,#0f172a,#020617)]" style={{ transform: 'perspective(500px) rotateX(45deg)', transformOrigin: 'bottom' }}>
           {/* Floor Grid */}
           <div className="w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* SCENE OBJECTS */}
        <div className="relative w-full max-w-4xl h-96 flex items-end justify-between px-10">
          
          {/* OBJECT 1: QUEST BOARD (LEFT) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative flex flex-col items-center"
          >
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 border border-slate-600 px-3 py-1 font-pixel text-[10px] text-white z-20 pointer-events-none">
              QUEST BOARD
            </div>
            <Link href="/quests" className="block relative z-10 transition-transform hover:scale-105 hover:-translate-y-2">
              <div className="w-32 h-40 bg-slate-800 border-4 border-slate-600 shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-2">
                 <div className="w-full h-4 bg-slate-700 mb-2" />
                 <div className="w-full flex-1 border-2 border-dashed border-slate-600 flex flex-wrap gap-1 p-1">
                    <div className="w-4 h-4 bg-yellow-400/50" />
                    <div className="w-4 h-4 bg-yellow-400/50" />
                    <div className="w-4 h-4 bg-slate-700" />
                 </div>
              </div>
              {/* Stand */}
              <div className="w-4 h-16 bg-slate-700 mx-auto" />
              <div className="w-16 h-2 bg-slate-600 mx-auto" />
            </Link>
          </motion.div>

          {/* PLAYER CHARACTER (CENTER) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-20 pb-4 flex flex-col items-center"
          >
            <div className="absolute bottom-4 w-32 h-8 bg-black/50 blur-md rounded-[100%]" />
            <div className="relative">
              {characterConfig ? (
                <CharacterRenderer config={characterConfig} size="lg" />
              ) : (
                <div className="w-48 h-48 bg-slate-800/50 animate-pulse border border-slate-700 flex items-center justify-center font-pixel text-slate-500">
                  NO IDENTITY
                </div>
              )}
            </div>
          </motion.div>

          {/* OBJECT 2: PROJECT TERMINAL (RIGHT) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative flex flex-col items-center"
          >
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 border border-slate-600 px-3 py-1 font-pixel text-[10px] text-white z-20 pointer-events-none">
              PROJECT TERMINAL
            </div>
            <Link href="/project" className="block relative z-10 transition-transform hover:scale-105 hover:-translate-y-2">
              <div className="w-24 h-24 bg-slate-800 border-4 border-slate-600 shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-2 relative">
                 {/* Screen */}
                 <div className="w-full flex-1 bg-slate-900 border-2 border-slate-950 overflow-hidden relative">
                    <div className="absolute inset-0 bg-blue-500/10" />
                    <div className="w-full h-[1px] bg-blue-400/50 animate-[scanline_2s_linear_infinite]" />
                    <div className="absolute top-2 left-2 w-4 h-4 bg-blue-500 animate-pulse" />
                 </div>
                 {/* Keyboard */}
                 <div className="w-full h-3 bg-slate-700 mt-1 flex justify-between px-1 items-center">
                    <div className="w-2 h-1 bg-slate-500" />
                    <div className="w-6 h-1 bg-slate-500" />
                    <div className="w-2 h-1 bg-slate-500" />
                 </div>
              </div>
              {/* Stand */}
              <div className="w-8 h-20 bg-slate-700 mx-auto" />
              <div className="w-20 h-4 bg-slate-600 mx-auto" />
            </Link>
          </motion.div>

        </div>
        
        {/* WORKSHOP MONITOR (BACKGROUND CENTER-HIGH) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute top-12 left-1/2 -translate-x-1/2 z-0 group"
        >
          <Link href="/workshop" className="block">
            <div className="w-64 h-32 bg-slate-900 border-4 border-slate-700 shadow-[0_0_30px_rgba(16,185,129,0.1)] p-2 relative flex flex-col items-center justify-center transition-colors group-hover:border-emerald-500 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              <div className="absolute -top-3 w-16 h-3 bg-slate-700 mx-auto flex justify-around items-center">
                <div className="w-1 h-1 bg-emerald-500 animate-ping" />
                <div className="w-1 h-1 bg-emerald-500 animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
              <h3 className="font-pixel text-emerald-400 text-sm tracking-widest animate-pulse">WORKSHOP SIGNAL</h3>
              <p className="font-pixel text-[10px] text-slate-400 mt-2">CLICK TO TUNE IN</p>
            </div>
            {/* Hanging Wires */}
            <div className="absolute -top-12 left-1/4 w-1 h-12 bg-slate-800" />
            <div className="absolute -top-12 right-1/4 w-1 h-12 bg-slate-800" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
