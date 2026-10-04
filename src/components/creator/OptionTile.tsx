'use client';
import React from 'react';
import { PixelCharacter } from '../pixel/PixelCharacter';
import type { CharacterConfig } from '../../types/character';
import { cn } from '../../utils/cn';

interface OptionTileProps {
  label: string;
  preview: CharacterConfig;
  selected: boolean;
  onSelect: () => void;
  showEffect?: boolean;
}

export function OptionTile({ label, preview, selected, onSelect, showEffect = false }: OptionTileProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'px-frame-sm group flex flex-col items-center gap-2 bg-void/80 px-2 pb-2.5 pt-3 transition-[background-color,box-shadow] duration-150',
        selected ? 'bg-lime/10 [--b:#b6ff3b]' : '[--b:#2f2670] hover:bg-deep hover:[--b:#5546c9]'
      )}>
      
      <span className="flex h-[78px] items-end justify-center overflow-hidden">
        <PixelCharacter config={preview} size={52} idle={selected} shadow={false} showEffect={showEffect} />
      </span>
      <span className={cn('w-full truncate text-center font-px text-[9px] tracking-wider', selected ? 'text-lime' : 'text-ink/80')}>{label}</span>
    </button>);

}

