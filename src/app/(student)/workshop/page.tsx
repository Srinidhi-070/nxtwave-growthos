'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BellIcon, BellRingIcon, CalendarPlusIcon, CheckIcon, CircleIcon, LockIcon, InfoIcon, ShieldCheckIcon, GraduationCapIcon, RouteIcon, ClockIcon } from 'lucide-react';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { TypeLine } from '@/components/pixel/TypeLine';
import { pad2, useCountdown } from '@/hooks/useCountdown';
import { DataStreamBG } from '@/components/pixel/DataStreamBG';

const READY = [
  { label: 'Seat reserved', done: true },
  { label: 'Crew of 3 assembled', done: true },
  { label: 'Google account ready', done: false },
  { label: 'Review the primer', done: false }
];

const DETAILS = [
  { icon: <ClockIcon className="h-4 w-4" />, label: 'DURATION', value: '60 Minutes (Live)' },
  { icon: <GraduationCapIcon className="h-4 w-4" />, label: 'FOR WHO', value: 'Engineering Students' },
  { icon: <RouteIcon className="h-4 w-4" />, label: 'FORMAT', value: 'Interactive Guided Build' },
  { icon: <ShieldCheckIcon className="h-4 w-4" />, label: 'NO EXP NEEDED', value: 'Zero AI knowledge required' }
];

