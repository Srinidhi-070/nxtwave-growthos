'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckIcon, LockIcon } from 'lucide-react';
import type { QuestState } from '../../data/quests';
import { cn } from '../../utils/cn';

interface PixelQuestNodeProps {
  index: number;
  title: string;
  state: QuestState;
  selected: boolean;
  onSelect: () => void;
  labelSide?: 'top' | 'bottom';
}

const COLORS: Record<QuestState, string> = { done: '#b6ff3b', active: '#3ef2ff', locked: '#3b2f8f' };

export function PixelQuestNode({ index, title, state, selected, onSelect, labelSide = 'bottom' }: PixelQuestNodeProps) {
  const reduce = useReducedMotion();
  const color = COLORS[state];
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${title}, ${state === 'done' ? 'completed' : state === 'active' ? 'in progress' : 'locked'}`}
      className="group relative flex items-center justify-center focus-visible:outline-none">
      
      <span className="relative flex h-12 w-12 items-center justify-center">
        {state === 'active' && !reduce &&
        <motion.span
          className="absolute inset-0 border-2"
          style={{ borderColor: color }}
          animate={{ scale: [1, 1.5], opacity: [0.9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }} />

        }
        <span
          className={cn('relative flex h-11 w-11 rotate-45 items-center justify-center transition-transform duration-150 ease-out group-hover:scale-110 group-focus-visible:scale-110', selected && 'scale-110')}
          style={{
            background: state === 'locked' ? '#140f3a' : '#07051a',
            boxShadow: `0 0 0 3px ${color}${selected ? ', 0 0 0 6px #07051a, 0 0 0 8px #ffffff' : ''}`
          }}>
          
          {state === 'done' &&
          <span className="glow-pulse absolute inset-[6px]" style={{ background: `${color}40` }} aria-hidden />
          }
          <span className="-rotate-45">
            {state === 'done' ?
            <CheckIcon className="h-4 w-4 text-lime" /> :
            state === 'locked' ?
            <LockIcon className="h-3.5 w-3.5 text-mute/70" /> :

            <span className="font-pixel text-[11px] text-cyan">{String(index + 1).padStart(2, '0')}</span>
            }
          </span>
        </span>
      </span>
      <span
        className={cn(
          'absolute whitespace-nowrap bg-void/90 px-2 py-1 font-px text-[10px] tracking-widest z-10',
          labelSide === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
          state === 'locked' ? 'text-mute' : state === 'active' ? 'text-cyan' : 'text-lime'
        )}>
        
        {title}
      </span>
    </button>);

}


