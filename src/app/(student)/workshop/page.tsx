'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BellIcon, BellRingIcon, CalendarPlusIcon, CheckIcon, CircleIcon, LockIcon } from 'lucide-react';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { TypeLine } from '@/components/pixel/TypeLine';
import { pad2, useCountdown } from '@/hooks/useCountdown';
import { IMAGES } from '@/data/images';

const READY = [
{ label: 'Seat reserved', done: true },
{ label: 'Crew of 3 assembled', done: true },
{ label: 'Google account for Colab', done: false },
{ label: 'Watch the 3-min primer', done: false }];


export default function WorkshopCountdown() {
  const { days, hours, minutes, seconds, isLive } = useCountdown();
  const [remind, setRemind] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-void">
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGES.city} alt="" className="pixelated h-full w-full object-cover opacity-20" />
      </div>
      <div className="grid-floor absolute inset-0 opacity-40" aria-hidden />
      <PixelParticles count={30} colors={['#ff3fa4', '#3ef2ff']} />
      <CrtOverlay sweep />

      <div className="relative mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-16">
        <div className="flex items-center gap-3">
          <span className="glow-pulse h-2.5 w-2.5 bg-magenta" aria-hidden />
          <h1 className="font-px text-[13px] tracking-[0.3em] text-magenta md:text-[15px]">WORKSHOP SIGNAL</h1>
        </div>
        <TypeLine text="Uplink scheduled · WED 07 OCT · 19:00 IST · channel secured" className="mt-3 text-xl text-mute" />

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5" role="timer" aria-label={`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`}>
          {[
          { v: days, l: 'D', name: 'DAYS' },
          { v: hours, l: 'H', name: 'HOURS' },
          { v: minutes, l: 'M', name: 'MINUTES' },
          { v: seconds, l: 'S', name: 'SECONDS' }].
          map((u, i) =>
          <PixelPanel key={u.l} tone={i === 3 ? 'magenta' : 'default'} className="overflow-hidden bg-void/90 px-3 py-6 text-center md:py-10">
              <div className="relative flex h-[60px] items-center justify-center overflow-hidden md:h-[110px]" aria-hidden>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                  key={u.v}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className={`font-pixel text-[44px] md:text-[88px] ${i === 3 ? 'text-magenta text-glow-magenta' : 'text-ink'}`}>
                  
                    {pad2(u.v)}
                    <span className="text-[0.4em] text-mute">{u.l}</span>
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-3 font-px text-[10px] tracking-[0.3em] text-mute">{u.name}</p>
            </PixelPanel>
          )}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <PixelPanel tone="cyan" className="bg-void/90 p-6 md:p-8">
            <p className="font-px text-[11px] tracking-widest text-cyan">YOUR QUEST</p>
            <h2 className="mt-4 font-pixel text-[16px] leading-[1.5] text-ink md:text-[22px]">
              BUILD YOUR FIRST AI PROJECT
              <br />
              <span className="text-cyan">IN 60 MINUTES</span>
            </h2>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <PixelButton size="lg" disabled={!isLive} icon={isLive ? undefined : <LockIcon className="h-4 w-4" />} className="sm:flex-1">
                Enter when live
              </PixelButton>
              <PixelButton
                size="lg"
                variant="ghost"
                onClick={() => setRemind((r) => !r)}
                aria-pressed={remind}
                icon={remind ? <BellRingIcon className="h-4 w-4 text-lime" /> : <BellIcon className="h-4 w-4 text-cyan" />}>
                
                {remind ? 'Reminder set' : 'Remind me'}
              </PixelButton>
            </div>
            <button className="mt-5 flex items-center gap-2 font-term text-xl text-mute transition-colors duration-150 hover:text-ink">
              <CalendarPlusIcon className="h-4 w-4" /> Add to calendar
            </button>
          </PixelPanel>

          <div>
            <h2 className="font-px text-[11px] tracking-widest text-ink">READINESS · 2 / 4</h2>
            <ul className="mt-4 space-y-3">
              {READY.map((r) =>
              <li key={r.label} className="flex items-center gap-3 font-term text-xl">
                  {r.done ? <CheckIcon className="h-4 w-4 text-lime" /> : <CircleIcon className="h-4 w-4 text-mute" />}
                  <span className={r.done ? 'text-ink/60' : 'text-ink'}>{r.label}</span>
                </li>
              )}
            </ul>
            <p className="mt-6 font-term text-lg text-mute">Finish readiness to clear the WORKSHOP READY quest (+75 XP).</p>
          </div>
        </div>
      </div>
    </div>);

}

