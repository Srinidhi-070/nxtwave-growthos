'use client';
import { motion } from 'framer-motion';

export function DataStreamBG() {
  const streams = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: (i * 5) + Math.random() * 2,
    delay: Math.random() * -5,
    duration: Math.random() * 3 + 4,
    height: Math.random() * 30 + 20,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-void pointer-events-none" aria-hidden="true">
      {streams.map((s) => (
        <motion.div
          key={s.id}
          className="absolute top-0 w-px bg-gradient-to-b from-transparent via-magenta to-transparent"
          style={{
            left: `${s.x}%`,
            height: `${s.height}%`,
            opacity: 0.3
          }}
          animate={{ y: ['-100vh', '100vh'] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
