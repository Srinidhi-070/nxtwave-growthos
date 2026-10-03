'use client';

import { useState, useEffect } from 'react';
import PixelPanel from '@/components/ui/PixelPanel';
import CharacterRenderer, { CharacterConfig } from '@/components/character/CharacterRenderer';
import PixelButton from '@/components/ui/PixelButton';

const MODULES = ['IDEA', 'DATA', 'MODEL', 'APP', 'SHIP'];

export default function ProjectPassportPage() {
  const [characterConfig, setCharacterConfig] = useState<CharacterConfig | null>(null);
  
  // Hardcoded for UI demo. In reality fetched from DB `Project` model
  const [currentStep, setCurrentStep] = useState(1); 

  useEffect(() => {
    const saved = localStorage.getItem('growthos_character');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setCharacterConfig(JSON.parse(saved));
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
      <div className="shrink-0 mb-2">
        <h1 className="text-3xl font-pixel text-white tracking-widest mb-1 uppercase">AI Project Passport</h1>
        <p className="text-sm text-slate-400 font-sans">Track your build progress and unlock lab upgrades.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: The Console */}
        <PixelPanel className="bg-slate-900 border-slate-700 h-full flex flex-col">
           <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
             <div>
               <div className="text-[10px] text-blue-400 font-pixel tracking-widest uppercase mb-1">PROJECT STATUS</div>
               <div className="text-xl text-white font-pixel uppercase tracking-widest">
                 {currentStep === 0 ? 'NOT STARTED' : currentStep >= MODULES.length ? 'SHIPPED' : 'IN PROGRESS'}
               </div>
             </div>
             <div className="bg-slate-950 border border-slate-700 px-3 py-2 pixel-corners text-xs text-slate-400 font-mono">
               SYS.VER: 1.0.4
             </div>
           </div>

           <div className="flex-1 space-y-6">
             {MODULES.map((mod, i) => {
               const isComplete = i < currentStep;
               const isActive = i === currentStep;
               return (
                 <div key={mod} className={`flex items-center gap-4 ${isComplete ? 'opacity-100' : isActive ? 'opacity-100' : 'opacity-40'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${isComplete ? 'bg-green-500 border-green-500' : isActive ? 'bg-blue-500 border-blue-400 animate-pulse' : 'bg-slate-900 border-slate-600'}`}>
                     {isComplete && <span className="text-slate-900 font-bold font-sans">✓</span>}
                   </div>
                   <div className="flex-1 border-b border-dashed border-slate-700 pb-2">
                     <div className={`font-pixel text-sm tracking-widest uppercase ${isComplete ? 'text-green-400' : isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                       {mod}
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>

           <div className="mt-8">
             <PixelButton variant={currentStep >= MODULES.length ? 'secondary' : 'primary'} className="w-full">
               {currentStep === 0 ? 'START BUILD' : currentStep >= MODULES.length ? 'VIEW DEPLOYMENT' : 'CONTINUE BUILD'}
             </PixelButton>
           </div>
        </PixelPanel>

        {/* Right: Character & Lab visual */}
        <div className="bg-[#0a0f1c] border-2 border-slate-800 pixel-corners relative min-h-[400px] flex items-center justify-center overflow-hidden">
          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          <div className="relative z-10 scale-125 transform translate-y-12">
            {characterConfig && <CharacterRenderer config={characterConfig} size="xl" />}
          </div>

          {/* Hologram Project Console */}
          <div className="absolute bottom-12 right-12 w-32 h-32 opacity-80">
            <div className="w-full h-full border-t border-r border-blue-500 rounded-tr-3xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-blue-500/20" />
              {currentStep > 0 && (
                <div className="absolute top-4 right-4 text-[8px] font-pixel text-blue-400 leading-tight text-right">
                  COMPILING...<br/>
                  [{'='.repeat(currentStep)}{'.'.repeat(5 - currentStep)}]<br/>
                  {currentStep * 20}%
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
