'use client';
import { motion } from 'framer-motion';

export function HexGridBG() {
  // We'll create a simple CSS repeating linear gradient that looks like a honeycomb
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-void pointer-events-none" aria-hidden="true">
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #ff3fa4 12%, transparent 12.5%, transparent 87%, #ff3fa4 87.5%, #ff3fa4),
            linear-gradient(150deg, #ff3fa4 12%, transparent 12.5%, transparent 87%, #ff3fa4 87.5%, #ff3fa4),
            linear-gradient(30deg, #ff3fa4 12%, transparent 12.5%, transparent 87%, #ff3fa4 87.5%, #ff3fa4),
            linear-gradient(150deg, #ff3fa4 12%, transparent 12.5%, transparent 87%, #ff3fa4 87.5%, #ff3fa4),
            linear-gradient(60deg, #ff3fa477 25%, transparent 25.5%, transparent 75%, #ff3fa477 75%, #ff3fa477),
            linear-gradient(60deg, #ff3fa477 25%, transparent 25.5%, transparent 75%, #ff3fa477 75%, #ff3fa477)
          `,
          backgroundSize: '40px 70px',
          backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px'
        }}
        animate={{ y: [0, 70] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
    </div>
  );
}
