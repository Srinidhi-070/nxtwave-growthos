'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronsUpIcon } from 'lucide-react';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { usePlayer } from '@/contexts/PlayerContext';
import { LEADERS, MY_RANK, type LeaderEntry } from '@/data/leaderboard';
import { cn } from '@/utils/cn';

const PODIUM = [
{ rank: 2, h: 120, color: '#3ef2ff' },
{ rank: 1, h: 170, color: '#ffc94a' },
{ rank: 3, h: 90, color: '#ff3fa4' }];


const CROWN = ['X.X.X', 'XXXXX', 'XXXXX'];

export default function Leaderboard() {
  const { character, explorerName, college } = usePlayer();
  const [scope, setScope] = useState<'all' | 'campus'>('all');
  const rows = scope === 'all' ? LEADERS : LEADERS.filter((l) => l.campus === 'PES University');
  const podium = LEADERS.slice(0, 3);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-px text-[11px] tracking-widest text-amber">SEASON 01 · DAY 4 OF 7</p>
          <h1 className="mt-2 font-pixel text-[18px] text-ink md:text-[24px]">CAMPUS CHAMPIONS</h1>
        </div>
        <div role="tablist" aria-label="Leaderboard scope" className="flex">
          {[
          { id: 'all', label: 'ALL CAMPUSES' },
          { id: 'campus', label: 'PES UNIVERSITY' }].
          map((t) =>
          <button
            key={t.id}
            role="tab"
            aria-selected={scope === t.id}
            onClick={() => setScope(t.id as 'all' | 'campus')}
            className={cn('px-4 py-2.5 font-px text-[10px] tracking-widest transition-colors duration-150', scope === t.id ? 'bg-amber text-void' : 'bg-deep text-mute hover:text-ink')}>
            
              {t.label}
            </button>
          )}
        </div>
      </div>

      <section className="relative mt-8 overflow-hidden bg-night pt-10" aria-label="Top 3">
        <div className="dot-grid absolute inset-0" aria-hidden />
        <PixelParticles count={20} colors={['#ffc94a', '#3ef2ff', '#ff3fa4']} />
        <div className="relative mx-auto flex max-w-[720px] items-end justify-center gap-2 px-4 md:gap-4">
          {PODIUM.map((p, i) => {
            const e = podium[p.rank - 1];
            return (
              <div key={p.rank} className="flex flex-1 flex-col items-center">
                {p.rank === 1 &&
                <svg viewBox="0 0 5 3" width={30} height={18} shapeRendering="crispEdges" className="mb-1" aria-hidden>
                    {CROWN.flatMap((r, y) => r.split('').map((c, x) => c === 'X' ? <rect key={`${x}${y}`} x={x} y={y} width={1} height={1} fill="#ffc94a" /> : null))}
                  </svg>
                }
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.25, ease: 'easeOut' }}>
                  <PixelCharacter config={e.config} size={p.rank === 1 ? 96 : 72} label={e.name} />
                </motion.div>
                <p className="mt-2 font-px text-[11px] tracking-widest text-ink">{e.name}</p>
                <p className="font-term text-lg text-mute">{e.campus}</p>
                <motion.div
                  className="relative mt-3 flex w-full flex-col items-center justify-start pt-4"
                  style={{ background: '#151040', boxShadow: `inset 0 4px 0 0 ${p.color}` }}
                  initial={{ height: 0 }}
                  animate={{ height: p.h }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                  
                  <span className="font-pixel text-[26px] md:text-[34px]" style={{ color: p.color }}>
                    {p.rank}
                  </span>
                  <span className="mt-2 font-px text-[10px] text-ink">{e.xp.toLocaleString()} XP</span>
                  <span className="mt-1 hidden font-term text-lg text-mute sm:block">
                    crew {e.crew} · impact {e.impact}
                  </span>
                </motion.div>
              </div>);

          })}
        </div>
      </section>

      <section className="mt-8" aria-label="Rankings">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b-2 border-line text-left font-px text-[10px] tracking-widest text-mute">
                <th className="py-3 pl-3 font-normal">RANK</th>
                <th className="py-3 font-normal">EXPLORER</th>
                <th className="py-3 font-normal">CAMPUS</th>
                <th className="py-3 text-right font-normal">XP</th>
                <th className="py-3 text-right font-normal">CREW</th>
                <th className="py-3 pr-3 text-right font-normal">NETWORK IMPACT</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) =>
              <Row key={r.rank} entry={r} />
              )}
              <tr aria-hidden>
                <td colSpan={6} className="py-2 text-center font-term text-xl text-mute">
                  · · ·
                </td>
              </tr>
              <tr className="bg-lime/10 outline outline-2 -outline-offset-2 outline-lime">
                <td className="py-3 pl-3 font-pixel text-[13px] text-lime">#{MY_RANK.rank}</td>
                <td className="py-3">
                  <span className="flex items-center gap-3">
                    <span className="h-9 w-9 overflow-hidden bg-deep">
                      <PixelCharacter config={character} size={36} idle={false} shadow={false} showEffect={false} />
                    </span>
                    <span className="font-px text-[11px] tracking-widest text-ink">
                      {explorerName} <span className="ml-1 bg-lime px-1.5 py-0.5 text-[9px] text-void">YOUR POSITION</span>
                    </span>
                  </span>
                </td>
                <td className="py-3 font-term text-xl text-ink/80">{college}</td>
                <td className="py-3 text-right font-term text-xl text-ink">{MY_RANK.xp}</td>
                <td className="py-3 text-right font-term text-xl text-ink">{MY_RANK.crew}</td>
                <td className="py-3 pr-3 text-right font-term text-xl text-ink">{MY_RANK.impact}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 flex items-center gap-2 font-term text-xl text-mute">
          <ChevronsUpIcon className="h-4 w-4 text-lime" /> {MY_RANK.nextRankXp} XP to pass #26 — two more crew members gets you there.
        </p>
      </section>
    </div>);

}

function Row({ entry }: {entry: LeaderEntry;}) {
  return (
    <tr className="border-b-2 border-line/60">
      <td className="py-3 pl-3 font-pixel text-[12px] text-mute">#{entry.rank}</td>
      <td className="py-3">
        <span className="flex items-center gap-3">
          <span className="h-9 w-9 overflow-hidden bg-deep">
            <PixelCharacter config={entry.config} size={36} idle={false} shadow={false} showEffect={false} />
          </span>
          <span className="font-px text-[11px] tracking-widest text-ink">{entry.name}</span>
        </span>
      </td>
      <td className="py-3 font-term text-xl text-ink/80">{entry.campus}</td>
      <td className="py-3 text-right font-term text-xl text-ink">{entry.xp.toLocaleString()}</td>
      <td className="py-3 text-right font-term text-xl text-ink">{entry.crew}</td>
      <td className="py-3 pr-3 text-right">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 bg-magenta" style={{ width: entry.impact * 2 }} aria-hidden />
          <span className="font-term text-xl text-ink">{entry.impact}</span>
        </span>
      </td>
    </tr>);

}

