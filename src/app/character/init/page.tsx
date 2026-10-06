'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { TypeLine } from '@/components/pixel/TypeLine';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CyberGrid } from '@/components/pixel/CyberGrid';

export default function CharacterInitCinematic() {
  const router = useRouter();

  useEffect(() => {
    import('@/utils/audio').then(m => m.audio.boot());
    // Cinematic sequence lasts 5 seconds, then auto-routes to welcome
    const timer = setTimeout(() => {
      router.push('/welcome');
    }, 5500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-void overflow-hidden select-none">
      <CyberGrid />
      <CrtOverlay sweep />
      <PixelParticles count={30} colors={['#3ef2ff', '#b6ff3b']} />

      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        {/* BOOT SEQUENCE */}
        <div className="mb-12 h-24">
          <TypeLine 
            text="SYNTHESIS COMPLETE // EXPLORER INITIALIZED" 
            delay={200}
            speed={30}
            className="text-cyan font-pixel text-[16px] md:text-[24px] tracking-widest text-glow-cyan" 
          />
        </div>

        {/* GLOWING FORGE AURA */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
          transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
          className="relative w-48 h-48 mx-auto"
        >
          <div className="absolute inset-0 rounded-full bg-lime/20 blur-3xl animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-cyan/30 blur-2xl animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Minimal geometric representation of the character booting up */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-4 border-dashed border-cyan rounded-full opacity-80"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-16 h-16 border-2 border-lime rounded-full opacity-60"
            />
          </div>
        </motion.div>

        {/* LOADING PROGRESS */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-16 max-w-sm mx-auto"
        >
          <div className="h-2 w-full bg-deep border-2 border-line/50 p-[2px]">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, delay: 2.5, ease: "easeInOut" }}
              className="h-full bg-lime shadow-[0_0_10px_rgba(182,255,59,0.8)]"
            />
          </div>
          <div className="mt-4 flex justify-between font-term text-sm text-mute">
            <span>UPLOADING TO CAMPUS NETWORK</span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.8 }}
              className="text-lime"
            >
              SUCCESS
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


