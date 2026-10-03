'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PixelPanel from '@/components/ui/PixelPanel';
import PixelButton from '@/components/ui/PixelButton';
import QRCode from 'react-qr-code';

export default function MyCrewPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = typeof window !== 'undefined' ? localStorage.getItem('growthos_referral_code') || 'NXTWAVE100' : 'NXTWAVE100';
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/join/${referralCode}` : '';

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = `I just joined GrowthOS to build my first AI project in 60 minutes. Join my crew: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
      <div className="shrink-0">
        <h1 className="text-3xl font-pixel text-white tracking-widest mb-1 uppercase">My Crew</h1>
        <p className="text-sm text-slate-400 font-sans">People connected to your journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Network Impact & Inviter */}
        <div className="col-span-1 space-y-6">
          <PixelPanel className="bg-blue-900/20 border-blue-800">
            <h3 className="font-pixel text-sm text-blue-400 mb-4 tracking-widest uppercase">Network Impact</h3>
            <div className="text-4xl font-pixel text-white mb-2">350</div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Your measurable contribution to the GrowthOS network, calculated via direct invites, second-degree growth, and crew activity.
            </p>
          </PixelPanel>

          <PixelPanel title="WHO BROUGHT ME" className="bg-slate-900 border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-800 border-2 border-slate-700 pixel-corners flex items-center justify-center shrink-0">
                 <div className="w-6 h-6 bg-blue-500 pixel-corners" />
              </div>
              <div>
                <div className="font-pixel text-white uppercase tracking-wider text-sm">ARJUN</div>
                <div className="text-xs text-blue-400 font-pixel">AI EXPLORER LVL 04</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500 font-sans">Joined through their signal.</div>
          </PixelPanel>

          <PixelPanel title="GROW YOUR CREW" className="bg-slate-900 border-slate-800">
            <div className="bg-white p-2 w-fit mx-auto pixel-corners mb-4">
              <QRCode value={shareUrl} size={120} />
            </div>
            <div className="flex flex-col gap-2">
              <PixelButton onClick={shareWhatsApp} variant="primary" className="w-full text-xs">
                SHARE VIA WHATSAPP
              </PixelButton>
              <PixelButton onClick={copyLink} variant="secondary" className="w-full text-xs">
                {copied ? 'COPIED!' : 'COPY SIGNAL LINK'}
              </PixelButton>
            </div>
          </PixelPanel>
        </div>

        {/* Right Col: The Crew List */}
        <div className="col-span-1 lg:col-span-2">
          <PixelPanel title="DIRECT CREW" className="bg-slate-900 border-slate-800 h-full">
            <div className="space-y-4">
              
              {/* Crew Member 1 */}
              <div className="border border-slate-800 bg-slate-950 p-4 pixel-corners cursor-pointer hover:border-blue-500 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 pixel-corners flex items-center justify-center shrink-0" />
                    <div>
                      <div className="font-pixel text-white uppercase text-sm tracking-widest">PRIYA</div>
                      <div className="text-xs text-slate-500 font-sans">Joined 2 days ago</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-pixel text-green-400 border border-green-900 bg-green-950 px-2 py-1 uppercase">
                    PROJECT STARTED
                  </div>
                </div>
                {/* Lifecycle Bar */}
                <div className="flex gap-1 h-2 w-full mt-4">
                  <div className="flex-1 bg-blue-500" title="Invited" />
                  <div className="flex-1 bg-blue-500" title="Registered" />
                  <div className="flex-1 bg-blue-500" title="Workshop Ready" />
                  <div className="flex-1 bg-green-500" title="Project Started" />
                  <div className="flex-1 bg-slate-800" title="Shipped" />
                </div>
              </div>

              {/* Crew Member 2 */}
              <div className="border border-slate-800 bg-slate-950 p-4 pixel-corners cursor-pointer hover:border-blue-500 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 pixel-corners flex items-center justify-center shrink-0" />
                    <div>
                      <div className="font-pixel text-white uppercase text-sm tracking-widest">RAHUL</div>
                      <div className="text-xs text-slate-500 font-sans">Joined 12 hours ago</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-pixel text-blue-400 border border-blue-900 bg-blue-950 px-2 py-1 uppercase">
                    WORKSHOP READY
                  </div>
                </div>
                <div className="flex gap-1 h-2 w-full mt-4">
                  <div className="flex-1 bg-blue-500" />
                  <div className="flex-1 bg-blue-500" />
                  <div className="flex-1 bg-blue-500" />
                  <div className="flex-1 bg-slate-800" />
                  <div className="flex-1 bg-slate-800" />
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
               <h3 className="font-pixel text-xs text-slate-400 mb-4 tracking-widest uppercase">SECOND-DEGREE CONNECTIONS</h3>
               
               <div className="bg-slate-950 border border-slate-800 p-4 pixel-corners flex items-center gap-4">
                 <div className="text-blue-500 font-pixel text-2xl">⚡</div>
                 <div>
                   <div className="font-pixel text-sm text-white uppercase mb-1">CHAIN REACTION</div>
                   <div className="text-xs text-slate-400 font-sans">Priya invited Ananya. Ananya joined GrowthOS.</div>
                 </div>
                 <div className="ml-auto text-green-400 font-pixel text-sm">+50 IMPACT</div>
               </div>
            </div>

          </PixelPanel>
        </div>
      </div>
    </div>
  );
}
