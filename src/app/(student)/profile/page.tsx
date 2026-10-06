'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { SettingsIcon, Edit3Icon, HashIcon, CalendarIcon, UsersIcon, TrophyIcon } from 'lucide-react';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { usePlayer } from '@/contexts/PlayerContext';
import { IMAGES } from '@/data/images';
import Link from 'next/link';

export default function ProfilePage() {
  const { character, explorerName, college, level, xp, crewCount } = usePlayer();

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-x-hidden p-6 md:p-8">
      <div className="relative z-10 max-w-[1000px] mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <p className="font-px text-[10px] tracking-widest text-magenta">IDENTITY MODULE</p>
            <h1 className="font-pixel text-[24px] text-ink mt-2">EXPLORER PROFILE</h1>
          </div>
          <div className="flex gap-4">
            <PixelButton href="/character/create" variant="ghost" icon={<Edit3Icon className="w-4 h-4" />}>
              Edit Avatar
            </PixelButton>
            <PixelButton href="/settings" variant="ghost" icon={<SettingsIcon className="w-4 h-4 text-mute" />} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* AVATAR DISPLAY */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-5"
          >
            <PixelPanel tone="cyan" className="bg-void/90 p-6 flex flex-col items-center border-t-4 border-t-cyan relative overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-20">
                <img src={IMAGES.chamber} alt="Chamber bg" className="w-full h-full object-cover pixelated mix-blend-screen" />
              </div>
              
              <div className="relative z-10 w-full flex justify-between items-start mb-8">
                <span className="bg-lime px-3 py-1 font-pixel text-[12px] text-void shadow-[0_0_10px_rgba(182,255,59,0.5)]">
                  LEVEL {level}
                </span>
                <span className="font-px text-[10px] tracking-widest text-cyan">ACTIVE</span>
              </div>

              <div className="relative z-10 mb-8 transform scale-125">
                <div className="absolute -inset-8 bg-cyan/10 blur-xl rounded-full animate-pulse" />
                <PixelCharacter config={character} size={160} label="" />
              </div>

              <div className="relative z-10 w-full text-center border-t-2 border-line/50 pt-4">
                <h2 className="font-pixel text-[20px] text-ink uppercase">{explorerName}</h2>
                <p className="font-term text-lg text-mute mt-1">{college}</p>
              </div>
            </PixelPanel>
          </motion.div>

          {/* STATS */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <PixelPanel tone="magenta" className="bg-void/90 p-6 flex-1">
              <h3 className="font-px text-[11px] tracking-widest text-magenta mb-6">LIFETIME STATS</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-deep border border-line/50 p-4">
                  <div className="flex items-center gap-2 mb-2 text-mute">
                    <TrophyIcon className="w-4 h-4" />
                    <span className="font-px text-[9px] tracking-widest">TOTAL XP</span>
                  </div>
                  <div className="font-pixel text-[24px] text-lime">{xp.toLocaleString()}</div>
                </div>

                <div className="bg-deep border border-line/50 p-4">
                  <div className="flex items-center gap-2 mb-2 text-mute">
                    <HashIcon className="w-4 h-4" />
                    <span className="font-px text-[9px] tracking-widest">CAMPUS RANK</span>
                  </div>
                  <div className="font-pixel text-[24px] text-cyan">#42</div>
                </div>

                <div className="bg-deep border border-line/50 p-4">
                  <div className="flex items-center gap-2 mb-2 text-mute">
                    <UsersIcon className="w-4 h-4" />
                    <span className="font-px text-[9px] tracking-widest">CREW RECRUITED</span>
                  </div>
                  <div className="font-pixel text-[24px] text-magenta">{crewCount}</div>
                </div>

                <div className="bg-deep border border-line/50 p-4">
                  <div className="flex items-center gap-2 mb-2 text-mute">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="font-px text-[9px] tracking-widest">JOINED</span>
                  </div>
                  <div className="font-term text-xl text-ink">OCT 2026</div>
                </div>
              </div>
            </PixelPanel>

            <PixelPanel tone="lime" className="bg-void/90 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-pixel text-[14px] text-ink mb-1">ID CARD EXPORT</h3>
                  <p className="font-term text-sm text-mute">Generate a shareable pixel-art badge.</p>
                </div>
                <PixelButton href="/card" size="md">View Card</PixelButton>
              </div>
            </PixelPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
