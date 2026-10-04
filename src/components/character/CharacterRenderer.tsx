import React from 'react';
import { motion } from 'framer-motion';

export interface CharacterConfig {
  body: string;
  face: string;
  hair: string;
  hairColor: string;
  outfit: string;
  accessory: string;
  effect: string;
}

interface CharacterRendererProps {
  config?: CharacterConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animating?: boolean;
}

const colorMap: Record<string, string> = {
  black: '#111827',
  brown: '#78350f',
  blonde: '#fef08a',
  blue: '#3b82f6',
  pink: '#ec4899',
  purple: '#8b5cf6',
  green: '#10b981',
  white: '#f9fafb',
};

const outfitColorMap: Record<string, { main: string, accent: string }> = {
  explorer: { main: '#374151', accent: '#9ca3af' }, // gray
  builder: { main: '#b45309', accent: '#fb923c' }, // orange
  hacker: { main: '#064e3b', accent: '#10b981' }, // green
  analyst: { main: '#1e3a8a', accent: '#60a5fa' }, // blue
  creator: { main: '#831843', accent: '#f472b6' }, // pink
  researcher: { main: '#f3f4f6', accent: '#374151' }, // white/black
};

export default function CharacterRenderer({ 
  config = {
    body: 'base',
    face: 'default',
    hair: 'none',
    hairColor: 'black',
    outfit: 'explorer',
    accessory: 'none',
    effect: 'none'
  },
  size = 'md',
  className = '',
  animating = true
}: CharacterRendererProps) {
  
  const sizeStyles = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  const hairFill = colorMap[config.hairColor] || colorMap['black'];
  const outfitData = outfitColorMap[config.outfit] || outfitColorMap['explorer'];

  // Render a modular pixel-art style SVG
  return (
    <div className={`relative flex items-center justify-center ${sizeStyles[size]} ${className}`}>
      {/* Background Effect */}
      {config.effect === 'glow' && (
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
      )}
      {config.effect === 'particles' && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
           <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2)_0%,transparent_70%)] animate-pulse" />
        </div>
      )}
      {config.effect === 'scanline' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[size:100%_4px]" />
      )}

      {/* Character Container */}
      <motion.div 
        className="relative w-full h-full"
        animate={animating ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" shapeRendering="crispEdges" role="img" aria-label="AI Explorer Avatar">
          
          {/* BODY */}
          <rect x="35" y="40" width="30" height="40" fill={outfitData.main} />
          {/* Shoulders / Neck */}
          <rect x="42" y="35" width="16" height="5" fill="#fca5a5" />
          
          {/* FACE/HEAD */}
          <rect x="30" y="15" width="40" height="25" fill="#fca5a5" />
          
          {/* EYES */}
          {config.face === 'default' && (
            <>
              <rect x="40" y="25" width="4" height="4" fill="#000" />
              <rect x="56" y="25" width="4" height="4" fill="#000" />
            </>
          )}
          {config.face === 'happy' && (
            <>
              <rect x="38" y="24" width="6" height="2" fill="#000" />
              <rect x="56" y="24" width="6" height="2" fill="#000" />
            </>
          )}
          {config.face === 'cool' && (
            <>
              {/* Sunglasses */}
              <rect x="34" y="24" width="32" height="6" fill="#111" />
              <rect x="42" y="24" width="16" height="2" fill="#fff" opacity="0.3" />
            </>
          )}

          {/* MOUTH */}
          <rect x="45" y="32" width="10" height="2" fill="#ef4444" opacity="0.8" />

          {/* HAIR */}
          {config.hair === 'short' && (
            <path d="M 30 15 L 70 15 L 70 20 L 30 20 Z" fill={hairFill} />
          )}
          {config.hair === 'spiky' && (
            <path d="M 30 15 L 40 5 L 50 15 L 60 5 L 70 15 L 70 20 L 30 20 Z" fill={hairFill} />
          )}
          {config.hair === 'long' && (
            <>
              <path d="M 30 15 L 70 15 L 70 20 L 30 20 Z" fill={hairFill} />
              <rect x="25" y="15" width="5" height="20" fill={hairFill} />
              <rect x="70" y="15" width="5" height="20" fill={hairFill} />
            </>
          )}

          {/* OUTFIT DETAILS */}
          <rect x="40" y="45" width="20" height="20" fill={outfitData.accent} />
          <rect x="48" y="40" width="4" height="25" fill="#111" opacity="0.2" />

          {/* ACCESSORY */}
          {config.accessory === 'headphones' && (
            <>
              <path d="M 28 20 Q 50 -5 72 20" fill="none" stroke="#fff" strokeWidth="3" />
              <rect x="24" y="18" width="6" height="12" fill="#ef4444" />
              <rect x="70" y="18" width="6" height="12" fill="#ef4444" />
            </>
          )}
          {config.accessory === 'glasses' && (
            <>
              <rect x="36" y="23" width="12" height="8" fill="none" stroke="#000" strokeWidth="2" />
              <rect x="52" y="23" width="12" height="8" fill="none" stroke="#000" strokeWidth="2" />
              <rect x="48" y="26" width="4" height="2" fill="#000" />
            </>
          )}
          {config.accessory === 'backpack' && (
            <>
              <rect x="25" y="40" width="10" height="25" fill="#ca8a04" />
              <rect x="65" y="40" width="10" height="25" fill="#ca8a04" />
            </>
          )}

        </svg>
      </motion.div>
    </div>
  );
}
