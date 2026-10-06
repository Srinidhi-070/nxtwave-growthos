'use client';
import { motion } from 'framer-motion';

export function CircuitBG() {
  const nodes = [
    { x: 10, y: 20 }, { x: 30, y: 15 }, { x: 50, y: 40 }, { x: 80, y: 30 },
    { x: 20, y: 60 }, { x: 45, y: 70 }, { x: 70, y: 65 }, { x: 90, y: 80 },
    { x: 15, y: 85 }, { x: 35, y: 90 }, { x: 65, y: 15 }, { x: 85, y: 55 }
  ];

  const lines = [
    { x1: 10, y1: 20, x2: 30, y2: 15 },
    { x1: 30, y1: 15, x2: 50, y2: 40 },
    { x1: 50, y1: 40, x2: 80, y2: 30 },
    { x1: 10, y1: 20, x2: 20, y2: 60 },
    { x1: 20, y1: 60, x2: 45, y2: 70 },
    { x1: 45, y1: 70, x2: 70, y2: 65 },
    { x1: 80, y1: 30, x2: 85, y2: 55 },
    { x1: 85, y1: 55, x2: 90, y2: 80 },
    { x1: 20, y1: 60, x2: 15, y2: 85 },
    { x1: 15, y1: 85, x2: 35, y2: 90 },
    { x1: 50, y1: 40, x2: 70, y2: 65 },
    { x1: 30, y1: 15, x2: 65, y2: 15 }
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-void pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
        {lines.map((l, i) => (
          <line 
            key={i} 
            x1={l.x1 + '%'} y1={l.y1 + '%'} 
            x2={l.x2 + '%'} y2={l.y2 + '%'} 
            stroke="#ffc94a" 
            strokeWidth="2" 
            strokeDasharray="4 4"
          />
        ))}
        {nodes.map((n, i) => (
          <circle 
            key={i} 
            cx={n.x + '%'} cy={n.y + '%'} 
            r="4" 
            fill="#0c0822" 
            stroke="#ffc94a" 
            strokeWidth="2" 
          />
        ))}
      </svg>

      {/* Pulses traveling along random paths */}
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-amber shadow-[0_0_8px_2px_rgba(255,201,74,0.6)]"
          initial={{ left: '-10%', top: '-10%' }}
          animate={{
            left: [ lines[i*2].x1 + '%', lines[i*2].x2 + '%', (lines[i*2+1]?.x2 || lines[0].x1) + '%' ],
            top: [ lines[i*2].y1 + '%', lines[i*2].y2 + '%', (lines[i*2+1]?.y2 || lines[0].y1) + '%' ]
          }}
          transition={{
            duration: 4 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-void via-transparent to-void/90" />
    </div>
  );
}
