'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LiveEvent } from '../../hooks/useLiveEvents';
import { EVENT_TYPES } from '../../data/ops';
import { cn } from '../../utils/cn';

interface EventStreamProps {
  events: LiveEvent[];
  compact?: boolean;
  max?: number;
}

/** PixelEventStream */
export function EventStream({ events, compact = false, max }: EventStreamProps) {
  const list = max ? events.slice(0, max) : events;
  return (
    <ol className="relative" aria-live="polite" aria-label="Live events">
      <AnimatePresence initial={false}>
        {list.map((e, i) => {
          const color = EVENT_TYPES[e.type] ?? '#8f88c9';
          return (
            <motion.li
              key={e.id}
              layout="position"
              initial={{ opacity: 0, y: -10, backgroundColor: `${color}22` }}
              animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(0,0,0,0)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1], backgroundColor: { duration: 1.2 } }}
              className={cn('flex items-center gap-3 border-b border-line/40', compact ? 'py-2' : 'px-2 py-2.5')}>
              
              <span className="w-[64px] shrink-0 font-mono text-[11px] text-mute">{e.time}</span>
              <span className="h-2 w-2 shrink-0" style={{ background: color }} aria-hidden />
              <span className={cn('shrink-0 font-mono text-[12px] font-medium', compact ? 'w-[170px] truncate' : 'w-[200px]')} style={{ color }}>
                {e.type}
              </span>
              <span className="min-w-0 flex-1 truncate text-[13px] text-ink/85">
                <span className="text-ink">{e.actor}</span>
                <span className="text-mute"> · {e.meta}</span>
              </span>
              {i === 0 && !compact && <span className="font-px text-[9px] tracking-widest text-lime">NEW</span>}
            </motion.li>);

        })}
      </AnimatePresence>
    </ol>);

}
