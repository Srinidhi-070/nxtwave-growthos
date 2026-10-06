'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalSquareIcon, ChevronRightIcon, HelpCircleIcon } from 'lucide-react';
import { PublicTopBar } from '@/components/layout/PublicTopBar';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { IMAGES } from '@/data/images';

const FAQ_DATA = [
  {
    q: "Do I need prior AI or coding experience?",
    a: "Negative. Zero prior AI knowledge is required. The workshop is designed to take you from a blank slate to a deployed AI integration within 60 minutes."
  },
  {
    q: "Is the workshop really free?",
    a: "Affirmative. The live session, access to GrowthOS, and the deployment environments are completely free for engineering students."
  },
  {
    q: "What equipment is required to participate?",
    a: "A stable uplink (internet connection), a modern web browser, and a Google account to access Colab environments during the build phase."
  },
  {
    q: "Will the live uplink be recorded?",
    a: "The primary session is live. Recordings are classified and will only be made available to explorers who unlock the 'Workshop Ready' achievement prior to launch."
  },
  {
    q: "How does the Crew system work?",
    a: "Growth is a multiplayer game. When you invite friends using your unique signal, they join your Crew. As they earn XP and level up, you receive network bonuses."
  }
];

function FaqItem({ q, a, index, isOpen, onClick }: { q: string, a: string, index: number, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="mb-4">
      <button 
        onClick={onClick}
        className={`w-full text-left transition-all duration-200 outline-none group
          ${isOpen ? 'ring-2 ring-cyan/50 bg-cyan/5' : 'hover:bg-line/30'}
        `}
      >
        <PixelPanel tone={isOpen ? 'cyan' : 'default'} className={`p-4 md:p-6 cursor-pointer transition-colors ${isOpen ? 'bg-void/95' : 'bg-void/80'}`}>
          <div className="flex items-center gap-4">
            <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90 text-cyan' : 'text-mute group-hover:text-ink'}`}>
              <ChevronRightIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="font-px text-[10px] tracking-widest text-mute/50">SYS.QUERY.{index + 1}</span>
                <h3 className={`font-pixel text-[12px] md:text-[14px] leading-snug ${isOpen ? 'text-cyan text-glow-cyan' : 'text-ink'}`}>
                  {q}
                </h3>
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-4 pl-9">
                  <div className="border-l-2 border-cyan/30 pl-4 py-1">
                    <p className="font-term text-base md:text-lg text-mute leading-relaxed">
                      {a}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </PixelPanel>
      </button>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="relative min-h-screen flex flex-col bg-void overflow-x-hidden select-none">
      {/* 1. BACKGROUND ENVIRONMENT */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-void">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img src={IMAGES.lab} alt="Information Terminal" className="h-full w-full object-cover pixelated mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 to-void" />
        </motion.div>
        
        <PixelParticles count={10} colors={['#3ef2ff']} />
        <CrtOverlay />
      </div>

      {/* 2. NAVIGATION */}
      <div className="relative z-30 flex-none">
        <PublicTopBar label="TERMINAL // FAQ" />
      </div>

      {/* 3. CONTENT */}
      <main className="relative z-20 flex-1 w-full max-w-[800px] mx-auto px-6 py-12 md:py-24">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-sm border-2 border-cyan bg-cyan/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(62,242,255,0.3)]">
            <TerminalSquareIcon className="w-8 h-8 text-cyan" />
          </div>
          <h1 className="font-pixel text-[24px] md:text-[32px] text-ink mb-4 leading-tight">
            INFORMATION <span className="text-cyan text-glow-cyan">TERMINAL</span>
          </h1>
          <p className="font-term text-lg text-mute max-w-lg mx-auto">
            Accessing frequently asked queries from the GrowthOS database.
          </p>
        </motion.div>

        {/* TERMINAL ACCORDION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          {/* Decorative Terminal Frame */}
          <div className="absolute -inset-4 md:-inset-6 border border-line/30 bg-deep/20 pointer-events-none" />
          <div className="absolute -top-4 -left-4 w-2 h-2 border-t-2 border-l-2 border-cyan/50" />
          <div className="absolute -top-4 -right-4 w-2 h-2 border-t-2 border-r-2 border-cyan/50" />
          <div className="absolute -bottom-4 -left-4 w-2 h-2 border-b-2 border-l-2 border-cyan/50" />
          <div className="absolute -bottom-4 -right-4 w-2 h-2 border-b-2 border-r-2 border-cyan/50" />
          
          <div className="relative z-10">
            {FAQ_DATA.map((item, idx) => (
              <FaqItem 
                key={idx}
                index={idx}
                q={item.q}
                a={item.a}
                isOpen={openIndex === idx}
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              />
            ))}
          </div>
        </motion.div>

        {/* BOTTOM SUPPORT NOTE */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center flex flex-col items-center"
        >
          <HelpCircleIcon className="w-5 h-5 text-mute mb-3" />
          <p className="font-term text-base text-mute/60">
            Signal not found? Join the campus Discord for direct uplink.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
