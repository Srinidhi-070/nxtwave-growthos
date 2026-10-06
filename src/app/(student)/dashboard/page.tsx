'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, UsersIcon, Share2Icon, ZapIcon } from 'lucide-react';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { PixelXPBar } from '@/components/pixel/PixelXPBar';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { usePlayer } from '@/contexts/PlayerContext';
import { pad2, useCountdown } from '@/hooks/useCountdown';

import { CREW } from '@/data/crew';

const SIGNALS = [
  { who: 'MEERA', what: 'is now WORKSHOP READY', when: '12m', color: '#b6ff3b' },
  { who: 'ISHA', what: 'joined via KABIR \u2014 your network grew', when: '41m', color: '#ff3fa4' },
  { who: 'ZOYA', what: 'registered but hasn\'t created an explorer', when: '2h', color: '#ffc94a' }
];

export default function StudentHome() {
  const { character, explorerName, level, xp, xpMax, crewCount } = usePlayer();
  const { days, hours, minutes } = useCountdown();

  return (
    <div className="mx-auto max-w-[1440px] md:px-8 md:pt-6 pb-20">
      {/* Hero Environment Section */}
      <div className="relative rounded-sm overflow-hidden border-2 border-line bg-void min-h-[440px] flex flex-col md:flex-row">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #3ef2ff 1px, transparent 1px), linear-gradient(to bottom, #3ef2ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 bg-void/40" />
          <CrtOverlay />
          <PixelParticles count={50} colors={['#3ef2ff', '#b6ff3b']} rise={40} />
        </div>

        {/* Character Layer - Centered */}
        <div className="absolute inset-0 z-10 flex items-center justify-center translate-x-[8%] -translate-y-[5%] pointer-events-none">
          <PixelCharacter config={character} size={220} label={explorerName} />
        </div>

        {/* UI Overlay - Responsive Grid Layout */}
        <div className="relative z-20 w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 h-full pointer-events-none">
          
          {/* Top Left: Player Status */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-5 lg:col-span-4 pointer-events-auto">
            <PixelPanel tone="cyan" className="bg-void/90 p-3 sm:p-4 w-full">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-px text-[10px] tracking-widest text-cyan">AI EXPLORER</p>
                  <h1 className="mt-1 font-pixel text-[14px] text-ink">{explorerName}</h1>
                </div>
                <span className="bg-lime px-2 py-1 font-pixel text-[10px] text-void">LV {pad2(level)}</span>
              </div>
              <PixelXPBar value={xp} max={xpMax} className="mt-4" />
              <p className="mt-3 font-term text-sm text-mute">150 XP to Level 02</p>
            </PixelPanel>
          </motion.div>

          {/* Top Right: Workshop Countdown */}
          <div className="md:col-span-7 lg:col-span-8 flex md:justify-end pointer-events-auto">
            <Link href="/workshop" className="block w-full sm:w-auto">
              <PixelPanel tone="magenta" className="bg-void/90 p-3 sm:p-4 transition-all hover:bg-void hover:-translate-y-0.5">
                <p className="font-px text-[10px] tracking-widest text-magenta">WORKSHOP</p>
                <p className="mt-1 font-pixel text-[15px] text-ink whitespace-nowrap">
                  {pad2(days)}D {pad2(hours)}H {pad2(minutes)}M
                </p>
              </PixelPanel>
            </Link>
          </div>

          {/* Spacer to push bottom elements down */}
          <div className="md:col-span-12 flex-1 min-h-[150px]"></div>

          {/* Bottom Left: Current Quest */}
          <div className="md:col-span-7 lg:col-span-5 pointer-events-auto self-end">
            <PixelPanel tone="lime" className="bg-void/90 p-3 sm:p-4 w-full">
              <div className="flex items-center justify-between">
                <p className="font-px text-[10px] tracking-widest text-lime">CURRENT QUEST</p>
                <span className="font-px text-[10px] text-mute">+150 XP</span>
              </div>
              <p className="mt-2 font-pixel text-[13px] text-ink">BUILD YOUR CREW</p>
              <div className="mt-4 flex gap-1.5 w-full max-w-[200px]" aria-label="3 of 5 recruited">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={i < crewCount ? 'h-3 flex-1 bg-lime' : 'h-3 flex-1 bg-line'} />
                ))}
              </div>
              <p className="mt-3 font-term text-sm text-ink/80">3 of 5 recruited \u2014 2 more for Crew Builder II</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <PixelButton href="/card" size="sm" icon={<Share2Icon className="h-3.5 w-3.5" />}>
                  Share invite
                </PixelButton>
                <PixelButton href="/quests" size="sm" variant="ghost">
                  Quest map
                </PixelButton>
              </div>
            </PixelPanel>
          </div>

          {/* Bottom Right: Crew Summary */}
          <div className="md:col-span-5 lg:col-span-7 flex md:justify-end self-end pointer-events-auto">
            <Link href="/crew" className="block w-full sm:w-auto">
              <PixelPanel tone="magenta" className="flex items-center gap-5 bg-void/90 p-3 sm:p-4 transition-all hover:bg-void hover:-translate-y-0.5">
                <div>
                  <p className="font-px text-[10px] tracking-widest text-magenta">CREW</p>
                  <p className="mt-1 font-pixel text-[18px] text-ink">{pad2(crewCount)}</p>
                </div>
                <div className="flex -space-x-3">
                  {CREW.filter((c) => c.degree === 1).map((c) => (
                    <span key={c.id} className="h-8 w-8 overflow-hidden border-2 border-void bg-deep rounded-sm">
                      <PixelCharacter config={c.config} size={32} idle={false} shadow={false} showEffect={false} />
                    </span>
                  ))}
                </div>
              </PixelPanel>
            </Link>
          </div>

        </div>
      </div>

      {/* Under-Environment Feed & Tips */}
      <section className="mt-6 grid gap-6 md:grid-cols-[1.5fr_1fr] px-4 md:px-0">
        <div className="border-2 border-line bg-void/50 p-5">
          <h2 className="flex items-center gap-2 font-px text-[11px] tracking-widest text-ink mb-4">
            <ZapIcon className="h-4 w-4 text-cyan" /> CREW SIGNALS
          </h2>
          <ul className="divide-y-2 divide-line border-t-2 border-line">
            {SIGNALS.map((s) => (
              <li key={s.who} className="flex items-start gap-4 py-3">
                <span className="h-2 w-2 shrink-0 mt-1.5" style={{ background: s.color }} aria-hidden />
                <p className="flex-1 font-term text-lg sm:text-xl text-ink/90 leading-tight">
                  <span style={{ color: s.color }}>{s.who}</span> {s.what}
                </p>
                <span className="font-px text-[9px] text-mute whitespace-nowrap">{s.when}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col justify-between gap-4 border-2 border-line bg-deep/40 p-5">
          <div>
            <p className="font-px text-[11px] tracking-widest text-amber">NUDGE AVAILABLE</p>
            <p className="mt-3 font-term text-xl leading-relaxed text-ink/90">
              ZOYA is one step from becoming active. A nudge from a crewmate doubles the chance she finishes.
            </p>
          </div>
          <PixelButton href="/crew" variant="ghost" size="sm" icon={<UsersIcon className="h-4 w-4 text-magenta" />} className="self-start mt-4">
            Open crew
          </PixelButton>
        </div>
      </section>
    </div>
  );
}










