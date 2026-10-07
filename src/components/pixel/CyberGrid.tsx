'use client';
import React from 'react';
import { motion } from 'framer-motion';

export function CyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-30" aria-hidden="true">
      {/* Perspective wrapper */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: 'rotateX(60deg) translateY(100px)',
            backgroundImage: 'linear-gradient(to right, rgba(62, 242, 255, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(62, 242, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px 40px']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {/* Edge fade */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050314_60%)]" />
        </motion.div>
      </div>
    </div>
  );
}

