'use client';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, LoaderIcon, SearchIcon } from 'lucide-react';
import { PublicTopBar } from '@/components/layout/PublicTopBar';
import { PixelWindow } from '@/components/pixel/PixelWindow';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelInput } from '@/components/pixel/PixelInput';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { TypeLine } from '@/components/pixel/TypeLine';

import { cn } from '@/utils/cn';


const STEPS = [
{ key: 'IDENTITY', prompt: 'Identify yourself, explorer. What should the campus call you?' },
{ key: 'CAMPUS', prompt: 'Locating your home campus on the GrowthOS grid...' },
{ key: 'ACADEMIC PROFILE', prompt: 'Calibrating your academic signal.' },
{ key: 'ACCOUNT', prompt: 'Where should we send your workshop access key?' },
{ key: 'CREATE EXPLORER', prompt: 'ID compiled. Ready to forge your explorer.' }];


const COLLEGES = ['PES University', 'RV College of Engineering', 'VIT Vellore', 'SRM Chennai', 'Manipal Institute of Technology', 'NIT Trichy', 'CBIT Hyderabad', 'Anna University'];
const BRANCHES = ['Computer Science', 'Electronics', 'Information Tech', 'Electrical', 'Mechanical', 'AI & Data Science'];
const YEARS = ['2025', '2026', '2027'];

