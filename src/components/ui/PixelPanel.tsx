'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface PixelPanelProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  title?: string;
  className?: string;
  innerClassName?: string;
}

export default function PixelPanel({ 
  children, 
  title,
  className = '', 
  innerClassName = '',
  ...props 
}: PixelPanelProps) {
  return (
    <motion.div 
      className={`relative bg-slate-900 border-4 border-slate-700 p-1 pixel-corners shadow-[8px_8px_0px_rgba(0,0,0,0.5)] ${className}`}
      {...props}
    >
      {/* Decorative corner dots */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-slate-600" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-slate-600" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-slate-600" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-slate-600" />

      {title && (
        <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-slate-400 font-pixel text-sm uppercase tracking-widest z-10">
          {title}
        </div>
      )}

      <div className={`bg-slate-950 p-4 border border-slate-800 h-full ${innerClassName}`}>
        {children}
      </div>
    </motion.div>
  );
}
