'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TONE_HEX, type PixelTone } from '../../utils/tones';

interface PixelXPBarProps {
  value: number;
  max: number;
  segments?: number;
  tone?: PixelTone;
  label?: string;
  showLabel?: boolean;
  delay?: number;
  className?: string;
}

export function PixelXPBar({ value, max, segments = 20, tone = 'lime', label = 'XP', showLabel = true, delay = 0, className }: PixelXPBarProps) {
  const filled = Math.round(Math.min(value, max) / max * segments);
  const hex = TONE_HEX[tone];
  return (
    <div className={className}>
      {showLabel &&
      <div className="mb-1.5 flex items-center justify-between font-px text-[10px] tracking-wider">
          <span className="text-mute">{label}</span>
          <span className="text-ink">
            {value} / {max}
          </span>
        </div>
      }
      <div
        className="px-frame-sm flex gap-[2px] bg-void p-[3px]"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}>
        
        {Array.from({ length: segments }).map((_, i) =>
        <motion.span
          key={i}
          className="h-2.5 flex-1"
          initial={{ opacity: 0.12 }}
          animate={{ opacity: i < filled ? 1 : 0.12 }}
          transition={{ delay: delay + i * 0.035, duration: 0.12, ease: 'easeOut' }}
          style={{ background: i < filled ? hex : '#3b2f8f' }} />

        )}
      </div>
    </div>);

}

