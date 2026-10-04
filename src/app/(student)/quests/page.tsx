'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelButton from '@/components/ui/PixelButton';

const QUESTS = [
  { id: 1, title: 'ENTER WORLD', status: 'completed', xp: 50, desc: 'Initialize connection to the digital campus.' },
  { id: 2, title: 'BUILD PROFILE', status: 'completed', xp: 100, desc: 'Create your AI Explorer identity.' },
  { id: 3, title: 'BUILD YOUR CREW', status: 'active', xp: 300, desc: 'Invite 3 peers to join your network.' },
  { id: 4, title: 'PREPARE FOR WORKSHOP', status: 'locked', xp: 150, desc: 'Complete the pre-workshop setup.' },
  { id: 5, title: 'WORKSHOP READY', status: 'locked', xp: 100, desc: 'System check passed.' },
  { id: 6, title: 'ATTEND WORKSHOP', status: 'locked', xp: 500, desc: 'Join the live 60-minute session.' },
  { id: 7, title: 'START PROJECT', status: 'locked', xp: 200, desc: 'Initialize project lab repository.' },
  { id: 8, title: 'BUILD PROJECT', status: 'locked', xp: 400, desc: 'Deploy first AI agent.' },
  { id: 9, title: 'SHIP', status: 'locked', xp: 1000, desc: 'Global deployment complete.' }
];

