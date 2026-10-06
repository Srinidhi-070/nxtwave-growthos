'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldIcon, ShieldCheckIcon, LockIcon } from 'lucide-react';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelBadge } from '@/components/pixel/PixelBadge';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';

const ACHIEVEMENTS = [
  { id: 1, title: 'EXPLORER BORN', desc: 'Synthesize your character and join the campus.', xp: 100, unlocked: true },
  { id: 2, title: 'NETWORK HUB', desc: 'Invite your first crew member to the platform.', xp: 250, unlocked: true },
  { id: 3, title: 'WORKSHOP READY', desc: 'Attend the live AI workshop session.', xp: 500, unlocked: false },
  { id: 4, title: 'FIRST DEPLOY', desc: 'Ship your first AI project to the live web.', xp: 1000, unlocked: false },
  { id: 5, title: 'INFLUENCER', desc: 'Reach 10 active 2nd-degree crew members.', xp: 800, unlocked: false },
  { id: 6, title: 'TOP 100', desc: 'Break into the top 100 on the campus leaderboard.', xp: 1500, unlocked: false }
];

export default function AchievementsPage() {
  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-x-hidden p-6 md:p-8">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <PixelParticles count={15} colors={['#b6ff3b', '#ffc94a']} />
        <CrtOverlay />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <header className="mb-12">
          <PixelBadge tone="lime" dot className="mb-4">TROPHY ROOM</PixelBadge>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-pixel text-[24px] md:text-[32px] text-ink leading-none">ACHIEVEMENTS</h1>
              <p className="font-term text-lg text-mute mt-3 max-w-lg">
                Unlock achievements to permanently increase your XP multiplier and unlock exclusive gear.
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="font-pixel text-[32px] text-lime">{unlockedCount}</span>
              <span className="font-pixel text-[24px] text-mute">/{ACHIEVEMENTS.length}</span>
              <p className="font-px text-[10px] tracking-widest text-mute">UNLOCKED</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((ach, idx) => (
            <motion.div 
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: 'spring' }}
            >
              <PixelPanel 
                tone={ach.unlocked ? 'lime' : 'default'} 
                className={`h-full p-6 transition-all duration-300 ${ach.unlocked ? 'bg-void shadow-[0_0_15px_rgba(182,255,59,0.15)] hover:-translate-y-1' : 'bg-deep/40 opacity-70 grayscale hover:grayscale-0'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 flex items-center justify-center border-2 ${ach.unlocked ? 'border-lime bg-lime/10' : 'border-line bg-void'}`}>
                    {ach.unlocked ? <ShieldCheckIcon className="w-6 h-6 text-lime" /> : <LockIcon className="w-6 h-6 text-mute" />}
                  </div>
                  <span className={`font-pixel text-[14px] ${ach.unlocked ? 'text-lime' : 'text-mute'}`}>
                    +{ach.xp} XP
                  </span>
                </div>
                
                <h3 className={`font-pixel text-[14px] mb-2 ${ach.unlocked ? 'text-ink' : 'text-mute'}`}>
                  {ach.title}
                </h3>
                <p className="font-term text-base text-mute/80">
                  {ach.desc}
                </p>
              </PixelPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
