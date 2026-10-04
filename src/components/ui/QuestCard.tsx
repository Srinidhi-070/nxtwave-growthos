'use client';

import { motion } from 'framer-motion';

interface QuestCardProps {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
  isActive?: boolean;
}

export default function QuestCard({ title, description, xpReward, isCompleted, isActive = false }: QuestCardProps) {
  return (
    <motion.div 
      whileHover={!isCompleted ? { scale: 1.02 } : {}}
      className={`relative p-4 border-2 pixel-corners transition-colors ${
        isCompleted 
          ? 'bg-slate-900/50 border-slate-800 opacity-60' 
          : isActive 
            ? 'bg-blue-950/40 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
            : 'bg-slate-900 border-slate-700'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-pixel tracking-wider uppercase ${isCompleted ? 'text-slate-500' : 'text-slate-200'}`}>
          {title}
        </h3>
        <span className={`font-pixel text-sm px-2 py-0.5 border ${
          isCompleted ? 'bg-slate-800 text-slate-500 border-slate-700' : 'bg-amber-900/40 text-amber-400 border-amber-700/50'
        }`}>
          +{xpReward} XP
        </span>
      </div>
      <p className={`text-sm font-pixel text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed ${isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
        {description}
      </p>

      {isCompleted && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] pointer-events-none">
          <div className="border-4 border-emerald-500/80 text-emerald-500/80 font-pixel text-2xl px-4 py-1 tracking-widest uppercase shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            COMPLETED
          </div>
        </div>
      )}
    </motion.div>
  );
}


