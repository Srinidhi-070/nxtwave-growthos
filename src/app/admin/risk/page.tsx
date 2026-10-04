'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, ShieldCheck, RefreshCw, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiskFlag {
  id: string;
  subjectType: string;
  subjectId: string;
  score: number;
  signalsJson: string;
  status: string;
}

export default function RiskQueuePage() {
  const [flags, setFlags] = useState<RiskFlag[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFlags = () => {
    setLoading(true);
    fetch('/api/risk/queue')
      .then(res => res.json())
      .then(json => {
        if (json.success) setFlags(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  const handleAction = async (id: string, decision: 'APPROVE' | 'REJECT') => {
    try {
      await fetch(`/api/risk/${id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision })
      });
      fetchFlags();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 relative z-10">
      
      {/* HEADER COMMAND BAR */}
      <div className="bg-[#1a0505] border border-red-900 p-4 flex justify-between items-center shadow-[0_0_20px_rgba(220,38,38,0.2)] shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-950 flex items-center justify-center border border-red-800 animate-pulse">
             <AlertTriangle className="text-red-500 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-pixel text-red-500 tracking-widest drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">THREAT & RISK ANALYSIS</h1>
            <p className="text-[10px] text-red-400 tracking-widest mt-1 opacity-80">MONITORING FRAUD SIGNALS & SYBIL ATTACKS</p>
          </div>
        </div>
        <button 
          onClick={fetchFlags}
          className="flex items-center gap-2 bg-red-950 border border-red-800 px-4 py-2 hover:bg-red-900 hover:border-red-500 group transition-colors"
        >
          <RefreshCw className={`w-3 h-3 text-red-500 ${loading ? 'animate-spin' : 'group-hover:animate-spin'}`} />
          <span className="font-pixel text-[10px] text-red-400">SCAN NETWORK</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SUMMARY STATS */}
        <div className="col-span-1 flex flex-col gap-4">
           <div className="bg-[#1a0505] border border-red-900 p-6 flex flex-col items-center justify-center py-10 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-red-600 animate-pulse" />
              <div className="font-pixel text-[10px] text-red-500 mb-4 tracking-widest">ACTIVE THREATS</div>
              <div className="font-pixel text-6xl text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">{flags.length}</div>
           </div>

           <div className="bg-slate-950 border border-slate-800 p-4 relative overflow-hidden">
              <div className="font-pixel text-[10px] text-slate-500 mb-2 tracking-widest">THREAT VECTORS</div>
              <ul className="font-pixel text-[8px] text-slate-400 space-y-2 uppercase">
                 <li className="flex justify-between border-b border-slate-800 pb-1"><span>IP DUPLICATION</span> <span className="text-red-500">ACTIVE</span></li>
                 <li className="flex justify-between border-b border-slate-800 pb-1"><span>VELOCITY SPIKES</span> <span className="text-amber-500">MONITORING</span></li>
                 <li className="flex justify-between border-b border-slate-800 pb-1"><span>BOT NETWORKS</span> <span className="text-green-500">CLEAR</span></li>
              </ul>
           </div>
        </div>

        {/* THREAT QUEUE */}
        <div className="col-span-1 lg:col-span-3 bg-[#0a0202] border border-red-900 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] flex flex-col">
           <div className="bg-red-950/30 border-b border-red-900 p-3 flex px-6">
              <div className="font-pixel text-[10px] text-red-500 tracking-widest w-1/4">SUBJECT</div>
              <div className="font-pixel text-[10px] text-red-500 tracking-widest w-1/4 text-center">RISK SCORE</div>
              <div className="font-pixel text-[10px] text-red-500 tracking-widest w-1/4">SIGNALS</div>
              <div className="font-pixel text-[10px] text-red-500 tracking-widest w-1/4 text-right">ACTION</div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {loading && flags.length === 0 ? (
                 <div className="flex-1 flex items-center justify-center font-pixel text-[10px] text-red-500 animate-pulse">
                    SCANNING NETWORK TRAFFIC...
                 </div>
              ) : flags.length === 0 ? (
                 <div className="flex-1 flex flex-col items-center justify-center font-pixel text-emerald-500 opacity-50 py-12">
                    <ShieldCheck className="w-12 h-12 mb-4 opacity-50" />
                    <div className="text-xs tracking-widest">NO ACTIVE THREATS DETECTED</div>
                 </div>
              ) : (
                 <AnimatePresence>
                   {flags.map((flag) => {
                     const sig = JSON.parse(flag.signalsJson || '{}');
                     
                     return (
                       <motion.div 
                         key={flag.id}
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, scale: 0.95 }}
                         className="border border-red-900 bg-red-950/10 hover:bg-red-950/30 transition-colors p-4 flex items-center"
                       >
                         {/* Subject */}
                         <div className="w-1/4">
                           <div className="font-pixel text-xs text-red-400">{flag.subjectType}</div>
                           <div className="font-pixel text-[8px] text-slate-500 mt-1 truncate pr-4">{flag.subjectId}</div>
                         </div>
                         
                         {/* Score */}
                         <div className="w-1/4 flex justify-center">
                           <div className={`font-pixel text-xl ${flag.score > 80 ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse' : 'text-amber-500'}`}>
                             {flag.score}
                           </div>
                         </div>

                         {/* Signals */}
                         <div className="w-1/4">
                           <ul className="font-pixel text-[8px] text-slate-400 uppercase flex flex-col gap-1">
                             {Object.entries(sig).slice(0,3).map(([k, v]) => (
                               <li key={k} className="truncate"><span className="text-red-400">{k}:</span> {String(v)}</li>
                             ))}
                           </ul>
                         </div>

                         {/* Actions */}
                         <div className="w-1/4 flex justify-end gap-2">
                           <button 
                             onClick={() => handleAction(flag.id, 'APPROVE')}
                             className="border border-emerald-900 bg-emerald-950/30 hover:bg-emerald-900 text-emerald-500 font-pixel text-[8px] px-3 py-2 transition-colors flex items-center gap-1"
                           >
                             <ShieldCheck className="w-3 h-3" /> CLEAR
                           </button>
                           <button 
                             onClick={() => handleAction(flag.id, 'REJECT')}
                             className="border border-red-900 bg-red-950/50 hover:bg-red-800 text-red-400 font-pixel text-[8px] px-3 py-2 transition-colors flex items-center gap-1"
                           >
                             <XCircle className="w-3 h-3" /> BAN
                           </button>
                         </div>
                       </motion.div>
                     )
                   })}
                 </AnimatePresence>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}
