'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { EXPERIMENT } from '@/data/ops';
import { NPC_CONFIGS } from '@/data/characters';

const AXIS_MIN = -10;
const AXIS_MAX = 30;
const toPct = (v: number) => (v - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * 100;

export default function ExperimentCenter() {
  return (
    <div className="mx-auto max-w-[1400px]">
      <OpsPageHeader
        eyebrow={`EXPERIMENT #${EXPERIMENT.id} · ${EXPERIMENT.status} · DAY ${EXPERIMENT.day}`}
        title={EXPERIMENT.name.toUpperCase()}
        right={<span className="font-mono text-[12px] text-mute">split {EXPERIMENT.split} · {(EXPERIMENT.control.visitors + EXPERIMENT.variant.visitors).toLocaleString()} visitors</span>} />
      
      <p className="-mt-2 mb-6 max-w-3xl text-[14px] leading-relaxed text-ink/80">{EXPERIMENT.hypothesis}</p>

      <div className="grid gap-5 md:grid-cols-2">
        {[
        { arm: EXPERIMENT.control, color: '#8f88c9', cfg: NPC_CONFIGS.dev, order: ['FORM', 'CHARACTER', 'WORLD'] },
        { arm: EXPERIMENT.variant, color: '#3ef2ff', cfg: NPC_CONFIGS.meera, order: ['CHARACTER', 'FORM', 'WORLD'] }].
        map(({ arm, color, cfg, order }) =>
        <OpsPanel key={arm.label}>
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-16 items-end justify-center bg-deep">
                <PixelCharacter config={cfg} size={52} shadow={false} showEffect={false} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-px text-[11px] tracking-[0.2em]" style={{ color }}>
                  {arm.label}
                </p>
                <p className="mt-1 text-[13px] text-ink/85">{arm.desc}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  {order.map((o, i) =>
                <React.Fragment key={o}>
                      <span className="bg-deep px-2 py-1 font-px text-[9px] tracking-widest text-ink/80">{o}</span>
                      {i < order.length - 1 && <span className="text-mute">→</span>}
                    </React.Fragment>
                )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-[20px] text-ink">{arm.visitors.toLocaleString()}</p>
                <p className="text-[11px] text-mute">visitors</p>
              </div>
            </div>
          </OpsPanel>
        )}
      </div>

      <OpsPanel title="METRICS · RELATIVE LIFT, 95% INTERVAL" className="mt-5" bodyClassName="p-0">
        <div className="hidden grid-cols-[200px_110px_110px_1fr_120px] gap-4 border-b border-line/60 px-4 py-2 font-px text-[9px] tracking-[0.15em] text-mute lg:grid">
          <span>METRIC</span>
          <span className="text-right">CONTROL</span>
          <span className="text-right">VARIANT</span>
          <span className="flex justify-between">
            <span>−10%</span>
            <span>0</span>
            <span>+10%</span>
            <span>+20%</span>
            <span>+30%</span>
          </span>
          <span className="text-right">P(BETTER)</span>
        </div>
        {EXPERIMENT.metrics.map((m, i) => {
          const lift = (m.variant - m.control) / m.control * 100;
          return (
            <div key={m.key} className="grid gap-3 border-b border-line/40 px-4 py-4 lg:grid-cols-[200px_110px_110px_1fr_120px] lg:items-center lg:gap-4">
              <div>
                <p className="text-[14px] text-ink">{m.key}</p>
                <p className="font-mono text-[11px] text-mute">
                  n = {m.nControl} / {m.nVariant}
                </p>
              </div>
              <p className="font-mono text-[15px] text-ink/70 lg:text-right">
                <span className="mr-2 text-[11px] text-mute lg:hidden">C</span>
                {m.control.toFixed(1)}%
              </p>
              <p className="font-mono text-[15px] text-cyan lg:text-right">
                <span className="mr-2 text-[11px] text-mute lg:hidden">V</span>
                {m.variant.toFixed(1)}%
              </p>
              <div className="relative h-8">
                <span className="absolute inset-y-0 w-px bg-ink/30" style={{ left: `${toPct(0)}%` }} aria-hidden />
                {m.ci ?
                <>
                    <motion.span
                    className="absolute top-1/2 h-2 -translate-y-1/2"
                    style={{ left: `${toPct(m.ci[0])}%`, background: m.ci[0] > 0 ? '#19c9b6' : '#19c9b666' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${toPct(m.ci[1]) - toPct(m.ci[0])}%` }}
                    transition={{ duration: 0.3, delay: i * 0.06, ease: 'easeOut' }} />
                  
                    <span className="absolute top-1/2 h-4 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-ink" style={{ left: `${toPct(lift)}%` }} />
                    <span className="absolute -bottom-1 font-mono text-[10px] text-mute" style={{ left: `${toPct(lift)}%`, transform: 'translateX(-50%)' }}>
                      +{lift.toFixed(1)}% [{m.ci[0] > 0 ? '+' : ''}
                      {m.ci[0]}, +{m.ci[1]}]
                    </span>
                  </> :

                <span className="absolute inset-0 flex items-center pl-2 text-[12px] text-amber">Observed +{lift.toFixed(1)}% · interval withheld — {m.note}</span>
                }
              </div>
              <p className="font-mono text-[15px] lg:text-right">{m.probBetter !== undefined ? <span className={m.probBetter >= 95 ? 'text-lime' : 'text-ink/80'}>{m.probBetter}%</span> : <span className="text-mute">—</span>}</p>
            </div>);

        })}
      </OpsPanel>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <OpsPanel title="DECISION">
          <p className="text-[14px] leading-relaxed text-ink/85">
            <span className="text-lime">Registration CVR</span> and <span className="text-lime">Character Completion</span> clear the bar. First Quest is promising but its interval crosses zero. Keep running until First Referral attribution closes (~31h).
          </p>
        </OpsPanel>
        <OpsPanel title="GUARDRAILS">
          <ul className="space-y-2 text-[13px] text-ink/85">
            <li className="flex justify-between"><span>Risk-flag rate</span><span className="font-mono">2.1% vs 2.3%</span></li>
            <li className="flex justify-between"><span>Time to register</span><span className="font-mono">+18s</span></li>
            <li className="flex justify-between"><span>Sample ratio check</span><span className="font-mono text-lime">pass</span></li>
          </ul>
        </OpsPanel>
      </div>
    </div>);

}

