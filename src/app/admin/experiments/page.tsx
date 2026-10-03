'use client';

// UI only (no state logic)

export default function ExperimentsPage() {
  // Stubbing local state for prototype display; normally fetched via GET /api/experiments
  const experiments = [
    { key: 'hook_copy', hypothesis: 'Outcome-driven hook beats generic workshop hook', metric: 'Registration CVR', status: 'RUNNING', results: { control: 12.4, variant: 18.2 } },
    { key: 'referral_reward', hypothesis: 'Starter pack incentive improves referral rate', metric: 'Qualified Referral Rate', status: 'RUNNING', results: { control: 5.1, variant: 12.3 } },
    { key: 'connector_onboarding', hypothesis: 'Message kit increases activations', metric: 'Activation Rate', status: 'ENDED', winner: 'variant' },
    { key: 'deadline_framing', hypothesis: 'Urgency countdown improves velocity', metric: 'Registrations/Day', status: 'DRAFT' }
  ];

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Experiment Engine</h1>
        <p className="text-slate-400 mb-8">Manage A/B tests and review statistical readouts.</p>

        <div className="grid grid-cols-1 gap-6">
          {experiments.map((exp, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-white">{exp.key}</h2>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      exp.status === 'RUNNING' ? 'bg-blue-900/50 text-blue-400' :
                      exp.status === 'ENDED' ? 'bg-green-900/50 text-green-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {exp.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{exp.hypothesis}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Primary Metric</p>
                  <p className="font-semibold text-slate-300">{exp.metric}</p>
                </div>
              </div>

              {exp.results && (
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-between items-center mt-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Control</p>
                    <p className="text-xl text-white font-mono">{exp.results.control}%</p>
                  </div>
                  <div className="text-slate-600 text-sm">vs</div>
                  <div className="text-right">
                    <p className="text-xs text-blue-500 uppercase font-semibold">Variant (Winning)</p>
                    <p className="text-xl text-blue-400 font-mono font-bold">{exp.results.variant}%</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
