'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'magenta' | 'cyan' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  icon?: React.ReactNode;
}

const VARIANTS: Record<Variant, {cls: string;border: string;}> = {
  primary: { cls: 'bg-lime text-void', border: '#79b51c' },
  magenta: { cls: 'bg-magenta text-void', border: '#b8246f' },
  cyan: { cls: 'bg-cyan text-void', border: '#1aa6c0' },
  ghost: { cls: 'bg-void/70 text-ink', border: '#5546c9' },
  danger: { cls: 'bg-danger text-void', border: '#a8283a' }
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3 text-[11px] gap-1.5',
  md: 'h-11 px-5 text-[12px] gap-2',
  lg: 'h-14 px-7 text-[15px] gap-2.5'
};

export function PixelButton({ variant = 'primary', size = 'md', href, icon, className, children, style, ...rest }: PixelButtonProps) {
  const v = VARIANTS[variant];
  const classes = cn(
    'px-btn inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap font-px font-bold uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-50',
    v.cls,
    SIZES[size],
    className
  );
  const s = { '--b': v.border, ...style } as React.CSSProperties;
  if (href) {
    return (
      <Link href={href} className={classes} style={s}>
        {icon}
        {children}
      </Link>);

  }
  return (
    <button className={classes} style={s} {...rest}>
      {icon}
      {children}
    </button>);

}



