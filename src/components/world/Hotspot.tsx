'use client';
import React from 'react';
import Link from 'next/link';

interface HotspotProps {
  label: string;
  to: string;
  x: number;
  y: number;
  color: string;
  desc?: string;
}

export function Hotspot({ label, to, x, y, color, desc }: HotspotProps) {
  return (
    <Link
      href={to}
      className="group absolute z-20 -translate-x-1/2 -translate-y-full focus-visible:outline-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-label={desc ? `${label}: ${desc}` : label}>
      
      <span className="flex flex-col items-center">
        <span
          className="px-frame-sm flex items-center gap-2 bg-void/90 px-2.5 py-1.5 font-px text-[10px] tracking-widest text-ink transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5"
          style={{ '--b': color } as React.CSSProperties}>
          
          <span className="h-1.5 w-1.5" style={{ background: color }} />
          {label}
        </span>
        {desc &&
        <span className="pointer-events-none mt-2 w-48 translate-y-1 bg-void/95 p-2 text-center font-term text-lg leading-tight text-ink/90 opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {desc}
          </span>
        }
        <span className="h-4 w-[2px]" style={{ background: color }} />
        <span className="relative flex h-3 w-3 items-center justify-center">
          <span className="glow-pulse absolute h-5 w-5 border-2" style={{ borderColor: color }} />
          <span className="h-2 w-2" style={{ background: color }} />
        </span>
      </span>
    </Link>);

}

