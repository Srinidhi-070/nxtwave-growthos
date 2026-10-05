'use client';
import React, { useState } from 'react';
import { CheckIcon, CopyIcon, UserPlusIcon } from 'lucide-react';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CrewMemberPanel } from '@/components/crew/CrewMemberPanel';
import { usePlayer } from '@/contexts/PlayerContext';
import { CREW, CREW_MILESTONES, INVITER, type CrewMember } from '@/data/crew';
import { cn } from '@/utils/cn';


const POS: Record<string, {x: number;y: number;}> = {
  arjun: { x: 50, y: 12 },
  me: { x: 50, y: 48 },
  meera: { x: 24, y: 58 },
  kabir: { x: 76, y: 58 },
  zoya: { x: 50, y: 86 },
  rohan: { x: 7, y: 34 },
  ananya: { x: 9, y: 84 },
  dev: { x: 93, y: 34 },
  isha: { x: 91, y: 84 },
  tanvi: { x: 72, y: 92 }
};

const GROWTH = [0, 1, 4, 8];

export default function MyCrew() {
  const { character, explorerName } = usePlayer();
  const [selected, setSelected] = useState<CrewMember | null>(null);
  const [copied, setCopied] = useState(false);

  const direct = CREW.filter((c) => c.degree === 1);
  const second = CREW.filter((c) => c.degree === 2);
  const active = CREW.filter((c) => c.active).length;

  const edges: {from: string;to: string;tone: string;active: boolean;}[] = [
  { from: 'arjun', to: 'me', tone: '#3ef2ff', active: true },
  ...direct.map((c) => ({ from: 'me', to: c.id, tone: '#b6ff3b', active: c.active })),
  ...second.map((c) => ({ from: c.parentId ?? 'me', to: c.id, tone: '#ff3fa4', active: c.active }))];


  const copy = () => {
    navigator.clipboard?.writeText('growthos.gg/register/SRINIDHI-7Q4').catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-px text-[11px] tracking-widest text-magenta">SOCIAL GRAPH</p>
          <h1 className="mt-2 font-pixel text-[18px] text-ink md:text-[24px]">MY CREW</h1>
        </div>
        <p className="font-term text-xl text-mute">Tap any explorer to open their file.</p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <PixelPanel className="overflow-x-auto bg-void p-0">
          <div className="relative h-[620px] min-w-[760px] overflow-hidden">
            <div className="dot-grid absolute inset-0" aria-hidden />
            <PixelParticles count={16} colors={['#ff3fa4', '#3ef2ff']} rise={30} />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {edges.map((e) => {
                const a = POS[e.from];
                const b = POS[e.to];
                return (
                  <g key={`${e.from}-${e.to}`}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={e.tone} strokeOpacity={0.18} vectorEffect="non-scaling-stroke" style={{ strokeWidth: 6 }} />
                    <line
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={e.tone}
                      strokeOpacity={e.active ? 0.95 : 0.35}
                      vectorEffect="non-scaling-stroke"
                      style={{ strokeWidth: 2 }}
                      className={e.active ? 'signal-flow' : undefined} />
                    
                  </g>);

              })}
            </svg>

            <span className="absolute left-4 top-4 font-px text-[10px] tracking-widest text-cyan">WHO BROUGHT ME</span>
            <NodeAt pos={POS.arjun}>
              <CrewNode member={INVITER} size={56} onClick={() => setSelected(INVITER)} ring="#3ef2ff" />
            </NodeAt>

            <NodeAt pos={POS.me}>
              <div className="flex flex-col items-center">
                <span className="relative">
                  <span className="glow-pulse absolute -inset-4 border-2 border-lime/60" aria-hidden />
                  <PixelCharacter config={character} size={96} label={explorerName} />
                </span>
                <span className="mt-2 bg-lime px-2 py-1 font-px text-[10px] tracking-widest text-void">YOU · {explorerName}</span>
              </div>
            </NodeAt>

            {CREW.map((m) =>
            <NodeAt key={m.id} pos={POS[m.id]}>
                <CrewNode member={m} size={m.degree === 1 ? 60 : 40} onClick={() => setSelected(m)} ring={m.degree === 1 ? '#b6ff3b' : '#ff3fa4'} />
              </NodeAt>
            )}

            <div className="absolute bottom-4 left-4 flex flex-wrap gap-4 bg-void/85 px-3 py-2 font-px text-[9px] tracking-widest">
              <span className="flex items-center gap-1.5 text-cyan"><span className="h-2 w-2 bg-cyan" />INVITER</span>
              <span className="flex items-center gap-1.5 text-lime"><span className="h-2 w-2 bg-lime" />DIRECT</span>
              <span className="flex items-center gap-1.5 text-magenta"><span className="h-2 w-2 bg-magenta" />2ND DEGREE</span>
              <span className="flex items-center gap-1.5 text-mute"><span className="h-2 w-2 bg-line-hi" />IDLE</span>
            </div>
          </div>
        </PixelPanel>

        <aside className="flex flex-col gap-6" aria-label="Network impact">
          <PixelPanel tone="magenta" className="bg-void p-5">
            <h2 className="font-px text-[11px] tracking-widest text-magenta">NETWORK IMPACT</h2>
            <div className="mt-4 flex items-end gap-6">
              <div>
                <p className="font-pixel text-[36px] leading-none text-ink">{CREW.length}</p>
                <p className="mt-2 font-term text-lg text-mute">explorers in your network</p>
              </div>
              <div className="ml-auto flex h-14 items-end gap-1.5" aria-label="Network growth by day: 0, 1, 4, 8">
                {GROWTH.map((g, i) =>
                <div key={i} className="flex flex-col items-center gap-1">
                    <span className={cn('w-4', i === GROWTH.length - 1 ? 'bg-magenta' : 'bg-magenta/40')} style={{ height: Math.max(3, g * 5) }} />
                    <span className="font-px text-[8px] text-mute">D{i + 1}</span>
                  </div>
                )}
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-px bg-line">
              {[
              ['DIRECT', direct.length, '#b6ff3b'],
              ['2ND DEG', second.length, '#ff3fa4'],
              ['ACTIVE', `${active}/${CREW.length}`, '#3ef2ff']].
              map(([k, v, c]) =>
              <div key={k as string} className="bg-void p-3">
                  <dt className="font-px text-[9px] tracking-widest text-mute">{k}</dt>
                  <dd className="mt-1 font-pixel text-[14px]" style={{ color: c as string }}>
                    {v}
                  </dd>
                </div>
              )}
            </dl>
          </PixelPanel>

          <div>
            <h2 className="font-px text-[11px] tracking-widest text-ink">MILESTONES</h2>
            <ol className="mt-4 space-y-3">
              {CREW_MILESTONES.map((m) => {
                const count = m.label === 'Chain Reaction' ? CREW.length : direct.length + (m.target > 3 ? second.filter((s) => s.active).length - 2 : 0);
                const reached = count >= m.target;
                return (
                  <li key={m.label} className="flex items-center gap-3">
                    <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center', reached ? 'bg-lime text-void' : 'bg-deep text-mute')}>
                      {reached ? <CheckIcon className="h-4 w-4" /> : <span className="font-px text-[9px]">{m.target}</span>}
                    </span>
                    <div className="flex-1">
                      <p className={cn('font-px text-[11px] tracking-wider', reached ? 'text-ink' : 'text-ink/70')}>{m.label.toUpperCase()}</p>
                      <p className="font-term text-lg leading-none text-mute">{m.reward}</p>
                    </div>
                    <span className="font-term text-lg text-mute">
                      {Math.min(count, m.target)}/{m.target}
                    </span>
                  </li>);

              })}
            </ol>
          </div>

          <PixelPanel tone="lime" className="bg-void p-5">
            <p className="font-px text-[10px] tracking-widest text-lime">YOUR INVITE LINK</p>
            <div className="mt-3 flex items-center gap-2 bg-deep px-3 py-2.5">
              <span className="flex-1 truncate font-term text-xl text-ink">growthos.gg/register/SRINIDHI-7Q4</span>
              <button onClick={copy} className="text-mute transition-colors duration-150 hover:text-lime" aria-label="Copy invite link">
                {copied ? <CheckIcon className="h-4 w-4 text-lime" /> : <CopyIcon className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-2 font-term text-lg text-mute" aria-live="polite">
              {copied ? 'Copied. Send it to your batchmates.' : '+50 XP for each explorer who joins.'}
            </p>
            <PixelButton href="/card" className="mt-4 w-full" icon={<UserPlusIcon className="h-4 w-4" />}>
              Share crew card
            </PixelButton>
          </PixelPanel>
        </aside>
      </div>

      <CrewMemberPanel member={selected} onClose={() => setSelected(null)} />
    </div>);

}

function NodeAt({ pos, children }: {pos: {x: number;y: number;};children: React.ReactNode;}) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
      {children}
    </div>);

}

function CrewNode({ member, size, onClick, ring }: {member: CrewMember;size: number;onClick: () => void;ring: string;}) {
  return (
    <button onClick={onClick} className="group flex flex-col items-center focus-visible:outline-none" aria-label={`Open ${member.name}`}>
      <span className="relative transition-transform duration-150 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
        <PixelCharacter config={member.config} size={size} dim={!member.active && member.stage === 0} showEffect={false} />
      </span>
      <span
        className="px-frame-sm mt-1 flex items-center gap-1.5 bg-void px-2 py-1 font-px text-[9px] tracking-widest text-ink group-hover:[--b:#ffffff] group-focus-visible:[--b:#ffffff]"
        style={{ '--b': member.active ? ring : '#3b2f8f' } as React.CSSProperties}>
        
        <span className="h-1.5 w-1.5" style={{ background: member.active ? ring : '#4a4185' }} />
        {member.name}
        <span className="text-mute">L{member.level}</span>
      </span>
    </button>);

}




