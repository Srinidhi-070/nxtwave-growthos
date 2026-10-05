'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CompassIcon } from 'lucide-react';
import { PublicTopBar } from '@/components/layout/PublicTopBar';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelBadge } from '@/components/pixel/PixelBadge';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { TypeLine } from '@/components/pixel/TypeLine';
import { Hotspot } from '@/components/world/Hotspot';
import { usePlayer } from '@/contexts/PlayerContext';
import { IMAGES } from '@/data/images';
import { NPC_CONFIGS } from '@/data/characters';

const HOTSPOTS = [
{ label: 'CREW TERMINAL', to: '/crew', x: 14, y: 75, color: '#ff3fa4', desc: 'Bring friends in. Watch your signal spread.' },
{ label: 'AI LAB', to: '/project', x: 33, y: 64, color: '#b6ff3b', desc: 'Where your first AI project gets built.' },
{ label: 'WORKSHOP HUB', to: '/workshop', x: 68, y: 72, color: '#3ef2ff', desc: 'Live, free, 60 minutes. Doors open soon.' },
{ label: 'PROJECT VAULT', to: '/project', x: 90, y: 46, color: '#ffc94a', desc: 'Every shipped project, archived forever.' }];


const TICKER = [
'MEERA · PES joined the crew of ARJUN.K',
'VIKRAM.S reached LEVEL 06',
'+3 explorers from VIT Vellore',
'NISHA unlocked CHAIN REACTION',
'ROHAN created an explorer',
'Campus race: VIT leads with 92 explorers',
'ISHA accepted quest BUILD YOUR CREW'];


const PODS = [
{ top: '19%', dur: 22, delay: 0, dir: 'right', color: '#3ef2ff' },
{ top: '24%', dur: 30, delay: 6, dir: 'left', color: '#ff3fa4' },
{ top: '15%', dur: 38, delay: 12, dir: 'right', color: '#b6ff3b' }];


export default function Landing() {
  const { character } = usePlayer();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-void">
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGES.city} alt="" className="pixelated h-full w-full object-cover object-[center_70%]" />
        <div className="absolute inset-0 bg-void/25" />
      </div>

      {PODS.map((p, i) =>
      <div
        key={i}
        aria-hidden
        className={`${p.dir === 'right' ? 'drive-right' : 'drive-left'} pointer-events-none absolute left-0 flex items-center`}
        style={{ top: p.top, animationDuration: `${p.dur}s`, animationDelay: `-${p.delay}s`, flexDirection: p.dir === 'right' ? 'row' : 'row-reverse' }}>
        
          <span className="h-[2px] w-16" style={{ background: `${p.color}55` }} />
          <span className="h-[5px] w-3 bg-ink" />
          <span className="h-[3px] w-[3px]" style={{ background: p.color }} />
        </div>
      )}

      <PixelParticles count={28} />
      <CrtOverlay />
      <PublicTopBar />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col px-5 pb-40 pt-24 md:px-10 md:pt-28">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
          className="max-w-[600px]"
          aria-labelledby="hero-title">
          
          <PixelPanel tone="cyan" className="bg-void/85 p-6 md:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <PixelBadge tone="lime" dot>
                Signal live
              </PixelBadge>
              <span className="font-term text-xl text-mute">FREE · ONLINE · 60 MIN</span>
            </div>
            <h1 id="hero-title" className="mt-6 font-pixel leading-[1.3]">
              <span className="block text-[15px] text-ink md:text-[24px]">BUILD YOUR FIRST</span>
              <span className="neon-flicker text-glow-cyan my-2 block text-[26px] text-cyan md:my-3 md:text-[50px]">AI PROJECT</span>
              <span className="block text-[15px] text-magenta md:text-[24px]">IN 60 MINUTES</span>
            </h1>
            <TypeLine text="Your first AI project starts here." delay={500} keepCursor className="mt-6 text-2xl text-ink/90" />
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <PixelButton href="/register" size="lg" icon={<ArrowRightIcon className="h-4 w-4" />}>
                Enter GrowthOS
              </PixelButton>
              <PixelButton href="/workshop" size="lg" variant="ghost" icon={<CompassIcon className="h-4 w-4 text-cyan" />}>
                Explore the workshop
              </PixelButton>
            </div>
            <div className="mt-8 flex items-center gap-3 border-t-2 border-line pt-5">
              <div className="flex -space-x-2">
                {['meera', 'kabir', 'zoya', 'vikram'].map((k) =>
                <span key={k} className="h-8 w-8 overflow-hidden border-2 border-void bg-deep">
                    <PixelCharacter config={NPC_CONFIGS[k]} size={32} idle={false} shadow={false} showEffect={false} />
                  </span>
                )}
              </div>
              <p className="font-term text-xl leading-tight text-mute">
                <span className="text-lime">427 explorers</span> from 38 campuses are already inside.
              </p>
            </div>
          </PixelPanel>
        </motion.section>

        <div className="mt-8 grid grid-cols-2 gap-3 md:hidden">
          {HOTSPOTS.map((h) =>
          <Link key={h.label} href={h.to} className="px-frame-sm flex items-center gap-2 bg-void/90 p-3 font-px text-[10px] tracking-widest" style={{ '--b': h.color } as React.CSSProperties}>
              <span className="h-1.5 w-1.5" style={{ background: h.color }} />
              {h.label}
            </Link>
          )}
        </div>
      </main>

      <div className="hidden md:block">
        {HOTSPOTS.map((h) =>
        <Hotspot key={h.label} {...h} />
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-12 z-10 h-24" aria-hidden>
        <motion.div
          className="absolute bottom-0"
          initial={{ left: '-8%' }}
          animate={{ left: '108%' }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
          
          <PixelCharacter config={character} size={56} walking />
        </motion.div>
        <motion.div
          className="absolute bottom-2"
          initial={{ left: '104%' }}
          animate={{ left: '-10%' }}
          transition={{ duration: 36, repeat: Infinity, ease: 'linear', delay: 4 }}>
          
          <PixelCharacter config={NPC_CONFIGS.kabir} size={44} walking flip showEffect={false} />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t-2 border-line bg-void/90 py-2.5">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-term text-lg text-ink/80">
          {[...TICKER, ...TICKER].map((t, i) =>
          <span key={i} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
              {t}
            </span>
          )}
        </div>
      </div>
    </div>);

}


