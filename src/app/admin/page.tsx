'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon, SparklesIcon } from 'lucide-react';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';
import { TelemetryCard } from '@/components/ops/TelemetryCard';
import { EventStream } from '@/components/ops/EventStream';
import { useLiveEvents } from '@/hooks/useLiveEvents';
import { useCountUp } from '@/hooks/useCountUp';
import { CAMPAIGN, CAMPUSES, DAILY_REGS, PROJECTED_REGS } from '@/data/ops';

export default function OpsOverview() {
  const events = useLiveEvents(3200);
  const regs = useCountUp(CAMPAIGN.registrations, 1000);
  const gap = CAMPAIGN.target - CAMPAIGN.registrations;
  const segments = 50;
  const filled = Math.round(CAMPAIGN.registrations / CAMPAIGN.target * segments);
  const maxBar = 170;

  return (
    <div className="mx-auto max-w-[1400px]">
      <OpsPageHeader eyebrow="CAMPAIGN · LIVE · DAY 4 / 7" title="GROWTHOS CONTROL ROOM" />

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <OpsPanel title="REGISTRATIONS VS TARGET" meta="updated 4s ago">
          <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
            <div>
              <p className="font-mono text-[64px] font-medium leading-none text-ink md:text-[84px]">{Math.round(regs)}</p>
              <p className="mt-2 text-[13px] text-mute">registrations · 85.4% of target</p>
            </div>
            <dl className="flex gap-8 pb-2">
              <div>
                <dt className="font-px text-[10px] tracking-[0.2em] text-mute">TARGET</dt>
                <dd className="mt-1 font-mono text-[24px] text-ink/80">{CAMPAIGN.target}</dd>
              </div>
              <div>
                <dt className="font-px text-[10px] tracking-[0.2em] text-mute">GAP</dt>
                <dd className="mt-1 font-mono text-[24px] text-amber">{gap}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-6 flex gap-[3px]" role="progressbar" aria-valuenow={CAMPAIGN.registrations} aria-valuemax={CAMPAIGN.target} aria-label="Progress to target">
            {Array.from({ length: segments }).map((_, i) =>
            <motion.span
              key={i}
              className="h-4 flex-1"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: i < filled ? 1 : 0.15 }}
              transition={{ delay: i * 0.012, duration: 0.12 }}
              style={{ background: i < filled ? '#19c9b6' : '#2f2670' }} />

            )}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_220px]">
            <div>
              <p className="font-px text-[10px] tracking-[0.2em] text-mute">DAILY REGISTRATIONS</p>
              <div className="mt-4 flex h-[150px] items-end gap-3">
                {DAILY_REGS.map((d) =>
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <span className="font-mono text-[11px] text-ink/80">{d.value}</span>
                    <motion.span
                    className="w-full"
                    style={{ background: d.partial ? '#19c9b6aa' : '#19c9b6' }}
                    initial={{ height: 0 }}
                    animate={{ height: d.value / maxBar * 110 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }} />
                  
                    <span className="font-px text-[9px] text-mute">{d.day}</span>
                  </div>
                )}
                {PROJECTED_REGS.map((d) =>
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <span className="font-mono text-[11px] text-mute">
                      {d.low}–{d.high}
                    </span>
                    <span className="relative w-full" style={{ height: d.high / maxBar * 110 }}>
                      <span className="absolute inset-x-0 bottom-0 border border-dashed border-teal/50" style={{ height: '100%' }} />
                      <span className="absolute inset-x-0 bottom-0 bg-teal/15" style={{ height: `${d.low / d.high * 100}%` }} />
                    </span>
                    <span className="font-px text-[9px] text-mute">{d.day}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="border-l border-line/60 pl-5">
              <p className="font-px text-[10px] tracking-[0.2em] text-mute">PROJECTION</p>
              <p className="mt-3 font-mono text-[22px] text-ink">498–534</p>
              <p className="mt-2 text-[12px] leading-relaxed text-mute">Range from fitting the D1–D4 daily decay. Lower bound misses target by 2.</p>
              <p className="mt-4 font-mono text-[12px] text-amber">Need ≈25 / day</p>
            </div>
          </div>
        </OpsPanel>

        <div className="grid grid-cols-2 gap-5">
          <TelemetryCard label="REFERRED" value={CAMPAIGN.referred} sub="67.0% of registrations" color="#ff3fa4" spark={[40, 72, 88, 86]} />
          <TelemetryCard label="ACTIVE REFERRERS" value={CAMPAIGN.activeReferrers} sub="24.4% of students" color="#3ef2ff" spark={[18, 31, 29, 26]} delay={80} />
          <TelemetryCard label="CHARACTER COMPLETION" value={CAMPAIGN.characterCompletion} decimals={1} suffix="%" sub="401 of 427 created an explorer" color="#b6ff3b" spark={[90, 92, 95, 96]} delay={160} />
          <TelemetryCard label="WORKSHOP READY" value={CAMPAIGN.workshopReady} sub="56.4% · readiness 4/4" color="#ffc94a" spark={[60, 112, 180, 241]} delay={240} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <OpsPanel title="EVENT STREAM" meta={<Link href="/ops/events" className="hover:text-ink">open stream →</Link>} bodyClassName="py-1">
          <EventStream events={events} compact max={7} />
        </OpsPanel>
        <div className="flex flex-col gap-5">
          <OpsPanel title="TOP CAMPUSES">
            <ul className="space-y-2.5">
              {CAMPUSES.slice(0, 5).map((c) =>
              <li key={c.short} className="flex items-center gap-3 text-[13px]">
                  <span className="w-14 font-mono text-mute">{c.short}</span>
                  <span className="h-2 bg-teal" style={{ width: `${c.regs / 92 * 60}%` }} />
                  <span className="ml-auto font-mono text-ink">{c.regs}</span>
                </li>
              )}
            </ul>
          </OpsPanel>
          <Link href="/ops/copilot" className="px-frame-sm group block bg-[#0b0924] p-4 [--b:#221c55] hover:[--b:#19c9b6]">
            <p className="flex items-center gap-2 font-px text-[10px] tracking-[0.2em] text-teal">
              <SparklesIcon className="h-3.5 w-3.5" /> COPILOT · SIGNAL DETECTED
            </p>
            <p className="mt-2 text-[14px] text-ink">Referral registrations up 81% over the last 6 hours.</p>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-mute group-hover:text-ink">
              Review analysis <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </p>
          </Link>
        </div>
      </div>
    </div>);

}

