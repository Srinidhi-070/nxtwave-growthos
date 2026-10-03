'use client';

import { useState, useEffect } from 'react';
import PixelPanel from '@/components/ui/PixelPanel';
import PixelButton from '@/components/ui/PixelButton';
import QRCode from 'react-qr-code';

type CrewMember = { id: string; name: string; joinedAt: string; state: string; projectStep: number };
type CrewData = {
  impact: number;
  inviter: { name: string; level: number } | null;
  crewMembers: CrewMember[];
};

export default function MyCrewPage() {
  const [copied, setCopied] = useState(false);
  const [crewData, setCrewData] = useState<CrewData | null>(null);
  
  const referralCode = typeof window !== 'undefined' ? localStorage.getItem('growthos_referral_code') || 'NXTWAVE100' : 'NXTWAVE100';
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/join/${referralCode}` : '';

  useEffect(() => {
    const fetchCrew = async () => {
      const userId = localStorage.getItem('growthos_user_id');
      if (!userId) return;
      try {
        const res = await fetch(`/api/crew?userId=${userId}`);
        const { data } = await res.json();
        if (data) setCrewData(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCrew();
  }, []);

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
            <div className="text-4xl font-pixel text-white mb-2">{crewData ? crewData.impact : 0}</div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Your measurable contribution to the GrowthOS network, calculated via direct invites, second-degree growth, and crew activity.
            </p>
          </PixelPanel>

          {crewData?.inviter ? (
            <PixelPanel title="WHO BROUGHT ME" className="bg-slate-900 border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 border-2 border-slate-700 pixel-corners flex items-center justify-center shrink-0">
                   <div className="w-6 h-6 bg-blue-500 pixel-corners" />
                </div>
                <div>
                  <div className="font-pixel text-white uppercase tracking-wider text-sm">{crewData.inviter.name}</div>
                  <div className="text-xs text-blue-400 font-pixel">AI EXPLORER LVL {crewData.inviter.level.toString().padStart(2, '0')}</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-500 font-sans">Joined through their signal.</div>
            </PixelPanel>
          ) : (
             <PixelPanel title="WHO BROUGHT ME" className="bg-slate-900 border-slate-800">
               <div className="text-xs text-slate-500 font-sans">You entered the network independently.</div>
             </PixelPanel>
          )}

          <PixelPanel title="MILESTONE REWARD" className="bg-slate-900 border-yellow-700/50 relative overflow-hidden">
             {/* bg glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full" />
             
             <div className="relative z-10">
               <div className="font-pixel text-yellow-500 mb-2 uppercase text-xs tracking-widest flex items-center gap-2">
                 <span>⭐</span> AI STARTER PACK
               </div>
               <p className="text-xs text-slate-400 font-sans mb-4">
                 Invite 3 friends to your crew to unlock an exclusive bundle of premium AI APIs and project templates.
               </p>
               
               {/* Progress bar */}
               <div className="flex gap-2 w-full mb-2">
                 {[1, 2, 3].map(step => (
                   <div key={step} className={`h-2 flex-1 pixel-corners transition-colors ${crewData && crewData.crewMembers.length >= step ? 'bg-yellow-500' : 'bg-slate-800'}`} />
                 ))}
               </div>
               
               <div className="flex justify-between text-[10px] font-pixel text-slate-500">
                 <span>{crewData ? Math.min(crewData.crewMembers.length, 3) : 0}/3 REFERRED</span>
                 {crewData && crewData.crewMembers.length >= 3 ? (
                   <span className="text-yellow-400 animate-pulse">UNLOCKED!</span>
                 ) : (
                   <span>LOCKED</span>
                 )}
               </div>
               
               {crewData && crewData.crewMembers.length >= 3 && (
                 <PixelButton variant="primary" className="w-full mt-4 text-xs !bg-yellow-600 !text-white hover:!bg-yellow-500">
                   CLAIM REWARD
                 </PixelButton>
               )}
             </div>
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
              
              {crewData?.crewMembers.length === 0 && (
                 <div className="text-slate-500 font-sans text-sm text-center py-8">
                   No one has joined your crew yet. Share your signal link!
                 </div>
              )}

              {crewData?.crewMembers.map(member => (
                <div key={member.id} className="border border-slate-800 bg-slate-950 p-4 pixel-corners cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 pixel-corners flex items-center justify-center shrink-0" />
                      <div>
                        <div className="font-pixel text-white uppercase text-sm tracking-widest">{member.name}</div>
                        <div className="text-xs text-slate-500 font-sans">
                          {new Date(member.joinedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className={`text-[10px] font-pixel px-2 py-1 uppercase ${
                      member.state === 'SHIPPED' ? 'text-purple-400 border border-purple-900 bg-purple-950' : 
                      member.state === 'PROJECT_STARTED' ? 'text-green-400 border border-green-900 bg-green-950' :
                      'text-blue-400 border border-blue-900 bg-blue-950'
                    }`}>
                      {member.state.replace('_', ' ')}
                    </div>
                  </div>
                  {/* Lifecycle Bar */}
                  <div className="flex gap-1 h-2 w-full mt-4">
                    <div className="flex-1 bg-blue-500" title="Invited" />
                    <div className="flex-1 bg-blue-500" title="Registered" />
                    <div className={`flex-1 ${member.projectStep >= 1 ? 'bg-green-500' : 'bg-slate-800'}`} title="Project Started" />
                    <div className={`flex-1 ${member.projectStep >= 3 ? 'bg-green-500' : 'bg-slate-800'}`} title="Building" />
                    <div className={`flex-1 ${member.projectStep === 5 ? 'bg-purple-500' : 'bg-slate-800'}`} title="Shipped" />
                  </div>
                </div>
              ))}

            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
               <h3 className="font-pixel text-xs text-slate-400 mb-4 tracking-widest uppercase">SECOND-DEGREE CONNECTIONS</h3>
               
               <div className="bg-slate-950 border border-slate-800 p-4 pixel-corners flex items-center gap-4">
                 <div className="text-blue-500 font-pixel text-2xl">⚡</div>
                 <div>
                   <div className="font-pixel text-sm text-white uppercase mb-1">CHAIN REACTION</div>
                   <div className="text-xs text-slate-400 font-sans">Your crew will trigger second-degree network effects.</div>
                 </div>
               </div>
            </div>

          </PixelPanel>
        </div>
      </div>
    </div>
  );
}
