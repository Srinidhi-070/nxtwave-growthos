'use client';
import React from 'react';
import { PixelPanel } from './PixelPanel';
import { cn } from '../../utils/cn';
import { TONE_HEX, type PixelTone } from '../../utils/tones';

interface PixelWindowProps {
  title: string;
  tone?: PixelTone;
  right?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

export function PixelWindow({ title, tone = 'default', right, className, bodyClassName, children }: PixelWindowProps) {
  const dot = tone === 'default' || tone === 'muted' ? '#5546c9' : TONE_HEX[tone];
  return (
    <PixelPanel tone={tone} className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between gap-3 border-b-2 border-line px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0" style={{ background: dot }} aria-hidden />
          <h2 className="truncate font-px text-[11px] tracking-wider text-ink">{title}</h2>
        </div>
        {right ??
        <div className="flex gap-1" aria-hidden>
            <span className="h-1.5 w-1.5 bg-line-hi" />
            <span className="h-1.5 w-1.5 bg-line-hi" />
            <span className="h-1.5 w-1.5 bg-line-hi" />
          </div>
        }
      </div>
      <div className={cn('flex-1 p-4', bodyClassName)}>{children}</div>
    </PixelPanel>);

}