export default function WorkshopCountdown() {
  const { days, hours, minutes, seconds, isLive } = useCountdown();
  const [remind, setRemind] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-void select-none pb-20">
      {/* 1. BACKGROUND ENVIRONMENT */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <DataStreamBG />
        </motion.div>
        <PixelParticles />
        <CrtOverlay />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-10 md:py-16">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="glow-pulse h-2.5 w-2.5 bg-cyan shadow-[0_0_8px_rgba(62,242,255,0.8)]" aria-hidden />
            <h1 className="font-px text-[13px] tracking-[0.3em] text-cyan md:text-[15px]">WORKSHOP HUB</h1>
          </div>
          <div className="h-8">
            <TypeLine 
              text="Uplink scheduled // WED 07 OCT // 19:00 IST // channel secured" 
              className="text-lg md:text-xl text-mute tracking-wide" 
              delay={300}
            />
          </div>
        </motion.div>

        {/* COUNTDOWN TICKER */}
        <div 
          className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6" 
          role="timer" 
          aria-label={`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`}
        >
          {[
            { v: days, l: 'D', name: 'DAYS', color: 'default' },
            { v: hours, l: 'H', name: 'HOURS', color: 'default' },
            { v: minutes, l: 'M', name: 'MINUTES', color: 'default' },
            { v: seconds, l: 'S', name: 'SECONDS', color: 'cyan' }
          ].map((u, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + (i * 0.1), type: 'spring', bounce: 0.4 }}
              key={u.l}
            >
              <PixelPanel tone={u.color as "cyan" | "default"} className="overflow-hidden bg-void/90 px-4 py-6 text-center md:py-10 shadow-lg backdrop-blur-sm">
                <div className="relative flex h-[60px] items-center justify-center overflow-hidden md:h-[110px]" aria-hidden>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={u.v}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className={`font-pixel text-[44px] md:text-[88px] ${i === 3 ? 'text-cyan text-glow-cyan' : 'text-ink'}`}
                    >
                      {pad2(u.v)}
                      <span className="text-[0.4em] text-mute">{u.l}</span>
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className={`mt-3 font-px text-[10px] tracking-[0.3em] ${i === 3 ? 'text-cyan' : 'text-mute'}`}>
                  {u.name}
                </p>
              </PixelPanel>
            </motion.div>
          ))}
        </div>

        {/* DETAILS GRID */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          
          {/* MAIN BRIEFING PANEL */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="lg:col-span-8"
          >
            <PixelPanel tone="cyan" className="bg-void/95 p-6 md:p-8 h-full flex flex-col shadow-2xl relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <InfoIcon className="w-32 h-32" />
              </div>
              
              <div className="relative z-10">
                <p className="font-px text-[11px] tracking-widest text-cyan mb-4">MISSION BRIEFING</p>
                <h2 className="font-pixel text-[18px] leading-[1.4] text-ink md:text-[24px]">
                  BUILD YOUR FIRST AI PROJECT <span className="text-cyan text-glow-cyan">IN 60 MINUTES</span>
                </h2>
                
                <p className="mt-6 font-term text-lg md:text-xl text-mute/90 leading-relaxed max-w-2xl">
                  This isn&apos;t a lecture. It&apos;s a live deployment exercise. In 60 minutes, you will go from zero AI knowledge to shipping a functional AI integration. Watch, build, and deploy alongside your crew.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DETAILS.map((d, i) => (
                    <div key={i} className="flex items-center gap-4 bg-deep/50 border border-line/50 p-4">
                      <div className="text-cyan bg-cyan/10 p-2 rounded-sm border border-cyan/20">
                        {d.icon}
                      </div>
                      <div>
                        <div className="font-px text-[9px] text-mute tracking-widest">{d.label}</div>
                        <div className="font-term text-base text-ink">{d.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row border-t border-line/50 pt-8">
                  <PixelButton size="lg" disabled={!isLive} icon={isLive ? undefined : <LockIcon className="h-4 w-4" />} className="sm:flex-1 relative group">
                    <span className="tracking-widest">{isLive ? 'INITIALIZE CONNECTION' : 'SYSTEM LOCKED'}</span>
                  </PixelButton>
                  <PixelButton
                    size="lg"
                    variant="ghost"
                    onClick={() => setRemind((r) => !r)}
                    aria-pressed={remind}
                    icon={remind ? <BellRingIcon className="h-4 w-4 text-lime" /> : <BellIcon className="h-4 w-4 text-cyan" />}
                    className={remind ? 'border-lime text-lime hover:bg-lime/10' : 'hover:bg-cyan/10'}
                  >
                    {remind ? 'ALARM ENGAGED' : 'SET ALARM'}
                  </PixelButton>
                  <button className="hidden sm:flex items-center justify-center p-3 border-2 border-line bg-deep text-mute hover:text-ink hover:border-mute transition-colors group">
                    <CalendarPlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </PixelPanel>
          </motion.div>

          {/* READINESS & JOURNEY PANEL */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            {/* JOURNEY PATH */}
            <PixelPanel tone="default" className="bg-void/90 p-6 shadow-lg">
              <h2 className="font-px text-[11px] tracking-widest text-ink mb-6">THE JOURNEY</h2>
              <div className="flex flex-col gap-0 relative">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-line" />
                {['IDEA', 'BUILD', 'AI INTEL', 'APP', 'SHIP'].map((step) => (
                  <div key={step} className="flex items-center gap-4 py-3 relative z-10">
                    <div className="w-5 h-5 rounded-full border-2 border-cyan bg-void flex items-center justify-center shadow-[0_0_10px_rgba(62,242,255,0.4)]">
                      <div className="w-1.5 h-1.5 bg-cyan rounded-full" />
                    </div>
                    <span className="font-term text-lg text-ink/90">{step}</span>
                  </div>
                ))}
              </div>
            </PixelPanel>

            {/* CHECKLIST */}
            <PixelPanel tone="lime" className="bg-void/90 p-6 shadow-lg">
              <h2 className="font-px text-[11px] tracking-widest text-lime mb-5 flex items-center justify-between">
                <span>READINESS</span>
                <span>2 / 4</span>
              </h2>
              <ul className="space-y-4">
                {READY.map((r) => (
                  <li key={r.label} className="flex items-center gap-3 font-term text-base">
                    {r.done ? (
                      <CheckIcon className="h-5 w-5 text-lime shrink-0 drop-shadow-[0_0_5px_rgba(182,255,59,0.5)]" />
                    ) : (
                      <CircleIcon className="h-5 w-5 text-mute/50 shrink-0" />
                    )}
                    <span className={r.done ? 'text-ink/60 line-through decoration-lime/30' : 'text-ink'}>{r.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-line/50">
                <p className="font-term text-sm text-lime/80 leading-snug">
                  Finish readiness checklist to unlock the WORKSHOP READY achievement (+75 XP).
                </p>
              </div>
            </PixelPanel>
          </motion.div>

        </div>
      </div>
    </div>
  );
}





