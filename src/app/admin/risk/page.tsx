'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, ShieldCheck, RefreshCw, XCircle } from 'lucide-react';

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
    fetch('/api/risk/queue')
      .then(res => res.json())
      .then(json => {
        if (json.success) setFlags(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  const handleReview = async (id: string, resolution: string) => {
    try {
      const action = resolution === 'cleared' ? 'APPROVE' : 'REJECT';
      const res = await fetch(`/api/risk/${id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        fetchFlags();
      } else {
        console.error("Failed to submit review");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center p-8 text-zinc-500 font-mono text-sm">Loading risk telemetry...</div>;

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full text-slate-200">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Quality & Fraud Telemetry</h1>
        <p className="text-sm text-zinc-500 font-medium">Reviewing high-velocity nodes and anomalous behavior</p>
      </div>

      {!flags || flags.length === 0 ? (
        <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center flex flex-col items-center">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mb-4 opacity-80" />
          <h3 className="text-lg font-medium text-white mb-2">Network is secure</h3>
          <p className="text-sm text-zinc-500">No pending risk flags or anomalous behaviors detected.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {flags.map(flag => {
            let signals: string[] = [];
            try {
              const parsed = JSON.parse(flag.signalsJson || '[]');
              signals = Array.isArray(parsed) ? parsed : [String(parsed)];
            } catch (e) {
              signals = ["Invalid signal data"];
            }
            
            const riskLevel = flag.score >= 90 ? 'CRITICAL' : flag.score >= 70 ? 'HIGH' : 'MEDIUM';
            const riskColor = riskLevel === 'CRITICAL' ? 'text-rose-500' : riskLevel === 'HIGH' ? 'text-orange-500' : 'text-amber-500';

            return (
              <div key={flag.id} className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className={`w-5 h-5 ${riskColor}`} />
                    <h3 className="font-semibold text-white text-lg">Risk Score: {flag.score}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase border ${
                      riskLevel === 'CRITICAL' ? 'bg-rose-900/30 text-rose-500 border-rose-800/50' :
                      'bg-orange-900/30 text-orange-500 border-orange-800/50'
                    }`}>
                      {riskLevel}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-zinc-500 mb-4">Entity: {flag.subjectType} | ID: {flag.subjectId}</div>
                  
                  <div className="space-y-1">
                    {signals.map((sig: string, i: number) => (
                      <div key={i} className="text-sm text-zinc-300 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-zinc-600" /> {sig}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => handleReview(flag.id, 'cleared')}
                    className="flex-1 md:flex-none bg-[#222] hover:bg-[#333] border border-white/10 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Mark False Positive
                  </button>
                  <button 
                    onClick={() => handleReview(flag.id, 'banned')}
                    className="flex-1 md:flex-none bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Quarantine Node
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
