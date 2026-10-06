'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function PixelParticles() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; s: number; d: number }[]>([]);

  useEffect(() => {
    const p = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 1, // Size
      d: Math.random() * 15 + 10, // Duration
    }));
    setParticles(p);
  }, []);

  if (!particles.length) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-cyan/60 shadow-[0_0_8px_rgba(62,242,255,0.8)]"
          style={{
            width: p.s * 2,
            height: p.s * 2,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: ['0%', '-500%'],
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
