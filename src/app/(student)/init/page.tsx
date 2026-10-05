'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, UsersIcon } from 'lucide-react';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { PixelXPBar } from '@/components/pixel/PixelXPBar';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { TypeLine } from '@/components/pixel/TypeLine';
import { usePlayer } from '@/contexts/PlayerContext';
import { useCountUp } from '@/hooks/useCountUp';
import { IMAGES } from '@/data/images';
import { accentOf } from '@/utils/sprite';

const EASE = [0.23, 1, 0.32, 1] as const;

export default function CharacterInit() {
  const { character, explorerName } = usePlayer();
  const reduce = useReducedMotion();
  const xp = useCountUp(100, 700, 3300);
  const accent = accentOf(character);
  const t = (s: number) => reduce ? 0 : s;

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden bg-void px-5 py-16">
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: t(0.2) }} aria-hidden>
        <img src={IMAGES.city} alt="" className="pixelated h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-void/50" />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-cyan"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: '100vh', opacity: [1, 1, 0] }}
        transition={{ duration: t(0.9), ease: 'linear' }} />
      

      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[42%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 bg-white"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 9], opacity: [0, 0.9, 0] }}
        transition={{ duration: t(0.6), delay: t(0.8), ease: 'easeOut' }} />
      

      <PixelParticles count={40} rise={120} />
      <CrtOverlay sweep />

      <div className="relative z-10 grid w-full max-w-[1100px] items-center gap-10 md:grid-cols-[1fr_1.1fr]">
        <div className="relative flex flex-col items-center">
          <motion.div
            aria-hidden
            className="absolute bottom-6 h-[260px] w-[260px] border-2 md:h-[340px] md:w-[340px]"
            style={{ borderColor: accent }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: [0, 0.8, 0.25], scale: [0.96, 1.08, 1] }}
            transition={{ duration: t(0.9), delay: t(1.0) }} />
          
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.3, delay: t(1.0), ease: EASE }}>
            <PixelCharacter config={character} size={200} className="md:hidden" label={explorerName} />
            <PixelCharacter config={character} size={264} className="hidden md:inline-block" label={explorerName} />
          </motion.div>
          <motion.div
            className="mt-2 h-3 w-56 md:w-72"
            style={{ background: accent }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: t(1.2), ease: EASE }}
            aria-hidden />
          
        </div>

        <div className="text-center md:text-left">
          <TypeLine text="AI EXPLORER INITIALIZED" delay={t(1.4) * 1000} speed={34} prefix="> " className="text-2xl tracking-wider text-lime md:text-3xl" />
          <motion.h1
            className="mt-6 font-pixel text-[18px] leading-[1.5] text-ink md:text-[30px]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: t(2.4), ease: EASE }}>
            
            WELCOME,
            <br />
            <span className="text-glow-cyan text-cyan">{explorerName}</span>
          </motion.h1>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: t(3.0) }}>
            
            <span className="px-frame bg-void px-4 py-3 font-pixel text-[13px] text-ink [--b:#5546c9]">LEVEL 01</span>
            <motion.span
              className="font-pixel text-[20px] text-lime"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: [0.96, 1.12, 1], opacity: 1 }}
              transition={{ duration: 0.3, delay: t(3.3) }}
              aria-label="Plus 100 XP">
              
              +{Math.round(xp)} XP
            </motion.span>
          </motion.div>
          <PixelXPBar value={100} max={250} delay={t(3.4)} className="mx-auto mt-5 max-w-md md:mx-0" />

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: t(4.2), ease: EASE }} className="mt-10">
            <PixelPanel tone="magenta" className="bg-void/90 p-5 text-left">
              <p className="font-px text-[10px] tracking-widest text-magenta">QUEST UNLOCKED</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-magenta/15">
                  <UsersIcon className="h-6 w-6 text-magenta" />
                </span>
                <div>
                  <p className="font-pixel text-[13px] leading-snug text-ink md:text-[15px]">BUILD YOUR CREW</p>
                  <p className="mt-1 font-term text-lg text-mute">Recruit 3 explorers - +150 XP - Crew Builder badge</p>
                </div>
              </div>
              <PixelButton href="/dashboard" className="mt-5 w-full" icon={<ArrowRightIcon className="h-4 w-4" />}>
                Accept quest
              </PixelButton>
            </PixelPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
