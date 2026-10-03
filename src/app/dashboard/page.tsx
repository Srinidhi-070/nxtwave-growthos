'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';
import PixelPanel from '@/components/ui/PixelPanel';
import PixelButton from '@/components/ui/PixelButton';
import XPBar from '@/components/ui/XPBar';
import QuestCard from '@/components/ui/QuestCard';

// Stub types matching our API response
type DashboardData = {
  connectorId: string;
  status: string;
  referralCode: string;
  metrics: {
    verifiedRegistrations: number;
    pendingRegistrations: number;
    qualityScore: number;
    campusRank: number;
    milestoneState: string;
  };
  suggestedAction: string;
  recentEvents: Array<{ id: string; event: string; time: string }>;
};

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('HUB');

  useEffect(() => {
    const cid = localStorage.getItem('growthos_user_id');
    if (!cid) {
      router.push('/register');
      return;
    }
    fetch(`/api/connectors/${cid}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        router.push('/register');
      });
  }, [router]);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-pixel text-slate-500 tracking-widest uppercase text-xl">Loading Hub...</div>;
  if (!data) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-pixel text-red-500 tracking-widest uppercase text-xl">Connection Lost</div>;

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/register?ref=${data.referralCode}` : '';

  const handleShare = () => {
    const text = `Hey! I'm attending the "Build Your First AI Project in 60 Minutes" workshop. Register here to get your AI project starter pack: ${shareUrl}`;
    window.location.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const navItems = ['HUB', 'MY CREW', 'CAMPUS', 'AI LAB'];

  // Compute game stats
  const totalXP = 100 + (data.metrics.verifiedRegistrations * 150);
  const level = Math.floor(totalXP / 300) + 1;
  const currentLevelXP = totalXP % 300;
  const maxLevelXP = 300;

  return (
    <main className="relative min-h-screen bg-slate-950 overflow-hidden text-slate-200">
      
      {/* Background Pixel Grid */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 mt-4">
        
        {/* Left Sidebar HUD */}
        <div className="w-full md:w-72 flex flex-col gap-6 shrink-0">
          <PixelPanel className="bg-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col items-center p-2">
              <div className="w-24 h-24 bg-slate-950 border-2 border-slate-700 pixel-corners flex items-center justify-center mb-4">
                 <div className="grid grid-cols-5 gap-1 p-2">
                  <div className="w-2 h-2 bg-transparent"></div><div className="w-2 h-2 bg-blue-400"></div><div className="w-2 h-2 bg-blue-400"></div><div className="w-2 h-2 bg-blue-400"></div><div className="w-2 h-2 bg-transparent"></div>
                  <div className="w-2 h-2 bg-blue-400"></div><div className="w-2 h-2 bg-white"></div><div className="w-2 h-2 bg-blue-400"></div><div className="w-2 h-2 bg-white"></div><div className="w-2 h-2 bg-blue-400"></div>
                  <div className="w-2 h-2 bg-blue-400"></div><div className="w-2 h-2 bg-blue-400"></div><div className="w-2 h-2 bg-blue-400"></div><div className="w-2 h-2 bg-blue-400"></div><div className="w-2 h-2 bg-blue-400"></div>
                  <div className="w-2 h-2 bg-transparent"></div><div className="w-2 h-2 bg-amber-400"></div><div className="w-2 h-2 bg-amber-400"></div><div className="w-2 h-2 bg-amber-400"></div><div className="w-2 h-2 bg-transparent"></div>
                </div>
              </div>
              <h2 className="font-pixel text-blue-400 text-2xl tracking-wider uppercase mb-1">AI EXPLORER</h2>
              <div className="text-sm text-slate-500 font-sans mb-6">MSRIT Campus</div>
              
              <XPBar currentXP={currentLevelXP} maxXP={maxLevelXP} level={level} />
            </div>
          </PixelPanel>

          <PixelPanel innerClassName="p-2 space-y-2">
            {navItems.map(item => (
              <button 
                key={item}
                onClick={() => setActiveTab(item)}
                className={`w-full text-left font-pixel px-4 py-3 text-lg tracking-widest uppercase transition-colors pixel-corners ${activeTab === item ? 'bg-blue-900/50 text-blue-400 border border-blue-500/50' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'}`}
              >
                {item === activeTab && <span className="text-blue-500 mr-2">▶</span>}
                {item !== activeTab && <span className="opacity-0 mr-2">▶</span>}
                {item}
              </button>
            ))}
          </PixelPanel>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8">
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-2 border-slate-800 pb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-pixel text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {activeTab}
              </h1>
            </div>
            <div className="flex gap-4 font-pixel text-sm md:text-lg">
              <div className="bg-slate-900 border border-slate-700 px-3 py-1 flex items-center gap-2 pixel-corners">
                <span className="text-slate-500">RANK:</span>
                <span className="text-amber-400">#{data.metrics.campusRank}</span>
              </div>
              <div className="bg-slate-900 border border-slate-700 px-3 py-1 flex items-center gap-2 pixel-corners">
                <span className="text-slate-500">NET:</span>
                <span className={data.status === 'ACTIVE' ? 'text-emerald-400' : 'text-slate-400'}>{data.status}</span>
              </div>
            </div>
          </header>

          {activeTab === 'HUB' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              
              <div className="space-y-8">
                <PixelPanel title="QUEST_LOG">
                  <div className="space-y-4">
                    <QuestCard 
                      id="q1" title="Register for AI Workshop" description="Initialize your journey into AI." 
                      xpReward={100} isCompleted={true} 
                    />
                    <QuestCard 
                      id="q2" title="Invite 3 Friends" description="Build your crew to unlock the AI Project Starter Pack." 
                      xpReward={150} isCompleted={data.metrics.verifiedRegistrations >= 3} isActive={data.metrics.verifiedRegistrations < 3}
                    />
                  </div>
                </PixelPanel>

                <PixelPanel title="ACHIEVEMENTS" innerClassName="grid grid-cols-3 gap-4 p-4">
                   <div className="aspect-square bg-emerald-900/20 border-2 border-emerald-900/50 flex flex-col items-center justify-center opacity-100 pixel-corners">
                     <span className="text-3xl mb-2">🏁</span>
                     <span className="text-[10px] font-pixel text-emerald-400 uppercase tracking-wider">First Signal</span>
                   </div>
                   <div className={`aspect-square bg-slate-900 border-2 border-slate-800 flex flex-col items-center justify-center pixel-corners ${data.metrics.verifiedRegistrations >= 1 ? 'opacity-100 border-amber-900/50 bg-amber-900/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'opacity-30 grayscale'}`}>
                     <span className="text-3xl mb-2">🤝</span>
                     <span className={`text-[10px] font-pixel uppercase tracking-wider ${data.metrics.verifiedRegistrations >= 1 ? 'text-amber-400' : 'text-slate-500'}`}>Connector</span>
                   </div>
                   <div className={`aspect-square bg-slate-900 border-2 border-slate-800 flex flex-col items-center justify-center pixel-corners ${data.metrics.verifiedRegistrations >= 3 ? 'opacity-100 border-purple-900/50 bg-purple-900/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'opacity-30 grayscale'}`}>
                     <span className="text-3xl mb-2">👑</span>
                     <span className={`text-[10px] font-pixel uppercase tracking-wider ${data.metrics.verifiedRegistrations >= 3 ? 'text-purple-400' : 'text-slate-500'}`}>Crew Boss</span>
                   </div>
                </PixelPanel>
              </div>

              <div className="space-y-8">
                <PixelPanel title="CREW_STATUS" className="bg-slate-900" innerClassName="flex flex-col items-center justify-center py-10">
                  <div className="text-8xl md:text-9xl font-pixel text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] mb-2">
                    {data.metrics.verifiedRegistrations}
                  </div>
                  <div className="text-blue-400 font-pixel text-xl tracking-widest uppercase mb-8">Verified Recruits</div>
                  
                  {data.metrics.verifiedRegistrations < 3 ? (
                    <div className="text-sm text-slate-400 font-sans text-center px-4">
                      Recruit <span className="text-amber-400 font-bold">{3 - data.metrics.verifiedRegistrations}</span> more agents to unlock the Starter Pack.
                    </div>
                  ) : (
                    <div className="text-sm text-emerald-400 font-sans text-center px-4 bg-emerald-900/20 py-2 border border-emerald-900/50 pixel-corners">
                      STARTER PACK UNLOCKED!
                    </div>
                  )}
                </PixelPanel>

                <PixelPanel title="INVITE_ASSET" innerClassName="flex flex-col items-center text-center p-6">
                  <div className="bg-white p-4 pixel-corners shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6">
                    <QRCode value={shareUrl} size={140} />
                  </div>
                  <div className="w-full flex gap-4">
                     <PixelButton variant="secondary" className="flex-1 text-sm py-2" onClick={() => navigator.clipboard.writeText(shareUrl)}>COPY LINK</PixelButton>
                     <PixelButton variant="primary" className="flex-1 text-sm py-2 bg-[#25D366] hover:bg-[#20b858] border-[#128C7E]" onClick={handleShare}>WHATSAPP</PixelButton>
                  </div>
                </PixelPanel>
              </div>
            </motion.div>
          )}

          {activeTab !== 'HUB' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center border-4 border-slate-800 bg-slate-900/50 border-dashed pixel-corners h-[500px]">
              <span className="text-5xl mb-6 grayscale opacity-50">🚧</span>
              <h2 className="font-pixel text-slate-500 text-3xl tracking-widest uppercase mb-2">AREA LOCKED</h2>
              <p className="text-slate-600 font-sans text-center max-w-sm">This sector of the campus will unlock as the simulation progresses.</p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
