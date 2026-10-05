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
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { TypeLine } from '@/components/pixel/TypeLine';
import { IMAGES } from '@/data/images';
import { NPC_CONFIGS } from '@/data/characters';

const FEATURES = [
  { label: 'CREW TERMINAL', to: '/crew', color: '#ff3fa4', desc: 'Bring friends in. Watch your signal spread.' },
  { label: 'AI LAB', to: '/project', color: '#b6ff3b', desc: 'Where your first AI project gets built.' },
  { label: 'WORKSHOP HUB', to: '/workshop', color: '#3ef2ff', desc: 'Live, free, 60 minutes. Doors open soon.' },
  { label: 'PROJECT VAULT', to: '/project', color: '#ffc94a', desc: 'Every shipped project, archived forever.' }
];

const TICKER = [
  'MEERA \u2014 PES joined the crew of ARJUN.K',
  'VIKRAM.S reached LEVEL 06',
  '+3 explorers from VIT Vellore',
  'NISHA unlocked CHAIN REACTION',
  'ROHAN created an explorer',
  'Campus race: VIT leads with 92 explorers',
  'ISHA accepted quest BUILD YOUR CREW'
];

export default function Landing() {
  return (
    <div className="relative min-h-screen flex flex-col bg-void overflow-x-hidden">
      {/* Background Environment - STRICTLY VISUAL, NO ABSOLUTE UI */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src={IMAGES.city} alt="" className="pixelated h-full w-full object-cover opacity-40" />
        <CrtOverlay />
      </div>

      <div className="relative z-10 flex-none">
        <PublicTopBar />
      </div>

      {/* Robust Responsive Grid Layout */}
      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-4 py-12 md:py-20 lg:px-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Panel */}
          <div className="lg:col-span-7 xl:col-span-6">
            <PixelPanel tone="cyan" className="bg-void/90 p-6 md:p-10 shadow-2xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <PixelBadge tone="lime" dot>Signal live</PixelBadge>
                <span className="font-term text-lg md:text-xl text-mute">FREE &bull; ONLINE &bull; 60 MIN</span>
              </div>
              
              <h1 id="hero-title" className="font-pixel leading-[1.3] mb-6">
                <span className="block text-[14px] md:text-[20px] text-ink mb-2">BUILD YOUR FIRST</span>
                <span className="block text-[28px] md:text-[44px] text-cyan text-glow-cyan mb-2">AI PROJECT</span>
                <span className="block text-[14px] md:text-[20px] text-magenta">IN 60 MINUTES</span>
              </h1>
              
              <TypeLine text="Your first AI project starts here." delay={300} keepCursor className="text-xl md:text-2xl text-ink/90 mb-8" />
              
              <div className="flex flex-wrap gap-4 pt-2">
                <PixelButton href="/register" size="lg" icon={<ArrowRightIcon className="h-5 w-5" />} className="w-full sm:w-auto">
                  Enter GrowthOS
                </PixelButton>
                <PixelButton href="/workshop" size="lg" variant="ghost" icon={<CompassIcon className="h-5 w-5 text-cyan" />} className="w-full sm:w-auto">
                  Explore Workshop
                </PixelButton>
              </div>

              <div className="mt-10 flex items-center gap-4 border-t-2 border-line pt-6">
                <div className="flex -space-x-3 shrink-0">
                  {['meera', 'kabir', 'zoya', 'vikram'].map((k) => (
                    <span key={k} className="h-10 w-10 overflow-hidden border-2 border-void bg-deep rounded-sm">
                      <PixelCharacter config={NPC_CONFIGS[k]} size={40} idle={false} shadow={false} showEffect={false} />
                    </span>
                  ))}
                </div>
                <p className="font-term text-lg md:text-xl leading-tight text-mute">
                  <span className="text-lime">427 explorers</span> from 38 campuses are already inside.
                </p>
              </div>
            </PixelPanel>
          </div>

          {/* Right Column: Feature Cards (Replacing floating absolute hotspots) */}
          <div className="lg:col-span-5 xl:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <Link key={f.label} href={f.to} className="group outline-none">
                <PixelPanel tone="default" className="bg-void/80 p-5 h-full transition-all duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-hover:bg-void" style={{ '--b': f.color } as React.CSSProperties}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-2 w-2" style={{ background: f.color }} />
                    <h3 className="font-px text-[11px] tracking-widest text-ink">{f.label}</h3>
                  </div>
                  <p className="font-term text-lg text-mute group-hover:text-ink/90 transition-colors">{f.desc}</p>
                </PixelPanel>
              </Link>
            ))}
          </div>

        </div>
      </main>

      {/* Footer Ticker */}
      <div className="relative z-20 border-t-2 border-line bg-void/95 py-3 mt-auto overflow-hidden">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, ease: 'linear', repeat: Infinity }} className="flex w-max gap-12 whitespace-nowrap font-term text-lg text-ink/80 pr-12">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="h-2 w-2 bg-cyan" aria-hidden />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

