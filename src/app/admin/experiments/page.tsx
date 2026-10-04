'use client';

import { motion } from 'framer-motion';
import { Beaker, Settings, HardHat, TrendingUp } from 'lucide-react';

export default function ExperimentsPage() {
  const experiments = [
    { key: 'HOOK_COPY_V2', hypothesis: 'OUTCOME-DRIVEN HOOK BEATS GENERIC WORKSHOP HOOK', metric: 'REGISTRATION CVR', status: 'RUNNING', results: { control: 12.4, variant: 18.2, significance: 94 } },
    { key: 'REF_REWARD_SCALE', hypothesis: 'STARTER PACK INCENTIVE IMPROVES REFERRAL VELOCITY', metric: 'QUALIFIED REF RATE', status: 'RUNNING', results: { control: 5.1, variant: 12.3, significance: 99 } },
    { key: 'CONN_ONBOARDING', hypothesis: 'PRE-WRITTEN MESSAGE KITS INCREASE ACTIVATION', metric: 'ACTIVATION RATE', status: 'ENDED', winner: 'VARIANT', results: { control: 22.0, variant: 41.5, significance: 99 } },
    { key: 'DEADLINE_URGENCY', hypothesis: 'URGENCY COUNTDOWN IMPROVES REGISTRATION VELOCITY', metric: 'REGS PER HOUR', status: 'DRAFT', results: null }
  ];

  return (
    <div className="w-full flex flex-col gap-6 relative z-10 font-pixel">
      
      {/* HEADER COMMAND BAR */}
      <div className="bg-[#1a1005] border border-amber-900 p-4 flex justify-between items-center shadow-[0_0_20px_rgba(245,158,11,0.2)] shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-950 flex items-center justify-center border border-amber-800">
             <HardHat className="text-amber-500 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl text-amber-500 tracking-widest drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">A/B EXPERIMENT ENGINE</h1>
            <p className="text-[10px] text-amber-700 tracking-widest mt-1 opacity-80">ACTIVE CONSTRUCTION & VARIANT TESTING</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-amber-950 border border-amber-800 px-4 py-2 hover:bg-amber-900 hover:border-amber-500 transition-colors shadow-[4px_4px_0_rgba(245,158,11,0.3)]">
          <Beaker className="w-3 h-3 text-amber-500" />
          <span className="text-[10px] text-amber-400">DEPLOY NEW TEST</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {experiments.map((exp, idx) => (
          <div key={idx} className={`border ${exp.status === 'RUNNING' ? 'border-amber-500 bg-[#1a1005]' : exp.status === 'ENDED' ? 'border-emerald-700 bg-[#021008]' : 'border-slate-800 bg-slate-950'} p-6 relative overflow-hidden shadow-lg`}>
            
            {/* Background Hazard Stripes if running */}
            {exp.status === 'RUNNING' && (
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, transparent 10px, transparent 20px)' }} />
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className={`text-lg tracking-widest ${exp.status === 'RUNNING' ? 'text-amber-400' : exp.status === 'ENDED' ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {exp.key}
                  </h2>
                  <span className={`px-2 py-1 text-[8px] tracking-widest border ${
                    exp.status === 'RUNNING' ? 'bg-amber-900/50 text-amber-300 border-amber-600 animate-pulse' :
                    exp.status === 'ENDED' ? 'bg-emerald-900/50 text-emerald-300 border-emerald-600' : 'bg-slate-900 text-slate-500 border-slate-700'
                  }`}>
                    {exp.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 tracking-widest uppercase">{exp.hypothesis}</p>
              </div>
              
              <div className="text-right">
                <div className="text-[8px] text-slate-500 tracking-widest mb-1">OPTIMIZING FOR</div>
                <div className={`text-sm tracking-widest ${exp.status === 'RUNNING' ? 'text-amber-300' : exp.status === 'ENDED' ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {exp.metric}
                </div>
              </div>
            </div>

            {exp.results ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                <div className="border border-slate-700 bg-slate-900/50 p-4">
                  <div className="text-[10px] text-slate-500 tracking-widest mb-2">CONTROL</div>
                  <div className="text-2xl text-slate-300">{exp.results.control}%</div>
                </div>
                
                <div className={`border ${exp.results.variant > exp.results.control ? (exp.status === 'ENDED' ? 'border-emerald-500 bg-emerald-950/30 shadow-[inset_0_0_15px_rgba(16,185,129,0.2)]' : 'border-amber-500 bg-amber-950/30 shadow-[inset_0_0_15px_rgba(245,158,11,0.2)]') : 'border-red-900 bg-red-950/30'} p-4`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className={`text-[10px] tracking-widest ${exp.results.variant > exp.results.control ? (exp.status === 'ENDED' ? 'text-emerald-500' : 'text-amber-500') : 'text-red-500'}`}>
                      VARIANT {exp.status === 'ENDED' && exp.winner === 'VARIANT' && '(WINNER)'}
                    </div>
                    {exp.results.variant > exp.results.control && <TrendingUp className={`w-4 h-4 ${exp.status === 'ENDED' ? 'text-emerald-500' : 'text-amber-500'}`} />}
                  </div>
                  <div className={`text-2xl ${exp.results.variant > exp.results.control ? (exp.status === 'ENDED' ? 'text-emerald-400' : 'text-amber-400') : 'text-red-400'}`}>
                    {exp.results.variant}%
                  </div>
                  <div className={`text-[10px] mt-2 ${exp.results.variant > exp.results.control ? (exp.status === 'ENDED' ? 'text-emerald-600' : 'text-amber-600') : 'text-red-600'}`}>
                    +{((exp.results.variant - exp.results.control) / exp.results.control * 100).toFixed(1)}% LIFT
                  </div>
                </div>

                <div className="border border-slate-700 bg-slate-900/50 p-4 flex flex-col justify-center items-center text-center">
                  <div className="text-[10px] text-slate-500 tracking-widest mb-2">STATISTICAL SIGNIFICANCE</div>
                  <div className={`text-xl ${exp.results.significance >= 95 ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {exp.results.significance}%
                  </div>
                  {exp.results.significance >= 95 ? (
                    <div className="text-[8px] text-emerald-500 mt-1">TEST CONCLUDED</div>
                  ) : (
                    <div className="text-[8px] text-amber-500 mt-1 animate-pulse">GATHERING DATA...</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="border border-slate-800 bg-slate-900/30 p-8 text-center text-[10px] text-slate-500 tracking-widest uppercase">
                Experiment blueprint verified. Awaiting deployment.
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
