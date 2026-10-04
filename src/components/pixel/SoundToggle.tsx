'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Volume2Icon, VolumeXIcon } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';

export function SoundToggle({ compact = false }: {compact?: boolean;}) {
  const { sound, toggleSound } = usePlayer();
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={sound}
      aria-label={sound ? 'Turn sound off' : 'Turn sound on'}
      className="px-frame-sm flex h-9 items-center gap-2 bg-void/80 px-2.5 font-px text-[10px] tracking-wider text-ink [--b:#3b2f8f] hover:[--b:#3ef2ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan">
      
      {sound ? <Volume2Icon className="h-4 w-4 text-cyan" /> : <VolumeXIcon className="h-4 w-4 text-mute" />}
      <span className="flex h-3 items-end gap-[2px]" aria-hidden>
        {[0, 1, 2, 3].map((i) =>
        <motion.span
          key={i}
          className="w-[2px]"
          style={{ background: sound ? '#3ef2ff' : '#3b2f8f' }}
          animate={sound && !reduce ? { height: [3, 11, 5, 12, 3] } : { height: 3 }}
          transition={{ duration: 0.9 + i * 0.17, repeat: Infinity, ease: 'linear' }} />

        )}
      </span>
      {!compact && <span className="hidden sm:inline">SOUND {sound ? 'ON' : 'OFF'}</span>}
    </button>);

}

