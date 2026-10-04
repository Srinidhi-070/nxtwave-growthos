'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: 'Telemetry', path: '/admin' },
    { name: 'Referral Engine', path: '/admin/graph' },
    { name: 'Experiments', path: '/admin/experiments' },
    { name: 'Risk & Fraud', path: '/admin/risk' },
    { name: 'Growth Copilot', path: '/admin/ai' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-pixel text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed selection:bg-blue-500/30 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="font-semibold tracking-tight text-white flex items-center gap-2">
            <div className="w-2 h-2 rounded-none bg-blue-500" />
            GrowthOS
          </Link>
          
          <nav className="hidden md:flex gap-1 text-sm font-medium">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative px-3 py-1.5 rounded-md transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="admin-nav-indicator"
                      className="absolute inset-0 bg-white/10 rounded-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-none h-2 w-2 bg-emerald-500"></span>
            </span>
            LIVE
          </div>
          <div className="hidden sm:block border-l border-white/10 h-4 pl-4">Campaign Day: 4 / 7</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}

