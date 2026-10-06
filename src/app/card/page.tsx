'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { DownloadIcon, ArrowLeftIcon, QrCodeIcon } from 'lucide-react';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { usePlayer } from '@/contexts/PlayerContext';
import { IMAGES } from '@/data/images';
import Link from 'next/link';

export default function ShareCardPage() {
  const { character, explorerName, college, level, xp } = usePlayer();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // In a real app, use html2canvas to capture the cardRef
    alert("Synthesizing image... (Download simulated)");
  };

  return (
    <div className="relative min-h-screen bg-night flex flex-col overflow-hidden select-none">
      {/* Dynamic gradient background for the whole page */}
      <div className="absolute inset-0 bg-gradient-to-br from-void via-deep to-night z-0" />

      {/* Top Nav */}
      <div className="relative z-20 w-full p-6 flex justify-between items-center max-w-[1200px] mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-mute hover:text-ink font-px text-[10px] tracking-widest transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> BACK TO DASHBOARD
        </Link>
        <PixelButton onClick={handleDownload} icon={<DownloadIcon className="w-4 h-4" />}>
          EXPORT SIGNAL
        </PixelButton>
      </div>

      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="w-full max-w-[500px]"
        >
          {/* THE CARD ITSELF - Designed for screenshotting */}
          <div 
            ref={cardRef} 
            className="relative bg-void border-4 border-cyan overflow-hidden rounded-sm shadow-[0_0_40px_rgba(62,242,255,0.2)]"
            style={{ aspectRatio: '4/5' }}
          >
            {/* Environment BG */}
            <div className="absolute inset-0 z-0">
              <img src={IMAGES.chamber} className="w-full h-full object-cover pixelated opacity-40 mix-blend-screen" alt="BG" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan to-transparent" />

            {/* Card Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8">
              
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-pixel text-[12px] text-cyan tracking-widest mb-1">GROWTHOS</h2>
                  <p className="font-term text-sm text-mute">AI WORKSHOP 2026</p>
                </div>
                <div className="w-12 h-12 bg-white flex items-center justify-center p-1">
                  {/* Simulated QR Code */}
                  <QrCodeIcon className="w-full h-full text-void" />
                </div>
              </div>

              {/* Character */}
              <div className="flex-1 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-cyan/10 rounded-full blur-2xl animate-pulse" />
                </div>
                <div className="transform scale-150">
                  <PixelCharacter config={character} size={160} />
                </div>
              </div>

              {/* Footer / Stats */}
              <div className="mt-4 border-t-2 border-line/50 pt-4 flex flex-col gap-4">
                <div>
                  <h1 className="font-pixel text-[24px] text-ink text-glow-white uppercase truncate">{explorerName || 'EXPLORER'}</h1>
                  <p className="font-term text-lg text-cyan">{college || 'NXTWAVE CAMPUS'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-deep/80 p-3 border border-line">
                    <p className="font-px text-[9px] tracking-widest text-mute">LEVEL</p>
                    <p className="font-pixel text-[18px] text-lime">{level || 1}</p>
                  </div>
                  <div className="bg-deep/80 p-3 border border-line">
                    <p className="font-px text-[9px] tracking-widest text-mute">XP</p>
                    <p className="font-pixel text-[18px] text-magenta">{xp ? xp.toLocaleString() : 100}</p>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Scanlines on top of card */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,63,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
          </div>

          <p className="text-center font-term text-mute text-sm mt-6">
            Synthesize this card to invite others and earn +50 XP each.
          </p>
        </motion.div>
      </main>
    </div>
  );
}