export default function InitializeId() {
  const router = useRouter();
  
  const initialStep = 0;
  const [step, setStep] = useState(initialStep);
  const [form, setForm] = useState(() =>
  initialStep > 0 ?
  {
    name: 'Srinidhi Rao',
    college: 'PES University',
    branch: initialStep > 2 ? 'Computer Science' : '',
    gradYear: initialStep > 2 ? '2026' : '',
    email: initialStep > 3 ? 'srinidhi@pes.edu' : ''
  } :
  { name: '', college: '', branch: '', gradYear: '', email: '' }
  );
  const [error, setError] = useState<string | undefined>();
  const [query, setQuery] = useState('');
  const [compiling, setCompiling] = useState(false);

  const colleges = useMemo(() => COLLEGES.filter((c) => c.toLowerCase().includes(query.toLowerCase())), [query]);

  const validate = (): string | undefined => {
    if (step === 0 && form.name.trim().length < 2) return 'Name needs at least 2 characters.';
    if (step === 1 && !form.college) return 'Select your campus to continue.';
    if (step === 2 && (!form.branch || !form.gradYear)) return 'Choose a branch and graduation year.';
    if (step === 3 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'That email address looks invalid.';
    return undefined;
  };

  const next = () => {
    const err = validate();
    setError(err);
    if (err) return;
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    setCompiling(true);
    // setProfile({ ...form, explorerName: form.name.split(' ')[0].toUpperCase() });
    setTimeout(() => router.push('/character/create'), 1100);
  };

  const back = () => {
    setError(undefined);
    setStep((s) => Math.max(0, s - 1));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-void">
      <div className="grid-floor absolute inset-0 opacity-60" aria-hidden />
      <PixelParticles count={16} colors={['#3ef2ff', '#b6ff3b']} />
      <PublicTopBar label="ID INITIALIZATION" hideCta />

      <main className="relative z-10 mx-auto max-w-[1180px] px-5 pb-16 pt-24 md:px-10 md:pt-28">
        <h1 className="font-pixel text-[16px] leading-[1.5] text-ink md:text-[26px]">
          INITIALIZE YOUR <span className="text-cyan">GROWTHOS ID</span>
        </h1>
        <p className="mt-3 font-term text-xl text-mute">Five quick calibrations. About 60 seconds.</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[260px_minmax(0,720px)]">
          <ol className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:gap-0 lg:overflow-visible" aria-label="Progress">
            {STEPS.map((s, i) => {
              const state = i < step ? 'done' : i === step ? 'current' : 'todo';
              return (
                <li key={s.key} className="flex shrink-0 items-center gap-2 lg:flex-col lg:items-start lg:gap-0">
                  <div className="flex items-center gap-3" aria-current={state === 'current' ? 'step' : undefined}>
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center font-px text-[11px]',
                        state === 'done' && 'bg-lime text-void',
                        state === 'current' && 'bg-cyan text-void',
                        state === 'todo' && 'bg-deep text-mute'
                      )}>
                      
                      {state === 'done' ? <CheckIcon className="h-4 w-4" /> : pad(i + 1)}
                    </span>
                    <span className={cn('whitespace-nowrap font-px text-[11px] tracking-widest', state === 'todo' ? 'text-mute' : 'text-ink')}>
                      {s.key}
                    </span>
                  </div>
                  {i < STEPS.length - 1 &&
                  <span className="flex gap-[3px] lg:my-1 lg:ml-[15px] lg:flex-col" aria-hidden>
                      {[0, 1, 2].map((d) =>
                    <span key={d} className={cn('h-[6px] w-[6px]', i < step ? 'bg-lime' : 'bg-line', i === step && 'glow-pulse bg-cyan')} />
                    )}
                    </span>
                  }
                </li>);

            })}
          </ol>

          <PixelWindow title={`GROWTHOS://init/${pad(step + 1)}-${STEPS[step].key.toLowerCase().replace(' ', '-')}`} tone="cyan" bodyClassName="relative overflow-hidden p-6 md:p-8">
            <CrtOverlay />
            <div className="relative">
              <TypeLine key={step} text={STEPS[step].prompt} className="text-2xl text-cyan" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-8 min-h-[260px]">
                  
                  {step === 0 &&
                  <PixelInput
                    label="FULL NAME"
                    placeholder="Srinidhi Rao"
                    value={form.name}
                    autoFocus
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && next()}
                    error={error}
                    hint="This becomes your default explorer name." />

                  }

                  {step === 1 &&
                  <div>
                      <label htmlFor="campus-search" className="mb-2 block font-px text-[11px] tracking-wider text-cyan">
                        COLLEGE
                      </label>
                      <div className="px-frame-sm flex h-12 items-center gap-2 bg-void px-3 [--b:#3b2f8f] focus-within:[--b:#3ef2ff]">
                        <SearchIcon className="h-4 w-4 text-lime" />
                        <input
                        id="campus-search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search campuses"
                        className="flex-1 bg-transparent font-term text-2xl text-ink outline-none placeholder:text-mute/50" />
                      
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="College">
                        {colleges.map((c) =>
                      <button
                        key={c}
                        role="radio"
                        aria-checked={form.college === c}
                        onClick={() => setForm({ ...form, college: c })}
                        className={cn(
                          'flex items-center justify-between gap-3 px-3 py-2.5 text-left font-term text-xl transition-colors duration-150',
                          form.college === c ? 'bg-cyan/15 text-cyan' : 'bg-deep/60 text-ink/85 hover:bg-deep'
                        )}>
                        
                            {c}
                            {form.college === c && <CheckIcon className="h-4 w-4 shrink-0" />}
                          </button>
                      )}
                        {colleges.length === 0 && <p className="font-term text-xl text-mute">No campus found. Try a shorter search.</p>}
                      </div>
                      {error && <p className="mt-3 font-term text-lg text-danger">ERR // {error}</p>}
                    </div>
                  }

                  {step === 2 &&
                  <div className="space-y-8">
                      <ChipGroup label="BRANCH" options={BRANCHES} value={form.branch} onChange={(v) => setForm({ ...form, branch: v })} />
                      <ChipGroup label="GRADUATION YEAR" options={YEARS} value={form.gradYear} onChange={(v) => setForm({ ...form, gradYear: v })} />
                      {error && <p className="font-term text-lg text-danger">ERR // {error}</p>}
                    </div>
                  }

                  {step === 3 &&
                  <PixelInput
                    label="EMAIL"
                    type="email"
                    placeholder="you@college.edu"
                    value={form.email}
                    autoFocus
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && next()}
                    error={error}
                    hint="We'll send a magic sign-in link. No password to remember." />

                  }

                  {step === 4 &&
                  <div className="grid gap-px bg-line sm:grid-cols-2">
                      {[
                    ['NAME', form.name],
                    ['CAMPUS', form.college],
                    ['BRANCH', form.branch],
                    ['CLASS OF', form.gradYear],
                    ['EMAIL', form.email],
                    ['STATUS', 'READY TO FORGE']].
                    map(([k, v]) =>
                    <div key={k} className="bg-void p-4">
                          <p className="font-px text-[10px] tracking-widest text-mute">{k}</p>
                          <p className={cn('mt-1 truncate font-term text-2xl', k === 'STATUS' ? 'text-lime' : 'text-ink')}>{v}</p>
                        </div>
                    )}
                    </div>
                  }
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between gap-4 border-t-2 border-line pt-6">
                <PixelButton variant="ghost" size="md" onClick={back} disabled={step === 0 || compiling} icon={<ArrowLeftIcon className="h-4 w-4" />}>
                  Back
                </PixelButton>
                <PixelButton
                  size="md"
                  variant={step === 4 ? 'primary' : 'cyan'}
                  onClick={next}
                  disabled={compiling}
                  icon={compiling ? <LoaderIcon className="h-4 w-4 animate-spin" /> : step === 4 ? undefined : <ArrowRightIcon className="h-4 w-4" />}>
                  
                  {compiling ? 'Compiling ID' : step === 4 ? 'Create explorer' : 'Continue'}
                </PixelButton>
              </div>
            </div>
          </PixelWindow>
        </div>
      </main>
    </div>);

}

function ChipGroup({ label, options, value, onChange }: {label: string;options: string[];value: string;onChange: (v: string) => void;}) {
  return (
    <div>
      <p className="mb-3 font-px text-[11px] tracking-wider text-cyan" id={`grp-${label}`}>
        {label}
      </p>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-labelledby={`grp-${label}`}>
        {options.map((o) =>
        <button
          key={o}
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={cn(
            'px-frame-sm px-3 py-2 font-term text-xl transition-colors duration-150',
            value === o ? 'bg-lime text-void [--b:#79b51c]' : 'bg-deep text-ink/85 [--b:#2f2670] hover:[--b:#5546c9]'
          )}>
          
            {o}
          </button>
        )}
      </div>
    </div>);

}

function pad(n: number) {
  return String(n).padStart(2, '0');
}







