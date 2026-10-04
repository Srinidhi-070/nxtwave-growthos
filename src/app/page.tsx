'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PixelButton from '@/components/ui/PixelButton';
import CharacterRenderer from '@/components/character/CharacterRenderer';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{x: number, y: number, duration: number, delay: number, drop: number}[]>([]);
  const [stats, setStats] = useState({ registered: 482, capacity: 500 });

  useEffect(() => {
    setMounted(true);
    setParticles([...Array(20)].map(() => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      drop: Math.random() * -100 - 50
    })));
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
      
      {/* --- DEEP ANIMATED CYBER BACKGROUND --- */}
      <div className="absolute inset-0 z-0 bg-[#020617] overflow-hidden">
        {/* Animated Perspective Grid */}
        <div 
          className="absolute z-0 opacity-50"
          style={{
            width: '200vw',
            height: '200vh',
            left: '-50vw',
            top: '0',
            backgroundImage: 'linear-gradient(to right, rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(1000px) rotateX(70deg) translateY(-20%)',
            animation: 'gridMove 2s linear infinite',
            transformOrigin: 'top center'
          }}
        />
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 0 40px; }
          }
        `}} />
        {/* Radial Fade to mask the edges */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,#020617_10%,transparent_50%,#020617_90%)]"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
      </div>

      {/* --- TOP NAV --- */}
      <nav className="absolute top-0 left-0 right-0 z-20 w-full flex justify-between items-center p-6 lg:p-8">
        <div className="text-white font-pixel text-xl tracking-widest flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 pixel-corners animate-pulse" />
          GROWTH_OS
        </div>
        <Link href="/admin">
          <button className="text-xs font-pixel text-slate-500 hover:text-blue-400 uppercase tracking-widest transition-colors">
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
          className="inline-flex items-center gap-2 px-4 py-1 mb-8 bg-slate-900/80 border border-slate-700 text-amber-400 font-pixel text-sm md:text-lg tracking-widest uppercase pixel-corners shadow-[0_0_15px_rgba(251,191,36,0.2)] backdrop-blur-sm"
        >
          <span className="w-2 h-2 bg-amber-400 animate-pulse"></span>
          INITIATING CAMPUS SIMULATION
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-pixel text-white leading-[0.9] mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        >
          BUILD YOUR <br/>
          <span className="text-blue-500">AI CREW</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg md:text-2xl text-slate-300 font-pixel tracking-wide mb-10 max-w-2xl uppercase leading-relaxed"
        >
          Enter the digital campus. Create your explorer. Invite your network. Deploy your first AI project in 60 minutes.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-md"
        >
          <Link href="/register" className="w-full">
            <PixelButton variant="primary" className="w-full text-xl md:text-2xl py-4">
              ENTER WORLD
            </PixelButton>
          </Link>
        </motion.div>

        {/* Live Capacity Tracker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 text-center"
        >
          <div className="text-xs font-pixel text-slate-500 uppercase tracking-widest mb-2">LIVE NETWORK CAPACITY</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-blue-500" 
                 style={{ width: `${Math.min(100, (stats.registered / stats.capacity) * 100)}%` }} 
               />
            </div>
            <div className="font-pixel text-blue-400">{stats.registered} / {stats.capacity}</div>
          </div>
        </motion.div>
      </div>

      {/* --- FEATURE HIGHLIGHTS --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-10 w-full max-w-6xl mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-slate-900/60 border-2 border-slate-700 pixel-corners p-6 backdrop-blur-md hover:bg-slate-800 transition-colors">
          <div className="h-32 w-full flex items-center justify-center mb-4 bg-slate-950 border border-slate-800">
            {mounted && <CharacterRenderer config={{ body: 'body-1', face: 'face-1', hair: 'hair-2', hairColor: '#3b82f6', outfit: 'outfit-1', accessory: 'none', effect: 'none' }} size="lg" />}
          </div>
          <h3 className="font-pixel text-xl text-white tracking-widest mb-2">CREATE IDENTITY</h3>
          <p className="text-sm text-slate-400 font-sans">Customize your unique AI Explorer avatar to represent you across the campus network.</p>
        </div>

        <div className="bg-slate-900/60 border-2 border-slate-700 pixel-corners p-6 backdrop-blur-md hover:bg-slate-800 transition-colors">
          <div className="h-32 w-full flex items-center justify-center mb-4 bg-slate-950 border border-slate-800 overflow-hidden relative">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent)] animate-pulse" />
             <div className="flex gap-4 items-center">
               <div className="w-3 h-3 bg-blue-500 rounded-full" />
               <div className="w-12 h-1 bg-slate-700" />
               <div className="w-5 h-5 bg-white rounded-full shadow-[0_0_15px_#fff]" />
               <div className="w-12 h-1 bg-slate-700" />
               <div className="w-3 h-3 bg-blue-500 rounded-full" />
             </div>
          </div>
          <h3 className="font-pixel text-xl text-white tracking-widest mb-2">GROW YOUR CREW</h3>
          <p className="text-sm text-slate-400 font-sans">Invite peers via your unique network link to unlock exclusive AI resources and XP.</p>
        </div>

        <div className="bg-slate-900/60 border-2 border-slate-700 pixel-corners p-6 backdrop-blur-md hover:bg-slate-800 transition-colors">
          <div className="h-32 w-full flex items-center justify-center mb-4 bg-slate-950 border border-slate-800 font-mono text-green-400 text-xs text-left p-4 leading-tight whitespace-pre-wrap">
             {`> npm run deploy\n> compiling...\n> building AI node\n> LIVE: vercel.app\n> SUCCESS`}
          </div>
          <h3 className="font-pixel text-xl text-white tracking-widest mb-2">DEPLOY PROJECT</h3>
          <p className="text-sm text-slate-400 font-sans">Join the live 60-minute session to build and ship your first AI-powered application.</p>
        </div>
      </motion.div>

      {/* Decorative scanline effect */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 mix-blend-overlay"></div>
    </main>
  );
}



