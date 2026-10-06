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
import { CircuitBG } from '@/components/pixel/CircuitBG';
import { seeded } from '@/utils/random';
import { cn } from '@/utils/cn';

const STAGES = [
{ key: 'IDEA', color: '#3ef2ff', unlock: 'Pick a problem worth solving', board: ['Problem picked'], term: ['> idea.lock("campus Q&A bot")'] },
{ key: 'BUILD', color: '#b6ff3b', unlock: 'Scaffold the app from a template', board: ['Problem picked', 'Repo scaffolded'], term: ['> npx create-growth-app', '  -> template ready'] },
{ key: 'AI', color: '#ff3fa4', unlock: 'Connect an AI model to your data', board: ['Problem picked', 'Repo scaffolded', 'Model connected'], term: ['> ai.connect("llm")', '  -> 1st response in 820ms', '  -> context loaded'] },
{ key: 'APP', color: '#ffc94a', unlock: 'Build the screen people will use', board: ['Problem picked', 'Repo scaffolded', 'Model connected', 'UI built'], term: ['> app.render()', '  -> chat screen', '  -> mobile layout', '  -> 3 testers'] },
{ key: 'SHIP', color: '#b4a8ff', unlock: 'Deploy it and share a live link', board: ['Problem picked', 'Repo scaffolded', 'Model connected', 'UI built', 'Live link shared'], term: ['> deploy --prod', '  -> build passed', '  -> live: srinidhi.growthos.app', '  => PROJECT SHIPPED'] }];


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
  const [isWorking, setIsWorking] = useState(false);
  const stage = STAGES[view];
  const cubes = 2 + view * 3;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-px text-[11px] tracking-widest text-lime">PROJECT LAB // PASSPORT #0427</p>
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
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <CircuitBG />
            <motion.div className="absolute inset-0 bg-void" animate={{ opacity: 0.8 - view * 0.1 }} transition={{ duration: 0.3 }} />
            
            {Array.from({ length: cubes }).map((_, i) =>
              <motion.span
                key={`${view}-${i}`}
                aria-hidden
                className="absolute h-2 w-2 md:h-3 md:w-3 shadow-[0_0_10px_currentColor]"
                style={{ left: `${20 + seeded(i + 3) * 60}%`, top: `${20 + seeded(i + 9) * 60}%`, background: i % 3 === 0 ? '#ffffff' : stage.color, color: i % 3 === 0 ? '#ffffff' : stage.color }}
                initial={{ opacity: 0, scale: 0 }}
                animate={reduce ? { opacity: 0.9 } : { opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 2 + seeded(i) * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }} 
              />
            )}

            <div className="absolute inset-4 md:inset-8 flex flex-col md:flex-row gap-4 md:gap-8 pointer-events-none">
              
              {/* Left: Project Board */}
              <div className="px-frame-sm relative flex-1 bg-panel/90 p-5 flex flex-col pointer-events-auto backdrop-blur-sm">
                <p className="font-px text-[10px] tracking-widest text-mute">PROJECT BOARD</p>
                <div className="mt-5 flex-1">
                  <ul className="space-y-4">
                    {STAGES[4].board.map((b) => {
                      const lit = stage.board.includes(b);
                      return (
                        <li key={b} className={cn('flex items-center gap-3 font-term text-base md:text-lg transition-colors', lit ? 'text-ink' : 'text-mute/30')}>
                          <span className={cn("h-2.5 w-2.5", lit ? "shadow-[0_0_8px_currentColor]" : "")} style={{ background: lit ? stage.color : '#2f2670', color: stage.color }} />
                          {b}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Right: Terminal */}
              <div className="px-frame-sm relative flex-[1.5] bg-void/95 p-5 flex flex-col pointer-events-auto backdrop-blur-sm border-t-[3px]" style={{ borderTopColor: stage.color }}>
                <div className="flex items-center justify-between border-b-2 border-line pb-3">
                  <p className="font-px text-[10px] tracking-widest text-mute">TERMINAL</p>
                  <span className="font-px text-[10px] tracking-widest" style={{ color: stage.color }}>{stage.key}_ENV</span>
                </div>
                <div className="mt-4 flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div key={view} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="font-term text-lg leading-relaxed">
                      {stage.term.map((l, i) =>
                        <p key={i} className={l.includes('=>') ? 'text-lime mt-2' : l.startsWith('>') ? 'text-cyan mt-2' : 'text-mute/80'}>
                          {l}
                        </p>
                      )}
                      <span className="cursor-blink inline-block h-4 w-2 mt-1" style={{ background: stage.color }} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Character Overlay */}
                <div className="absolute -bottom-1 -right-2 md:-bottom-4 md:-right-6 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  <PixelCharacter config={character} size={84} />
                </div>
              </div>

            </div>
            <CrtOverlay />
                    {view > currentStage &&
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center z-50">
              <span className="bg-void/90 px-4 py-2 font-px text-[12px] tracking-widest text-ink border border-line">PREVIEW // YOUR LAB AT {stage.key}</span>
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
            <PixelButton 
      className="mt-4 w-full" 
      disabled={!template || isWorking} 
      icon={isWorking ? <LockIcon className="h-4 w-4 animate-pulse" /> : <SparklesIcon className="h-4 w-4" />}
      onClick={() => {
        setIsWorking(true);
        setTimeout(() => {
          setIsWorking(false);
          if (view < 4) setView(view + 1);
        }, 1200);
      }}
    >
      {isWorking ? 'Processing...' : template ? 'Lock in idea' : 'Pick an idea'}
    </PixelButton>
          </section>
        </aside>
      </div>
    </div>);

}




