'use client';
import { motion } from 'framer-motion';

export function DataStreamBG() {
  const streams = [
  {
    "id": 0,
    "x": 1.73,
    "delay": -2.23,
    "duration": 4.02,
    "height": 20.36
  },
  {
    "id": 1,
    "x": 5.83,
    "delay": -1.07,
    "duration": 4.59,
    "height": 42.99
  },
  {
    "id": 2,
    "x": 11.7,
    "delay": -3.03,
    "duration": 4.45,
    "height": 21.5
  },
  {
    "id": 3,
    "x": 16.08,
    "delay": -3.78,
    "duration": 6.68,
    "height": 21.98
  },
  {
    "id": 4,
    "x": 20.46,
    "delay": -1.81,
    "duration": 6.98,
    "height": 22.17
  },
  {
    "id": 5,
    "x": 25.13,
    "delay": -1.1,
    "duration": 5.14,
    "height": 22.9
  },
  {
    "id": 6,
    "x": 30.24,
    "delay": -4.64,
    "duration": 6.52,
    "height": 49.37
  },
  {
    "id": 7,
    "x": 36.03,
    "delay": -2.51,
    "duration": 6.68,
    "height": 29.91
  },
  {
    "id": 8,
    "x": 40.32,
    "delay": -3.4,
    "duration": 6.77,
    "height": 24.69
  },
  {
    "id": 9,
    "x": 46.42,
    "delay": -4.75,
    "duration": 6.97,
    "height": 44.75
  },
  {
    "id": 10,
    "x": 50.49,
    "delay": -3.21,
    "duration": 4.63,
    "height": 20.42
  },
  {
    "id": 11,
    "x": 56.54,
    "delay": -1.74,
    "duration": 4.57,
    "height": 45.15
  },
  {
    "id": 12,
    "x": 60.72,
    "delay": -2.46,
    "duration": 4.24,
    "height": 31.53
  },
  {
    "id": 13,
    "x": 66.12,
    "delay": -2.95,
    "duration": 4.39,
    "height": 28.18
  },
  {
    "id": 14,
    "x": 71.64,
    "delay": -0.95,
    "duration": 6.84,
    "height": 23.26
  },
  {
    "id": 15,
    "x": 75.29,
    "delay": -2.84,
    "duration": 5.05,
    "height": 43.1
  },
  {
    "id": 16,
    "x": 81.37,
    "delay": -1.81,
    "duration": 5.84,
    "height": 41.66
  },
  {
    "id": 17,
    "x": 85.88,
    "delay": -2.25,
    "duration": 6.01,
    "height": 25.18
  },
  {
    "id": 18,
    "x": 90.82,
    "delay": -1.41,
    "duration": 5.68,
    "height": 42.81
  },
  {
    "id": 19,
    "x": 96.84,
    "delay": -3.81,
    "duration": 4.6,
    "height": 22.59
  }
];

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
