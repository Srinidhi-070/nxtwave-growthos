'use client';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, SendIcon, XIcon } from 'lucide-react';
import { PixelCharacter } from '../pixel/PixelCharacter';
import { PixelButton } from '../pixel/PixelButton';
import { PixelBadge } from '../pixel/PixelBadge';
import { JOURNEY_STAGES, type CrewMember } from '../../data/crew';
import { cn } from '../../utils/cn';
import { accentOf } from '../../utils/sprite';

interface CrewMemberPanelProps {
  member: CrewMember | null;
  onClose: () => void;
}

export function CrewMemberPanel({ member, onClose }: CrewMemberPanelProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {member &&
      <>
          <motion.div
          className="fixed inset-0 z-50 bg-void/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label={`${member.name} profile`}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col overflow-y-auto border-l-4 bg-night"
          style={{ borderColor: accentOf(member.config) }}
          initial={{ x: 32, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 32, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex items-center justify-between border-b-2 border-line px-5 py-3">
              <span className="font-px text-[10px] tracking-widest text-mute">CREW // EXPLORER FILE</span>
              <button onClick={onClose} aria-label="Close" className="p-1 text-mute transition-colors duration-150 hover:text-ink">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex items-end gap-5 overflow-hidden bg-deep px-5 pb-5 pt-8">
              <div className="grid-floor absolute inset-0 opacity-50" aria-hidden />
              <div className="relative">
                <PixelCharacter config={member.config} size={112} label={member.name} />
              </div>
              <div className="relative pb-2">
                <p className="font-px text-[10px] tracking-widest text-cyan">EXPLORER</p>
                <h2 className="mt-1 font-pixel text-[18px] text-ink">{member.name}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <PixelBadge tone="lime">LV {String(member.level).padStart(2, '0')}</PixelBadge>
                  <PixelBadge tone={member.degree === 1 ? 'cyan' : 'magenta'}>{member.degree === 1 ? 'Direct' : '2nd degree'}</PixelBadge>
                </div>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-line">
              {[
            ['CAMPUS', member.campus],
            ['BRANCH', member.branch],
            ['XP', String(member.xp)],
            ['JOINED', member.joined]].
            map(([k, v]) =>
            <div key={k} className="bg-night px-5 py-3">
                  <dt className="font-px text-[9px] tracking-widest text-mute">{k}</dt>
                  <dd className="mt-1 truncate font-term text-xl text-ink">{v}</dd>
                </div>
            )}
            </dl>

            <section className="px-5 py-6" aria-labelledby="journey-h">
              <h3 id="journey-h" className="font-px text-[11px] tracking-widest text-ink">
                JOURNEY
              </h3>
              <ol className="mt-5">
                {JOURNEY_STAGES.map((s, i) => {
                const state = i < member.stage ? 'done' : i === member.stage ? 'current' : 'todo';
                return (
                  <li key={s} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <motion.span
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.2 }}
                        className={cn(
                          'flex h-7 w-7 items-center justify-center',
                          state === 'done' && 'bg-lime text-void',
                          state === 'current' && 'bg-cyan text-void',
                          state === 'todo' && 'bg-deep text-mute'
                        )}>
                        
                          {state === 'done' ? <CheckIcon className="h-3.5 w-3.5" /> : <span className="font-px text-[9px]">{i + 1}</span>}
                        </motion.span>
                        {i < JOURNEY_STAGES.length - 1 && <span className={cn('my-1 h-6 w-[3px]', i < member.stage ? 'bg-lime' : 'bg-line')} />}
                      </div>
                      <div className="pt-1">
                        <p className={cn('font-px text-[11px] tracking-widest', state === 'todo' ? 'text-mute' : 'text-ink')}>{s}</p>
                        {state === 'current' && <p className="mt-1 font-term text-lg text-cyan">Current stage</p>}
                      </div>
                    </li>);

              })}
              </ol>
            </section>

            <div className="mt-auto border-t-2 border-line p-5">
              {member.stage < 3 ?
            <>
                  <p className="font-term text-lg text-mute">A nudge from you sends {member.name} a quest reminder and +10 XP when they act on it.</p>
                  <PixelButton variant="magenta" className="mt-4 w-full" icon={<SendIcon className="h-4 w-4" />}>
                    Send nudge
                  </PixelButton>
                </> :

            <p className="font-term text-xl text-lime">{member.name} is workshop ready. Nice recruiting.</p>
            }
            </div>
          </motion.aside>
        </>
      }
    </AnimatePresence>);

}
