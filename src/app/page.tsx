'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PixelButton from '@/components/ui/PixelButton';

export default function Home() {
  const [particles, setParticles] = useState<{x: number, y: number, duration: number, delay: number, drop: number}[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles([...Array(20)].map(() => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      drop: Math.random() * -100 - 50
    })));
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-950 overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Background Pixel/Grid Effects */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_800px_at_50%_50%,#020617_20%,#000000_100%)] opacity-80"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/30 pixel-corners"
            initial={{ x: p.x, y: p.y }}
            animate={{ 
              y: [null, p.drop],
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1 mb-8 bg-slate-900 border-2 border-slate-700 text-amber-400 font-pixel text-lg tracking-widest uppercase pixel-corners shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
        >
          ► GrowthOS Simulation
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-6xl md:text-8xl font-pixel text-white leading-none mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        >
          BUILD YOUR FIRST <br/>
          <span className="text-blue-400">AI PROJECT</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-300 font-pixel tracking-wide mb-12 max-w-xl uppercase"
        >
          60 minutes. One AI project. Zero excuses.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full"
        >
          <Link href="/register" className="w-full sm:w-auto">
            <PixelButton variant="primary" className="w-full sm:w-auto text-2xl py-4 px-10">
              Start Your Quest
            </PixelButton>
          </Link>
          <Link href="/admin" className="w-full sm:w-auto">
            <PixelButton variant="secondary" className="w-full sm:w-auto text-xl py-3 px-8 opacity-70 hover:opacity-100">
              Admin Telemetry
            </PixelButton>
          </Link>
        </motion.div>
      </div>

      {/* Decorative scanline effect */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 mix-blend-overlay"></div>
    </main>
  );
}
