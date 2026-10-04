'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, CircleIcon, LockIcon, MapIcon } from 'lucide-react';
import { PixelWindow } from '@/components/pixel/PixelWindow';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelBadge } from '@/components/pixel/PixelBadge';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { PixelQuestNode } from '@/components/pixel/PixelQuestNode';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { usePlayer } from '@/contexts/PlayerContext';
import { IMAGES } from '@/data/images';
import { QUESTS } from '@/data/quests';

export default function QuestWorld() {
  const { character } = usePlayer();
  const activeIndex = QUESTS.findIndex((q) => q.state === 'active');
  const [selectedId, setSelectedId] = useState(QUESTS[activeIndex].id);
  const selected = QUESTS.find((q) => q.id === selectedId) ?? QUESTS[0];
  const done = QUESTS.filter((q) => q.state === 'done').length;
  const active = QUESTS[activeIndex];

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-px text-[11px] tracking-widest text-cyan">WORLD MAP</p>
          <h1 className="mt-2 font-pixel text-[18px] text-ink md:text-[24px]">QUEST WORLD</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-term text-xl text-mute">
            <span className="text-lime">{done}</span> / {QUESTS.length} cleared
          </span>
          <div className="flex gap-1" aria-hidden>
            {QUESTS.map((q) =>
            <span key={q.id} className="h-3 w-3" style={{ background: q.state === 'done' ? '#b6ff3b' : q.state === 'active' ? '#3ef2ff' : '#2f2670' }} />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="px-frame overflow-x-auto bg-void [--b:#3b2f8f]">
          <div className="relative aspect-[16/9] min-w-[960px]">
            <img src={IMAGES.quest} alt="Quest world map" className="pixelated absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-void/35" />
            <PixelParticles count={18} rise={30} />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {QUESTS.slice(0, -1).map((q, i) => {
                const n = QUESTS[i + 1];
                const doneSeg = n.state === 'done';
                const activeSeg = n.state === 'active';
                return (
                  <g key={q.id}>
                    <line x1={q.x} y1={q.y} x2={n.x} y2={n.y} stroke="#07051a" strokeWidth={1.4} vectorEffect="non-scaling-stroke" style={{ strokeWidth: 8 }} />
                    <line
                      x1={q.x}
                      y1={q.y}
                      x2={n.x}
                      y2={n.y}
                      stroke={doneSeg ? '#b6ff3b' : activeSeg ? '#3ef2ff' : '#4a4185'}
                      vectorEffect="non-scaling-stroke"
                      style={{ strokeWidth: 4 }}
                      className={activeSeg ? 'signal-flow' : undefined}
                      strokeDasharray={!doneSeg && !activeSeg ? '3 6' : undefined} />
                    
                  </g>);

              })}
            </svg>
            {QUESTS.map((q, i) =>
            <div key={q.id} className="absolute -translate-x-1/2 -translate-y-6" style={{ left: `${q.x}%`, top: `${q.y}%` }}>
                <PixelQuestNode index={i} title={q.title} state={q.state} selected={q.id === selectedId} onSelect={() => setSelectedId(q.id)} labelSide={q.y > 75 ? 'top' : 'bottom'} />
              </div>
            )}
            <div className="pointer-events-none absolute -translate-x-1/2" style={{ left: `${active.x + 3.2}%`, top: `${active.y - 13}%` }}>
              <PixelCharacter config={character} size={44} />
            </div>
            <CrtOverlay />
            <div className="absolute bottom-3 left-3 flex gap-3 bg-void/85 px-3 py-2 font-px text-[9px] tracking-widest">
              <span className="flex items-center gap-1.5 text-lime"><span className="h-2 w-2 bg-lime" />CLEARED</span>
              <span className="flex items-center gap-1.5 text-cyan"><span className="h-2 w-2 bg-cyan" />ACTIVE</span>
              <span className="flex items-center gap-1.5 text-mute"><span className="h-2 w-2 bg-line-hi" />LOCKED</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={selected.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18, ease: 'easeOut' }}>
            <PixelWindow
              title={`QUEST ${String(QUESTS.indexOf(selected) + 1).padStart(2, '0')}`}
              tone={selected.state === 'done' ? 'lime' : selected.state === 'active' ? 'cyan' : 'default'}
              className="h-full bg-void">
              
              <PixelBadge tone={selected.state === 'done' ? 'lime' : selected.state === 'active' ? 'cyan' : 'muted'} dot={selected.state === 'active'}>
                {selected.state === 'done' ? 'Cleared' : selected.state === 'active' ? 'In progress' : 'Locked'}
              </PixelBadge>
              <h2 className="mt-4 font-pixel text-[15px] leading-snug text-ink">{selected.title}</h2>
              <p className="mt-2 flex items-center gap-2 font-px text-[10px] tracking-widest text-mute">
                <MapIcon className="h-3.5 w-3.5" /> {selected.region.toUpperCase()}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/85">{selected.desc}</p>
              <h3 className="mt-6 font-px text-[10px] tracking-widest text-mute">OBJECTIVES</h3>
              <ul className="mt-3 space-y-2.5">
                {selected.objectives.map((o) =>
                <li key={o.label} className="flex items-center gap-3 font-term text-xl">
                    {o.done ?
                  <CheckIcon className="h-4 w-4 text-lime" /> :
                  selected.state === 'locked' ?
                  <LockIcon className="h-4 w-4 text-mute" /> :

                  <CircleIcon className="h-4 w-4 text-cyan" />
                  }
                    <span className={o.done ? 'text-ink/60 line-through' : 'text-ink'}>{o.label}</span>
                  </li>
                )}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t-2 border-line pt-4">
                <span className="font-px text-[10px] tracking-widest text-mute">REWARD</span>
                <span className="font-pixel text-[13px] text-lime">+{selected.xp} XP</span>
              </div>
              {selected.state === 'active' &&
              <PixelButton href="/crew" className="mt-5 w-full">
                  Continue quest
                </PixelButton>
              }
              {selected.state === 'locked' && <p className="mt-5 font-term text-lg text-mute">Clear the previous quest to unlock this path.</p>}
            </PixelWindow>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>);

}

