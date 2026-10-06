'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogInIcon, TerminalIcon, MailIcon, LoaderIcon } from 'lucide-react';
import { PublicTopBar } from '@/components/layout/PublicTopBar';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { IMAGES } from '@/data/images';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulate auth request
    setTimeout(() => {
      setStatus('sent');
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-void overflow-x-hidden select-none">
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-void">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img src={IMAGES.chamber} alt="Security Chamber" className="h-full w-full object-cover pixelated mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 to-void" />
        </motion.div>
        <PixelParticles count={5} colors={['#3ef2ff', '#ff3fa4']} />
        <CrtOverlay />
      </div>

      {/* NAVIGATION */}
      <div className="relative z-30 flex-none">
        <PublicTopBar label="SECURITY // UPLINK" hideCta />
      </div>

      {/* CONTENT */}
      <main className="relative z-20 flex-1 w-full max-w-[480px] mx-auto px-6 py-12 md:py-32 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <PixelPanel tone="cyan" className="bg-void/95 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <TerminalIcon className="w-48 h-48" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 border-2 border-cyan bg-cyan/10 flex items-center justify-center mb-6 rounded-sm">
                <LogInIcon className="w-5 h-5 text-cyan" />
              </div>
              
              <h1 className="font-pixel text-[20px] text-ink mb-2">ACCESS TERMINAL</h1>
              <p className="font-term text-base text-mute mb-8">
                Request a secure magic link to re-enter the GrowthOS campus.
              </p>

              {status === 'sent' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full bg-lime/10 border border-lime/30 p-6 flex flex-col items-center gap-3"
                >
                  <MailIcon className="w-8 h-8 text-lime" />
                  <p className="font-term text-lg text-lime">Signal Transmitted.</p>
                  <p className="font-term text-sm text-mute">Check your inbox for the uplink token.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                  <div className="text-left">
                    <label htmlFor="email" className="font-px text-[10px] tracking-widest text-cyan mb-2 block">
                      IDENTIFIER (EMAIL)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="explorer@campus.edu"
                      className="w-full h-12 bg-deep border-2 border-line/50 focus:border-cyan text-ink font-term text-lg px-4 outline-none transition-colors"
                      required
                    />
                  </div>

                  <PixelButton 
                    type="submit" 
                    size="lg" 
                    disabled={status === 'loading'}
                    icon={status === 'loading' ? <LoaderIcon className="w-5 h-5 animate-spin" /> : undefined}
                    className="w-full justify-center"
                  >
                    {status === 'loading' ? 'TRANSMITTING...' : 'REQUEST UPLINK'}
                  </PixelButton>
                </form>
              )}
            </div>
          </PixelPanel>

          <div className="mt-8 text-center">
            <p className="font-term text-sm text-mute">
              New explorer? <a href="/register" className="text-cyan hover:text-glow-cyan transition-colors">Initialize your identity here.</a>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
