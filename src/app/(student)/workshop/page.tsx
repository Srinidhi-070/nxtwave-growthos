'use client';

import { useState, useEffect } from 'react';
import PixelButton from '@/components/ui/PixelButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkshopPage() {
  const [isLive, setIsLive] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<{user: string, text: string, type?: 'system' | 'user'}[]>([
    { user: 'SYSTEM', text: 'TERMINAL CONNECTION ESTABLISHED.', type: 'system' },
    { user: 'SYSTEM', text: 'AWAITING TRANSMISSION...', type: 'system' }
  ]);
  const [countdown, setCountdown] = useState({ days: 2, hours: 14, minutes: 30, seconds: 45 });
  
  // Fake countdown tick
  useEffect(() => {
    if (isLive) return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) {
           setIsLive(true); // Auto-live
           return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isLive]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const explorerName = localStorage.getItem('growthos_explorer_name') || 'YOU';
    setMessages([...messages, { user: explorerName, text: chatMessage, type: 'user' }]);
    setChatMessage('');
  };

  return (
    <div className="w-full h-full flex flex-col relative z-10 p-4 md:p-8 pb-20 md:pb-8 overflow-y-auto overflow-x-hidden scrollbar-hide">
      
      <div className="shrink-0 mb-6 z-20 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-pixel text-white tracking-widest mb-2 uppercase drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">WORKSHOP HALL</h1>
          <p className="text-xs font-pixel tracking-widest uppercase opacity-80 flex items-center gap-2">
             STATUS: 
             {isLive ? (
               <span className="text-emerald-400 animate-pulse flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> TRANSMITTING</span>
             ) : (
               <span className="text-amber-400 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" /> STANDBY</span>
             )}
          </p>
        </div>
        <button onClick={() => setIsLive(!isLive)} className="font-pixel text-[8px] text-slate-600 hover:text-slate-400 uppercase">
           [DEV: FORCE {isLive ? 'STANDBY' : 'LIVE'}]
        </button>
      </div>

      <div className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          
          {!isLive ? (
            /* --- PRE-EVENT STATE (OUTSIDE THE HALL) --- */
            <motion.div 
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md border border-slate-700 p-8 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Massive closed vault doors */}
              <div className="absolute inset-0 flex">
                 <div className="w-1/2 h-full bg-slate-900 border-r-4 border-slate-700 shadow-[inset_-20px_0_50px_rgba(0,0,0,0.5)] flex items-center justify-end pr-4">
                    <div className="w-8 h-32 bg-slate-800 border border-slate-600 rounded-l-md" />
                 </div>
                 <div className="w-1/2 h-full bg-slate-900 border-l-4 border-slate-700 shadow-[inset_20px_0_50px_rgba(0,0,0,0.5)] flex items-center justify-start pl-4">
                    <div className="w-8 h-32 bg-slate-800 border border-slate-600 rounded-r-md" />
                 </div>
              </div>
              
              {/* Holographic Countdown Projection */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                 <div className="font-pixel text-blue-400 text-sm tracking-widest uppercase mb-8 animate-pulse text-shadow-glow-blue">
                   WORKSHOP DOORS OPEN IN
                 </div>
                 
                 <div className="flex gap-4 md:gap-8">
                   {[
                     { label: 'DAYS', val: countdown.days },
                     { label: 'HOURS', val: countdown.hours },
                     { label: 'MINUTES', val: countdown.minutes },
                     { label: 'SECONDS', val: countdown.seconds }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col items-center">
                       <div className="bg-slate-950 border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)] p-4 md:p-6 mb-2">
                         <span className="font-pixel text-4xl md:text-6xl text-white tracking-widest text-shadow-glow-cyan">
                           {item.val.toString().padStart(2, '0')}
                         </span>
                       </div>
                       <span className="font-pixel text-[10px] text-cyan-400 tracking-widest uppercase">{item.label}</span>
                     </div>
                   ))}
                 </div>

                 <div className="mt-16 w-full max-w-md bg-slate-900 border border-slate-700 p-4 relative">
                   <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500" />
                   <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500" />
                   <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500" />
                   <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500" />
                   <div className="font-pixel text-[10px] text-slate-400 leading-relaxed text-center uppercase">
                     Ensure your system meets the requirements. Your AI environment must be initialized before entry.
                   </div>
                 </div>
              </div>
            </motion.div>
          ) : (
            /* --- LIVE STATE (INSIDE THE HALL) --- */
            <motion.div 
              key="live"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex flex-col lg:flex-row gap-6"
            >
               {/* MAIN STREAM VIEW */}
               <div className="flex-1 bg-black border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden flex flex-col">
                 <div className="absolute top-4 left-4 z-20 bg-emerald-500 text-black font-pixel text-[10px] px-2 py-1 tracking-widest flex items-center gap-2">
                   <div className="w-2 h-2 bg-black animate-ping" /> LIVE
                 </div>
                 
                 {/* Fake Video Stream */}
                 <div className="flex-1 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#020617_0%,#000000_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50" />
                    <div className="relative z-10 flex flex-col items-center justify-center opacity-30">
                       <div className="w-32 h-32 border-4 border-slate-700 rounded-full flex items-center justify-center mb-4">
                         <div className="w-16 h-16 border-4 border-slate-600 rounded-full animate-ping" />
                       </div>
                       <div className="font-pixel text-xl tracking-widest text-slate-500 uppercase">AWAITING VIDEO SIGNAL</div>
                    </div>
                 </div>
                 
                 <div className="h-12 bg-slate-900 border-t border-slate-800 flex items-center px-4 justify-between">
                    <div className="flex gap-4">
                      <div className="w-4 h-4 bg-slate-700 rounded-full" />
                      <div className="w-32 h-2 bg-slate-700 rounded-full my-auto" />
                    </div>
                    <div className="font-pixel text-[10px] text-slate-500">CC EN</div>
                 </div>
               </div>

               {/* CHAT TERMINAL */}
               <div className="w-full lg:w-96 shrink-0 bg-slate-900/90 border border-slate-700 shadow-xl flex flex-col">
                 <div className="h-12 border-b border-slate-700 flex items-center px-4 bg-slate-950">
                    <div className="font-pixel text-xs text-blue-400 tracking-widest">COMMS TERMINAL</div>
                 </div>
                 
                 <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 font-pixel text-[10px] tracking-wider leading-relaxed">
                   {messages.map((m, i) => (
                     <div key={i} className={`flex gap-2 ${m.type === 'system' ? 'text-cyan-400' : 'text-slate-300'}`}>
                       <span className={`shrink-0 ${m.type === 'system' ? 'text-cyan-500' : 'text-emerald-400'}`}>[{m.user}]:</span>
                       <span className="break-words">{m.text}</span>
                     </div>
                   ))}
                 </div>
                 
                 <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 bg-slate-950 flex gap-2">
                    <input 
                      type="text" 
                      value={chatMessage}
                      onChange={e => setChatMessage(e.target.value.toUpperCase())}
                      placeholder="ENTER MESSAGE..." 
                      className="flex-1 bg-transparent border border-slate-700 px-3 py-2 font-pixel text-[10px] text-white focus:outline-none focus:border-blue-500"
                    />
                    <PixelButton type="submit" variant="primary" className="text-[10px] px-4 py-2 shrink-0">SEND</PixelButton>
                 </form>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
