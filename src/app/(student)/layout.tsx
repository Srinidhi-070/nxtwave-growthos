'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PixelPanel from '@/components/ui/PixelPanel';
import CharacterRenderer, { CharacterConfig } from '@/components/character/CharacterRenderer';
import XPBar from '@/components/ui/XPBar';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [characterConfig, setCharacterConfig] = useState<CharacterConfig | null>(null);
  const [explorerName, setExplorerName] = useState('EXPLORER');
  
  const [loading, setLoading] = useState(true);

  // Load character data (mocking DB load via localStorage for now)
  useEffect(() => {
    const saved = localStorage.getItem('growthos_character');
    const savedName = localStorage.getItem('growthos_explorer_name');
    
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCharacterConfig(JSON.parse(saved));
    } else {
      // Fallback
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCharacterConfig({
        body: 'base', face: 'default', hair: 'none', hairColor: 'black', outfit: 'explorer', accessory: 'none', effect: 'none'
      });
    }
    if (savedName) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExplorerName(savedName);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, []);

  const navItems = [
    { label: 'MY LAB', path: '/dashboard' },
    { label: 'QUESTS', path: '/quests' },
    { label: 'WORKSHOP', path: '/workshop' },
    { label: 'MY CREW', path: '/crew' },
    { label: 'PROJECT', path: '/project' },
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
               {characterConfig && (
                 <CharacterRenderer config={characterConfig} size="md" animating={false} className="scale-75" />
               )}
            </div>

            <h2 className="font-pixel text-blue-400 text-xl tracking-wider uppercase mb-1 text-center">
              {explorerName}
            </h2>
            <div className="text-xs text-slate-400 font-pixel tracking-widest mb-6">AI EXPLORER</div>
            
            {/* Real calculation based on backend (mocked here for now) */}
            <XPBar currentXP={100} maxXP={300} level={1} />
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
