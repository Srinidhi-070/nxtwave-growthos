'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PixelPanel from '@/components/ui/PixelPanel';
import CharacterRenderer, { CharacterConfig } from '@/components/character/CharacterRenderer';
import XPBar from '@/components/ui/XPBar';
import PixelEnvironment from '@/components/ui/PixelEnvironment';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const [characterConfig, setCharacterConfig] = useState<CharacterConfig | null>(null);
  const [explorerName, setExplorerName] = useState('EXPLORER');
  
  // Real stats from DB
  const [stats, setStats] = useState({ currentXP: 0, maxXP: 300, level: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('growthos_user_id');
        if (!userId) {
          // fallback if not logged in
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/user/profile?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch profile');

        const { data } = await res.json();
        
        if (data.character) {
           // eslint-disable-next-line react-hooks/set-state-in-effect
           setCharacterConfig({
             body: data.character.body,
             face: data.character.face,
             hair: data.character.hair,
             hairColor: data.character.hairColor,
             outfit: data.character.outfit,
             accessory: data.character.accessory,
             effect: data.character.effect,
           });
           // eslint-disable-next-line react-hooks/set-state-in-effect
           setExplorerName(data.character.displayName);
        } else {
           // Fallback to local if they haven't saved to DB yet
           const saved = localStorage.getItem('growthos_character');
           // eslint-disable-next-line react-hooks/set-state-in-effect
           if (saved) setCharacterConfig(JSON.parse(saved));
        }

        if (data.stats) {
           // eslint-disable-next-line react-hooks/set-state-in-effect
           setStats(data.stats);
        }
      } catch (err) {
        console.error(err);
      } finally {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const navItems = [
    { label: 'MY LAB', path: '/dashboard' },
    { label: 'QUESTS', path: '/quests' },
    { label: 'WORKSHOP', path: '/workshop' },
    { label: 'MY CREW', path: '/crew' },
    { label: 'PROJECT', path: '/project' },
    { label: 'LEADERBOARD', path: '/leaderboard' },
  ];

  if (loading) return null;

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-200 font-pixel text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed flex flex-col md:flex-row md:h-screen md:overflow-hidden">
      {/* Global Background */}
      <div className="fixed inset-0 z-0"><PixelEnvironment worldState="ACTIVE" /><div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply pointer-events-none" /></div>

      {/* LEFT: HUD Sidebar */}
      <aside className="relative z-10 w-full md:w-72 lg:w-80 p-4 md:p-6 shrink-0 md:h-screen md:overflow-y-auto flex flex-col gap-4 md:gap-6 border-b md:border-b-0 border-slate-800">
        
        <PixelPanel className="bg-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 p-4">
          <div className="flex flex-col items-center">
            
            {/* Character Mini Preview */}
            <div className="relative w-16 h-16 md:w-24 md:h-24 bg-slate-950 border-2 border-slate-700 pixel-corners flex items-center justify-center mb-4 overflow-hidden">
               {characterConfig ? (
                 <CharacterRenderer config={characterConfig} size="sm" animating={false} className="md:scale-75" />
               ) : (
                 <div className="text-[8px] md:text-[10px] font-pixel text-slate-600">NO SIGNAL</div>
               )}
            </div>

            <h2 className="font-pixel text-blue-400 text-lg md:text-xl tracking-wider uppercase mb-1 text-center">
              {explorerName}
            </h2>
            <div className="text-[10px] md:text-xs text-slate-400 font-pixel tracking-widest mb-6">AI EXPLORER</div>
            
            <XPBar currentXP={stats.currentXP} maxXP={stats.maxXP} level={stats.level} />
          </div>
        </PixelPanel>

        <PixelPanel className="bg-slate-900 p-2 overflow-x-auto">
          <nav className="flex flex-row md:flex-col gap-1 w-max md:w-full">
            {navItems.map(item => {
              const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex-1 md:w-full text-center md:text-left font-pixel px-3 py-2 md:px-4 md:py-3 text-[10px] md:text-sm tracking-widest uppercase transition-colors pixel-corners whitespace-nowrap ${isActive ? 'bg-blue-900/50 text-blue-400 border border-blue-500/50' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'}`}
                >
                  <span className="hidden md:inline">{isActive ? '- ' : <span className="opacity-0">- </span>}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </PixelPanel>

      </aside>

      {/* RIGHT: Main Content */}
      <main className="relative z-10 flex-1 p-4 md:p-6 w-full md:h-screen md:overflow-y-auto">
        {children}
      </main>
    </div>
  );
}