export default function QuestsPage() {
  const [selectedQuest, setSelectedQuest] = useState<number | null>(3); // Default to active

  return (
    <div className="w-full h-full flex flex-col relative z-10 p-4 md:p-8 pb-20 md:pb-8 overflow-y-auto overflow-x-hidden scrollbar-hide">
      
      <div className="shrink-0 mb-6 z-20">
        <h1 className="text-3xl font-pixel text-white tracking-widest mb-2 uppercase drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">QUEST MAP</h1>
        <p className="text-xs text-blue-300 font-pixel tracking-widest uppercase opacity-80">CAMPUS PROGRESSION // TRACKING</p>
      </div>

      <div className="flex-1 w-full flex flex-col xl:flex-row gap-6 h-full relative">
        
        {/* LEFT: THE MAP WORLD */}
        <div className="flex-1 min-h-[600px] bg-slate-950/60 backdrop-blur-sm border border-slate-700 relative overflow-hidden flex items-center justify-center p-8 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
          {/* Map Grid Background */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020617_100%)] pointer-events-none" />

          {/* Node Container (Scrollable/Pannable conceptually, just flex here) */}
          <div className="relative w-full max-w-2xl h-full flex flex-col justify-between py-10 z-10">
            
            {/* The underlying path line */}
            <div className="absolute left-1/2 top-10 bottom-10 w-2 bg-slate-800 -translate-x-1/2 rounded-none z-0">
               {/* Activated path line (fills up to active node) */}
               <div className="w-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" style={{ height: '25%' }} />
            </div>

            {QUESTS.map((quest, index) => {
              const isEven = index % 2 === 0;
              const isCompleted = quest.status === 'completed';
              const isActive = quest.status === 'active';
              const isLocked = quest.status === 'locked';

              return (
                <div key={quest.id} className="relative z-10 flex items-center justify-center w-full group">
                  
                  {/* Left Label (if even) */}
                  <div className={`w-1/2 flex justify-end pr-8 ${isEven ? '' : 'invisible'}`}>
                    <div className={`text-right ${isActive ? 'animate-pulse' : ''}`}>
                      <div className={`font-pixel text-xs tracking-widest uppercase ${isCompleted ? 'text-blue-400' : isActive ? 'text-emerald-400' : 'text-slate-600'}`}>{quest.title}</div>
                      <div className={`font-pixel text-[8px] tracking-widest uppercase mt-1 ${isCompleted ? 'text-blue-600' : isActive ? 'text-emerald-600' : 'text-slate-700'}`}>{quest.status}</div>
                    </div>
                  </div>

                  {/* Node */}
                  <button 
                    onClick={() => setSelectedQuest(quest.id)}
                    className={`relative w-8 h-8 flex items-center justify-center transition-transform hover:scale-125 focus:outline-none 
                      ${isCompleted ? 'bg-blue-600 border-2 border-blue-300 shadow-[0_0_20px_#3b82f6]' : 
                        isActive ? 'bg-emerald-500 border-2 border-emerald-200 shadow-[0_0_30px_#10b981] animate-pulse' : 
                        'bg-slate-800 border-2 border-slate-600'}`}
                    style={{ transform: 'rotate(45deg)' }}
                  >
                     <div className={`w-3 h-3 bg-white/50`} />
                  </button>

                  {/* Right Label (if odd) */}
                  <div className={`w-1/2 flex justify-start pl-8 ${!isEven ? '' : 'invisible'}`}>
                    <div className={`text-left ${isActive ? 'animate-pulse' : ''}`}>
                      <div className={`font-pixel text-xs tracking-widest uppercase ${isCompleted ? 'text-blue-400' : isActive ? 'text-emerald-400' : 'text-slate-600'}`}>{quest.title}</div>
                      <div className={`font-pixel text-[8px] tracking-widest uppercase mt-1 ${isCompleted ? 'text-blue-600' : isActive ? 'text-emerald-600' : 'text-slate-700'}`}>{quest.status}</div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: DETAILS PANEL */}
        <div className="w-full xl:w-96 shrink-0 flex flex-col h-full">
          <AnimatePresence mode="wait">
            {selectedQuest !== null && (
              <motion.div 
                key={selectedQuest}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full bg-slate-900/90 border border-slate-700 backdrop-blur-md p-6 shadow-xl flex flex-col"
              >
                {(() => {
                  const q = QUESTS.find(x => x.id === selectedQuest);
                  if (!q) return null;
                  
                  const isCompleted = q.status === 'completed';
                  const isActive = q.status === 'active';
                  
                  return (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                        <span className={`font-pixel text-[10px] tracking-widest px-2 py-1 uppercase ${
                          isCompleted ? 'bg-blue-900/50 text-blue-400 border border-blue-700' : 
                          isActive ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700' : 
                          'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}>
                          {q.status}
                        </span>
                        <span className="font-pixel text-amber-400 text-xs">+{q.xp} XP</span>
                      </div>
                      
                      <h2 className="font-pixel text-2xl text-white tracking-widest uppercase mb-4 leading-tight drop-shadow-md">{q.title}</h2>
                      
                      <div className="flex-1">
                        <p className="font-pixel text-slate-400 text-[10px] sm:text-xs leading-loose tracking-widest uppercase mb-8">
                          {q.desc}
                        </p>

                        {isActive && (
                           <div className="p-4 border border-emerald-500/30 bg-emerald-900/10">
                             <div className="font-pixel text-[10px] text-emerald-500 mb-2 tracking-widest uppercase">CURRENT OBJECTIVE</div>
                             <div className="w-full h-2 bg-slate-800 mb-2">
                               <div className="h-full bg-emerald-500" style={{ width: '33%' }} />
                             </div>
                             <div className="font-pixel text-[8px] text-slate-400 text-right">1 / 3 CONNECTED</div>
                           </div>
                        )}
                        {isCompleted && (
                           <div className="p-4 border border-blue-500/30 bg-blue-900/10 flex items-center justify-center">
                             <div className="font-pixel text-xs text-blue-400 tracking-widest uppercase animate-pulse">VERIFIED</div>
                           </div>
                        )}
                        {q.status === 'locked' && (
                           <div className="p-4 border border-slate-700/50 bg-slate-800/30 flex items-center justify-center">
                             <div className="font-pixel text-xs text-slate-500 tracking-widest uppercase">ENCRYPTED</div>
                           </div>
                        )}
                      </div>

                      {isActive && (
                        <div className="mt-auto">
                          <PixelButton variant="primary" className="w-full text-xs py-4">PROCEED</PixelButton>
                        </div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
