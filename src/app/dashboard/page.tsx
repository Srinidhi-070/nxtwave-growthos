'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardData {
  referralCode: string;
  status: string;
  tier: string;
  metrics: {
    verifiedRegistrations: number;
    shareClicks: number;
    qualityScore: number;
    milestoneState: string;
    campusRank: string;
  };
  recentEvents: Array<{ id: string; event: string; time: string }>;
  suggestedAction: string;
}

export default function ConnectorDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = localStorage.getItem('growthos_user_id');
    if (!uid) {
      router.push('/register');
      return;
    }

    fetch(`/api/connectors/${uid}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [router]);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading Dashboard...</div>;
  if (!data) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">Failed to load dashboard.</div>;

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/register?ref=${data.referralCode}` : '';

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Connector Mission Control</h1>
            <p className="text-sm text-slate-400">Campus Rank: <span className="text-blue-400 font-semibold">{data.metrics.campusRank}</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
            <span className="bg-green-900/30 text-green-400 border border-green-800 px-3 py-1 rounded-full text-xs font-semibold">
              {data.status}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main KPI Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
            <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Your Impact</h2>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-black text-white">{data.metrics.verifiedRegistrations}</span>
              <span className="text-lg text-slate-500">Verified Registrations</span>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-400">Milestone</p>
                <p className="font-semibold text-white">
                  {data.metrics.milestoneState === 'STARTER_PACK_UNLOCKED' 
                    ? '🎉 Starter Pack Unlocked' 
                    : `${3 - data.metrics.verifiedRegistrations} more to unlock Starter Pack`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Quality Score</p>
                <p className="font-semibold text-green-400">{data.metrics.qualityScore}/100</p>
              </div>
            </div>
          </div>

          {/* Asset Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Distribution Asset</h2>
              <div className="aspect-square bg-white rounded-lg p-2 mb-4 flex items-center justify-center max-w-[150px] mx-auto border-4 border-slate-700">
                {/* QR Code Stub */}
                <div className="text-slate-900 font-mono text-center text-xs break-all leading-tight">
                  [ QR Code Stub ]<br/><br/>
                  {shareUrl}
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-sm transition-colors"
            >
              Copy Link
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Suggested Action */}
          <div className="bg-blue-950/20 border border-blue-900/50 rounded-xl p-6">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Suggested Action
            </h3>
            <p className="text-blue-100/70 text-sm mb-4">{data.suggestedAction}</p>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Execute Action
            </button>
          </div>

          {/* Recent Events */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-slate-300 font-semibold mb-4">Activity Log</h3>
            {data.recentEvents.length === 0 ? (
              <p className="text-slate-500 text-sm">No activity yet. Start sharing!</p>
            ) : (
              <ul className="space-y-3">
                {data.recentEvents.map((evt) => (
                  <li key={evt.id} className="flex justify-between items-center text-sm border-b border-slate-800 pb-2 last:border-0">
                    <span className="text-slate-300">{evt.event}</span>
                    <span className="text-slate-500 text-xs">{new Date(evt.time).toLocaleTimeString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
