'use client';

import { useEffect, useState } from 'react';
import { Cpu, Zap, Beaker, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface GrowthInsight {
  claim: string;
  evidence: string[];
  window: string;
  confidence: string;
  alternative_explanations: string[];
  recommended_next_test: string;
  human_approval_required: boolean;
}

export default function AIInsightsPage() {
  const [insight, setInsight] = useState<GrowthInsight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ai/insights')
      .then(res => res.json())
      .then(json => {
        if (json.success) setInsight(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[600px] flex flex-col items-center justify-center font-mono text-emerald-500">
        <div className="w-16 h-16 border-4 border-emerald-900 border-t-emerald-400 rounded-none animate-spin mb-4" />
        <div className="tracking-widest animate-pulse text-xs">BOOTING AI COPILOT KERNEL...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 relative z-10 font-mono">
      
      {/* HEADER COMMAND BAR */}
      <div className="bg-[#021008] border border-emerald-900 p-4 flex justify-between items-center shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-950 flex items-center justify-center border border-emerald-800 animate-pulse">
             <Cpu className="text-emerald-500 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-pixel text-emerald-500 tracking-widest drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">AI COPILOT TERMINAL</h1>
            <p className="text-[10px] text-emerald-700 tracking-widest mt-1 opacity-80">AUTONOMOUS GROWTH ANALYSIS ENGINE</p>
          </div>
        </div>
        <div className="flex items-center gap-2 border border-emerald-800 bg-emerald-950/50 px-4 py-2">
           <div className="w-2 h-2 bg-emerald-500 animate-pulse" />
           <span className="font-pixel text-[10px] text-emerald-400">ENGINE ONLINE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LOG STREAM */}
        <div className="col-span-1 lg:col-span-1 bg-[#020a06] border border-emerald-900 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] flex flex-col h-[600px] relative">
           <div className="absolute top-0 right-0 p-2 font-pixel text-[8px] text-emerald-900">TTY1</div>
           <div className="p-4 border-b border-emerald-900 bg-emerald-950/20">
             <div className="font-pixel text-[10px] text-emerald-600 tracking-widest">SYSTEM_LOGS</div>
           </div>
           <div className="flex-1 p-4 overflow-y-auto text-[10px] leading-relaxed text-emerald-500 opacity-70">
             <div>{`> [INFO] Booting GrowthOS AI Model v4.2`}</div>
             <div>{`> [INFO] Loading dataset constraints... OK`}</div>
             <div>{`> [INFO] Scanning recent funnel events...`}</div>
             <div>{`> [INFO] Detected anomaly in conversion node B.`}</div>
             <div>{`> [WARN] Drop-off rate exceeded threshold (15%)`}</div>
             <div>{`> [INFO] Generating hypothesis...`}</div>
             <div>{`> [INFO] Hypothesis generated. Analyzing significance...`}</div>
             <div>{`> [INFO] P-value: 0.03 (Significant)`}</div>
             <div className="animate-pulse">{`> [INFO] Waiting for human authorization...`}</div>
           </div>
        </div>

        {/* INSIGHT ANALYSIS */}
        <div className="col-span-1 lg:col-span-2 bg-[#021008] border border-emerald-800 p-6 flex flex-col relative overflow-hidden shadow-xl">
           <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30" />
           
           <div className="flex items-center gap-4 border-b border-emerald-900 pb-4 mb-6">
              <Zap className="text-emerald-400 w-8 h-8" />
              <div>
                <h2 className="font-pixel text-lg text-emerald-300 tracking-widest">LATEST INSIGHT</h2>
                <div className="text-[10px] text-emerald-600">ID: INS-8924-ALPHA</div>
              </div>
           </div>

           {insight ? (
             <div className="flex flex-col gap-8 relative z-10">
               
               <div>
                 <div className="font-pixel text-[10px] text-emerald-700 tracking-widest mb-2">PRIMARY CLAIM</div>
                 <div className="text-xl text-emerald-400 font-medium leading-relaxed bg-emerald-950/30 p-4 border-l-4 border-emerald-500">
                   "{insight.claim}"
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                 <div>
                   <div className="font-pixel text-[10px] text-emerald-700 tracking-widest mb-2">SUPPORTING EVIDENCE</div>
                   <ul className="list-disc list-inside text-xs text-emerald-500 space-y-2">
                     {insight.evidence.map((ev, i) => <li key={i}>{ev}</li>)}
                   </ul>
                 </div>
                 
                 <div>
                   <div className="font-pixel text-[10px] text-emerald-700 tracking-widest mb-2">ALTERNATIVE EXPLANATIONS</div>
                   <ul className="list-disc list-inside text-xs text-emerald-600 space-y-2">
                     {insight.alternative_explanations.map((alt, i) => <li key={i}>{alt}</li>)}
                   </ul>
                 </div>
               </div>

               <div className="grid grid-cols-3 gap-4">
                 <div className="bg-emerald-950/20 border border-emerald-900 p-3">
                   <div className="font-pixel text-[8px] text-emerald-700 mb-1">CONFIDENCE</div>
                   <div className="text-lg text-emerald-400">{insight.confidence}</div>
                 </div>
                 <div className="bg-emerald-950/20 border border-emerald-900 p-3">
                   <div className="font-pixel text-[8px] text-emerald-700 mb-1">ANALYSIS WINDOW</div>
                   <div className="text-lg text-emerald-400">{insight.window}</div>
                 </div>
                 <div className="bg-emerald-950/20 border border-emerald-900 p-3 flex flex-col justify-center items-center">
                   <div className="font-pixel text-[8px] text-emerald-700 mb-1">STATUS</div>
                   {insight.human_approval_required ? (
                     <div className="flex items-center gap-2 text-amber-500 text-xs">
                       <AlertCircle className="w-4 h-4" /> HUMAN REVIEW REQ
                     </div>
                   ) : (
                     <div className="flex items-center gap-2 text-emerald-500 text-xs">
                       <CheckCircle2 className="w-4 h-4" /> AUTO-EXECUTED
                     </div>
                   )}
                 </div>
               </div>

               <div className="mt-4 p-4 border border-emerald-500/50 bg-emerald-900/20">
                 <div className="font-pixel text-[10px] text-emerald-400 mb-2">RECOMMENDED NEXT TEST</div>
                 <div className="text-emerald-300 text-sm">{insight.recommended_next_test}</div>
                 
                 <div className="mt-6 flex justify-end gap-4">
                   <button className="px-6 py-2 border border-emerald-800 text-emerald-600 hover:bg-emerald-950 font-pixel text-[10px] transition-colors">
                     REJECT HYPOTHESIS
                   </button>
                   <button className="px-6 py-2 border border-emerald-400 bg-emerald-900/50 text-emerald-300 hover:bg-emerald-800 font-pixel text-[10px] transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                     DEPLOY EXPERIMENT
                   </button>
                 </div>
               </div>

             </div>
           ) : (
             <div className="flex-1 flex items-center justify-center text-emerald-700 text-xs tracking-widest font-pixel animate-pulse">
               AWAITING INSIGHT GENERATION...
             </div>
           )}

        </div>

      </div>
    </div>
  );
}

