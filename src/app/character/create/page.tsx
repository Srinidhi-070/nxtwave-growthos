'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterRenderer, { CharacterConfig } from '@/components/character/CharacterRenderer';
import PixelButton from '@/components/ui/PixelButton';

const CATEGORIES = ['BODY', 'FACE', 'HAIR', 'COLOR', 'OUTFIT', 'ACCESSORY', 'EFFECT'];

const OPTIONS: Record<string, string[]> = {
  BODY: ['base'],
  FACE: ['default', 'happy', 'cool'],
  HAIR: ['none', 'short', 'spiky', 'long'],
  COLOR: ['black', 'brown', 'blonde', 'blue', 'pink', 'purple', 'green', 'white'],
  OUTFIT: ['explorer', 'builder', 'hacker', 'analyst', 'creator', 'researcher'],
  ACCESSORY: ['none', 'headphones', 'glasses', 'backpack'],
  EFFECT: ['none', 'glow', 'particles', 'scanline'],
};

export default function CharacterCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cinematic, setCinematic] = useState(false);
  const [activeCategory, setActiveCategory] = useState('HAIR');
  
  const [config, setConfig] = useState<CharacterConfig>({
    body: 'base',
    face: 'default',
    hair: 'short',
    hairColor: 'black',
    outfit: 'explorer',
    accessory: 'none',
    effect: 'none',
  });
  
  const [explorerName, setExplorerName] = useState('');
  
  // Try to load name from localStorage if they just registered
  useEffect(() => {
    const savedName = localStorage.getItem('growthos_temp_name');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedName) setExplorerName(savedName.split(' ')[0]);
  }, []);

  const randomize = () => {
    setConfig({
      body: 'base',
      face: OPTIONS.FACE[Math.floor(Math.random() * OPTIONS.FACE.length)],
      hair: OPTIONS.HAIR[Math.floor(Math.random() * OPTIONS.HAIR.length)],
      hairColor: OPTIONS.COLOR[Math.floor(Math.random() * OPTIONS.COLOR.length)],
      outfit: OPTIONS.OUTFIT[Math.floor(Math.random() * OPTIONS.OUTFIT.length)],
      accessory: OPTIONS.ACCESSORY[Math.floor(Math.random() * OPTIONS.ACCESSORY.length)],
      effect: OPTIONS.EFFECT[Math.floor(Math.random() * OPTIONS.EFFECT.length)],
    });
  };

  const handleSave = async () => {
    setLoading(true);
    
    // In a real app we'd save to the DB here via a POST request
    // For now we simulate the delay and transition
    setTimeout(() => {
      localStorage.setItem('growthos_character', JSON.stringify(config));
      localStorage.setItem('growthos_explorer_name', explorerName || 'Explorer');
      
      setCinematic(true);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 4000);
    }, 800);
  };

  if (cinematic) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="z-10 flex flex-col items-center"
        >
          <CharacterRenderer config={config} size="xl" animating={true} />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <h1 className="text-3xl font-pixel text-blue-400 mb-4 tracking-widest uppercase">
              AI EXPLORER INITIALIZED
            </h1>
            <p className="text-white font-mono text-xl mb-8 uppercase">WELCOME, {explorerName || 'EXPLORER'}</p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-green-400 font-pixel text-xl tracking-widest bg-green-900/30 px-6 py-3 border border-green-500 pixel-corners inline-block"
            >
              +100 XP<br/><br/>
              <span className="text-sm text-slate-300">QUEST UNLOCKED:</span><br/>
              BUILD YOUR CREW
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  const categoryKey = activeCategory === 'COLOR' ? 'hairColor' : activeCategory.toLowerCase();

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col lg:flex-row text-white overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none"></div>
      
      {/* LEFT: Category Nav */}
      <div className="w-full lg:w-64 bg-slate-900/80 border-r border-slate-800 z-10 flex flex-row lg:flex-col p-4 overflow-x-auto lg:overflow-y-auto shrink-0">
        <div className="mb-8 hidden lg:block">
          <h2 className="text-xs font-pixel text-blue-400 tracking-widest mb-1">PHASE 02</h2>
          <h1 className="text-xl font-bold uppercase tracking-tight">Create Explorer</h1>
        </div>
        
        <div className="flex flex-row lg:flex-col gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-3 text-left font-pixel text-sm tracking-widest transition-colors whitespace-nowrap ${activeCategory === cat ? 'bg-blue-600 text-white pixel-corners' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CENTER: Preview */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10 relative">
        <div className="absolute top-8 text-center w-full max-w-md">
          <h2 className="text-sm font-sans font-medium text-slate-400 uppercase tracking-widest">Choose how you enter the world</h2>
        </div>
        
        <div className="relative">
          <CharacterRenderer config={config} size="xl" />
        </div>
      </div>

      {/* RIGHT: Options */}
      <div className="w-full lg:w-80 bg-slate-900/80 border-l border-slate-800 z-10 flex flex-col p-6 shrink-0 h-64 lg:h-auto overflow-y-auto">
        <h3 className="font-pixel tracking-widest text-blue-400 mb-6">{activeCategory} OPTIONS</h3>
        
        <div className="grid grid-cols-2 gap-3 mb-8">
          {OPTIONS[activeCategory].map(opt => {
            const isActive = config[categoryKey as keyof CharacterConfig] === opt;
            return (
              <button
                key={opt}
                onClick={() => setConfig({ ...config, [categoryKey]: opt })}
                className={`px-3 py-3 text-center text-xs font-pixel tracking-widest uppercase transition-all ${isActive ? 'bg-white text-slate-900 pixel-corners shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
        
        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="mb-6">
            <label className="block text-xs font-pixel text-slate-400 mb-2 tracking-widest">EXPLORER NAME</label>
            <input 
              type="text" 
              value={explorerName}
              onChange={(e) => setExplorerName(e.target.value)}
              placeholder="e.g. NeuralFox"
              className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white focus:border-blue-500 outline-none font-sans"
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <PixelButton variant="secondary" onClick={randomize} className="w-full text-xs">
              [RANDOMIZE]
            </PixelButton>
            <PixelButton variant="primary" onClick={handleSave} disabled={loading} className="w-full text-sm">
              {loading ? 'INITIALIZING...' : 'ENTER THE WORLD'}
            </PixelButton>
          </div>
        </div>
      </div>
    </main>
  );
}
