'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PixelButton from '@/components/ui/PixelButton';
import StarfieldBackground from '@/components/ui/StarfieldBackground';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ registered: 482, capacity: 500 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Fetch real stats
    fetch('/api/stats/workshop')
      .then(res => res.json())
      .then(json => {
        if (json.data) setStats(json.data);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-950 overflow-hidden flex flex-col items-center justify-center p-4 lg:p-12">
      
      {/* --- PARALLAX STARFIELD BACKGROUND --- */}
      <StarfieldBackground />

      {/* --- TOP NAV --- */}
      <nav className="absolute top-0 left-0 right-0 z-20 w-full flex justify-between items-center p-6 lg:p-8">
        <div className="text-white font-pixel text-xl tracking-widest flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-none animate-pulse" />
          GROWTH_OS
        </div>
        <Link href="/admin">
          <button className="font-pixel text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed text-slate-500 hover:text-blue-400 uppercase tracking-widest transition-colors">
            Admin Telemetry
          </button>
        </Link>
      </nav>

      {/* --- MAIN HERO --- */}
      <div className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1 mb-8 bg-slate-900/80 border border-slate-700 text-amber-400 font-pixel text-sm md:text-lg tracking-widest uppercase shadow-[0_0_15px_rgba(251,191,36,0.2)] backdrop-blur-sm"
        >
          <span className="w-2 h-2 bg-amber-400 animate-pulse"></span>
          INITIATING CAMPUS SIMULATION
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-pixel text-white mb-6 tracking-widest uppercase drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          style={{ textShadow: '4px 4px 0 #1e3a8a, -2px -2px 0 #3b82f6' }}
        >
          BUILD YOUR<br/>AI CREW
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl text-lg md:text-xl text-blue-200 font-pixel text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed mb-12 tracking-wide"
        >
          Enter the digital campus. Create your explorer. Invite your network. Deploy your first AI project in 60 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <Link href="/register">
            <PixelButton variant="primary" className="text-2xl px-12 py-4">
              ENTER WORLD
            </PixelButton>
          </Link>
          
          <div className="flex flex-col items-center gap-2 mt-4 bg-slate-900/50 p-4 border border-slate-800 backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-pixel tracking-widest uppercase">LIVE NETWORK CAPACITY</div>
            <div className="w-48 h-2 bg-slate-800 overflow-hidden rounded-none">
               <div 
                 className="h-full bg-blue-500" 
                 style={{ width: `${Math.min(100, (stats.registered / stats.capacity) * 100)}%` }} 
               />
            </div>
            <div className="font-pixel text-blue-400">{stats.registered} / {stats.capacity}</div>
          </div>
        </motion.div>
      </div>

      {/* --- FLOATING FEATURES --- */}
      {mounted && (
        <div className="relative z-10 w-full max-w-5xl mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 1.2}} className="bg-slate-900/70 border border-slate-700 p-6 backdrop-blur-sm">
            <div className="w-8 h-8 bg-blue-500 mb-4 rounded-none flex items-center justify-center font-pixel text-white">01</div>
            <h3 className="font-pixel text-xl text-white mb-2">Create Identity</h3>
            <p className="font-pixel text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed text-slate-400">Customize your unique AI Explorer avatar to represent you across the campus network.</p>
          </motion.div>
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 1.4}} className="bg-slate-900/70 border border-slate-700 p-6 backdrop-blur-sm">
            <div className="w-8 h-8 bg-amber-500 mb-4 rounded-none flex items-center justify-center font-pixel text-white">02</div>
            <h3 className="font-pixel text-xl text-white mb-2">Grow Crew</h3>
            <p className="font-pixel text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed text-slate-400">Invite peers via your unique network link to unlock exclusive AI resources and XP.</p>
          </motion.div>
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 1.6}} className="bg-slate-900/70 border border-slate-700 p-6 backdrop-blur-sm">
            <div className="w-8 h-8 bg-green-500 mb-4 rounded-none flex items-center justify-center font-pixel text-white">03</div>
            <h3 className="font-pixel text-xl text-white mb-2">Deploy AI</h3>
            <p className="font-pixel text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed text-slate-400">Join the live 60-minute session to build and ship your first AI-powered application.</p>
          </motion.div>
        </div>
      )}
    </main>
  );
}
