'use client';

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
  explorer: { main: '#ffffff', accent: '#a78bfa' },
  builder: { main: '#fb923c', accent: '#9a3412' },
  hacker: { main: '#10b981', accent: '#064e3b' },
  analyst: { main: '#60a5fa', accent: '#1e3a8a' },
  creator: { main: '#f472b6', accent: '#831843' },
  researcher: { main: '#111827', accent: '#f9fafb' },
};

export default function CharacterRenderer({ 
  config = {
    body: 'base',
    face: 'default',
    hair: 'none',
    hairColor: 'pink',
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

  const outfitData = outfitColorMap[config.outfit] || outfitColorMap.explorer;
  const screenColor = colorMap[config.hairColor] || colorMap.pink;

  return (
    <div className={`relative flex items-center justify-center ${sizeStyles[size]} ${className}`}>
      {/* Background Effect */}
      {config.effect === 'glow' && (
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-none" />
      )}
      {config.effect === 'scanline' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[size:100%_4px]" />
      )}

      {/* Character Container */}
      <motion.div 
        className="relative w-full h-full"
        animate={animating ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" shapeRendering="crispEdges" role="img" aria-label="AI Explorer Avatar">
          
          {/* ACCESSORY (Tail behind) */}
          {(config.accessory === 'tail' || config.accessory === 'none') && (
            <path d="M 25 70 L 15 70 L 15 65 L 10 65 L 10 60 L 5 60 L 5 65 L 10 65 L 10 75 L 25 75 Z" fill="#ffffff" />
          )}

          {/* LEGS/BOOTS */}
          <rect x="35" y="80" width="12" height="8" fill={outfitData.accent} />
          <rect x="53" y="80" width="12" height="8" fill={outfitData.accent} />
          <rect x="35" y="85" width="12" height="3" fill="#ffffff" />
          <rect x="53" y="85" width="12" height="3" fill="#ffffff" />

          {/* MAIN BODY HOODIE */}
          <path d="M 30 40 L 70 40 L 75 45 L 75 75 L 65 80 L 35 80 L 25 75 L 25 45 Z" fill={outfitData.main} />
          
          {/* HOODIE DETAILS */}
          <rect x="20" y="55" width="8" height="15" fill={outfitData.accent} />
          <rect x="72" y="55" width="8" height="15" fill={outfitData.accent} />
          <rect x="42" y="70" width="4" height="4" fill="#a78bfa" />
          <rect x="54" y="70" width="4" height="4" fill="#a78bfa" />

          {/* EARS/ANTENNA */}
          <rect x="32" y="25" width="8" height="15" fill="#ffffff" />
          <rect x="60" y="25" width="8" height="15" fill="#ffffff" />
          <rect x="34" y="27" width="4" height="6" fill="#f472b6" />
          <rect x="62" y="27" width="4" height="6" fill="#f472b6" />

          {/* FACE SCREEN */}
          <rect x="38" y="45" width="24" height="18" fill={screenColor} />
          
          {/* EYES/MOUTH */}
          <rect x="41" y="49" width="4" height="4" fill="#000" />
          <rect x="55" y="49" width="4" height="4" fill="#000" />
          
          {config.face === 'default' && (
            <rect x="48" y="55" width="4" height="2" fill="#000" />
          )}
          {config.face === 'happy' && (
            <path d="M 46 54 L 54 54 L 54 56 L 52 58 L 48 58 L 46 56 Z" fill="#000" />
          )}
          {config.face === 'surprised' && (
            <rect x="48" y="53" width="4" height="4" fill="#000" />
          )}
        </svg>
      </motion.div>
    </div>
  );
}

