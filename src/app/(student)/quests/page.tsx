'use client';

import PixelPanel from '@/components/ui/PixelPanel';

export default function QuestsPage() {
  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
      <div className="shrink-0 mb-2">
        <h1 className="text-3xl font-pixel text-white tracking-widest mb-1 uppercase">Quest Map</h1>
        <p className="text-sm text-slate-400 font-sans">Your progression graph through the GrowthOS ecosystem.</p>
      </div>

      <div className="relative w-full min-h-[600px] bg-slate-900 border-2 border-slate-700 pixel-corners p-8 flex items-center justify-center overflow-auto">
        
        {/* Simple CSS-based Graph Map */}
        <div className="flex flex-col items-center gap-12 relative w-[800px] pb-12">
           
           {/* Vertical Line connecting everything */}
           <div className="absolute top-10 bottom-10 left-1/2 w-1 bg-slate-800 -translate-x-1/2 z-0" />

           {/* Node 1 */}
           <div className="z-10 relative bg-green-950 border-2 border-green-500 pixel-corners p-4 w-64 text-center">
             <div className="absolute -left-3 -top-3 bg-green-500 text-slate-950 text-[10px] font-bold px-2 py-1 pixel-corners">COMPLETE</div>
             <h3 className="font-pixel text-green-400 uppercase tracking-widest mb-2">ENTER WORLD</h3>
             <p className="text-xs text-slate-400 font-sans">+100 XP</p>
           </div>

           {/* Node 2 */}
           <div className="z-10 relative bg-green-950 border-2 border-green-500 pixel-corners p-4 w-64 text-center">
             <div className="absolute -left-3 -top-3 bg-green-500 text-slate-950 text-[10px] font-bold px-2 py-1 pixel-corners">COMPLETE</div>
             <h3 className="font-pixel text-green-400 uppercase tracking-widest mb-2">BUILD PROFILE</h3>
             <p className="text-xs text-slate-400 font-sans">+50 XP</p>
           </div>

           {/* Branching Nodes */}
           <div className="flex w-full justify-center gap-32 relative z-10">
             {/* Branch line */}
             <div className="absolute top-1/2 left-[25%] right-[25%] h-1 bg-slate-800 -z-10" />
             
             <div className="relative bg-blue-950 border-2 border-blue-500 pixel-corners p-4 w-64 text-center animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.3)]">
               <div className="absolute -left-3 -top-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 pixel-corners">ACTIVE</div>
               <h3 className="font-pixel text-blue-400 uppercase tracking-widest mb-2">BUILD YOUR CREW</h3>
               <p className="text-xs text-slate-400 font-sans">Invite 3 peers to the network.</p>
               <p className="text-[10px] text-blue-300 font-pixel mt-2 border-t border-blue-800 pt-2">0/3 COMPLETE</p>
             </div>

             <div className="relative bg-slate-950 border-2 border-slate-700 pixel-corners p-4 w-64 text-center opacity-80">
               <h3 className="font-pixel text-slate-400 uppercase tracking-widest mb-2">PREPARE FOR AI</h3>
               <p className="text-xs text-slate-500 font-sans">Complete the workshop checklist.</p>
             </div>
           </div>

           {/* Re-join */}
           <div className="z-10 relative bg-slate-950 border-2 border-slate-700 pixel-corners p-4 w-64 text-center mt-12 opacity-50">
             <div className="absolute -left-3 -top-3 bg-slate-700 text-slate-400 text-[10px] font-bold px-2 py-1 pixel-corners">LOCKED</div>
             <h3 className="font-pixel text-slate-500 uppercase tracking-widest mb-2">WORKSHOP READY</h3>
             <p className="text-xs text-slate-600 font-sans">+250 XP</p>
           </div>

           {/* Final */}
           <div className="z-10 relative bg-slate-950 border-2 border-slate-700 pixel-corners p-4 w-64 text-center opacity-50">
             <div className="absolute -left-3 -top-3 bg-slate-700 text-slate-400 text-[10px] font-bold px-2 py-1 pixel-corners">LOCKED</div>
             <h3 className="font-pixel text-slate-500 uppercase tracking-widest mb-2">SHIP PROJECT</h3>
             <p className="text-xs text-slate-600 font-sans">+500 XP</p>
           </div>

        </div>

      </div>
    </div>
  );
}
