'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AdminData {
  funnel: { visits: number; starts: number; verified: number; activated: number };
  channelStats: Record<string, number>;
}
interface CohortData {
  metrics: Record<string, string>;
  dateCohorts: Array<{ date: string; value: number }>;
  sourceCohorts: Array<{ name: string; value: number }>;
}

export default function AdminCommandCenter() {
  const [data, setData] = useState<AdminData | null>(null);
  const [cohortData, setCohortData] = useState<CohortData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/analytics/funnel').then(res => res.json()),
      fetch('/api/analytics/cohorts').then(res => res.json())
    ])
    .then(([funnelJson, cohortJson]) => {
      if (funnelJson.success) setData(funnelJson.data);
      if (cohortJson.success) setCohortData(cohortJson.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Booting Command Center...</div>;
  if (!data || !cohortData) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">System Failure.</div>;

  const { funnel, channelStats } = data;
  const { metrics, dateCohorts, sourceCohorts } = cohortData;
  const target = 500;
  const progressPercent = Math.min((funnel.verified / target) * 100, 100);

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">GrowthOS Command Center</h1>
            <p className="text-slate-400 mt-1 flex items-center gap-2">
              <span className="bg-orange-900/50 text-orange-400 px-2 py-0.5 rounded text-xs font-bold tracking-wider">SYNTHETIC DEMO DATA</span>
              Real-time simulation metrics
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <select 
              id="demo-scenario"
              className="bg-slate-900 border border-slate-700 text-white text-sm rounded px-3 py-2"
              onChange={(e) => {
                const val = e.target.value;
                if(val) {
                  fetch('/api/demo/scenario', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ scenario: val })
                  }).then(() => window.location.reload());
                }
              }}
            >
              <option value="">Load Scenario...</option>
              <option value="Baseline">Baseline</option>
              <option value="Referral Lift">Referral Lift</option>
              <option value="Channel Shift">Channel Shift</option>
              <option value="Fraud Spike">Fraud Spike</option>
              <option value="Deadline Surge">Deadline Surge</option>
            </select>
            <Link href="/admin/experiments" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm transition-colors border border-slate-700">
              Experiments
            </Link>
            <Link href="/admin/graph" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm transition-colors border border-slate-700">
              Graph
            </Link>
          </div>
        </header>

        {/* North Star KPI */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">North Star</h2>
              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-black text-white">{funnel.verified}</span>
                <span className="text-xl text-slate-500">/ {target} Registrations</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-green-400 font-semibold">+64 today</span>
            </div>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Funnel */}
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
            <h3 className="text-slate-300 font-semibold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Conversion Funnel
            </h3>
            <div className="flex justify-between items-end relative">
              {/* Funnel Bars */}
              <div className="flex-1 flex flex-col items-center group">
                <div className="h-32 w-24 bg-slate-800 rounded-t-sm flex items-end justify-center transition-all group-hover:bg-slate-700">
                  <span className="mb-2 font-mono text-sm">{funnel.visits}</span>
                </div>
                <div className="w-full border-t border-slate-700 text-center pt-2 text-xs text-slate-500 uppercase">Visits</div>
              </div>
              <div className="flex-1 flex flex-col items-center group">
                <div className="h-24 w-24 bg-blue-900/40 rounded-t-sm flex items-end justify-center transition-all group-hover:bg-blue-900/60">
                  <span className="mb-2 font-mono text-sm">{funnel.starts}</span>
                </div>
                <div className="w-full border-t border-slate-700 text-center pt-2 text-xs text-slate-500 uppercase">Starts</div>
              </div>
              <div className="flex-1 flex flex-col items-center group">
                <div className="h-20 w-24 bg-blue-700/60 rounded-t-sm flex items-end justify-center transition-all group-hover:bg-blue-700/80">
                  <span className="mb-2 font-mono text-sm font-bold text-white">{funnel.verified}</span>
                </div>
                <div className="w-full border-t border-slate-700 text-center pt-2 text-xs text-slate-500 uppercase text-blue-400">Verified</div>
              </div>
              <div className="flex-1 flex flex-col items-center group">
                <div className="h-16 w-24 bg-green-700/60 rounded-t-sm flex items-end justify-center transition-all group-hover:bg-green-700/80">
                  <span className="mb-2 font-mono text-sm font-bold text-white">{funnel.activated}</span>
                </div>
                <div className="w-full border-t border-slate-700 text-center pt-2 text-xs text-slate-500 uppercase text-green-400">Activated</div>
              </div>
            </div>
          </section>

          {/* Channels */}
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-slate-300 font-semibold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Channels
            </h3>
            <ul className="space-y-4">
              {Object.entries(channelStats as Record<string, number>).map(([channel, count]) => (
                <li key={channel}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">{channel}</span>
                    <span className="font-mono text-white">{count}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-slate-500 h-1.5 rounded-full" style={{ width: `${(count / funnel.verified) * 100}%` }}></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sub-panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
             <h3 className="text-slate-300 font-semibold mb-4">Quality & Risk</h3>
             <div className="text-sm text-slate-400 space-y-2">
               <div className="flex justify-between border-b border-slate-800 pb-2"><span>Clean</span> <span className="text-white">428</span></div>
               <div className="flex justify-between border-b border-slate-800 pb-2"><span>Duplicate Flags</span> <span className="text-yellow-400">31</span></div>
               <div className="flex justify-between border-b border-slate-800 pb-2"><span>Manual Review</span> <span className="text-orange-400">7</span></div>
               <div className="flex justify-between pb-2"><span>Blocked</span> <span className="text-red-400">4</span></div>
             </div>
             <Link href="/admin/risk">
               <button className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-sm transition-colors">Open Risk Queue</button>
             </Link>
          </section>
          
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
             <h3 className="text-blue-400 font-semibold mb-4">AI Growth Analyst</h3>
             <div className="bg-blue-950/30 p-4 rounded-lg border border-blue-900/50">
               <p className="text-slate-300 text-sm mb-3">
                 &quot;Connector-driven registrations are outperforming paid traffic by 20x. Next test: replicate Connector onboarding variant B across three lower-performing campuses.&quot;
               </p>
               <div className="flex gap-2">
                 <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-xs transition-colors">Apply Recommendation</button>
                 <Link href="/admin/ai" className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded text-xs transition-colors">View Evidence</Link>
               </div>
             </div>
          </section>
        </div>
        {/* Cohort Analytics */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-8">
          <h3 className="text-slate-300 font-semibold mb-6">Cohort Analytics & Rates</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-500 uppercase">Reg. Conversion</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.registrationConversionRate}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-500 uppercase">Qualified Referral</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.qualifiedReferralRate}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-500 uppercase">Connector Activation</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.connectorActivationRate}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-500 uppercase">Share-to-Referral</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.shareToReferralConversion}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <h4 className="text-sm font-medium text-slate-400 mb-3">Registrations by Day</h4>
               <ul className="space-y-2">
                 {dateCohorts.map((c) => (
                   <li key={c.date} className="flex justify-between text-sm">
                     <span className="text-slate-300">{c.date}</span>
                     <span className="text-white font-mono">{c.value}</span>
                   </li>
                 ))}
               </ul>
            </div>
            <div>
               <h4 className="text-sm font-medium text-slate-400 mb-3">Registrations by Source</h4>
               <ul className="space-y-2">
                 {sourceCohorts.map((c) => (
                   <li key={c.name} className="flex justify-between text-sm">
                     <span className="text-slate-300">{c.name}</span>
                     <span className="text-white font-mono">{c.value}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
