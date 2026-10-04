'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface PixelButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  className?: string;
}

export default function PixelButton({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: PixelButtonProps) {
  
  const baseStyles = "relative inline-flex items-center justify-center font-pixel text-xl uppercase tracking-widest outline-none pixel-corners px-6 py-3 ";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 border-b-4 border-blue-900 active:border-b-0 active:translate-y-1",
    secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 border-b-4 border-slate-950 active:border-b-0 active:translate-y-1",
    accent: "bg-amber-500 text-amber-950 hover:bg-amber-400 border-b-4 border-amber-700 active:border-b-0 active:translate-y-1",
    danger: "bg-red-600 text-white hover:bg-red-500 border-b-4 border-red-900 active:border-b-0 active:translate-y-1",
  };

  return (
    <motion.button
      
      
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">{children}</span>
    </motion.button>
  );
}


