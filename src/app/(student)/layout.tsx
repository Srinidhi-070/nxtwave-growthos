'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PixelPanel from '@/components/ui/PixelPanel';
import CharacterRenderer, { CharacterConfig } from '@/components/character/CharacterRenderer';
import XPBar from '@/components/ui/XPBar';

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
    <div className="relative min-h-screen bg-slate-950 overflow-hidden text-slate-200 font-sans flex flex-col md:flex-row">
      {/* Global Background */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* LEFT: HUD Sidebar */}
      <aside className="relative z-10 w-full md:w-72 lg:w-80 p-4 md:p-6 shrink-0 md:h-screen md:overflow-y-auto flex flex-col gap-6">
        
        <PixelPanel className="bg-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 p-4">
          <div className="flex flex-col items-center">
            
            {/* Character Mini Preview */}
            <div className="relative w-24 h-24 bg-slate-950 border-2 border-slate-700 pixel-corners flex items-center justify-center mb-4 overflow-hidden">
               {characterConfig ? (
                 <CharacterRenderer config={characterConfig} size="md" animating={false} className="scale-75" />
               ) : (
                 <div className="text-[10px] font-pixel text-slate-600">NO SIGNAL</div>
               )}
            </div>

            <h2 className="font-pixel text-blue-400 text-xl tracking-wider uppercase mb-1 text-center">
              {explorerName}
            </h2>
            <div className="text-xs text-slate-400 font-pixel tracking-widest mb-6">AI EXPLORER</div>
            
            <XPBar currentXP={stats.currentXP} maxXP={stats.maxXP} level={stats.level} />
          </div>
        </PixelPanel>

        <PixelPanel className="bg-slate-900 p-2">
          <nav className="flex flex-col gap-1">
            {navItems.map(item => {
              const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`w-full text-left font-pixel px-4 py-3 text-sm tracking-widest uppercase transition-colors pixel-corners ${isActive ? 'bg-blue-900/50 text-blue-400 border border-blue-500/50' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'}`}
                >
                  {isActive && <span className="text-blue-500 mr-2">- </span>}
                  {!isActive && <span className="opacity-0 mr-2">- </span>}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </PixelPanel>

      </aside>

      {/* RIGHT: Main Content */}
      <main className="relative z-10 flex-1 p-4 md:p-6 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
