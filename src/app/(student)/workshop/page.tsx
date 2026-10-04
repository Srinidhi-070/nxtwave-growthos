'use client';

import { useState, useEffect } from 'react';
import PixelPanel from '@/components/ui/PixelPanel';
import PixelButton from '@/components/ui/PixelButton';

export default function WorkshopPage() {
  const [timeLeft, setTimeLeft] = useState('');
  const [stats, setStats] = useState({ capacity: 500, registered: 0, remaining: 500, isWaitlist: false });
  const [forceLive, setForceLive] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<{user: string, text: string}[]>([
    { user: 'SYSTEM', text: 'Terminal connection established.' },
    { user: 'SYSTEM', text: 'Waiting for transmission...' }
  ]);
  
  useEffect(() => {
    // Stats fetch
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats/workshop');
        if (!res.ok) throw new Error('Fetch failed');
        const { data } = await res.json();
        if (data) setStats(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStats();

    // Hardcoded target for demo: 3 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft('LIVE NOW');
        clearInterval(interval);
        return;
      }
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${d.toString().padStart(2, '0')}D ${h.toString().padStart(2, '0')}H ${m.toString().padStart(2, '0')}M ${s.toString().padStart(2, '0')}S`);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const isLive = forceLive || timeLeft === 'LIVE NOW';

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const name = localStorage.getItem('growthos_explorer_name') || 'Explorer';
    setMessages([...messages, { user: name, text: chatMessage }]);
    setChatMessage('');
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-12 relative">
      {/* Dev Toggle */}
      <button 
        onClick={() => setForceLive(!forceLive)}
        className="absolute top-0 right-0 z-50 text-[8px] bg-red-900 text-white px-2 py-1 opacity-20 hover:opacity-100 transition-opacity"
      >
        DEV: TOGGLE LIVE
      </button>

      <div className="shrink-0 mb-4">
        <h1 className="text-3xl lg:text-5xl font-pixel text-white tracking-widest mb-4 uppercase leading-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          {isLive ? (
            <span className="text-red-500 animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">LIVE TRANSMISSION</span>
          ) : (
            <>BUILD YOUR FIRST <br/><span className="text-blue-400">AI PROJECT</span></>
          )}
        </h1>
        {!isLive && <h2 className="text-xl font-pixel text-slate-300 uppercase tracking-widest">IN 60 MINUTES</h2>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Main Content */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          {isLive ? (
            <PixelPanel className="bg-slate-950 border-red-900 p-0 overflow-hidden relative shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-950/80 px-3 py-1 border border-red-900 pixel-corners">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                 <span className="text-[10px] font-pixel text-red-400 uppercase tracking-widest">LIVE</span>
              </div>
              
              {/* Mock Video Player */}
              <div className="w-full aspect-video bg-black flex items-center justify-center relative">
                 <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10" />
                 <div className="font-pixel text-slate-600 animate-pulse">CONNECTING TO VIDEO STREAM...</div>
                 
                 {/* Fake play controls */}
                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end px-4 pb-2 z-20">
                    <div className="w-full flex items-center justify-between">
                       <div className="flex gap-4">
                         <div className="w-3 h-3 bg-white" />
                         <div className="w-24 h-1 bg-blue-500 my-auto" />
                       </div>
                       <div className="text-[10px] font-pixel text-white">1080P</div>
                    </div>
                 </div>
              </div>
            </PixelPanel>
          ) : (
            <PixelPanel className="bg-blue-900/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
              <h3 className="font-pixel text-sm text-blue-400 mb-6 tracking-widest uppercase text-center">WORKSHOP STARTS IN</h3>
              <div className="text-3xl lg:text-5xl font-pixel text-white text-center mb-4 tracking-widest">
                {timeLeft || '00D 00H 00M 00S'}
              </div>
            </PixelPanel>
          )}

          {!isLive && (
            <PixelPanel title="MISSION BRIEFING" className="bg-slate-900 border-slate-800">
              <div className="space-y-6 text-slate-300 font-sans text-sm leading-relaxed">
                <p>
                  Welcome to the GrowthOS digital campus. In this intensive 60-minute session, you will go from zero to deploying your first AI-powered application. 
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 border border-slate-800 pixel-corners">
                    <div className="font-pixel text-blue-400 text-xs mb-1">FORMAT</div>
                    <div className="font-bold text-white">Online, Live</div>
                  </div>
                  <div className="bg-slate-950 p-3 border border-slate-800 pixel-corners">
                    <div className="font-pixel text-blue-400 text-xs mb-1">DURATION</div>
                    <div className="font-bold text-white">60 Minutes</div>
                  </div>
                </div>
              </div>
            </PixelPanel>
          )}
        </div>

        {/* Right Col */}
        <div className="col-span-1 space-y-6 h-full flex flex-col">
          {isLive ? (
            <PixelPanel title="TERMINAL CHAT" className="bg-slate-900 border-slate-800 flex-1 flex flex-col min-h-[400px]">
               <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 font-mono text-xs">
                 {messages.map((msg, i) => (
                   <div key={i} className="flex gap-2">
                     <span className={msg.user === 'SYSTEM' ? 'text-red-400' : 'text-blue-400'}>
                       [{msg.user}]
                     </span>
                     <span className="text-slate-300 break-words">{msg.text}</span>
                   </div>
                 ))}
               </div>
               
               <form onSubmit={sendChat} className="mt-auto pt-4 border-t border-slate-800 flex gap-2">
                 <input 
                   type="text" 
                   value={chatMessage}
                   onChange={e => setChatMessage(e.target.value)}
                   placeholder="> Execute command..."
                   aria-label="Terminal command input"
                   className="flex-1 bg-slate-950 border border-slate-700 px-3 py-2 text-xs font-mono text-green-400 outline-none focus:border-blue-500 transition-colors"
                 />
                 <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-3 font-pixel text-[10px] tracking-widest transition-colors">
                   SEND
                 </button>
               </form>
            </PixelPanel>
          ) : (
            <>
              <PixelPanel title="CAPACITY" className="bg-slate-900 border-slate-800">
                 <div className="text-center">
                   <div className="text-xs text-slate-500 font-pixel tracking-widest mb-2">SEATS REMAINING</div>
                   <div className={`text-4xl font-pixel mb-4 ${stats.remaining <= 10 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
                     {stats.remaining}
                   </div>
                   
                   <div className="w-full bg-slate-950 h-4 border border-slate-800 pixel-corners mb-2 relative">
                     <div 
                       className={`h-full transition-all duration-1000 ${stats.isWaitlist ? 'bg-red-500' : 'bg-blue-500'}`} 
                       style={{ width: `${Math.min((stats.registered / stats.capacity) * 100, 100)}%` }} 
                     />
                   </div>
                   <div className="text-[10px] text-slate-500 font-sans flex justify-between">
                     <span>{stats.registered} REGISTERED</span>
                     <span>{stats.capacity} MAX</span>
                   </div>
                 </div>
              </PixelPanel>

              <PixelPanel title="PREP CHECKLIST" className="bg-slate-900 border-slate-800 flex-1">
                 <div className="space-y-4">
                   {[
                     { id: 1, text: 'Create GrowthOS account', done: true },
                     { id: 2, text: 'Complete your explorer', done: true },
                     { id: 3, text: 'Invite your crew', done: false },
                     { id: 4, text: 'Prepare your dev environment', done: false },
                   ].map(task => (
                     <div key={task.id} className="flex items-start gap-3">
                       <div className={`w-5 h-5 mt-0.5 border-2 flex items-center justify-center shrink-0 pixel-corners transition-colors ${task.done ? 'bg-green-500 border-green-500' : 'bg-slate-950 border-slate-600'}`}>
                         {task.done && <span className="text-slate-900 text-xs font-bold">OK</span>}
                       </div>
                       <div className={`text-sm font-sans ${task.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                         {task.text}
                       </div>
                     </div>
                   ))}
                 </div>
              </PixelPanel>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

