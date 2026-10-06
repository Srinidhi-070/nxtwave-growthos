'use client';
import { motion } from 'framer-motion';

export function RadarSweepBG() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-void pointer-events-none" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
        {/* Concentric circles */}
        <div className="absolute inset-0 rounded-full border border-lime/10" />
        <div className="absolute inset-[15%] rounded-full border border-lime/20" />
        <div className="absolute inset-[30%] rounded-full border border-lime/10" />
        <div className="absolute inset-[45%] rounded-full border border-lime/20" />
        
        {/* Crosshairs */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-lime/10 -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-lime/10 -translate-y-1/2" />
        
        {/* Radar Sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 70%, rgba(182, 255, 59, 0.1) 100%)',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050214_70%)]" />
    </div>
  );
}
