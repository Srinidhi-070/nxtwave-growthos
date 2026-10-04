'use client';
import React from 'react';
import { cn } from '../../utils/cn';

interface CrtOverlayProps {
  sweep?: boolean;
  className?: string;
}

export function CrtOverlay({ sweep = false, className }: CrtOverlayProps) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="crt-lines absolute inset-0 opacity-60" />
      {sweep && <div className="scan-sweep absolute inset-x-0 top-0 h-[10%] bg-cyan/[0.06]" />}
    </div>);

}

