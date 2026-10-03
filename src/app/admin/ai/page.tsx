'use client';

import { useEffect, useState } from 'react';

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

  if (loading) return <div className="p-8 text-white">Generating AI Insight...</div>;
  if (!insight) return <div className="p-8 text-red-400">Failed to load insight.</div>;

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">AI Growth Analyst</h1>
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white leading-tight pr-8">{insight.claim}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              insight.confidence === 'high' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'
            }`}>
              {insight.confidence} Confidence
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Evidence ({insight.window})</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              {insight.evidence.map((ev, i) => (
                <li key={i}>{ev}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6 bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Alternative Explanations</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-400 text-sm">
              {insight.alternative_explanations.map((alt, i) => (
                <li key={i}>{alt}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Recommended Next Action</h3>
            <p className="text-slate-300 mb-4">{insight.recommended_next_test}</p>
            
            <div className="flex items-center justify-between bg-blue-950/30 p-4 rounded-lg border border-blue-900/50">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm text-blue-300">Human Approval Required</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-900/20">
                Approve & Execute Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
