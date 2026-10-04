'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: 'TELEMETRY', path: '/admin' },
    { name: 'NETWORK GRAPH', path: '/admin/graph' },
    { name: 'EXPERIMENTS', path: '/admin/experiments' },
    { name: 'RISK & FRAUD', path: '/admin/risk' },
    { name: 'AI COPILOT', path: '/admin/ai' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-[#94a3b8] font-pixel text-[10px] tracking-widest uppercase flex flex-col relative overflow-hidden">
      
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none z-50 mix-blend-multiply opacity-50" />
      
      {/* Deep Radar Grid Background */}
      <div className="fixed inset-0 z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e911_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e911_1px,transparent_1px)] bg-[size:40px_40px]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_80%)]" />
      </div>

      {/* Operator Header */}
      <header className="h-16 border-b-2 border-slate-800 flex items-center justify-between px-6 bg-[#020617]/90 backdrop-blur-md relative z-40">
        
        {/* Connection Status Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4] w-1/4 animate-pulse" />

        <div className="flex items-center gap-12">
          <Link href="/admin" className="text-white flex items-center gap-3 group">
            <div className="w-3 h-3 bg-cyan-400 shadow-[0_0_15px_#22d3ee] group-hover:animate-ping" />
            <div>
              <div className="text-lg tracking-widest">GrowthOS</div>
              <div className="text-[8px] text-cyan-500">OPERATOR TERMINAL v2.4</div>
            </div>
          </Link>
          
          <nav className="hidden lg:flex gap-2">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 transition-colors relative ${
                    isActive 
                      ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-800' 
                      : 'text-slate-500 border border-transparent hover:text-slate-300 hover:border-slate-800'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="adminNavIndicator"
                      className="absolute -top-[1px] left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex flex-col items-end">
             <div className="text-emerald-400 text-[8px] flex items-center gap-2">
               DATA STREAM <div className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse" />
             </div>
             <div className="text-slate-600 text-[8px]">ENCRYPTED SECURE CHANNEL</div>
           </div>
           
           <Link href="/dashboard" className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 transition-colors">
              EXIT TERMINAL
           </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 p-4 md:p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
