'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import { TONE_HEX, type PixelTone } from '../../utils/tones';

interface PixelBadgeProps {
  tone?: PixelTone;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function PixelBadge({ tone = 'cyan', children, className, dot }: PixelBadgeProps) {
  const hex = tone === 'default' || tone === 'muted' ? '#8f88c9' : TONE_HEX[tone];
  return (
    <span
      className={cn('px-frame-sm inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-1 font-px text-[10px] uppercase tracking-wider', className)}
      style={{ '--b': `${hex}80`, color: hex, background: `${hex}14` } as React.CSSProperties}>
      
      {dot && <span className="glow-pulse h-1.5 w-1.5" style={{ background: hex }} aria-hidden />}
      {children}
    </span>);

}

