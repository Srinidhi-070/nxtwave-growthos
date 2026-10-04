'use client';

import { useEffect, useState } from 'react';
import { Activity, Users, Zap, AlertCircle, RefreshCw } from 'lucide-react';

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

  const fetchTelemetry = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/analytics/funnel').then(res => res.json()),
      fetch('/api/analytics/cohorts').then(res => res.json())
    ])
    .then(([funnelJson, cohortJson]) => {
      if (funnelJson.success) setData(funnelJson.data);
      if (cohortJson.success) setCohortData(cohortJson.data);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  if (loading && !data) {
    return (
      <div className="w-full h-[600px] flex flex-col items-center justify-center font-pixel text-cyan-500">
        <div className="w-16 h-16 border-4 border-cyan-900 border-t-cyan-400 rounded-full animate-spin mb-4" />
        <div className="tracking-widest animate-pulse text-xs">CONNECTING TO TELEMETRY STREAM...</div>
      </div>
    );
  }

  // Fallback values
  const visits = data?.funnel?.visits || 0;
  const activated = data?.funnel?.activated || 0;
  const conversionRate = visits > 0 ? ((activated / visits) * 100).toFixed(1) : '0.0';

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* HEADER COMMAND BAR */}
      <div className="bg-[#020617] border border-slate-700 p-4 flex justify-between items-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div>
          <h1 className="text-xl font-pixel text-white tracking-widest text-shadow-glow-cyan">GLOBAL TELEMETRY OVERVIEW</h1>
          <p className="text-[10px] text-slate-500 tracking-widest mt-1">REAL-TIME CAMPUS METRICS & FUNNEL ANALYSIS</p>
        </div>
        <button 
          onClick={fetchTelemetry}
          className="flex items-center gap-2 bg-slate-900 border border-slate-600 px-4 py-2 hover:bg-slate-800 hover:border-cyan-500 group transition-colors"
        >
          <RefreshCw className={`w-3 h-3 text-cyan-500 ${loading ? 'animate-spin' : 'group-hover:animate-spin'}`} />
          <span className="font-pixel text-[10px] text-cyan-300">SYNC DATA</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* KPI MODULES (Top Row) */}
        <div className="col-span-1 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricModule title="TOTAL VISITS" value={visits.toString()} icon={<Activity />} color="blue" />
          <MetricModule title="ACTIVATED NODES" value={activated.toString()} icon={<Users />} color="emerald" />
          <MetricModule title="CONVERSION YIELD" value={`${conversionRate}%`} icon={<Zap />} color="amber" />
          <MetricModule title="NETWORK HEALTH" value="NOMINAL" icon={<AlertCircle />} color="cyan" />
        </div>

        {/* FUNNEL VISUALIZATION */}
        <div className="col-span-1 lg:col-span-2 bg-[#020617] border border-slate-700 p-6 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 font-pixel text-[8px] text-slate-600">FIG 01.</div>
           <h2 className="font-pixel text-sm text-cyan-400 tracking-widest mb-6">ONBOARDING FUNNEL TANK</h2>
           
           <div className="flex flex-col gap-4 mt-8">
             <FunnelLayer label="VISITS [RAW TRAFFIC]" count={visits} max={visits} color="bg-slate-700" text="text-slate-300" />
             <FunnelLayer label="STARTS [REGISTERED]" count={data?.funnel?.starts || 0} max={visits} color="bg-blue-600" text="text-blue-300" />
             <FunnelLayer label="VERIFIED [OTP PASSED]" count={data?.funnel?.verified || 0} max={visits} color="bg-cyan-500" text="text-cyan-950" />
             <FunnelLayer label="ACTIVATED [CHARACTER]" count={activated} max={visits} color="bg-emerald-400" text="text-emerald-950" />
           </div>
        </div>

        {/* COHORT & TRAFFIC ANALYSIS */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          
          <div className="bg-[#020617] border border-slate-700 p-6 flex-1 relative">
            <div className="absolute top-0 right-0 p-2 font-pixel text-[8px] text-slate-600">FIG 02.</div>
            <h2 className="font-pixel text-sm text-fuchsia-400 tracking-widest mb-4">TRAFFIC SOURCES</h2>
            
            <div className="flex flex-col gap-2">
               {Object.entries(data?.channelStats || {}).length > 0 ? (
                 Object.entries(data!.channelStats).map(([source, count], i) => (
                   <div key={source} className="flex items-center justify-between border-b border-slate-800 pb-2">
                     <span className="font-pixel text-[10px] text-slate-400 uppercase">{source}</span>
                     <div className="flex items-center gap-4">
                       <div className="w-32 h-1 bg-slate-900">
                         <div className="h-full bg-fuchsia-500" style={{ width: `${Math.min(100, (count / visits) * 100)}%` }} />
                       </div>
                       <span className="font-pixel text-xs text-fuchsia-300">{count}</span>
                     </div>
                   </div>
                 ))
               ) : (
                 <div className="font-pixel text-[10px] text-slate-500 text-center py-8">NO SOURCE METRICS DETECTED</div>
               )}
            </div>
          </div>

          <div className="bg-[#020617] border border-slate-700 p-6 flex-1 relative">
            <h2 className="font-pixel text-sm text-amber-400 tracking-widest mb-4">SYSTEM METRICS</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(cohortData?.metrics || {}).length > 0 ? (
                Object.entries(cohortData!.metrics).map(([key, val]) => (
                  <div key={key} className="bg-slate-900 border border-slate-800 p-3">
                    <div className="font-pixel text-[8px] text-slate-500 tracking-widest uppercase mb-1">{key}</div>
                    <div className="font-pixel text-sm text-slate-200 uppercase">{val}</div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 font-pixel text-[10px] text-slate-500 text-center py-8">NO SYSTEM METRICS DETECTED</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function MetricModule({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  const colorMap: any = {
    blue: 'border-blue-500/50 bg-blue-950/30 text-blue-400 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]',
    emerald: 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]',
    amber: 'border-amber-500/50 bg-amber-950/30 text-amber-400 shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]',
    cyan: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]',
  };

  return (
    <div className={`p-4 border relative overflow-hidden ${colorMap[color]}`}>
      <div className="absolute top-2 right-2 opacity-20 [&>svg]:w-6 [&>svg]:h-6">{icon}</div>
      <h3 className="font-pixel text-[8px] sm:text-[10px] tracking-widest uppercase opacity-80 mb-2">{title}</h3>
      <div className="font-pixel text-2xl sm:text-3xl tracking-widest drop-shadow-md">{value}</div>
    </div>
  );
}

function FunnelLayer({ label, count, max, color, text }: { label: string; count: number; max: number; color: string; text: string }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  
  return (
    <div className="w-full flex items-center gap-4 group">
       <div className="w-48 font-pixel text-[10px] tracking-widest text-right shrink-0">{label}</div>
       <div className="flex-1 bg-slate-900 h-8 border border-slate-700 relative flex items-center">
         <div className={`h-full ${color} transition-all duration-1000 flex items-center justify-end px-2`} style={{ width: `${Math.max(2, pct)}%` }}>
           {pct > 15 && <span className={`font-pixel text-[10px] tracking-widest ${text}`}>{count}</span>}
         </div>
         {pct <= 15 && <span className={`absolute left-4 font-pixel text-[10px] tracking-widest text-slate-400`}>{count}</span>}
       </div>
    </div>
  );
}

