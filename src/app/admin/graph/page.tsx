'use client';
import React, { useMemo, useRef, useState } from 'react';
import { MinusIcon, PlusIcon, RotateCcwIcon } from 'lucide-react';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';
import { buildReferralGraph, type GraphNode, type NodeKind } from '@/utils/referralGraph';
import { cn } from '@/utils/cn';

const KIND: Record<NodeKind, {label: string;color: string;r: number;}> = {
  connector: { label: 'CONNECTOR', color: '#3ef2ff', r: 9 },
  student: { label: 'STUDENT', color: '#b6ff3b', r: 4.5 },
  second: { label: 'SECOND DEGREE', color: '#ff3fa4', r: 3.5 },
  risk: { label: 'RISK FLAG', color: '#ff4d5e', r: 5 }
};

export default function ReferralTelemetry() {
  const { nodes, edges } = useMemo(() => buildReferralGraph(), []);
  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const [hidden, setHidden] = useState<Set<NodeKind>>(new Set());
  const [selected, setSelected] = useState<GraphNode | null>(nodes[0]);
  const drag = useRef<{x: number;y: number;vx: number;vy: number;} | null>(null);

  const visible = (n: GraphNode) => !hidden.has(n.kind);
  const counts = nodes.reduce<Record<string, number>>((acc, n) => ({ ...acc, [n.kind]: (acc[n.kind] ?? 0) + 1 }), {});
  const zoom = (f: number) => setView((v) => ({ ...v, k: Math.min(3, Math.max(0.4, v.k * f)) }));

  const toggle = (k: NodeKind) =>
  setHidden((h) => {
    const n = new Set(h);
    if (n.has(k)) n.delete(k);else
    n.add(k);
    return n;
  });

  const neighborIds = useMemo(() => {
    if (!selected) return new Set<string>();
    const s = new Set<string>([selected.id]);
    edges.forEach((e) => {
      if (e.from === selected.id) s.add(e.to);
      if (e.to === selected.id) s.add(e.from);
    });
    return s;
  }, [selected, edges]);

  return (
    <div className="mx-auto max-w-[1400px]">
      <OpsPageHeader eyebrow="NETWORK · LIVE GRAPH" title="REFERRAL TELEMETRY" right={<span className="font-mono text-[12px] text-mute">{nodes.length} nodes · {edges.length} edges</span>} />
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <OpsPanel bodyClassName="p-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 px-4 py-2.5">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter node types">
              {(Object.keys(KIND) as NodeKind[]).map((k) =>
              <button
                key={k}
                onClick={() => toggle(k)}
                aria-pressed={!hidden.has(k)}
                className={cn('flex items-center gap-2 px-2 py-1 font-px text-[9px] tracking-[0.15em] transition-opacity duration-150', hidden.has(k) ? 'opacity-40' : 'opacity-100')}>
                
                  <span className="h-2 w-2" style={{ background: KIND[k].color }} />
                  <span style={{ color: KIND[k].color }}>{KIND[k].label}</span>
                  <span className="font-mono text-mute">{counts[k] ?? 0}</span>
                </button>
              )}
            </div>
            <div className="flex gap-1">
              {[
              { Icon: PlusIcon, label: 'Zoom in', on: () => zoom(1.2) },
              { Icon: MinusIcon, label: 'Zoom out', on: () => zoom(1 / 1.2) },
              { Icon: RotateCcwIcon, label: 'Reset view', on: () => setView({ x: 0, y: 0, k: 1 }) }].
              map(({ Icon, label, on }) =>
              <button key={label} onClick={on} aria-label={label} className="flex h-7 w-7 items-center justify-center bg-deep text-ink/80 transition-colors duration-150 hover:text-teal">
                  <Icon className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
          <div
            className="dot-grid relative h-[600px] cursor-grab touch-none overflow-hidden active:cursor-grabbing"
            onWheel={(e) => zoom(e.deltaY < 0 ? 1.08 : 1 / 1.08)}
            onPointerDown={(e) => {
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
            }}
            onPointerMove={(e) => {
              if (!drag.current) return;
              const d = drag.current;
              setView((v) => ({ ...v, x: d.vx + (e.clientX - d.x), y: d.vy + (e.clientY - d.y) }));
            }}
            onPointerUp={() => drag.current = null}
            role="application"
            aria-label="Referral graph. Drag to pan, scroll to zoom.">
            
            <svg className="absolute inset-0 h-full w-full" viewBox="-480 -320 960 640" preserveAspectRatio="xMidYMid meet">
              <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
                {edges.map((e, i) => {
                  const a = byId[e.from];
                  const b = byId[e.to];
                  if (!a || !b || !visible(a) || !visible(b)) return null;
                  const hot = selected && neighborIds.has(a.id) && neighborIds.has(b.id);
                  const color = e.kind === 'connector' ? '#3ef2ff' : KIND[e.kind].color;
                  const path = `M${a.x} ${a.y} L${b.x} ${b.y}`;
                  return (
                    <g key={i}>
                      <path d={path} stroke={color} strokeOpacity={hot ? 0.8 : selected ? 0.12 : 0.28} strokeWidth={e.kind === 'connector' ? 2 : 1} fill="none" strokeDasharray={e.kind === 'connector' ? '4 4' : undefined} />
                      {i % 4 === 0 &&
                      <rect width={3} height={3} x={-1.5} y={-1.5} fill={color}>
                          <animateMotion dur={`${2 + i % 5 * 0.4}s`} repeatCount="indefinite" path={path} />
                        </rect>
                      }
                    </g>);

                })}
                {nodes.filter(visible).map((n) => {
                  const k = KIND[n.kind];
                  const dim = selected && !neighborIds.has(n.id);
                  const isSel = selected?.id === n.id;
                  const size = n.kind === 'connector' ? k.r * 2 + n.refs : k.r * 2;
                  return (
                    <g
                      key={n.id}
                      transform={`translate(${n.x} ${n.y})`}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => setSelected(n)}
                      className="cursor-pointer"
                      opacity={dim ? 0.35 : 1}>
                      
                      {isSel && <rect x={-size / 2 - 5} y={-size / 2 - 5} width={size + 10} height={size + 10} fill="none" stroke="#ffffff" strokeWidth={1.5} />}
                      <rect x={-size / 2} y={-size / 2} width={size} height={size} fill={k.color} shapeRendering="crispEdges" />
                      {n.kind === 'connector' &&
                      <text y={size / 2 + 14} textAnchor="middle" fontFamily="Silkscreen" fontSize={10} fill="#ece9ff">
                          {n.label}
                        </text>
                      }
                    </g>);

                })}
              </g>
            </svg>
            <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[11px] text-mute">zoom {view.k.toFixed(2)}× · drag to pan</span>
          </div>
        </OpsPanel>

        <div className="flex flex-col gap-5">
          <OpsPanel title="SELECTED NODE">
            {selected ?
            <>
                <p className="flex items-center gap-2 font-px text-[10px] tracking-[0.15em]" style={{ color: KIND[selected.kind].color }}>
                  <span className="h-2 w-2" style={{ background: KIND[selected.kind].color }} />
                  {KIND[selected.kind].label}
                </p>
                <p className="mt-3 font-mono text-[20px] text-ink">{selected.label}</p>
                <p className="mt-1 text-[13px] text-mute">{selected.campus}</p>
                <dl className="mt-5 grid grid-cols-2 gap-4 text-[12px]">
                  <div>
                    <dt className="text-mute">Direct referrals</dt>
                    <dd className="mt-1 font-mono text-[18px] text-ink">{selected.refs}</dd>
                  </div>
                  <div>
                    <dt className="text-mute">Connections</dt>
                    <dd className="mt-1 font-mono text-[18px] text-ink">{neighborIds.size - 1}</dd>
                  </div>
                </dl>
                {selected.kind === 'risk' && <p className="mt-4 border-l-2 border-danger pl-3 text-[12px] text-ink/85">Part of the CBIT closed-loop cluster. Rewards held pending review.</p>}
              </> :

            <p className="text-[13px] text-mute">Click any node to inspect it.</p>
            }
          </OpsPanel>
          <OpsPanel title="NETWORK SHAPE">
            <ul className="space-y-3 text-[13px] text-ink/85">
              <li className="flex justify-between"><span>Avg. referrals / connector</span><span className="font-mono">6.7</span></li>
              <li className="flex justify-between"><span>Second-degree share</span><span className="font-mono">{Math.round((counts.second ?? 0) / nodes.length * 100)}%</span></li>
              <li className="flex justify-between"><span>Largest component</span><span className="font-mono">VIT · 21</span></li>
              <li className="flex justify-between"><span>Flagged nodes</span><span className="font-mono text-danger">{counts.risk ?? 0}</span></li>
            </ul>
          </OpsPanel>
        </div>
      </div>
    </div>);

}

