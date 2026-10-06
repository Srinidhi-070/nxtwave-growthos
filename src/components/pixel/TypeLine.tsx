'use client';
import React from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { cn } from '../../utils/cn';

interface TypeLineProps {
  text: string;
  prefix?: string;
  delay?: number;
  speed?: number;
  className?: string;
  keepCursor?: boolean;
}

export function TypeLine({ text, prefix = '>', delay = 0, speed = 24, className, keepCursor = false }: TypeLineProps) {
  const { text: shown, done } = useTypewriter(text, speed, delay);
  return (
    <p className={cn('font-term text-xl leading-snug', className)} aria-label={`${prefix} ${text}`}>
      <span aria-hidden={true}>
        {prefix && <span className="mr-2 text-lime">{prefix}</span>}
        {shown}
        {(!done || keepCursor) && <span className="cursor-blink ml-0.5 inline-block h-[0.9em] w-[0.5em] translate-y-[2px] bg-cyan" />}
      </span>
    </p>);

}


