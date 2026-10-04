'use client';
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { seeded } from '../../utils/random';
import { cn } from '../../utils/cn';

interface PixelParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
  rise?: number;
}

export function PixelParticles({ count = 24, colors = ['#3ef2ff', '#ff3fa4', '#b6ff3b'], className, rise = 70 }: PixelParticlesProps) {
  const reduce = useReducedMotion();
  const parts = useMemo(
    () =>
    Array.from({ length: count }, (_, i) => ({
      left: seeded(i * 7.3 + 1) * 100,
      top: seeded(i * 3.1 + 2) * 100,
      size: 2 + Math.floor(seeded(i * 1.7 + 3) * 3),
      dur: 6 + seeded(i * 5.9 + 4) * 8,
      delay: seeded(i * 2.2 + 5) * 6,
      color: colors[i % colors.length]
    })),
    [count, colors]
  );

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {parts.map((p, i) =>
      <motion.span
        key={i}
        className="absolute"
        style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, background: p.color }}
        initial={{ opacity: reduce ? 0.6 : 0 }}
        animate={reduce ? undefined : { y: [0, -rise], opacity: [0, 0.9, 0] }}
        transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }} />

      )}
    </div>);

}

