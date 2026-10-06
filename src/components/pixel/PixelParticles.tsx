'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PixelParticlesProps {
  count?: number;
  colors?: string[];
  rise?: number;
}

export function PixelParticles({ count = 15, colors = ['#3ef2ff'], rise = 500 }: PixelParticlesProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; s: number; d: number; c: string }[]>([]);

  useEffect(() => {
    const p = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 1, // Size
      d: Math.random() * 15 + 10, // Duration
      c: colors[i % colors.length]
    }));
    setParticles(p);
  }, [count, colors]);

  if (!particles.length) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            width: p.s * 2,
            height: p.s * 2,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.c,
            boxShadow: `0 0 8px ${p.c}CC`
          }}
          animate={{
            y: ['0%', `-${rise}%`],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: "linear",
            delay: (p.id * 0.5) % 5
          }}
        />
      ))}
    </div>
  );
}
