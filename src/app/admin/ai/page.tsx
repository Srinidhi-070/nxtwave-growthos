'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, FlaskConicalIcon, FileSearchIcon, SendIcon } from 'lucide-react';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { TypeLine } from '@/components/pixel/TypeLine';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { COPILOT_SIGNALS, REFERRAL_HOURLY } from '@/data/ops';
import { cn } from '@/utils/cn';

const SECTIONS = [
{
  key: 'OBSERVED',
  color: '#3ef2ff',
  body:
  <>
        Referral registrations: <span className="text-ink">38</span> in the last 6h vs <span className="text-ink">21</span> in the prior 6h (<span className="text-lime">+81%</span>). Share of new regs from referrals rose from 61% to 74%.
      </>

},
{
  key: 'INFERRED',
  color: '#b4a8ff',
  body:
  <>
        Possible contributors, ranked by timing overlap:
        <ul className="mt-2 space-y-1">
          <li>— connector activation: 3 connectors went from 0 → 4+ invites after 15:00</li>
          <li>— referral experiment #007 variant traffic (62% of the lift)</li>
          <li>— community distribution: VIT WhatsApp group share at 16:20</li>
        </ul>
        <span className="mt-2 block text-mute">Confidence: moderate. Contributors overlap in time and can’t be fully separated from observational data.</span>
      </>

},
{
  key: 'RECOMMENDED',
  color: '#b6ff3b',
  body: <>Test stronger crew activation for high-intent registrants — students who finish character creation in under 90s get a “bring 2 friends” quest immediately.</>
}];


export default function GrowthCopilot() {
  const [sel, setSel] = useState('s1');
  const [evidence, setEvidence] = useState(false);
  const [created, setCreated] = useState(false);
  const [q, setQ] = useState('');
  const [asked, setAsked] = useState<string | null>(null);
  const max = Math.max(...REFERRAL_HOURLY);

  return (
    <div className="mx-auto max-w-[1400px]">
      <OpsPageHeader eyebrow="INTELLIGENCE" title="GROWTH COPILOT" />
      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <OpsPanel title="SIGNALS" bodyClassName="p-0">
          <ul>
            {COPILOT_SIGNALS.map((s) =>
            <li key={s.id}>
                <button
                onClick={() => setSel(s.id)}
                className={cn('flex w-full items-start gap-3 border-b border-line/40 px-4 py-3 text-left transition-colors duration-150', sel === s.id ? 'bg-teal/10' : 'hover:bg-white/[0.02]')}>
                
                  <span className="mt-1.5 h-2 w-2 shrink-0" style={{ background: s.tone }} />
                  <span>
                    <span className="block text-[13px] text-ink">{s.title}</span>
                    <span className="font-mono text-[11px] text-mute">{s.time}</span>
                  </span>
                </button>
              </li>
            )}
          </ul>
        </OpsPanel>

        <section className="px-frame-sm relative overflow-hidden bg-[#070618] [--b:#221c55]" aria-label="Copilot analysis">
          <CrtOverlay />
          <div className="relative p-5 md:p-7">
            <div className="flex items-center gap-3">
              <span className="glow-pulse h-2 w-2 bg-lime" />
              <TypeLine key={sel} text={sel === 's1' ? 'SIGNAL DETECTED — referral growth increased over the last 6 hours.' : 'Loading analysis for this signal…'} prefix="" className="text-2xl text-lime" />
            </div>

            {sel === 's1' ?
            <div className="mt-6 space-y-6">
                {SECTIONS.map((s, i) =>
              <motion.div key={s.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08, duration: 0.25, ease: 'easeOut' }} className="grid gap-2 md:grid-cols-[150px_1fr]">
                    <p className="font-px text-[10px] tracking-[0.2em]" style={{ color: s.color }}>
                      {s.key}
                    </p>
                    <div className="font-mono text-[13px] leading-relaxed text-ink/85">{s.body}</div>
                  </motion.div>
              )}

                <div className="grid gap-2 md:grid-cols-[150px_1fr]">
                  <p className="font-px text-[10px] tracking-[0.2em] text-amber">EVIDENCE</p>
                  <div>
                    <button onClick={() => setEvidence((e) => !e)} aria-expanded={evidence} className="font-mono text-[13px] text-ink/85 underline decoration-line underline-offset-4 hover:text-ink">
                      {evidence ? 'Hide' : 'Show'} 4 sources · hourly referral regs, connector log, exp #007, share links
                    </button>
                    <AnimatePresence initial={false}>
                      {evidence &&
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} className="overflow-hidden">
                          <div className="mt-4 bg-deep/50 p-4">
                            <p className="font-px text-[9px] tracking-[0.2em] text-mute">REFERRAL REGISTRATIONS / HOUR · LAST 12H</p>
                            <div className="mt-3 flex h-24 items-end gap-1.5">
                              {REFERRAL_HOURLY.map((v, i) =>
                          <span key={i} className="flex-1" style={{ height: `${v / max * 100}%`, background: i >= 6 ? '#b6ff3b' : '#3b2f8f' }} title={`${v}`} />
                          )}
                            </div>
                            <div className="mt-1 flex justify-between font-mono text-[10px] text-mute">
                              <span>-12h</span>
                              <span>-6h</span>
                              <span>now</span>
                            </div>
                          </div>
                        </motion.div>
                    }
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid gap-2 md:grid-cols-[150px_1fr]">
                  <p className="font-px text-[10px] tracking-[0.2em] text-magenta">NEXT EXPERIMENT</p>
                  <div className="font-mono text-[13px] leading-relaxed text-ink/85">
                    <p className="text-ink">EXP #008 · Fast-track crew quest</p>
                    <p>Audience: char. creation &lt; 90s · Metric: first referral within 24h · MDE 5pp · est. 2.5 days at current traffic</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 border-t border-line/60 pt-6">
                  <PixelButton variant="cyan" size="sm" onClick={() => setCreated(true)} disabled={created} icon={created ? <CheckIcon className="h-3.5 w-3.5" /> : <FlaskConicalIcon className="h-3.5 w-3.5" />}>
                    {created ? 'Draft #008 created' : 'Create experiment'}
                  </PixelButton>
                  <PixelButton variant="ghost" size="sm" onClick={() => setEvidence(true)} icon={<FileSearchIcon className="h-3.5 w-3.5 text-amber" />}>
                    Open evidence
                  </PixelButton>
                </div>
              </div> :

            <p className="mt-6 font-mono text-[13px] text-mute">Analysis for this signal is queued behind the current run. ETA ~40s.</p>
            }

            <form
              className="mt-8 border-t border-line/60 pt-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim()) {
                  setAsked(q.trim());
                  setQ('');
                }
              }}>
              
              {asked && <p className="mb-3 font-mono text-[12px] text-mute">&gt; {asked} — queued. Answers cite the event stream and experiment logs.</p>}
              <div className="flex items-center gap-3 bg-deep/60 px-3 py-2">
                <span className="font-term text-xl text-lime">&gt;</span>
                <label htmlFor="copilot-q" className="sr-only">
                  Ask the copilot
                </label>
                <input id="copilot-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Why did SRM registrations slow after 18:00?" className="flex-1 bg-transparent font-mono text-[13px] text-ink outline-none placeholder:text-mute/60" />
                <button type="submit" aria-label="Ask" className="text-mute transition-colors duration-150 hover:text-teal">
                  <SendIcon className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>);

}

