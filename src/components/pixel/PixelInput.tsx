'use client';
import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface PixelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  prompt?: string;
}

export const PixelInput = forwardRef<HTMLInputElement, PixelInputProps>(function PixelInput(
{ label, error, hint, prompt = '>', className, id, ...rest },
ref)
{
  const inputId = id ?? `in-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-2 block font-px text-[11px] tracking-wider text-cyan">
        {label}
      </label>
      <div
        className={cn(
          'px-frame-sm flex h-12 items-center gap-2 bg-void px-3',
          error ? '[--b:#ff4d5e]' : '[--b:#3b2f8f] focus-within:[--b:#3ef2ff]'
        )}>
        
        <span className="font-term text-2xl leading-none text-lime" aria-hidden>
          {prompt}
        </span>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error || hint ? `${inputId}-msg` : undefined}
          className="min-w-0 flex-1 bg-transparent font-term text-2xl leading-none text-ink outline-none placeholder:text-mute/50"
          {...rest} />
        
      </div>
      {(error || hint) &&
      <p id={`${inputId}-msg`} className={cn('mt-2 font-term text-lg', error ? 'text-danger' : 'text-mute')}>
          {error ? `ERR // ${error}` : hint}
        </p>
      }
    </div>);

});



