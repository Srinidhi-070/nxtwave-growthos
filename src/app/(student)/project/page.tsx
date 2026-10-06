'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckIcon, LockIcon, SparklesIcon } from 'lucide-react';
import { PixelWindow } from '@/components/pixel/PixelWindow';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelBadge } from '@/components/pixel/PixelBadge';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { usePlayer } from '@/contexts/PlayerContext';
import { CyberGrid } from '@/components/pixel/CyberGrid';
import { seeded } from '@/utils/random';
import { cn } from '@/utils/cn';

const STAGES = [
{ key: 'IDEA', color: '#3ef2ff', unlock: 'Pick a problem worth solving', board: ['Problem picked'], term: ['> idea.lock("campus Q&A bot")'] },
{ key: 'BUILD', color: '#b6ff3b', unlock: 'Scaffold the app from a template', board: ['Problem picked', 'Repo scaffolded'], term: ['> npx create-growth-app', '  ✓ template ready'] },
{ key: 'AI', color: '#ff3fa4', unlock: 'Connect an AI model to your data', board: ['Problem picked', 'Repo scaffolded', 'Model connected'], term: ['> ai.connect("llm")', '  ✓ 1st response in 820ms', '  ✓ context loaded'] },
{ key: 'APP', color: '#ffc94a', unlock: 'Build the screen people will use', board: ['Problem picked', 'Repo scaffolded', 'Model connected', 'UI built'], term: ['> app.render()', '  ✓ chat screen', '  ✓ mobile layout', '  ✓ 3 testers'] },
{ key: 'SHIP', color: '#b4a8ff', unlock: 'Deploy it and share a live link', board: ['Problem picked', 'Repo scaffolded', 'Model connected', 'UI built', 'Live link shared'], term: ['> deploy --prod', '  ✓ build passed', '  ✓ live: srinidhi.growthos.app', '  ★ PROJECT SHIPPED'] }];


const TEMPLATES = [
{ id: 'qa', name: 'Campus Q&A Bot', desc: 'Answers questions from your college handbook.' },
{ id: 'resume', name: 'Resume Reviewer', desc: 'Scores a resume against a job description.' },
{ id: 'notes', name: 'Lecture Summarizer', desc: 'Turns lecture notes into flashcards.' }];


