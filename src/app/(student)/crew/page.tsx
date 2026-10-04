'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CharacterRenderer from '@/components/character/CharacterRenderer';
import PixelButton from '@/components/ui/PixelButton';

type CrewMember = { id: string; name: string; joinedAt: string; state: string; projectStep: number };
type CrewData = {
  impact: number;
  inviter: { name: string; level: number; character?: any } | null;
  crewMembers: CrewMember[];
};

export default function MyCrewPage() {
  const [copied, setCopied] = useState(false);
  const [crewData, setCrewData] = useState<CrewData | null>(null);
  
  const referralCode = typeof window !== 'undefined' ? localStorage.getItem('growthos_referral_code') || 'NXTWAVE100' : 'NXTWAVE100';
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/join/${referralCode}` : '';

  useEffect(() => {
    let isMounted = true;
    const fetchCrew = async () => {
      const userId = localStorage.getItem('growthos_user_id');
      if (!userId) return;
      try {
        const res = await fetch(`/api/crew?userId=${userId}`);
        if (!res.ok) throw new Error('Fetch failed');
        const { data } = await res.json();
        if (isMounted && data) setCrewData(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCrew();
    return () => { isMounted = false; };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock data for the network visualization to look rich
  const centerNode = { name: typeof window !== 'undefined' ? localStorage.getItem('growthos_explorer_name') || 'YOU' : 'YOU' };
  
  // Fake positions for crew members around the center (radius ~150px)
  const angleStep = crewData?.crewMembers.length ? (2 * Math.PI) / Math.max(1, crewData.crewMembers.length) : 0;

  return (
    <div className="w-full h-full flex flex-col relative z-10 p-4 md:p-8 pb-20 md:pb-8 overflow-y-auto overflow-x-hidden scrollbar-hide">
      
      <div className="shrink-0 mb-6 z-20 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-pixel text-white tracking-widest mb-2 uppercase drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">MY CREW</h1>
          <p className="text-xs text-blue-300 font-pixel tracking-widest uppercase opacity-80">SOCIAL NETWORK TOPOLOGY</p>
        </div>
        <div className="hidden md:flex gap-4 items-center bg-slate-900/80 border border-slate-700 p-2 pl-4">
           <div className="font-pixel text-[10px] text-slate-400">NETWORK SIGNAL:</div>
           <div className="font-pixel text-xs text-cyan-400 select-all">{shareUrl}</div>
           <PixelButton variant="primary" onClick={handleCopy} className="text-[10px] px-4 py-2">
             {copied ? 'COPIED' : 'COPY'}
           </PixelButton>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col xl:flex-row gap-6 h-full relative">
        
        {/* LEFT: NETWORK IMPACT & ORIGIN */}
        <div className="w-full xl:w-80 shrink-0 flex flex-col gap-6 h-full">
          
          {/* WHO BROUGHT ME */}
          <div className="bg-slate-900/90 border border-slate-700 p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
             <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
             <h3 className="font-pixel text-xs text-emerald-400 tracking-widest uppercase mb-4">ORIGIN SIGNAL</h3>
             {crewData?.inviter ? (
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-slate-800 border-2 border-emerald-500/50 flex items-center justify-center relative overflow-hidden">
                   {/* Simplified avatar representation */}
                   <CharacterRenderer config={crewData.inviter.character} size="sm" animating={false} className="scale-75" />
                 </div>
                 <div>
                   <div className="font-pixel text-white text-sm tracking-widest">{crewData.inviter.name}</div>
                   <div className="font-pixel text-[10px] text-slate-400 mt-1">LEVEL {crewData.inviter.level}</div>
                 </div>
               </div>
             ) : (
               <div className="font-pixel text-[10px] text-slate-500 leading-relaxed uppercase">
                 You are a primary node. Your journey began with a direct connection to GrowthOS.
               </div>
             )}
          </div>

          {/* NETWORK IMPACT */}
          <div className="bg-slate-900/90 border border-slate-700 p-6 shadow-xl flex-1 flex flex-col">
             <h3 className="font-pixel text-xs text-blue-400 tracking-widest uppercase mb-6">NETWORK IMPACT</h3>
             
             <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="border border-slate-700 bg-slate-800/50 p-4 text-center">
                 <div className="font-pixel text-3xl text-white mb-2">{crewData?.crewMembers.length || 0}</div>
                 <div className="font-pixel text-[8px] text-slate-400 tracking-widest">DIRECT NODES</div>
               </div>
               <div className="border border-slate-700 bg-slate-800/50 p-4 text-center">
                 <div className="font-pixel text-3xl text-cyan-400 mb-2">{(crewData?.crewMembers.length || 0) * 2}</div>
                 <div className="font-pixel text-[8px] text-slate-400 tracking-widest">2ND DEGREE</div>
               </div>
             </div>

             <div className="flex-1">
               <h4 className="font-pixel text-[10px] text-slate-500 mb-4 tracking-widest">CREW ROSTER</h4>
               <div className="flex flex-col gap-2 overflow-y-auto pr-2 max-h-[300px]">
                 {crewData?.crewMembers.length ? crewData.crewMembers.map((member) => (
                   <div key={member.id} className="border border-slate-700 bg-slate-800/30 p-3 flex justify-between items-center group hover:bg-slate-800 transition-colors">
                     <div>
                       <div className="font-pixel text-xs text-white tracking-widest">{member.name}</div>
                       <div className="font-pixel text-[8px] text-slate-400 mt-1">{member.state}</div>
                     </div>
                     <div className="w-2 h-2 bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse" />
                   </div>
                 )) : (
                   <div className="text-center p-8 border border-slate-800 border-dashed">
                     <div className="font-pixel text-[10px] text-slate-500">NO ACTIVE SIGNALS</div>
                   </div>
                 )}
               </div>
             </div>
          </div>
        </div>

        {/* RIGHT: THE NETWORK GRAPH */}
        <div className="flex-1 min-h-[500px] bg-slate-950/60 backdrop-blur-sm border border-slate-700 relative overflow-hidden flex items-center justify-center p-8 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none z-10" />

          <div className="relative w-full h-full max-w-2xl max-h-2xl flex items-center justify-center z-20">
            
            {/* CENTRAL NODE (YOU) */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="absolute z-30 w-24 h-24 bg-blue-900 border-2 border-blue-400 shadow-[0_0_30px_#3b82f6] flex flex-col items-center justify-center"
              style={{ transform: 'rotate(45deg)' }}
            >
              <div style={{ transform: 'rotate(-45deg)' }} className="flex flex-col items-center">
                 <div className="font-pixel text-white text-sm tracking-widest">{centerNode.name}</div>
                 <div className="font-pixel text-[8px] text-blue-300 mt-1">NODE 0</div>
              </div>
            </motion.div>

            {/* CREW NODES */}
            {crewData?.crewMembers.map((member, idx) => {
              const angle = idx * angleStep;
              const radius = 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div key={member.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Connecting Line (drawn using SVG) */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible z-10">
                    <line x1="50%" y1="50%" x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} stroke="#0ea5e9" strokeWidth="2" strokeOpacity="0.4" strokeDasharray="4 4" />
                    {/* Animated signal pulse along the line */}
                    <circle r="3" fill="#38bdf8" className="animate-[signalTravel_2s_linear_infinite]">
                      <animateMotion path={`M 0,0 L ${x},${y}`} dur="3s" repeatCount="indefinite" />
                    </circle>
                  </svg>

                  {/* The Crew Node */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (idx * 0.1), type: "spring" }}
                    className="absolute z-20 w-16 h-16 bg-slate-900 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex flex-col items-center justify-center pointer-events-auto hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] cursor-pointer"
                    style={{ transform: `translate(${x}px, ${y}px) rotate(45deg)` }}
                  >
                    <div style={{ transform: 'rotate(-45deg)' }} className="flex flex-col items-center">
                       <div className="w-6 h-6 bg-slate-800 border border-slate-600 mb-1" />
                       <div className="font-pixel text-white text-[8px] tracking-widest">{member.name.substring(0, 8)}</div>
                    </div>
                  </motion.div>
                </div>
              );
            })}

            {/* Empty state decorative rings if no crew */}
            {(!crewData?.crewMembers || crewData.crewMembers.length === 0) && (
              <>
                <div className="absolute w-64 h-64 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-96 h-96 border border-blue-500/10 rounded-full border-dashed animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute z-40 mt-40 bg-slate-900 border border-slate-700 px-4 py-2">
                   <div className="font-pixel text-[10px] text-slate-400 tracking-widest text-center">NO SIGNALS DETECTED. SHARE YOUR LINK.</div>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
