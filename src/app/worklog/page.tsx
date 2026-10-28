import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GrowthOS — AI Worklog',
  description:
    'How AI helped me explore, challenge assumptions, and build a student growth system. NxtWave Growth Intern Challenge submission by Srinidhi N S.',
};

/* ─── Types ────────────────────────────────────────────────────── */
interface ExampleCard {
  number: string;
  title: string;
  tag: string;
  prompt: string;
  aiOutput: string;
  changed: string;
  result: string;
  accentVar: string; // CSS variable name on :root
}

const EXAMPLES: ExampleCard[] = [
  {
    number: '01',
    title: 'Growth Strategy',
    tag: 'CHALLENGE → SYSTEM',
    prompt:
      'How can I solve NxtWave\'s challenge of getting 500 students to register for an AI workshop?',
    aiOutput:
      'A referral-focused growth system was suggested as a way to drive student registrations.',
    changed:
      'I expanded the idea beyond referrals to address the complete student journey, from registration to engagement and project completion.',
    result:
      'GrowthOS connects registration, character creation, quests, Crew referrals, workshops, and project progression into one student experience.',
    accentVar: '--cyan',
  },
  {
    number: '02',
    title: 'Visual Design',
    tag: 'THEME → EXPERIENCE',
    prompt: 'How can I redesign GrowthOS around a retro pixel-art experience?',
    aiOutput:
      'Applying the visual theme to the interface was explored as a design direction.',
    changed:
      'I wanted the theme to influence the entire experience, rather than just its appearance.',
    result:
      'A retro-futuristic AI campus with pixel characters, progression mechanics, animations, and game-like interactions.',
    accentVar: '--teal',
  },
  {
    number: '03',
    title: 'Technical Architecture',
    tag: 'EXTEND → AUDIT FIRST',
    prompt: 'How should I extend the existing GrowthOS backend?',
    aiOutput:
      'Broader architectural changes were explored as a possible direction.',
    changed:
      'I prioritized auditing the existing implementation before expanding it, to avoid unnecessarily rebuilding working features.',
    result:
      'An incremental approach focused on preserving existing functionality, identifying gaps, and extending the system carefully.',
    accentVar: '--magenta',
  },
];

/* ─── Sub-components (server-renderable, no "use client") ──────── */

function TerminalLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block font-term text-[13px] tracking-[0.2em] uppercase px-2 py-0.5"
      style={{ color: 'var(--teal)', border: '1px solid var(--teal)', opacity: 0.85 }}
    >
      {children}
    </span>
  );
}

function RowLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <div
      className="font-term text-[13px] tracking-[0.15em] uppercase mb-1.5"
      style={{ color: `var(${accent})`, opacity: 0.7 }}
    >
      {label}
    </div>
  );
}

