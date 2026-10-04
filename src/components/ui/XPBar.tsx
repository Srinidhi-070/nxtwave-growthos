'use client';

import { motion } from 'framer-motion';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
}

export default function XPBar({ currentXP, maxXP, level }: XPBarProps) {
  const percentage = Math.min(100, Math.max(0, (currentXP / maxXP) * 100));

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2 font-pixel tracking-widest uppercase">
        <div className="text-amber-400 text-xl">Level {level < 10 ? `0${level}` : level}</div>
        <div className="text-slate-400 text-sm">
          <span className="text-white">{currentXP}</span> / {maxXP} XP
        </div>
      </div>
      <div className="h-4 w-full bg-slate-900 border-2 border-slate-700 p-0.5 pixel-corners relative overflow-hidden">
        <motion.div 
          className="h-full bg-amber-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.2 }}
        />
        {/* Shine effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20" />
      </div>
    </div>
  );
}

