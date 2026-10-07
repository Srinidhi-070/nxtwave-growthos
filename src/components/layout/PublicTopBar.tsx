'use client';
import React from 'react';
import Link from 'next/link';
import { Logo } from '../brand/Logo';
import { SoundToggle } from '../pixel/SoundToggle';
import { PixelButton } from '../pixel/PixelButton';
import { cn } from '../../utils/cn';

interface PublicTopBarProps {
  label?: string;
  hideCta?: boolean;
}

export function PublicTopBar({ label, hideCta }: PublicTopBarProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 md:px-10">
        <div className="flex items-center gap-6">
          <Logo />
          {label ?
          <span className="hidden font-px text-[10px] tracking-widest text-mute md:inline">{'//'} {label}</span> :

          <nav className="hidden items-center gap-5 md:flex" aria-label="Public">
              {[
            { to: '/login', label: 'Login' },
            { to: '/admin', label: 'Admin (Staff)' },
            ].
            map((l) =>
            <Link
              key={l.to}
              href={l.to}
              className="text-white/60 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-sm transition-colors">
              
                  {l.label}
                </Link>
            )}
            </nav>
          }
        </div>
        <div className="flex items-center gap-3">
          <SoundToggle />
          {!hideCta &&
          <PixelButton href="/register" size="sm" className="hidden sm:inline-flex">
              Enter
            </PixelButton>
          }
        </div>
      </div>
    </header>);

}







