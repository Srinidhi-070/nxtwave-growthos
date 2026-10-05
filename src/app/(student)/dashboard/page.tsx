'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, Share2Icon, UsersIcon, ZapIcon } from 'lucide-react';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { PixelXPBar } from '@/components/pixel/PixelXPBar';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { Hotspot } from '@/components/world/Hotspot';
import { usePlayer } from '@/contexts/PlayerContext';
import { pad2, useCountdown } from '@/hooks/useCountdown';
import { IMAGES } from '@/data/images';
import { CREW } from '@/data/crew';

const LAB_HOTSPOTS = [
{ label: 'PROJECT TERMINAL', to: '/project', x: 17, y: 58, color: '#3ef2ff', desc: 'Open your AI Project Passport.' },
{ label: 'QUEST BOARD', to: '/quests', x: 36, y: 36, color: '#ffc94a', desc: '2 of 9 quests complete.' },
{ label: 'ACHIEVEMENTS', to: '/achievements', x: 60, y: 30, color: '#b4a8ff', desc: '3 badges on the wall.' },
{ label: 'AI CORE', to: '/profile', x: 84, y: 46, color: '#b6ff3b', desc: 'Your explorer core — 100 XP charged.' },
{ label: 'CREW TERMINAL', to: '/crew', x: 70, y: 66, color: '#ff3fa4', desc: '3 crew online.' }];


const SIGNALS = [
{ who: 'MEERA', what: 'is now WORKSHOP READY', when: '12m', color: '#b6ff3b' },
{ who: 'ISHA', what: 'joined via KABIR — your network grew', when: '41m', color: '#ff3fa4' },
{ who: 'ZOYA', what: 'registered but hasn’t created an explorer', when: '2h', color: '#ffc94a' }];


