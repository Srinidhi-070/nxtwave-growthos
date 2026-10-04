'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';
import { StepSparkline } from '@/components/ops/StepSparkline';
import { FLAGGED, RISK_DISTRIBUTION, RISK_SIGNALS, type Risk } from '@/data/ops';
import { cn } from '@/utils/cn';

const SEV: Record<Risk, string> = { low: '#19c9b6', medium: '#ffc94a', high: '#ff4d5e' };

export default function RiskCenter() {
  const total = RISK_DISTRIBUTION.reduce((s, r) => s + r.count, 0);
  const [statuses, setStatuses] = useState<Record<string, string>>(() => Object.fromEntries(FLAGGED.map((f) => [f.id, f.status])));

  return (
    <div className="mx-auto max-w-[1400px]">
      <OpsPageHeader eyebrow="TRUST & SAFETY" title="NETWORK QUALITY" right={<span className="font-mono text-[12px] text-mute">{total} accounts scored · model v3.2</span>} />

      <OpsPanel title="RISK DISTRIBUTION">
        <div className="flex h-10 w-full gap-[3px]" role="img" aria-label="389 low, 29 medium, 9 high risk accounts">
          {RISK_DISTRIBUTION.map((r, i) =>
          <motion.span
            key={r.level}
            style={{ background: r.color, minWidth: 18 }}
            initial={{ width: 0 }}
            animate={{ width: `${r.count / total * 100}%` }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }} />

          )}
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-4">
          {RISK_DISTRIBUTION.map((r) =>
          <div key={r.level}>
              <dt className="flex items-center gap-2 font-px text-[10px] tracking-[0.2em]" style={{ color: r.color }}>
                <span className="h-2 w-2" style={{ background: r.color }} />
                {r.level}
              </dt>
              <dd className="mt-2 font-mono text-[28px] leading-none text-ink">{r.count}</dd>
              <dd className="mt-1 text-[12px] text-mute">{(r.count / total * 100).toFixed(1)}% of accounts</dd>
            </div>
          )}
        </dl>
      </OpsPanel>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <OpsPanel title="SIGNALS · LAST 6H" bodyClassName="p-0">
          <ul>
            {RISK_SIGNALS.map((s) =>
            <li key={s.key} className="flex items-center gap-4 border-b border-line/40 px-4 py-4">
                <span className="h-10 w-1" style={{ background: SEV[s.severity] }} aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <p className="text-[14px] text-ink">{s.key}</p>
                    <span className="font-px text-[9px] tracking-widest" style={{ color: SEV[s.severity] }}>
                      {s.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-mute">{s.detail}</p>
                </div>
                <StepSparkline values={s.trend} color={SEV[s.severity]} width={64} height={22} />
                <span className="w-8 text-right font-mono text-[18px] text-ink">{s.count}</span>
              </li>
            )}
          </ul>
        </OpsPanel>

        <OpsPanel title="CLUSTER · CBIT-07" meta="8 accounts · closed loop">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <svg viewBox="-60 -60 120 120" className="h-[200px] w-[200px] shrink-0" aria-label="Closed-loop referral cluster of 8 accounts">
              {Array.from({ length: 8 }).map((_, i) => {
                const a = i / 8 * Math.PI * 2;
                const b = (i + 1) / 8 * Math.PI * 2;
                const c = (i + 3) / 8 * Math.PI * 2;
                return (
                  <g key={i}>
                    <line x1={Math.cos(a) * 42} y1={Math.sin(a) * 42} x2={Math.cos(b) * 42} y2={Math.sin(b) * 42} stroke="#ff4d5e" strokeWidth={1.2} className="signal-flow-slow" />
                    <line x1={Math.cos(a) * 42} y1={Math.sin(a) * 42} x2={Math.cos(c) * 42} y2={Math.sin(c) * 42} stroke="#ff4d5e" strokeOpacity={0.25} strokeWidth={0.8} />
                  </g>);

              })}
              {Array.from({ length: 8 }).map((_, i) => {
                const a = i / 8 * Math.PI * 2;
                return <rect key={i} x={Math.cos(a) * 42 - 4} y={Math.sin(a) * 42 - 4} width={8} height={8} fill={i === 0 ? '#ffffff' : '#ff4d5e'} />;
              })}
            </svg>
            <div className="text-[13px] leading-relaxed text-ink/85">
              <p>Every account in this ring both referred and was referred by another member within 22 minutes. 6 share two device fingerprints.</p>
              <p className="mt-3 font-mono text-[12px] text-mute">Origin: CHAITU99 (white) · 19:31 IST</p>
            </div>
          </div>
        </OpsPanel>
      </div>

      <OpsPanel title="REVIEW QUEUE" className="mt-5" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-[13px]">
            <thead>
              <tr className="border-b border-line/60 text-left font-px text-[9px] tracking-[0.15em] text-mute">
                <th className="px-4 py-2.5 font-normal">ACCOUNT</th>
                <th className="py-2.5 font-normal">CAMPUS</th>
                <th className="py-2.5 font-normal">SCORE</th>
                <th className="py-2.5 font-normal">SIGNALS</th>
                <th className="py-2.5 font-normal">STATUS</th>
                <th className="px-4 py-2.5 text-right font-normal">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {FLAGGED.map((f) =>
              <tr key={f.id} className="border-b border-line/40">
                  <td className="px-4 py-3">
                    <p className="font-mono text-ink">{f.name}</p>
                    <p className="font-mono text-[11px] text-mute">{f.id}</p>
                  </td>
                  <td className="py-3 text-ink/80">{f.campus}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-16 bg-line">
                        <span className="block h-full" style={{ width: `${f.score * 100}%`, background: f.score > 0.8 ? '#ff4d5e' : f.score > 0.6 ? '#ffc94a' : '#19c9b6' }} />
                      </span>
                      <span className="font-mono text-ink">{f.score.toFixed(2)}</span>
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="flex gap-1.5">
                      {f.signals.map((s) =>
                    <span key={s} className="bg-deep px-1.5 py-0.5 font-mono text-[11px] text-ink/80">
                          {s}
                        </span>
                    )}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-[12px] text-ink/80">{statuses[f.id]}</td>
                  <td className="px-4 py-3">
                    <span className="flex justify-end gap-2">
                      {['Hold', 'Clear'].map((a) =>
                    <button
                      key={a}
                      onClick={() => setStatuses((s) => ({ ...s, [f.id]: a === 'Hold' ? 'Rewards held' : 'Cleared' }))}
                      className={cn(
                        'px-2.5 py-1 text-[12px] transition-colors duration-150',
                        a === 'Hold' ? 'bg-danger/15 text-danger hover:bg-danger/25' : 'bg-teal/15 text-teal hover:bg-teal/25'
                      )}>
                      
                          {a}
                        </button>
                    )}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </OpsPanel>
    </div>);

}

