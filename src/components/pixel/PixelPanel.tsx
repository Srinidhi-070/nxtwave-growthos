'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import { TONE_HEX, type PixelTone } from '../../utils/tones';

interface PixelPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: PixelTone;
  size?: 'sm' | 'md';
}

export function PixelPanel({ tone = 'default', size = 'md', className, style, children, ...rest }: PixelPanelProps) {
  return (
    <div
      className={cn(size === 'sm' ? 'px-frame-sm' : 'px-frame', 'relative bg-panel/90', className)}
      style={{ '--b': TONE_HEX[tone], ...style } as React.CSSProperties}
      {...rest}>
      
      {children}
    </div>);

}

