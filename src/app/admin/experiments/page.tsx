'use client';

export default function ExperimentsPage() {
  const experiments = [
    { key: 'hook_copy', hypothesis: 'Outcome-driven hook beats generic workshop hook', metric: 'Registration CVR', status: 'RUNNING', results: { control: 12.4, variant: 18.2 } },
    { key: 'referral_reward', hypothesis: 'Starter pack incentive improves referral rate', metric: 'Qualified Referral Rate', status: 'RUNNING', results: { control: 5.1, variant: 12.3 } },
    { key: 'connector_onboarding', hypothesis: 'Message kit increases activations', metric: 'Activation Rate', status: 'ENDED', winner: 'variant' },
    { key: 'deadline_framing', hypothesis: 'Urgency countdown improves velocity', metric: 'Registrations/Day', status: 'DRAFT' }
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full text-slate-200">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Experiment Engine</h1>
        <p className="text-sm text-zinc-500 font-medium">A/B Testing and Variant Telemetry</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiments.map((exp, idx) => (
          <div key={idx} className="bg-[#111] border border-white/10 rounded-xl p-6 transition-colors hover:bg-[#151515]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-sm font-semibold text-white uppercase tracking-wider">{exp.key}</h2>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase ${
                    exp.status === 'RUNNING' ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' :
                    exp.status === 'ENDED' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' : 'bg-[#222] text-zinc-500 border border-white/5'
                  }`}>
                    {exp.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">{exp.hypothesis}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Primary Metric: <span className="text-white font-semibold">{exp.metric}</span></p>
              
              {exp.results ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0a] p-3 rounded-md border border-white/5">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Control</p>
                    <p className="text-xl font-medium text-white">{exp.results.control}%</p>
                  </div>
                  <div className="bg-[#0a0a0a] p-3 rounded-md border border-white/5">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Variant</p>
                    <p className="text-xl font-medium text-emerald-400">{exp.results.variant}%</p>
                  </div>
                </div>
              ) : exp.winner ? (
                <div className="bg-emerald-900/20 border border-emerald-900/50 p-3 rounded-md text-emerald-400 text-xs font-mono">
                  Winner: {exp.winner.toUpperCase()}
                </div>
              ) : (
                <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-md text-zinc-600 text-xs font-mono">
                  Awaiting traffic allocation...
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

