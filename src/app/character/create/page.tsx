'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterRenderer, { CharacterConfig } from '@/components/character/CharacterRenderer';
import PixelButton from '@/components/ui/PixelButton';
import PixelEnvironment from '@/components/ui/PixelEnvironment';

const CATEGORIES = ['FACE', 'HAIR', 'COLOR', 'OUTFIT', 'ACCESSORY', 'EFFECT'];

const OPTIONS: Record<string, string[]> = {
  FACE: ['default', 'happy', 'surprised'],
  HAIR: ['none', 'cat', 'rabbit', 'antenna'], // We mapped hair to ears
  COLOR: ['pink', 'blue', 'green', 'purple', 'blonde'], // Face screen color
  OUTFIT: ['explorer', 'builder', 'hacker', 'analyst', 'creator', 'researcher'],
  ACCESSORY: ['none', 'tail'],
  EFFECT: ['none', 'glow', 'scanline'],
};

export default function CharacterCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cinematic, setCinematic] = useState(false);
  const [activeCategory, setActiveCategory] = useState('OUTFIT');
  
  const [config, setConfig] = useState<CharacterConfig>({
    body: 'base',
    face: 'default',
    hair: 'none',
    hairColor: 'pink',
    outfit: 'explorer',
    accessory: 'none',
    effect: 'none'
  });
  
  const [explorerName, setExplorerName] = useState('');

  // Handle randomization
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
    try {
      setLoading(true);
      const userId = localStorage.getItem('growthos_user_id');
      if (!userId) {
        throw new Error('User ID not found. Please register first.');
      }

      const res = await fetch('/api/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          displayName: explorerName || 'Explorer',
          config
        })
      });

      if (!res.ok) {
        throw new Error('Failed to save character');
      }

      localStorage.setItem('growthos_character', JSON.stringify(config));
      localStorage.setItem('growthos_explorer_name', explorerName || 'Explorer');
      
      setCinematic(true);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 4000);

    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Something went wrong');
      setLoading(false);
    }
  };

  if (cinematic) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
        {/* Cinematic Initialization Sequence */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(59,130,246,0.1)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative z-20 mb-8"
        >
          <CharacterRenderer config={config} size="xl" animating={true} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative z-20 flex flex-col gap-4 items-center"
        >
          <h2 className="font-pixel text-4xl text-white tracking-widest text-shadow-glow-blue uppercase">AI EXPLORER INITIALIZED</h2>
          <div className="text-2xl font-pixel text-blue-400 tracking-wider">[{explorerName || 'EXPLORER'}]</div>
          
          <div className="mt-8 flex gap-4">
            <span className="px-4 py-2 bg-slate-800 border border-slate-600 text-slate-300 font-pixel text-xs tracking-widest">LEVEL 01</span>
            <span className="px-4 py-2 bg-blue-900 border border-blue-500 text-blue-300 font-pixel text-xs tracking-widest">+100 XP</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 text-green-400 font-pixel text-sm tracking-widest border border-green-500/50 bg-green-900/20 px-6 py-3"
          >
            FIRST QUEST UNLOCKED: BUILD YOUR CREW
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0a0710] flex flex-col items-center justify-center overflow-hidden">
      
      {/* --- PIXEL ENVIRONMENT BACKGROUND --- */}
      {/* Use AWAKE state: the lab lights are on but the action hasn't started yet */}
      <PixelEnvironment worldState="AWAKE" />
      
      {/* Overlay to dim the background for UI contrast */}
      <div className="absolute inset-0 z-0 bg-slate-950/70 mix-blend-multiply pointer-events-none" />

      {/* Main UI Container */}
      <div className="relative z-10 w-full max-w-6xl h-full min-h-[80vh] grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
        
        {/* HEADER */}
        <div className="col-span-full mb-2">
          <h1 className="font-pixel text-3xl text-white tracking-widest uppercase">CREATE EXPLORER</h1>
          <p className="font-pixel text-xs text-slate-400 tracking-widest mt-2 uppercase">INITIALIZE YOUR CAMPUS IDENTITY</p>
        </div>

        {/* LEFT COLUMN: CATEGORIES */}
        <div className="col-span-1 md:col-span-3 flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-pixel text-xs tracking-widest px-4 py-4 border text-left whitespace-nowrap transition-none ${
                activeCategory === cat 
                  ? 'bg-blue-600 border-blue-400 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]' 
                  : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CENTER COLUMN: CHARACTER PREVIEW */}
        <div className="col-span-1 md:col-span-6 flex flex-col items-center justify-center relative">
          
          {/* Environment pedestal/backdrop for the character */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-64 h-64 border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite] border-t-cyan-400" />
             <div className="absolute w-48 h-48 border border-magenta-500/30 rounded-full animate-[spin_8s_linear_infinite_reverse] border-b-magenta-400" />
             {/* Floor grid */}
             <div className="absolute bottom-10 w-64 h-24 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.2)_0%,transparent_70%)]" style={{ transform: 'rotateX(70deg)' }} />
          </div>

          <div className="relative z-10 bg-slate-900/40 backdrop-blur-sm border-2 border-slate-700 p-8 pt-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center w-full max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={JSON.stringify(config)}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mb-8"
              >
                <CharacterRenderer config={config} size="xl" />
              </motion.div>
            </AnimatePresence>
            
            <div className="w-full mt-4">
              <label className="block font-pixel text-[10px] text-cyan-400 mb-2 tracking-widest uppercase">EXPLORER ALIAS</label>
              <input
                type="text"
                maxLength={15}
                value={explorerName}
                onChange={(e) => setExplorerName(e.target.value.toUpperCase())}
                placeholder="ENTER NAME_"
                className="w-full bg-slate-950 border border-slate-700 px-4 py-3 font-pixel text-white text-lg tracking-widest focus:outline-none focus:border-cyan-400 transition-none placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: OPTIONS & ACTIONS */}
        <div className="col-span-1 md:col-span-3 flex flex-col h-full">
          
          {/* Options Grid */}
          <div className="bg-slate-900/80 border border-slate-700 p-4 mb-4 flex-grow overflow-y-auto">
            <div className="font-pixel text-[10px] text-slate-500 mb-4 tracking-widest uppercase">SELECT {activeCategory}</div>
            <div className="grid grid-cols-2 gap-2">
              {OPTIONS[activeCategory]?.map(opt => {
                // Map config keys based on active category
                let currentVal = '';
                if (activeCategory === 'FACE') currentVal = config.face;
                if (activeCategory === 'HAIR') currentVal = config.hair;
                if (activeCategory === 'COLOR') currentVal = config.hairColor;
                if (activeCategory === 'OUTFIT') currentVal = config.outfit;
                if (activeCategory === 'ACCESSORY') currentVal = config.accessory;
                if (activeCategory === 'EFFECT') currentVal = config.effect;

                const isSelected = currentVal === opt;
                
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      if (activeCategory === 'FACE') setConfig({...config, face: opt});
                      if (activeCategory === 'HAIR') setConfig({...config, hair: opt});
                      if (activeCategory === 'COLOR') setConfig({...config, hairColor: opt});
                      if (activeCategory === 'OUTFIT') setConfig({...config, outfit: opt});
                      if (activeCategory === 'ACCESSORY') setConfig({...config, accessory: opt});
                      if (activeCategory === 'EFFECT') setConfig({...config, effect: opt});
                    }}
                    className={`font-pixel text-[10px] tracking-widest px-2 py-3 border uppercase transition-none ${
                      isSelected 
                        ? 'bg-cyan-900 border-cyan-400 text-cyan-100' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <PixelButton 
              variant="secondary" 
              onClick={randomize}
              className="w-full text-xs py-3"
            >
              RANDOMIZE
            </PixelButton>
            
            <PixelButton 
              variant="primary" 
              onClick={handleSave}
              disabled={loading || !explorerName.trim()}
              className="w-full text-sm py-4"
            >
              {loading ? 'SAVING...' : 'SAVE EXPLORER'}
            </PixelButton>
          </div>
        </div>

      </div>
    </main>
  );
}

