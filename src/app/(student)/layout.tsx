'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, MapIcon, UsersIcon, Building2Icon, UserIcon } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { SoundToggle } from '@/components/pixel/SoundToggle';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { usePlayer } from '@/contexts/PlayerContext';
import { pad2, useCountdown } from '@/hooks/useCountdown';
import { cn } from '@/utils/cn';

const NAV = [
  { href: '/dashboard', label: 'Base' },
  { href: '/quests', label: 'Quests' },
  { href: '/crew', label: 'Crew' },
  
  { href: '/project', label: 'Lab' },
  { href: '/leaderboard', label: 'Ranks' },
  
];

const MOBILE_NAV = [
  { href: '/dashboard', label: 'Base', Icon: HomeIcon },
  { href: '/quests', label: 'Quests', Icon: MapIcon },
  { href: '/crew', label: 'Crew', Icon: UsersIcon },
  
  { href: '/character/create', label: 'Me', Icon: UserIcon }
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { character, explorerName, level } = usePlayer();
  const { days, hours, minutes } = useCountdown();
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-full bg-void text-ink">
      <header className="sticky top-0 z-40 border-b-2 border-line bg-void/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-center gap-8">
            <Logo href="/dashboard" />
            <nav className="hidden items-center gap-1 lg:flex" aria-label="World">
              {NAV.map((n) => {
                const isActive = pathname === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={cn(
                      'relative px-3 py-2 font-px text-[11px] tracking-widest transition-colors duration-150',
                      isActive ? 'text-lime' : 'text-ink/70 hover:text-cyan'
                    )}
                  >
                    {n.label}
                    {isActive && <span className="absolute inset-x-3 -bottom-[13px] h-[3px] bg-lime" />}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden items-center gap-3 md:flex">
              <div className="flex items-center gap-2">
                <span className="font-px text-[10px] text-mute">LVL</span>
                <span className="font-term text-xl font-bold text-lime">{pad2(level)}</span>
              </div>
              <div className="h-6 w-px bg-line" />
              <div className="flex items-center gap-1.5 font-term text-lg">
                <span className="text-amber">T-</span>
                <span className="text-ink">{pad2(days)}:{pad2(hours)}:{pad2(minutes)}</span>
              </div>
            </div>
            <SoundToggle compact />
            <Link href="/character/create" className="group relative flex h-10 items-center gap-3 bg-panel px-3 transition-colors hover:bg-line">
              <div className="absolute inset-y-0 left-0 w-1 bg-cyan opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="font-px text-[10px] text-ink/80 group-hover:text-ink">{explorerName}</div>
              <div className="relative h-7 w-7 bg-deep outline outline-1 outline-line/50 overflow-hidden rounded-sm">
                <PixelCharacter config={character} size={24} idle={true} />
              </div>
            </Link>
          </div>
        </div>
      </header>
      <main className="relative z-10 w-full pb-20 lg:pb-0">
        {children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t-2 border-line bg-void/95 px-2 backdrop-blur-sm lg:hidden">
        {MOBILE_NAV.map((n) => {
          const isActive = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                'flex flex-col items-center gap-1.5 p-2 transition-colors duration-150',
                isActive ? 'text-lime' : 'text-ink/60 hover:text-cyan'
              )}
            >
              <n.Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="font-px text-[9px] tracking-wider">{n.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}




