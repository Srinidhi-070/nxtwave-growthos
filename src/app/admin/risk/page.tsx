'use client';

import { useEffect, useState } from 'react';

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

  const handleReview = async (id: string, action: 'APPROVE' | 'REJECT') => {
    const reason = prompt(`Reason for ${action}?`);
    if (!reason) return;

    await fetch(`/api/risk/${id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, reason })
    });
    
    fetchFlags(); // refresh
  };

  if (loading) return <div className="p-8 text-white">Loading Risk Queue...</div>;

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Risk & Quality Queue</h1>
        
        {flags.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-500">
            Queue is clear. No high-risk activity detected.
          </div>
        ) : (
          <div className="space-y-4">
            {flags.map(flag => (
              <div key={flag.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${flag.score > 60 ? 'bg-red-900/50 text-red-400' : 'bg-orange-900/50 text-orange-400'}`}>
                      Score: {flag.score}
                    </span>
                    <span className="text-slate-400 text-sm">{flag.subjectType} : {flag.subjectId.substring(0, 8)}...</span>
                  </div>
                  <p className="text-slate-300 font-mono text-sm">{flag.signalsJson}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleReview(flag.id, 'APPROVE')}
                    className="bg-green-900/40 hover:bg-green-800/60 text-green-400 border border-green-800 px-4 py-2 rounded text-sm transition-colors"
                  >
                    Clear (Valid)
                  </button>
                  <button 
                    onClick={() => handleReview(flag.id, 'REJECT')}
                    className="bg-red-900/40 hover:bg-red-800/60 text-red-400 border border-red-800 px-4 py-2 rounded text-sm transition-colors"
                  >
                    Block (Fraud)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
