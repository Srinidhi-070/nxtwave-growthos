'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';

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

  const handleShare = () => {
    const text = `Hey! I'm attending the "Build Your First AI Project in 60 Minutes" workshop. Register here to get your AI project starter pack: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Connector Mission Control</h1>
            <p className="text-sm text-slate-400">Campus Rank: <span className="text-blue-400 font-semibold bg-blue-900/20 px-2 py-0.5 rounded ml-1">{data.metrics.campusRank}</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Status</p>
            <span className="bg-emerald-900/30 text-emerald-400 border border-emerald-800/50 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {data.status}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main KPI Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 md:col-span-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              Your Impact
            </h2>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-7xl font-black text-white tracking-tighter">{data.metrics.verifiedRegistrations}</span>
              <span className="text-xl text-slate-400 font-medium">Verified Registrations</span>
            </div>
            
            <div className="mt-10 pt-6 border-t border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Milestone Progress</p>
                <p className="font-semibold text-slate-200">
                  {data.metrics.milestoneState === 'STARTER_PACK_UNLOCKED' 
                    ? <span className="text-amber-400 flex items-center gap-2"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> Starter Pack Unlocked!</span> 
                    : `${3 - data.metrics.verifiedRegistrations} more to unlock Starter Pack`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Quality Score</p>
                <p className="font-bold text-emerald-400 text-lg">{data.metrics.qualityScore}/100</p>
              </div>
            </div>
          </div>

          {/* Asset Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between items-center text-center">
            <div className="w-full">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Distribution Asset</h2>
              <div className="bg-white rounded-xl p-3 mb-6 mx-auto inline-block shadow-lg shadow-white/5 transition-transform hover:scale-105">
                <QRCode value={shareUrl} size={150} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
              </div>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert('Link copied to clipboard!');
              }}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-3 rounded-lg text-sm transition-colors border border-slate-700 hover:border-slate-600 flex justify-center items-center gap-2"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy Unique Link
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Suggested Action */}
          <div className="bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-900/40 rounded-xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2 text-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Suggested Action
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">{data.suggestedAction}</p>
            </div>
            <button 
              onClick={handleShare}
              className="bg-blue-600 hover:bg-blue-500 text-white w-full py-3 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
            >
              Share via WhatsApp
            </button>
          </div>

          {/* Recent Events */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <h3 className="text-slate-200 font-bold mb-6 text-lg">Activity Log</h3>
            {data.recentEvents.length === 0 ? (
              <div className="h-32 flex flex-col items-center justify-center text-slate-500">
                <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm">No activity yet. Start sharing!</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {data.recentEvents.map((evt) => (
                  <li key={evt.id} className="flex justify-between items-start border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                    <div>
                      <span className="block text-slate-300 font-medium">{evt.event.replace('_', ' ')}</span>
                      <span className="text-slate-500 text-xs mt-1">{new Date(evt.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px] font-mono">Logged</span>
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
