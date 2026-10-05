'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ActivityIcon, UsersIcon, ShieldAlertIcon, BeakerIcon, NetworkIcon, TerminalIcon, CpuIcon, MapPinIcon, LayoutDashboardIcon, DatabaseIcon } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { cn } from '@/utils/cn';
import { useLiveEvents } from '@/hooks/useLiveEvents';

const ADMIN_GROUPS = [
  {
    label: 'TELEMETRY',
    items: [
      { href: '/admin', label: 'Overview', Icon: LayoutDashboardIcon },
      { href: '/admin/funnel', label: 'Funnel Yield', Icon: ActivityIcon },
      { href: '/admin/campuses', label: 'Campus Grid', Icon: MapPinIcon }
    ]
  },
  {
    label: 'NETWORK',
    items: [
      { href: '/admin/graph', label: 'Referral Graph', Icon: NetworkIcon },
      { href: '/admin/events', label: 'Event Stream', Icon: TerminalIcon },
      { href: '/admin/journey', label: 'Journey Inspector', Icon: UsersIcon }
    ]
  },
  {
    label: 'ENGINE',
    items: [
      { href: '/admin/ai', label: 'Growth Copilot', Icon: CpuIcon },
      { href: '/admin/experiments', label: 'Experiments', Icon: BeakerIcon },
      { href: '/admin/risk', label: 'Risk & Fraud', Icon: ShieldAlertIcon },
      { href: '/admin/system', label: 'System Health', Icon: DatabaseIcon }
    ]
  }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const connected = true;
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-void text-ink font-mono overflow-hidden selection:bg-cyan/30">
      <CrtOverlay className="opacity-30" />
      <aside className="relative z-20 flex w-[280px] flex-col border-r border-line bg-void/90 backdrop-blur-md">
        <div className="flex h-16 shrink-0 items-center border-b border-line px-6">
          <Logo href="/admin" />
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
          <div className="mb-8 flex items-center gap-3 rounded-sm border border-line-hi/30 bg-deep p-3">
            <div className={cn("h-2 w-2 rounded-full", connected ? "bg-lime animate-pulse shadow-[0_0_8px_#b6ff3b]" : "bg-danger")} />
            <div>
              <div className="text-[10px] text-mute uppercase tracking-widest">System Status</div>
              <div className="text-xs font-semibold tracking-wide text-ink">{connected ? 'ONLINE & SYNCED' : 'OFFLINE'}</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {ADMIN_GROUPS.map((g) => (
              <div key={g.label}>
                <div className="mb-2 px-2 text-[10px] font-bold tracking-[0.2em] text-mute">{g.label}</div>
                <ul className="flex flex-col gap-1">
                  {g.items.map(({ href, label, Icon }) => {
                    const isActive = pathname === href;
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={cn(
                            'flex items-center gap-3 px-2 py-2 text-[13px] transition-colors duration-150',
                            isActive ? 'bg-panel text-cyan' : 'text-ink/60 hover:bg-panel/50 hover:text-ink'
                          )}
                        >
                          <Icon className={cn("h-4 w-4", isActive ? "text-cyan" : "text-mute")} />
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-line p-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-magenta/20 text-magenta">
              <ShieldAlertIcon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider text-ink">ADMIN ID: 0x9A</div>
              <div className="text-[10px] text-mute">Clearance: Level 4</div>
            </div>
          </div>
        </div>
      </aside>
      <main className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
        {children}
      </main>
    </div>
  );
}