function ExampleCardComponent({ ex }: { ex: ExampleCard }) {
  const accent = ex.accentVar;
  return (
    <article
      className="relative rounded-none w-full"
      style={{
        background: 'var(--panel)',
        border: `1px solid var(--line)`,
        borderLeft: `3px solid var(${accent})`,
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="font-pixel text-[10px] leading-none tabular-nums"
            style={{ color: `var(${accent})` }}
          >
            {ex.number}
          </span>
          <span
            className="font-pixel text-[10px] leading-none"
            style={{ color: 'var(--ink)' }}
          >
            {ex.title.toUpperCase()}
          </span>
        </div>
        <span
          className="font-term text-[12px] tracking-widest hidden sm:inline"
          style={{ color: 'var(--mute)' }}
        >
          {ex.tag}
        </span>
      </div>

      {/* Card body — 2-col on md+ */}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ '--tw-divide-opacity': '1', borderColor: 'var(--line)' } as React.CSSProperties}>

        {/* Left column */}
        <div className="p-5 flex flex-col gap-5" style={{ borderColor: 'var(--line)' }}>
          <div>
            <RowLabel label="Prompt" accent={accent} />
            <p
              className="font-mono text-[13px] leading-relaxed"
              style={{
                color: 'var(--ink)',
                background: 'var(--deep)',
                padding: '12px 14px',
                borderLeft: `2px solid var(${accent})`,
              }}
            >
              "{ex.prompt}"
            </p>
          </div>

          <div>
            <RowLabel label="AI Output" accent="--mute" />
            <p className="font-sans text-[14px] leading-relaxed" style={{ color: 'var(--mute)' }}>
              {ex.aiOutput}
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="p-5 flex flex-col gap-5" style={{ borderColor: 'var(--line)' }}>
          <div>
            <RowLabel label="What I Changed" accent={accent} />
            <p className="font-sans text-[14px] leading-relaxed" style={{ color: 'var(--ink)' }}>
              {ex.changed}
            </p>
          </div>

          <div>
            <RowLabel label="Final Output" accent={accent} />
            <p
              className="font-sans text-[14px] leading-relaxed"
              style={{
                color: 'var(--ink)',
                background: 'var(--deep)',
                padding: '12px 14px',
                borderLeft: `2px solid var(${accent})`,
              }}
            >
              {ex.result}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function WorklogPage() {
  return (
    <div
      className="relative min-h-screen w-full"
      style={{ background: 'var(--void)', color: 'var(--ink)' }}
    >
      {/* CRT scanline overlay — purely decorative, aria-hidden */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background:
            'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 3px)',
        }}
      />

      {/* Subtle dot grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(143,136,201,0.14) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <header className="mb-16 sm:mb-20">
          {/* Top bar */}
          <div
            className="flex items-center gap-3 mb-8 pb-4 border-b"
            style={{ borderColor: 'var(--line)' }}
          >
            <div
              className="w-2 h-2 rounded-none"
              style={{ background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }}
            />
            <span
              className="font-pixel text-[9px] tracking-widest"
              style={{ color: 'var(--cyan)' }}
            >
              GROWTHOS
            </span>
            <span
              className="font-pixel text-[9px] tracking-widest"
              style={{ color: 'var(--mute)' }}
            >
              //
            </span>
            <TerminalLabel>AI WORKLOG</TerminalLabel>
          </div>

          {/* Main title */}
          <h1
            className="font-pixel text-[15px] sm:text-[19px] leading-loose mb-6"
            style={{ color: 'var(--ink)' }}
          >
            AI WORKLOG
          </h1>

          <p
            className="font-sans text-[16px] sm:text-[17px] leading-relaxed max-w-2xl"
            style={{ color: 'var(--mute)' }}
          >
            How AI helped me explore, challenge assumptions, and build a student growth system.
          </p>

          {/* Decorative divider */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: 'var(--line)' }} />
            <span className="font-term text-[12px] tracking-widest" style={{ color: 'var(--line-hi)' }}>
              THREE EXAMPLES
            </span>
            <div className="h-px flex-1" style={{ background: 'var(--line)' }} />
          </div>
        </header>

        {/* ── EXAMPLE CARDS ──────────────────────────────────────── */}
        <section aria-label="AI usage examples" className="flex flex-col gap-6 mb-20">
          {EXAMPLES.map((ex) => (
            <ExampleCardComponent key={ex.number} ex={ex} />
          ))}
        </section>

        {/* ── PRINCIPLE ──────────────────────────────────────────── */}
        <section aria-label="Core principle" className="mb-16">
          <div
            className="px-6 sm:px-10 py-8 sm:py-10"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              borderTop: '2px solid var(--cyan)',
            }}
          >
            <div className="mb-5">
              <TerminalLabel>THE PRINCIPLE</TerminalLabel>
            </div>
            <blockquote
              className="font-sans text-[16px] sm:text-[18px] leading-relaxed"
              style={{ color: 'var(--ink)' }}
            >
              "I use AI to explore possibilities, but I make the final decisions based on the
              problem, the existing implementation, and the experience I want to create."
            </blockquote>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <footer
          className="pt-6 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          style={{ borderColor: 'var(--line)' }}
        >
          <p
            className="font-term text-[13px] tracking-widest"
            style={{ color: 'var(--mute)' }}
          >
            GrowthOS &middot; NxtWave Growth Intern Challenge &middot; Built by Srinidhi N S
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5"
              style={{ background: 'var(--cyan)', boxShadow: '0 0 4px var(--cyan)' }}
            />
            <span
              className="font-term text-[12px] tracking-widest"
              style={{ color: 'var(--mute)' }}
            >
              /worklog
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}
