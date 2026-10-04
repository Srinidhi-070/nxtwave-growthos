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

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-zinc-500 font-mono text-sm gap-4">
      <Cpu className="w-8 h-8 animate-pulse text-blue-500/50" />
      <span>Growth Copilot is analyzing telemetry...</span>
    </div>
  );

  if (!insight) return <div className="flex-1 p-8 text-rose-400 font-mono text-sm">Error initializing Copilot instance.</div>;

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-5xl mx-auto w-full text-slate-200">
      <div className="mb-8 flex items-center gap-3">
        <Cpu className="w-6 h-6 text-blue-500" />
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Growth Copilot</h1>
          <p className="text-sm text-zinc-500 font-medium">Deterministic Synthesis Engine</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111] border border-blue-900/30 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.05)]"
      >
        <div className="bg-blue-950/20 p-6 border-b border-blue-900/30 flex justify-between items-start">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-none h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs text-blue-400 font-mono uppercase tracking-widest">Signal Detected • {insight.window}</span>
            </div>
            <h2 className="text-2xl font-medium text-white leading-tight">{insight.claim}</h2>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Confidence</span>
            <span className="text-lg font-mono text-emerald-400">{insight.confidence}</span>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Evidence
            </h3>
            <ul className="space-y-3">
              {insight.evidence.map((ev, i) => (
                <li key={i} className="text-sm text-zinc-300 pl-4 border-l-2 border-white/10 leading-relaxed">
                  {ev}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" /> Alternative Explanations
            </h3>
            <ul className="space-y-3">
              {insight.alternative_explanations.map((alt, i) => (
                <li key={i} className="text-sm text-zinc-300 pl-4 border-l-2 border-white/10 leading-relaxed">
                  {alt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#0a0a0a] p-6 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" /> Recommended Action
            </h3>
            <p className="text-sm text-zinc-200">{insight.recommended_next_test}</p>
          </div>
          <button className="w-full md:w-auto shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
            <Beaker className="w-4 h-4" /> Create Experiment
          </button>
        </div>
      </motion.div>
    </div>
  );
}

