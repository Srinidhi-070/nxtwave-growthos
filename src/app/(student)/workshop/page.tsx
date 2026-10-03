'use client';

import { useState, useEffect } from 'react';
import PixelPanel from '@/components/ui/PixelPanel';

export default function WorkshopPage() {
  const [timeLeft, setTimeLeft] = useState('');
  const [stats, setStats] = useState({ capacity: 500, registered: 0, remaining: 500, isWaitlist: false });
  
  useEffect(() => {
    // Stats fetch
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats/workshop');
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

  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
      <div className="shrink-0 mb-4">
        <h1 className="text-3xl lg:text-5xl font-pixel text-white tracking-widest mb-4 uppercase leading-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          BUILD YOUR FIRST <br/><span className="text-blue-400">AI PROJECT</span>
        </h1>
        <h2 className="text-xl font-pixel text-slate-300 uppercase tracking-widest">IN 60 MINUTES</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Info & Countdown */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <PixelPanel className="bg-blue-900/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <h3 className="font-pixel text-sm text-blue-400 mb-6 tracking-widest uppercase text-center">WORKSHOP STARTS IN</h3>
            <div className="text-3xl lg:text-5xl font-pixel text-white text-center mb-4 tracking-widest">
              {timeLeft || '00D 00H 00M 00S'}
            </div>
          </PixelPanel>

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
                <div className="bg-slate-950 p-3 border border-slate-800 pixel-corners">
                  <div className="font-pixel text-blue-400 text-xs mb-1">COST</div>
                  <div className="font-bold text-white">Free</div>
                </div>
                <div className="bg-slate-950 p-3 border border-slate-800 pixel-corners">
                  <div className="font-pixel text-blue-400 text-xs mb-1">TARGET</div>
                  <div className="font-bold text-white">Final-Year Engg.</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-pixel text-white text-xs mb-3 tracking-widest uppercase">MODULES</h4>
                <div className="space-y-2 font-pixel text-[10px] text-slate-400 tracking-wider">
                   <div className="flex justify-between border-b border-slate-800 pb-2"><span>01 INTRO</span> <span>10 MIN</span></div>
                   <div className="flex justify-between border-b border-slate-800 pb-2"><span>02 IDEA & ARCHITECTURE</span> <span>15 MIN</span></div>
                   <div className="flex justify-between border-b border-slate-800 pb-2"><span>03 BUILD & INTEGRATE AI</span> <span>25 MIN</span></div>
                   <div className="flex justify-between border-b border-slate-800 pb-2"><span>04 SHIP TO PRODUCTION</span> <span>10 MIN</span></div>
                </div>
              </div>
            </div>
          </PixelPanel>
        </div>

        {/* Right Col: Prep Checklist & Capacity */}
        <div className="col-span-1 space-y-6">
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
             
             {stats.isWaitlist && (
               <div className="mt-6 border border-red-900 bg-red-950 p-3 pixel-corners text-center">
                 <div className="text-xs text-red-400 font-pixel uppercase tracking-widest mb-1">WAITLIST ACTIVE</div>
                 <div className="text-[10px] text-red-300/70 font-sans">Standard registration is closed. Only priority crew invites bypass the waitlist.</div>
               </div>
             )}
          </PixelPanel>

          <PixelPanel title="PREP CHECKLIST" className="bg-slate-900 border-slate-800 h-full">
             <div className="space-y-4">
               {[
                 { id: 1, text: 'Create GrowthOS account', done: true },
                 { id: 2, text: 'Complete your explorer', done: true },
                 { id: 3, text: 'Invite your crew', done: false },
                 { id: 4, text: 'Save the workshop link', done: false },
                 { id: 5, text: 'Prepare your dev environment', done: false },
               ].map(task => (
                 <div key={task.id} className="flex items-start gap-3">
                   <div className={`w-5 h-5 mt-0.5 border-2 flex items-center justify-center shrink-0 pixel-corners transition-colors ${task.done ? 'bg-green-500 border-green-500' : 'bg-slate-950 border-slate-600'}`}>
                     {task.done && <span className="text-slate-900 text-xs font-bold">✓</span>}
                   </div>
                   <div className={`text-sm font-sans ${task.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                     {task.text}
                   </div>
                 </div>
               ))}
             </div>
          </PixelPanel>
        </div>

      </div>
    </div>
  );
}
