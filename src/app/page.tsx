import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-900/50 text-blue-400 text-sm font-semibold border border-blue-700/50">
          NxtWave GrowthOS Simulation
        </div>
        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Build Your First <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            AI Project in 60 Minutes
          </span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-lg mx-auto">
          No long course. No theory dump. Leave with a tangible project you built yourself.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/register" 
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-blue-600/20"
          >
            Register for Free
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-8 rounded-xl transition-all"
          >
            Connector Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