export default function ProjectLab() {
  const { character } = usePlayer();
  const reduce = useReducedMotion();
  const { level } = usePlayer();
  const currentStage = Math.max(0, level - 1);
  const [view, setView] = useState(currentStage);
  const [template, setTemplate] = useState<string | null>(null);
  const stage = STAGES[view];
  const cubes = 2 + view * 3;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-px text-[11px] tracking-widest text-lime">PROJECT LAB · PASSPORT #0427</p>
          <h1 className="mt-2 font-pixel text-[18px] text-ink md:text-[24px]">AI PROJECT PASSPORT</h1>
        </div>
        <PixelBadge tone="cyan" dot>
          Your stage: {STAGES[currentStage].key}
        </PixelBadge>
      </div>

      <ol className="mt-6 grid grid-cols-5 gap-1" aria-label="Passport stages">
        {STAGES.map((s, i) => {
          const reached = i <= currentStage;
          return (
            <li key={s.key}>
              <button
                onClick={() => setView(i)}
                aria-pressed={view === i}
                className={cn('group flex w-full flex-col gap-2 py-2 text-left transition-colors duration-150', view === i ? 'text-ink' : 'text-mute hover:text-ink')}>
                
                <span className="h-2 w-full" style={{ background: reached ? s.color : view === i ? `${s.color}66` : '#2f2670' }} />
                <span className="flex items-center gap-1.5 font-px text-[10px] tracking-widest md:text-[11px]">
                  {i < currentStage ? <CheckIcon className="h-3 w-3" /> : !reached && <LockIcon className="h-3 w-3" />}
                  {s.key}
                </span>
              </button>
            </li>);

        })}
      </ol>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="px-frame relative overflow-hidden bg-void [--b:#3b2f8f]">
          <div className="relative aspect-[16/9]">
            <CyberGrid />
            <motion.div className="absolute inset-0 bg-void" animate={{ opacity: 0.62 - view * 0.12 }} transition={{ duration: 0.3 }} />
            <motion.div
              aria-hidden
              className="absolute right-[9%] top-[22%] h-[52%] w-[13%]"
              animate={{ opacity: 0.1 + view * 0.16, backgroundColor: stage.color }}
              transition={{ duration: 0.3 }}
              style={{ mixBlendMode: 'screen' }} />
            
            {Array.from({ length: cubes }).map((_, i) =>
            <motion.span
              key={`${view}-${i}`}
              aria-hidden
              className="absolute h-2.5 w-2.5 md:h-3.5 md:w-3.5"
              style={{ left: `${30 + seeded(i + 3) * 50}%`, top: `${18 + seeded(i + 9) * 40}%`, background: i % 3 === 0 ? '#ffffff' : stage.color }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={reduce ? { opacity: 0.9 } : { opacity: [0.4, 1, 0.4], y: [0, -10, 0], scale: 1 }}
              transition={{ duration: 3 + seeded(i) * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }} />

            )}
            <div className="absolute bottom-[9%] left-[30%]">
              <PixelCharacter config={character} size={64} className="md:hidden" />
              <PixelCharacter config={character} size={104} className="hidden md:inline-block" />
            </div>

            <div className="absolute left-3 top-3 w-[44%] max-w-[260px] bg-void/90 p-3 md:left-5 md:top-5">
              <p className="font-px text-[9px] tracking-widest text-mute">PROJECT BOARD</p>
              <ul className="mt-2 space-y-1">
                {STAGES[4].board.map((b) => {
                  const lit = stage.board.includes(b);
                  return (
                    <li key={b} className={cn('flex items-center gap-2 font-term text-base md:text-lg', lit ? 'text-ink' : 'text-mute/50')}>
                      <span className="h-2 w-2" style={{ background: lit ? stage.color : '#2f2670' }} />
                      {b}
                    </li>);

                })}
              </ul>
            </div>

            <div className="absolute bottom-3 right-3 hidden w-[300px] bg-void/92 p-3 md:block">
              <p className="font-px text-[9px] tracking-widest text-mute">TERMINAL</p>
              <AnimatePresence mode="wait">
                <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="mt-2 font-term text-lg leading-tight">
                  {stage.term.map((l, i) =>
                  <p key={i} className={l.includes('★') ? 'text-lime' : l.startsWith('>') ? 'text-cyan' : 'text-ink/80'}>
                      {l}
                    </p>
                  )}
                  <span className="cursor-blink inline-block h-4 w-2 bg-cyan" />
                </motion.div>
              </AnimatePresence>
            </div>
            <CrtOverlay />
            {view > currentStage &&
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
                <span className="bg-void/90 px-3 py-2 font-px text-[10px] tracking-widest text-ink">PREVIEW · YOUR LAB AT {stage.key}</span>
              </div>
            }
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <PixelWindow title={`STAGE ${String(view + 1).padStart(2, '0')} // ${stage.key}`} tone="lime" className="bg-void">
            <p className="font-term text-2xl leading-tight text-ink">{stage.unlock}</p>
            <p className="mt-2 text-sm text-mute">
              {view <= currentStage ? 'This is where you are. Finish it to light up the next part of your lab.' : 'Unlocks after the live workshop on Wednesday.'}
            </p>
          </PixelWindow>

          <section aria-labelledby="tpl-h">
            <h2 id="tpl-h" className="font-px text-[11px] tracking-widest text-ink">
              STARTER IDEAS
            </h2>
            <div className="mt-3 space-y-2" role="radiogroup" aria-label="Starter ideas">
              {TEMPLATES.map((t) =>
              <button
                key={t.id}
                role="radio"
                aria-checked={template === t.id}
                onClick={() => setTemplate(t.id)}
                className={cn('flex w-full items-start gap-3 p-3 text-left transition-colors duration-150', template === t.id ? 'bg-cyan/15' : 'bg-deep/60 hover:bg-deep')}>
                
                  <span className={cn('mt-1 h-3 w-3 shrink-0', template === t.id ? 'bg-cyan' : 'bg-line')} />
                  <span>
                    <span className="block font-px text-[11px] tracking-wider text-ink">{t.name.toUpperCase()}</span>
                    <span className="mt-1 block text-sm text-mute">{t.desc}</span>
                  </span>
                </button>
              )}
            </div>
            <PixelButton className="mt-4 w-full" disabled={!template} icon={<SparklesIcon className="h-4 w-4" />}>
              {template ? 'Lock in idea' : 'Pick an idea'}
            </PixelButton>
          </section>
        </aside>
      </div>
    </div>);

}




