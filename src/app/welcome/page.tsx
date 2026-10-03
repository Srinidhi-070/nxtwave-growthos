'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PixelButton from '@/components/ui/PixelButton';
import PixelPanel from '@/components/ui/PixelPanel';
import XPBar from '@/components/ui/XPBar';
import QuestCard from '@/components/ui/QuestCard';

export default function WelcomePage() {
  const router = useRouter();
  const [referralCode, setReferralCode] = useState('');
  const [userId, setUserId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const code = localStorage.getItem('growthos_referral_code');
    const uid = localStorage.getItem('growthos_user_id');
    if (!code || !uid) {
      router.push('/register');
      return;
    }
    setReferralCode(code);
    setUserId(uid);
  }, [router]);

  const shareLink = typeof window !== 'undefined' ? `${window.location.origin}/register?ref=${referralCode}&utm_source=referral&utm_medium=community` : '';

  const handleShareClick = async (platform: string) => {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'share_clicked',
        userId,
        propertiesJson: JSON.stringify({ platform }),
      }),
    });

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (platform === 'whatsapp') {
      const text = encodeURIComponent(`I just registered for the free AI project workshop! Join me using my invite link and we can unlock the AI Project Starter Pack together: ${shareLink}`);
      window.location.href = `https://wa.me/?text=${text}`;
    }
  };

  if (!referralCode) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-pixel text-slate-500 uppercase tracking-widest">Loading...</div>;

  return (
    <main className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Pixel Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Column: Player Profile & Quest */}
        <div className="flex-1 w-full text-left space-y-6">
          <PixelPanel title="PLAYER_PROFILE">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-slate-950 border-2 border-slate-700 pixel-corners flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1 p-1">
                  <div className="w-1.5 h-1.5 bg-transparent"></div><div className="w-1.5 h-1.5 bg-blue-400"></div><div className="w-1.5 h-1.5 bg-blue-400"></div><div className="w-1.5 h-1.5 bg-blue-400"></div><div className="w-1.5 h-1.5 bg-transparent"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400"></div><div className="w-1.5 h-1.5 bg-white"></div><div className="w-1.5 h-1.5 bg-blue-400"></div><div className="w-1.5 h-1.5 bg-white"></div><div className="w-1.5 h-1.5 bg-blue-400"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400"></div><div className="w-1.5 h-1.5 bg-blue-400"></div><div className="w-1.5 h-1.5 bg-blue-400"></div><div className="w-1.5 h-1.5 bg-blue-400"></div><div className="w-1.5 h-1.5 bg-blue-400"></div>
                  <div className="w-1.5 h-1.5 bg-transparent"></div><div className="w-1.5 h-1.5 bg-amber-400"></div><div className="w-1.5 h-1.5 bg-amber-400"></div><div className="w-1.5 h-1.5 bg-amber-400"></div><div className="w-1.5 h-1.5 bg-transparent"></div>
                </div>
              </div>
              <div>
                <div className="font-pixel text-blue-400 text-xl tracking-wider">AI EXPLORER</div>
                <div className="text-slate-500 font-sans text-sm">Welcome to GrowthOS</div>
              </div>
            </div>
            
            <XPBar currentXP={100} maxXP={1000} level={1} />
          </PixelPanel>

          <PixelPanel title="QUEST_LOG">
            <div className="space-y-4">
              <QuestCard 
                id="q1" 
                title="Register for AI Workshop" 
                description="Initialize your journey into AI." 
                xpReward={100} 
                isCompleted={true} 
              />
              <QuestCard 
                id="q2" 
                title="Invite 3 Friends" 
                description="Build your crew to unlock the AI Project Starter Pack." 
                xpReward={150} 
                isCompleted={false} 
                isActive={true}
              />
            </div>
          </PixelPanel>
        </div>

        {/* Right Column: Build Your Crew */}
        <div className="flex-1 w-full text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-slate-900 border-4 border-amber-500 mx-auto mb-6 pixel-corners flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          >
            <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-pixel text-white mb-4 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          >
            Build Your Crew
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 font-sans mb-8 max-w-sm mx-auto"
          >
            AI is more fun with your people.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PixelPanel title="INVITE_UPLINK" className="mb-6 text-left">
              <p className="text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">Your Unique Invite Code</p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input 
                  type="text" 
                  readOnly 
                  value={shareLink} 
                  className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-slate-300 font-mono text-sm focus:outline-none"
                />
                <PixelButton 
                  variant="secondary"
                  onClick={() => handleShareClick('copy')}
                  className="w-full sm:w-auto text-sm px-6 py-3 shrink-0"
                >
                  {copied ? 'COPIED!' : 'COPY'}
                </PixelButton>
              </div>
            </PixelPanel>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-4"
          >
            <PixelButton 
              variant="primary"
              onClick={() => handleShareClick('whatsapp')}
              className="w-full bg-[#25D366] hover:bg-[#20b858] border-[#128C7E] text-white flex justify-center"
            >
              SHARE ON WHATSAPP
            </PixelButton>
            
            <PixelButton 
              variant="secondary"
              onClick={() => router.push('/dashboard')}
              className="w-full text-slate-400 hover:text-white"
            >
              ENTER DASHBOARD
            </PixelButton>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
