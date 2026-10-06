'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CompassIcon, UserPlusIcon, UserIcon, MapIcon, UsersIcon, TerminalIcon, CodeIcon, RocketIcon } from 'lucide-react';
import { PublicTopBar } from '@/components/layout/PublicTopBar';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelBadge } from '@/components/pixel/PixelBadge';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { IMAGES } from '@/data/images';

const JOURNEY_STEPS = [
  { id: 1, title: 'DISCOVER', icon: <CompassIcon className="w-5 h-5" />, desc: 'Find the signal. You are here.', color: 'cyan' },
  { id: 2, title: 'REGISTER', icon: <UserPlusIcon className="w-5 h-5" />, desc: 'Initialize your GrowthOS identity and secure your spot.', color: 'default' },
  { id: 3, title: 'CREATE EXPLORER', icon: <UserIcon className="w-5 h-5" />, desc: 'Forge your pixel-art avatar in the synthesis chamber.', color: 'default' },
  { id: 4, title: 'QUEST', icon: <MapIcon className="w-5 h-5" />, desc: 'Complete challenges, earn XP, and level up your character.', color: 'lime' },
  { id: 5, title: 'CREW', icon: <UsersIcon className="w-5 h-5" />, desc: 'Invite friends, build your network, and multiply your XP.', color: 'magenta' },
  { id: 6, title: 'WORKSHOP', icon: <TerminalIcon className="w-5 h-5" />, desc: 'Attend the live, interactive 60-minute AI session.', color: 'cyan' },
  { id: 7, title: 'PROJECT', icon: <CodeIcon className="w-5 h-5" />, desc: 'Build your own AI application inside the Project Lab.', color: 'default' },
  { id: 8, title: 'SHIP', icon: <RocketIcon className="w-5 h-5" />, desc: 'Deploy your project and claim your ultimate achievement.', color: 'lime' },
];

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen flex flex-col bg-void overflow-x-hidden select-none">
      {/* 1. BACKGROUND ENVIRONMENT */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-void">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img src={IMAGES.quest} alt="Journey Map" className="h-full w-full object-cover pixelated mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void" />
        </motion.div>
        
        <PixelParticles />
        <CrtOverlay />
      </div>

      {/* 2. NAVIGATION */}
      <div className="relative z-30 flex-none">
        <PublicTopBar label="DATA LOG // THE JOURNEY" />
      </div>

      {/* 3. CONTENT */}
      <main className="relative z-20 flex-1 w-full max-w-[1000px] mx-auto px-6 py-12 md:py-24">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <PixelBadge tone="cyan" dot className="mb-6">THE PROTOCOL</PixelBadge>
          <h1 className="font-pixel text-[24px] md:text-[40px] text-ink mb-6 leading-tight">
            HOW IT <span className="text-cyan text-glow-cyan">WORKS</span>
          </h1>
          <p className="font-term text-lg md:text-xl text-mute max-w-2xl mx-auto">
            GrowthOS is not just a registration form. It is a complete journey from zero to deploying your first AI project. Here is your roadmap.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative max-w-3xl mx-auto pb-10">
          {/* Vertical Track line */}
          <div className="absolute left-[27px] md:left-1/2 md:-ml-[1px] top-4 bottom-4 w-[2px] bg-line/50" />

          {JOURNEY_STEPS.map((step, index) => {
            const isEven = index % 2 === 0;
            const bgClass = step.color === 'cyan' ? 'bg-cyan' : step.color === 'magenta' ? 'bg-magenta' : step.color === 'lime' ? 'bg-lime' : 'bg-mute';
            const textClass = step.color === 'cyan' ? 'text-cyan' : step.color === 'magenta' ? 'text-magenta' : step.color === 'lime' ? 'text-lime' : 'text-mute';
            
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 mb-12 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Center Node */}
                <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-sm border-2 border-void bg-deep flex items-center justify-center z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  <div className={`w-3 h-3 ${bgClass}`} />
                </div>

                {/* Content Panel */}
                <div className="ml-16 md:ml-0 w-full md:w-1/2 flex justify-start">
                  <div className={`w-full max-w-sm ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <PixelPanel tone={step.color as "cyan" | "magenta" | "lime" | "default"} className="bg-void/90 p-5 shadow-xl hover:-translate-y-1 transition-transform">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={textClass}>
                          {step.icon}
                        </div>
                        <span className="font-px text-[12px] tracking-widest text-ink/90">STEP 0{step.id}</span>
                      </div>
                      <h3 className={`font-pixel text-[14px] leading-snug mb-2 ${step.color === 'cyan' ? 'text-cyan text-glow-cyan' : step.color === 'lime' ? 'text-lime' : step.color === 'magenta' ? 'text-magenta' : 'text-ink'}`}>
                        {step.title}
                      </h3>
                      <p className="font-term text-base text-mute leading-relaxed">
                        {step.desc}
                      </p>
                    </PixelPanel>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center flex flex-col items-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-line/50 to-transparent mb-8" />
          <h2 className="font-pixel text-[18px] md:text-[24px] text-ink mb-8">
            READY TO BEGIN?
          </h2>
          <PixelButton href="/register" size="lg" icon={<ArrowRightIcon className="w-5 h-5" />}>
            START YOUR JOURNEY
          </PixelButton>
        </motion.div>
      </main>
    </div>
  );
}

