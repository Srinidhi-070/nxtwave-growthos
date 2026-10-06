'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, TerminalIcon } from 'lucide-react';
import { PublicTopBar } from '@/components/layout/PublicTopBar';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelBadge } from '@/components/pixel/PixelBadge';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { CyberGrid } from '@/components/pixel/CyberGrid';
import { TypeLine } from '@/components/pixel/TypeLine';
import { IMAGES } from '@/data/images';

export default function Landing() {
  return (
    <div className="relative min-h-screen flex flex-col bg-void overflow-hidden select-none">
      {/* 1. BACKGROUND ENVIRONMENT */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-void">
        <motion.div 
          initial={{ scale: 1.05, opacity: 1 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img src={IMAGES.city} alt="Digital Campus City" className="h-full w-full object-cover pixelated opacity-50 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/50" />
        </motion.div>
        
        {/* ATMOSPHERE */}
        <CyberGrid />
        <CrtOverlay />
      </div>

      {/* 2. NAVIGATION */}
      <div className="relative z-30 flex-none">
        <PublicTopBar label="OBSERVATORY UPLINK" />
      </div>

      {/* 3. HERO CONTENT */}
      <main className="relative z-20 flex-1 w-full max-w-[1400px] mx-auto px-6 py-12 md:py-20 lg:px-12 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5, type: 'spring', bounce: 0.2 }}
          className="max-w-2xl"
        >
          {/* HUD Target Lock / Decal */}
          <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-[2px] h-32 bg-cyan/30">
             <div className="absolute top-0 -left-1 w-2.5 h-[2px] bg-cyan/60" />
             <div className="absolute bottom-0 -left-1 w-2.5 h-[2px] bg-cyan/60" />
             <div className="absolute top-1/2 -left-1 w-1.5 h-[2px] bg-cyan/40" />
          </div>

          <div className="mb-6 flex items-center gap-3">
            <PixelBadge tone="cyan" dot>SYSTEM ONLINE</PixelBadge>
            <span className="font-term text-xs md:text-sm text-cyan/70 tracking-widest">v1.0.0.GROWTHOS</span>
          </div>

          <h1 className="font-pixel leading-[1.3] mb-6">
            <motion.span 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="block text-[16px] md:text-[24px] text-ink mb-2"
            >
              BUILD YOUR FIRST
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="block text-[36px] md:text-[64px] text-cyan text-glow-cyan mb-2"
            >
              AI PROJECT
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="block text-[16px] md:text-[24px] text-magenta text-glow-magenta"
            >
              IN 60 MINUTES
            </motion.span>
          </h1>
          
          <div className="h-16 mb-10">
            <TypeLine 
              text="A free online workshop for engineering students ready to start building with AI." 
              delay={800} 
              keepCursor 
              className="font-term text-lg md:text-xl text-mute max-w-xl leading-relaxed" 
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 pt-4"
          >
            <PixelButton 
              href="/register" 
              size="lg" 
              className="w-full sm:w-auto relative group shadow-[0_0_15px_rgba(182,255,59,0.3)] hover:shadow-[0_0_25px_rgba(182,255,59,0.6)] transition-shadow"
            >
              <div className="flex items-center gap-3 px-2">
                <span className="tracking-widest">ENTER GROWTHOS</span>
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </PixelButton>
            
            <PixelButton 
              href="/workshop" 
              size="lg" 
              variant="ghost" 
              className="w-full sm:w-auto hover:bg-cyan/10 hover:border-cyan/50 transition-colors"
            >
              <div className="flex items-center gap-3 px-2">
                <TerminalIcon className="h-4 w-4 text-cyan" />
                <span className="tracking-widest text-cyan">EXPLORE WORKSHOP</span>
              </div>
            </PixelButton>
          </motion.div>
        </motion.div>
      </main>

      {/* 4. ENVIRONMENTAL HUD DECORATIONS */}
      <div className="absolute right-8 bottom-8 hidden lg:flex flex-col items-end gap-2 pointer-events-none">
        <div className="font-term text-xs text-mute/50 tracking-[0.2em]">LAT: 34.0522 N</div>
        <div className="font-term text-xs text-mute/50 tracking-[0.2em]">LNG: 118.2437 W</div>
        <div className="flex gap-1 mt-2">
          {[1,2,3,4].map(i => <div key={i} className={`w-2 h-2 ${i===4 ? 'bg-magenta/40' : 'bg-cyan/40'}`} />)}
        </div>
      </div>
    </div>
  );
}



