'use client';
import React from 'react';
import { cn } from '../../utils/cn';

interface OpsPanelProps {
  title?: string;
  meta?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

/** PixelAnalyticsPanel — restrained telemetry container with pixel-notched frame. */
export function OpsPanel({ title, meta, className, bodyClassName, children }: OpsPanelProps) {
  return (
    <section className={cn('px-frame-sm relative bg-[#0b0924] [--b:#221c55]', className)}>
      {title &&
      <header className="flex items-center justify-between gap-3 border-b border-line/60 px-4 py-2.5">
          <h2 className="font-px text-[10px] tracking-[0.2em] text-mute">{title}</h2>
          {meta && <div className="font-mono text-[11px] text-mute">{meta}</div>}
        </header>
      }
      <div className={cn('p-4', bodyClassName)}>{children}</div>
    </section>);

}

export function OpsPageHeader({ eyebrow, title, right }: {eyebrow: string;title: string;right?: React.ReactNode;}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-px text-[10px] tracking-[0.25em] text-teal">{eyebrow}</p>
        <h1 className="mt-2 font-pixel text-[16px] text-ink md:text-[20px]">{title}</h1>
      </div>
      {right}
    </div>);

}
