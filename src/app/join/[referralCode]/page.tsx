'use client';
import React, { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelParticles } from '@/components/pixel/PixelParticles';

export default function JoinPage({ params }: { params: Promise<{ referralCode: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <div className="relative min-h-screen bg-night flex items-center justify-center overflow-hidden">
      <PixelParticles count={20} colors={['#3ef2ff', '#b6ff3b']} />
      <div className="relative z-10 w-full max-w-md p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <PixelPanel tone="cyan" className="bg-void/90 p-8 text-center border-t-4 border-t-cyan">
            <h1 className="font-px text-[12px] tracking-widest text-cyan mb-2">SECURE SIGNAL RECEIVED</h1>
            <h2 className="font-pixel text-[24px] text-ink mb-6">YOU WERE INVITED</h2>
            
            <div className="py-6 border-y border-line/50 my-6 bg-deep/50">
              <p className="font-term text-lg text-mute mb-2">INVITER ID</p>
              <p className="font-mono text-2xl text-lime uppercase">{resolvedParams.referralCode}</p>
            </div>

            <p className="font-term text-sm text-mute mb-8 leading-relaxed">
              Accept this invitation to join their crew, increase both of your network multipliers, and enter GrowthOS.
            </p>

            <PixelButton href="/register" className="w-full" icon={<ArrowRightIcon className="w-4 h-4" />}>
              ACCEPT INVITE
            </PixelButton>
          </PixelPanel>
        </motion.div>
      </div>
    </div>
  );
}
