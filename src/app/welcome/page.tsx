'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, TerminalSquareIcon, MapIcon, UsersIcon } from 'lucide-react';
import { PublicTopBar } from '@/components/layout/PublicTopBar';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CyberGrid } from '@/components/pixel/CyberGrid';
import { usePlayer } from '@/contexts/PlayerContext';

export default function WelcomePage() {
  const { explorerName } = usePlayer();
  const [step, setStep] = useState(0);

  // Auto-progress through the welcome cinematic
  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => setStep(1), 2000);
      return () => clearTimeout(t);
    }
    if (step === 1) {
      import('@/utils/audio').then(m => m.audio.success());
      const t = setTimeout(() => setStep(2), 2500);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="relative min-h-screen flex flex-col bg-void overflow-hidden select-none">
      <div className="fixed inset-0 z-0 pointer-events-none bg-void">
        <CyberGrid />
        <PixelParticles count={20} colors={['#b6ff3b']} />
        <CrtOverlay />
      </div>

      <div className="relative z-30 flex-none">
        <PublicTopBar label="SYSTEM // WELCOME" hideCta />
      </div>

      <main className="relative z-20 flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center justify-center">
        
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-pixel text-[32px] md:text-[48px] text-lime text-glow-lime mb-4">WELCOME TO GROWTHOS</h1>
              <p className="font-term text-xl text-mute tracking-widest uppercase">EXPLORER {explorerName || 'INITIALIZED'}</p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center flex flex-col items-center"
            >
              <div className="mb-6 font-px text-[14px] text-cyan tracking-widest">REWARD UNLOCKED</div>
              <div className="text-[64px] font-pixel text-lime text-glow-lime">+100 XP</div>
              <p className="font-term text-xl text-mute mt-4 max-w-md">
                For initializing your identity and joining the campus network.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center"
            >
              <h2 className="font-pixel text-[24px] text-ink mb-10">YOUR <span className="text-cyan text-glow-cyan">OBJECTIVES</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                <PixelPanel tone="lime" className="bg-void/90 p-6 flex flex-col items-center text-center">
                  <TerminalSquareIcon className="w-8 h-8 text-lime mb-4" />
                  <h3 className="font-pixel text-[14px] text-ink mb-2">1. WORKSHOP</h3>
                  <p className="font-term text-sm text-mute">Attend the live AI workshop and ship your project.</p>
                </PixelPanel>
                
                <PixelPanel tone="cyan" className="bg-void/90 p-6 flex flex-col items-center text-center">
                  <MapIcon className="w-8 h-8 text-cyan mb-4" />
                  <h3 className="font-pixel text-[14px] text-ink mb-2">2. QUESTS</h3>
                  <p className="font-term text-sm text-mute">Complete terminal challenges to earn XP.</p>
                </PixelPanel>

                <PixelPanel tone="magenta" className="bg-void/90 p-6 flex flex-col items-center text-center">
                  <UsersIcon className="w-8 h-8 text-magenta mb-4" />
                  <h3 className="font-pixel text-[14px] text-ink mb-2">3. CREW</h3>
                  <p className="font-term text-sm text-mute">Recruit engineers to multiply your network XP.</p>
                </PixelPanel>
              </div>

              <PixelButton href="/dashboard" size="lg" className="w-full sm:w-auto relative group shadow-[0_0_15px_rgba(62,242,255,0.4)]">
                <div className="flex items-center gap-3 px-6">
                  <span className="tracking-widest">ENTER DASHBOARD</span>
                  <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </PixelButton>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}




