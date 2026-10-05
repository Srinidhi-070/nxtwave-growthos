'use client';
import React from 'react';
import Link from 'next/link';

const MARK = ['.CCCCC.', 'CC.....', 'C......', 'C...LLL', 'C.....C', 'CC...CC', '.CCCCC.'];

export function LogoMark({ size = 22 }: {size?: number;}) {
  return (
    <svg viewBox="0 0 7 7" width={size} height={size} shapeRendering="crispEdges" aria-hidden>
      {MARK.flatMap((row, y) =>
      row.split('').map((ch, x) =>
      ch === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={ch === 'L' ? '#b6ff3b' : '#3ef2ff'} />
      )
      )}
    </svg>);

}

export function Logo({ href = '/', sub }: {href?: string;sub?: string;}) {
  return (
    <Link href={href} className="flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-pixel text-[11px] tracking-tight text-ink">
          GROWTH<span className="text-cyan">OS</span>
        </span>
        {sub && <span className="mt-1 font-px text-[9px] tracking-widest text-mute">{sub}</span>}
      </span>
    </Link>);

}



