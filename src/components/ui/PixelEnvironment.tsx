'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export type WorldState = 'QUIET' | 'AWAKE' | 'ACTIVE' | 'LIVE';

interface PixelEnvironmentProps {
  worldState?: WorldState;
  showParticles?: boolean;
  className?: string;
}

export default function PixelEnvironment({ 
  worldState = 'QUIET', 
  showParticles = true,
  className = '' 
}: PixelEnvironmentProps) {
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine lighting based on world state
  const isAwake = worldState === 'AWAKE' || worldState === 'ACTIVE' || worldState === 'LIVE';
  const isActive = worldState === 'ACTIVE' || worldState === 'LIVE';
  const isLive = worldState === 'LIVE';

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden bg-[#0a0710] pointer-events-none ${className}`}>
      
      {/* LAYER 1: Deep Sky */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#090914_0%,#1a103c_70%,#2d1b4e_100%)]" />

      {/* LAYER 2: Starfield (Parallax Slow) */}
      {mounted && (
        <motion.div 
          className="absolute inset-0"
          animate={{ y: [0, -50] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {/* We use a simplified CSS background for stars to save DOM nodes */}
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #a78bfa, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #34d399, rgba(0,0,0,0))', backgroundSize: '150px 150px' }} />
        </motion.div>
      )}

      {/* LAYER 3: Distant Skyline Silhouette (Parallax Medium) */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-64 bg-repeat-x opacity-40"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCAxMDAgTDAgODAgTDEwIDgwIEwxMCA2MCBMMjAgNjAgTDIwIDMwIEw0MCAzMCBMNDAgNzAgTDUwIDcwIEw1MCA1MCBMNzAgNTAgTDcwIDkwIEw4MCA5MCBMODAgNDAgTTEwMCA0MCBMMTAwIDEwMCBaIiBmaWxsPSIjMTAwYjIzIiAvPjwvc3ZnPg==")',
          backgroundSize: '300px 100%' 
        }}
        animate={{ x: [0, -300] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {/* Dynamic Window Lights based on state */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isAwake ? 'opacity-30' : 'opacity-10'}`} style={{ backgroundImage: 'radial-gradient(2px 2px at 25px 40px, #f472b6, rgba(0,0,0,0))', backgroundSize: '300px 100px' }} />
      </motion.div>

      {/* LAYER 4: Midground Architecture */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-repeat-x opacity-70"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCAxMDAgTDAgODAgTDEwIDgwIEwxMCA5MCBMMzAgOTAgTDMwIDYwIEw1MCA2MCBMNTAgODAgTDcwIDgwIEw3MCA0MCBMOTAgNDAgTDkwIDEwMCBaIiBmaWxsPSIjMWUxYjRiIiAvPjwvc3ZnPg==")',
          backgroundSize: '400px 100%' 
        }}
      >
        {/* More intense lights activate as network grows */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-60' : 'opacity-5'}`} style={{ backgroundImage: 'radial-gradient(3px 3px at 40px 70px, #34d399, rgba(0,0,0,0)), radial-gradient(2px 2px at 80px 50px, #2dd4bf, rgba(0,0,0,0))', backgroundSize: '400px 100px' }} />
      </div>

      {/* LAYER 5: Foreground Transit / Highway Line */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#2d1b4e]">
         {/* Speeding Neon Transit Light */}
         <div className={`h-full w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-500 ${isLive ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* LAYER 6: Ambient Environment Lighting */}
      <div className="absolute inset-0 mix-blend-screen pointer-events-none">
        {/* Magenta neon ambient glow */}
        <div className={`absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-600/20 blur-[100px] transition-opacity duration-2000 ${isAwake ? 'opacity-100' : 'opacity-0'}`} />
        {/* Cyan neon ambient glow */}
        <div className={`absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] transition-opacity duration-2000 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* OVERLAY: Scanlines for retro CRT feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30" />
    </div>
  );
}

