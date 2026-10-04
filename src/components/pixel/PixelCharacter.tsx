'use client';
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { CharacterConfig } from '../../types/character';
import { accentOf, buildSprite } from '../../utils/sprite';
import { cn } from '../../utils/cn';

interface PixelCharacterProps {
  config: CharacterConfig;
  size?: number;
  idle?: boolean;
  walking?: boolean;
  flip?: boolean;
  showEffect?: boolean;
  shadow?: boolean;
  dim?: boolean;
  className?: string;
  label?: string;
}

const SPARKS = [
{ x: -8, y: 20, d: 0 },
{ x: 104, y: 30, d: 0.6 },
{ x: -4, y: 60, d: 1.2 },
{ x: 100, y: 70, d: 0.3 },
{ x: 50, y: -6, d: 0.9 },
{ x: 14, y: 4, d: 1.5 }];


export function PixelCharacter({
  config,
  size = 128,
  idle = true,
  walking = false,
  flip = false,
  showEffect = true,
  shadow = true,
  dim = false,
  className,
  label
}: PixelCharacterProps) {
  const pixels = useMemo(() => buildSprite(config), [config]);
  const accent = accentOf(config);
  const reduce = useReducedMotion();
  const height = size * 22 / 16;
  const effect = showEffect ? config.effect : 'none';
  const px = size / 16;

  return (
    <div
      className={cn('relative inline-block shrink-0', className)}
      style={{ width: size, height: height + (shadow ? px * 1.5 : 0) }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}>
      
      {effect === 'pulse' && !reduce &&
      <motion.div
        className="absolute left-1/2 border-2"
        style={{ bottom: 0, width: size * 0.9, height: px * 3, marginLeft: -size * 0.45, borderColor: accent }}
        animate={{ scale: [0.5, 1.3], opacity: [0.9, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }} />

      }
      {shadow &&
      <div
        className="absolute left-1/2 bg-black/50"
        style={{ bottom: 0, width: size * 0.62, height: px * 1.5, marginLeft: -size * 0.31 }} />

      }
      <div className={cn(idle && !dim && (walking ? 'px-bob-fast' : 'px-bob'))} style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
        <svg
          viewBox="0 0 16 22"
          width={size}
          height={height}
          shapeRendering="crispEdges"
          style={{
            filter: dim ?
            'brightness(0.15) saturate(0)' :
            effect === 'aura' ?
            `drop-shadow(0 0 ${Math.max(2, px * 1.2)}px ${accent}aa)` :
            undefined
          }}>
          
          {pixels.map((p) =>
          <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width={1.02} height={1.02} fill={p.c} />
          )}
        </svg>
      </div>
      {effect === 'sparks' &&
      SPARKS.map((s, i) =>
      <motion.span
        key={i}
        className="absolute"
        style={{ left: `${s.x}%`, top: `${s.y}%`, width: px, height: px, background: i % 2 ? accent : '#ffffff' }}
        animate={reduce ? undefined : { opacity: [0, 1, 0], y: [0, -px * 2] }}
        transition={{ duration: 1.6, delay: s.d, repeat: Infinity, ease: 'easeOut' }} />

      )}
    </div>);

}

