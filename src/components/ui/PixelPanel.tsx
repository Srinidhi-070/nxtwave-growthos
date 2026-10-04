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
      className={`relative ${title ? 'pt-3' : ''} ${className}`}
      {...props}
    >
      {title && (
        <div className="absolute top-0 left-4 bg-slate-950 px-2 text-blue-400 font-pixel text-sm uppercase tracking-widest z-10 border border-slate-700 border-b-0 pixel-corners-top">
          {title}
        </div>
      )}
      <div className="relative bg-slate-900 border-4 border-slate-700 p-1 pixel-corners shadow-[8px_8px_0px_rgba(0,0,0,0.5)] h-full flex flex-col">
        {/* Decorative corner dots */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-slate-600" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-slate-600" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-slate-600" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-slate-600" />

        <div className={`bg-slate-950 p-4 border border-slate-800 flex-1 ${innerClassName}`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

