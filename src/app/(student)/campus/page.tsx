'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, TerminalIcon, CodeIcon, UsersIcon, TrophyIcon, ShieldIcon } from 'lucide-react';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { PixelBadge } from '@/components/pixel/PixelBadge';
import { CyberGrid } from '@/components/pixel/CyberGrid';
import Link from 'next/link';

const CAMPUS_LOCATIONS = [
  { id: 'dashboard', name: 'AI LAB (HOME)', icon: <TerminalIcon className="w-5 h-5" />, href: '/dashboard', top: '70%', left: '20%', color: 'lime' },
  { id: 'workshop', name: 'WORKSHOP HUB', icon: <CodeIcon className="w-5 h-5" />, href: '/workshop', top: '35%', left: '45%', color: 'cyan' },
  { id: 'crew', name: 'CREW NETWORK', icon: <UsersIcon className="w-5 h-5" />, href: '/crew', top: '55%', left: '75%', color: 'magenta' },
  { id: 'quests', name: 'QUEST BOARD', icon: <MapPinIcon className="w-5 h-5" />, href: '/quests', top: '80%', left: '55%', color: 'cyan' },
  { id: 'leaderboard', name: 'CHAMPIONS TOWER', icon: <TrophyIcon className="w-5 h-5" />, href: '/leaderboard', top: '25%', left: '80%', color: 'default' },
  { id: 'achievements', name: 'ACHIEVEMENT HALL', icon: <ShieldIcon className="w-5 h-5" />, href: '/achievements', top: '20%', left: '15%', color: 'default' },
];

export default function CampusWorld() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-void overflow-hidden select-none">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <CyberGrid />
        <CrtOverlay sweep />
        <PixelParticles count={30} colors={['#3ef2ff', '#b6ff3b']} rise={30} />
      </div>

      <div className="relative z-10 w-full h-[calc(100vh-64px)] flex flex-col pt-8 px-6">
        <div className="max-w-[1440px] mx-auto w-full">
          <PixelBadge tone="cyan" dot className="mb-2">GPS SIGNAL LOCKED</PixelBadge>
          <h1 className="font-pixel text-[24px] text-ink">CAMPUS MAP</h1>
        </div>

        {/* MAP OVERLAY CONTAINER */}
        <div className="flex-1 w-full max-w-[1200px] mx-auto relative mt-8">
          {CAMPUS_LOCATIONS.map((loc, i) => {
            const toneColor = loc.color === 'cyan' ? 'text-cyan' : loc.color === 'magenta' ? 'text-magenta' : loc.color === 'lime' ? 'text-lime' : 'text-mute';
            return (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1), type: 'spring' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: loc.top, left: loc.left }}
              >
                <Link href={loc.href} className="flex flex-col items-center focus:outline-none">
                  {/* Map Pin UI */}
                  <div className={`relative z-20 w-12 h-12 flex items-center justify-center border-2 border-void bg-deep shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-110 group-focus:scale-110 group-hover:-translate-y-2 group-focus:-translate-y-2`}>
                    <div className={toneColor}>{loc.icon}</div>
                    <div className={`absolute -inset-1 border border-dashed ${toneColor}/50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 animate-spin-slow`} style={{ animationDuration: '4s' }} />
                  </div>
                  
                  {/* Label */}
                  <div className="relative z-30 mt-2 pointer-events-none">
                    <PixelPanel tone={loc.color as "cyan" | "magenta" | "lime" | "default"} className="bg-void/90 px-3 py-1.5 whitespace-nowrap shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">
                      <span className="font-px text-[10px] tracking-widest text-ink">{loc.name}</span>
                    </PixelPanel>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