export default function StudentHome() {
  const { character, explorerName, level, xp, xpMax, crewCount } = usePlayer();
  const { days, hours, minutes } = useCountdown();

  return (
    <div className="mx-auto max-w-[1440px] md:px-8 md:pt-6">
      <div className="relative">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/8.2]">
          <img src={IMAGES.lab} alt="Your AI laboratory home base" className="pixelated absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-void/15" />
          <span aria-hidden className="glow-pulse absolute right-[10%] top-[30%] h-[40%] w-[10%] bg-lime/10" />
          <PixelParticles count={14} colors={['#3ef2ff', '#b6ff3b']} rise={40} />
          <CrtOverlay />
          <div className="absolute bottom-[9%] left-[46%] -translate-x-1/2">
            <PixelCharacter config={character} size={72} className="md:hidden" label={explorerName} />
            <PixelCharacter config={character} size={120} className="hidden md:inline-block" label={explorerName} />
          </div>
          <div className="hidden md:block">
            {LAB_HOTSPOTS.map((h) =>
            <Hotspot key={h.label} {...h} />
            )}
          </div>
        </div>

        <div className="pointer-events-none mt-4 grid gap-4 px-4 sm:grid-cols-2 md:absolute md:inset-0 md:mt-0 md:block md:p-5">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto md:absolute md:left-5 md:top-5 md:w-[300px]">
            
            <PixelPanel tone="cyan" className="bg-void/90 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-px text-[10px] tracking-widest text-cyan">AI EXPLORER</p>
                  <h1 className="mt-1.5 font-pixel text-[15px] text-ink">{explorerName}</h1>
                </div>
                <span className="bg-lime px-2 py-1 font-pixel text-[9px] text-void">LV {pad2(level)}</span>
              </div>
              <PixelXPBar value={xp} max={xpMax} className="mt-4" />
              <p className="mt-2 font-term text-lg text-mute">150 XP to Level 02</p>
            </PixelPanel>
          </motion.div>

          <div className="pointer-events-auto md:absolute md:right-5 md:top-5">
            <Link href="/countdown" className="block">
              <PixelPanel tone="magenta" className="bg-void/90 px-4 py-3 transition-[filter] duration-150 hover:brightness-125">
                <p className="font-px text-[10px] tracking-widest text-magenta">WORKSHOP</p>
                <p className="mt-1.5 font-pixel text-[16px] text-ink">
                  {pad2(days)}D {pad2(hours)}H {pad2(minutes)}M
                </p>
              </PixelPanel>
            </Link>
          </div>

          <div className="pointer-events-auto sm:col-span-2 md:absolute md:bottom-5 md:left-5 md:w-[380px]">
            <PixelPanel tone="lime" className="bg-void/92 p-4">
              <div className="flex items-center justify-between">
                <p className="font-px text-[10px] tracking-widest text-lime">CURRENT QUEST</p>
                <span className="font-px text-[10px] text-mute">+150 XP</span>
              </div>
              <p className="mt-2 font-pixel text-[13px] text-ink">BUILD YOUR CREW</p>
              <div className="mt-3 flex gap-1.5" aria-label="3 of 5 recruited">
                {[0, 1, 2, 3, 4].map((i) =>
                <span key={i} className={i < crewCount ? 'h-3 flex-1 bg-lime' : 'h-3 flex-1 bg-line'} />
                )}
              </div>
              <p className="mt-2 font-term text-lg text-ink/80">3 of 5 recruited · 2 more for the Crew Builder II reward</p>
              <div className="mt-4 flex gap-3">
                <PixelButton href="/card" size="sm" icon={<Share2Icon className="h-3.5 w-3.5" />}>
                  Share invite
                </PixelButton>
                <PixelButton href="/quests" size="sm" variant="ghost">
                  Quest map
                </PixelButton>
              </div>
            </PixelPanel>
          </div>

          <div className="pointer-events-auto md:absolute md:bottom-5 md:right-5">
            <Link href="/crew" className="block">
              <PixelPanel tone="magenta" className="flex items-center gap-4 bg-void/90 px-4 py-3 transition-[filter] duration-150 hover:brightness-125">
                <div>
                  <p className="font-px text-[10px] tracking-widest text-magenta">CREW</p>
                  <p className="mt-1 font-pixel text-[20px] text-ink">{pad2(crewCount)}</p>
                </div>
                <div className="flex -space-x-3">
                  {CREW.filter((c) => c.degree === 1).map((c) =>
                  <span key={c.id} className="h-9 w-9 overflow-hidden border-2 border-void bg-deep">
                      <PixelCharacter config={c.config} size={36} idle={false} shadow={false} showEffect={false} />
                    </span>
                  )}
                </div>
              </PixelPanel>
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-8 grid gap-8 px-4 pb-10 md:px-0 lg:grid-cols-[1.4fr_1fr]" aria-label="Signals">
        <div>
          <h2 className="flex items-center gap-2 font-px text-[12px] tracking-widest text-ink">
            <ZapIcon className="h-4 w-4 text-cyan" /> CREW SIGNALS
          </h2>
          <ul className="mt-4 divide-y-2 divide-line border-y-2 border-line">
            {SIGNALS.map((s) =>
            <li key={s.who} className="flex items-center gap-4 py-3">
                <span className="h-2 w-2 shrink-0" style={{ background: s.color }} aria-hidden />
                <p className="flex-1 font-term text-xl text-ink/90">
                  <span style={{ color: s.color }}>{s.who}</span> {s.what}
                </p>
                <span className="font-px text-[10px] text-mute">{s.when}</span>
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-4 bg-deep/50 p-5">
          <div>
            <p className="font-px text-[10px] tracking-widest text-amber">NUDGE AVAILABLE</p>
            <p className="mt-2 font-term text-xl leading-snug text-ink">ZOYA is one step from becoming active. A nudge from a crewmate doubles the chance she finishes.</p>
          </div>
          <PixelButton href="/crew" variant="ghost" size="sm" icon={<UsersIcon className="h-3.5 w-3.5 text-magenta" />} className="self-start">
            Open crew <ArrowRightIcon className="h-3.5 w-3.5" />
          </PixelButton>
        </div>
      </section>
    </div>);

}


