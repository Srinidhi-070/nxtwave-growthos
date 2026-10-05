'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ShuffleIcon, UserIcon, SmileIcon, EyeIcon, ScissorsIcon, ShirtIcon, HeadphonesIcon, SparklesIcon } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { SoundToggle } from '@/components/pixel/SoundToggle';
import { PixelWindow } from '@/components/pixel/PixelWindow';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { PixelParticles } from '@/components/pixel/PixelParticles';
import { CrtOverlay } from '@/components/pixel/CrtOverlay';
import { OptionTile } from '@/components/creator/OptionTile';
import { usePlayer } from '@/contexts/PlayerContext';
import { IMAGES } from '@/data/images';
import {
  ACCESSORY_LABELS,
  EFFECT_LABELS,
  EYE_LABELS,
  FACE_LABELS,
  HAIR_COLORS,
  HAIR_LABELS,
  OUTFIT_COLORS,
  OUTFIT_LABELS,
  SKIN_TONES } from
'@/data/spriteParts';
import type { Accessory, CharacterConfig, Effect, EyeStyle, FaceStyle, HairStyle, OutfitStyle } from '@/types/character';
import { cn } from '@/utils/cn';
import { accentOf } from '@/utils/sprite';

type Category = 'BODY' | 'FACE' | 'EYES' | 'HAIR' | 'OUTFIT' | 'ACCESSORY' | 'EFFECT';

const CATEGORIES: {key: Category;Icon: React.ComponentType<{className?: string;}>;}[] = [
{ key: 'BODY', Icon: UserIcon },
{ key: 'FACE', Icon: SmileIcon },
{ key: 'EYES', Icon: EyeIcon },
{ key: 'HAIR', Icon: ScissorsIcon },
{ key: 'OUTFIT', Icon: ShirtIcon },
{ key: 'ACCESSORY', Icon: HeadphonesIcon },
{ key: 'EFFECT', Icon: SparklesIcon }];


const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function CharacterCreator() {
  const router = useRouter();
  const { character, setCharacter, explorerName, setProfile } = usePlayer();
  const [cfg, setCfg] = useState<CharacterConfig>(character);
  const [cat, setCat] = useState<Category>('HAIR');
  const [name, setName] = useState(explorerName);
  const [nameError, setNameError] = useState<string | undefined>();
  const [rollKey, setRollKey] = useState(0);

  const update = (patch: Partial<CharacterConfig>) => setCfg((c) => ({ ...c, ...patch }));

  const randomize = () => {
    setCfg({
      skin: Math.floor(Math.random() * SKIN_TONES.length),
      hair: pick(Object.keys(HAIR_LABELS) as HairStyle[]),
      hairColor: Math.floor(Math.random() * HAIR_COLORS.length),
      face: pick(Object.keys(FACE_LABELS) as FaceStyle[]),
      eyes: pick(Object.keys(EYE_LABELS) as EyeStyle[]),
      outfit: pick(Object.keys(OUTFIT_LABELS) as OutfitStyle[]),
      outfitColor: Math.floor(Math.random() * OUTFIT_COLORS.length),
      accessory: pick(Object.keys(ACCESSORY_LABELS) as Accessory[]),
      effect: pick(Object.keys(EFFECT_LABELS) as Effect[])
    });
    setRollKey((k) => k + 1);
  };

  const enter = async () => {
    const clean = name.trim().toUpperCase();
    if (clean.length < 2 || clean.length > 14) {
      setNameError('Explorer name must be 2–14 characters.');
      return;
    }
    try {
      // 1. Validate
      if (clean.length < 2 || clean.length > 14) {
        setNameError('Explorer name must be 2-14 characters.');
        return;
      }
      // 2. Persist to backend
      const res = await fetch('/api/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: cfg, displayName: clean })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save character');
      
      // 3. Update local cache & transition
      setCharacter(cfg);
      setProfile({ explorerName: clean });
      router.push('/init');
    } catch (e: any) {
      setNameError(e.message);
    }
  };

  const accent = accentOf(cfg);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-void">
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGES.chamber} alt="" className="pixelated h-full w-full object-cover" />
        <div className="absolute inset-0 bg-void/75" />
      </div>
      <PixelParticles count={20} colors={['#3ef2ff', '#b6ff3b']} />
      <CrtOverlay />

      <header className="relative z-20 mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-6">
          <Logo />
          <span className="hidden font-px text-[10px] tracking-widest text-mute md:inline">{'//'} CHARACTER CHAMBER · 05 CREATE EXPLORER</span>
        </div>
        <SoundToggle />
      </header>

      <main className="relative z-10 mx-auto grid max-w-[1440px] gap-6 px-5 pb-40 md:px-8 lg:grid-cols-[200px_1fr_380px] lg:pb-32">
        <nav aria-label="Customization categories" className="order-2 lg:order-1">
          <ul className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:gap-1.5 lg:overflow-visible">
            {CATEGORIES.map(({ key, Icon }) =>
            <li key={key}>
                <button
                onClick={() => setCat(key)}
                aria-current={cat === key}
                className={cn(
                  'flex w-full items-center gap-3 whitespace-nowrap px-3 py-3 font-px text-[11px] tracking-widest transition-colors duration-150',
                  cat === key ? 'bg-lime text-void' : 'bg-void/70 text-ink/80 hover:bg-deep hover:text-ink'
                )}>
                
                  <Icon className="h-4 w-4" />
                  {key}
                  {cat === key && <span className="ml-auto hidden lg:inline">▶</span>}
                </button>
              </li>
            )}
          </ul>
        </nav>

        <section className="order-1 flex flex-col items-center justify-center lg:order-2" aria-label="Explorer preview">
          <div className="relative flex h-[340px] w-full max-w-[460px] items-end justify-center md:h-[480px]">
            <div className="spin-slow absolute bottom-[40px] left-1/2 h-[300px] w-full max-w-[300px] -translate-x-1/2 md:h-[400px] md:w-[400px]" aria-hidden>
              <div className="absolute inset-0 border-2 border-dashed" style={{ borderColor: `${accent}40` }} />
            </div>
            <div className="scan-sweep absolute inset-x-[15%] top-0 h-[6%] bg-cyan/10" aria-hidden />
            <motion.div
              key={rollKey}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 mb-[38px]">
              
              <PixelCharacter config={cfg} size={176} className="md:hidden" label="Your explorer" />
              <PixelCharacter config={cfg} size={256} className="hidden md:inline-block" label="Your explorer" />
            </motion.div>
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center" aria-hidden>
              <div className="h-3 w-full max-w-[220px] md:w-full max-w-[300px]" style={{ background: accent, opacity: 0.85 }} />
              <div className="h-4 w-full max-w-[250px] bg-deep md:w-[340px]" />
              <div className="h-3 w-full max-w-[280px] bg-night md:w-[380px]" />
            </div>
          </div>
          <dl className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 font-term text-lg">
            {[
            ['HAIR', HAIR_LABELS[cfg.hair]],
            ['OUTFIT', OUTFIT_LABELS[cfg.outfit]],
            ['GEAR', ACCESSORY_LABELS[cfg.accessory]],
            ['FX', EFFECT_LABELS[cfg.effect]]].
            map(([k, v]) =>
            <div key={k} className="flex gap-2">
                <dt className="text-mute">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            )}
          </dl>
        </section>

        <div className="order-3">
          <PixelWindow title={`${cat} // SELECT`} tone="cyan" className="bg-void/85">
            <CategoryOptions cat={cat} cfg={cfg} update={update} />
          </PixelWindow>
        </div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-line bg-void/95">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-4 md:flex-row md:items-end md:px-8">
          <div className="flex-1 md:max-w-[420px]">
            <label htmlFor="explorer-name" className="mb-1.5 block font-px text-[10px] tracking-widest text-cyan">
              EXPLORER NAME
            </label>
            <div className={cn('px-frame-sm flex h-11 items-center gap-2 bg-void px-3', nameError ? '[--b:#ff4d5e]' : '[--b:#3b2f8f] focus-within:[--b:#3ef2ff]')}>
              <span className="font-term text-xl text-lime">&gt;</span>
              <input
                id="explorer-name"
                value={name}
                maxLength={14}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(undefined);
                }}
                className="flex-1 bg-transparent font-pixel text-[12px] uppercase tracking-wider text-ink outline-none"
                aria-invalid={!!nameError} />
              
              <span className="font-px text-[9px] text-mute">{name.length}/14</span>
            </div>
            {nameError && <p className="mt-1 font-term text-lg text-danger">ERR // {nameError}</p>}
          </div>
          <div className="flex gap-4 md:ml-auto">
            <PixelButton variant="ghost" onClick={randomize} icon={<ShuffleIcon className="h-4 w-4 text-magenta" />} className="flex-1 md:flex-none">
              Randomize
            </PixelButton>
            <PixelButton onClick={enter} size="md" icon={<ArrowRightIcon className="h-4 w-4" />} className="flex-1 md:flex-none">
              Enter the world
            </PixelButton>
          </div>
        </div>
      </footer>
    </div>);

}

function CategoryOptions({ cat, cfg, update }: {cat: Category;cfg: CharacterConfig;update: (p: Partial<CharacterConfig>) => void;}) {
  const grid = 'grid grid-cols-3 gap-3';
  if (cat === 'BODY') {
    return (
      <div className={grid} role="radiogroup" aria-label="Skin tone">
        {SKIN_TONES.map((s, i) =>
        <OptionTile key={s.name} label={s.name} preview={{ ...cfg, skin: i }} selected={cfg.skin === i} onSelect={() => update({ skin: i })} />
        )}
      </div>);

  }
  if (cat === 'FACE') {
    return (
      <div className={grid} role="radiogroup" aria-label="Face">
        {(Object.keys(FACE_LABELS) as FaceStyle[]).map((f) =>
        <OptionTile key={f} label={FACE_LABELS[f]} preview={{ ...cfg, face: f }} selected={cfg.face === f} onSelect={() => update({ face: f })} />
        )}
      </div>);

  }
  if (cat === 'EYES') {
    return (
      <div className={grid} role="radiogroup" aria-label="Eyes">
        {(Object.keys(EYE_LABELS) as EyeStyle[]).map((e) =>
        <OptionTile key={e} label={EYE_LABELS[e]} preview={{ ...cfg, eyes: e, accessory: cfg.accessory === 'visor' ? 'none' : cfg.accessory }} selected={cfg.eyes === e} onSelect={() => update({ eyes: e })} />
        )}
      </div>);

  }
  if (cat === 'HAIR') {
    return (
      <div className="space-y-5">
        <div className={grid} role="radiogroup" aria-label="Hairstyle">
          {(Object.keys(HAIR_LABELS) as HairStyle[]).map((h) =>
          <OptionTile key={h} label={HAIR_LABELS[h]} preview={{ ...cfg, hair: h }} selected={cfg.hair === h} onSelect={() => update({ hair: h })} />
          )}
        </div>
        <Swatches label="HAIR COLOR" colors={HAIR_COLORS.map((c) => ({ name: c.name, hex: c.H }))} value={cfg.hairColor} onChange={(i) => update({ hairColor: i })} />
      </div>);

  }
  if (cat === 'OUTFIT') {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Outfit">
          {(Object.keys(OUTFIT_LABELS) as OutfitStyle[]).map((o) =>
          <OptionTile key={o} label={OUTFIT_LABELS[o]} preview={{ ...cfg, outfit: o }} selected={cfg.outfit === o} onSelect={() => update({ outfit: o })} />
          )}
        </div>
        <Swatches label="PALETTE" colors={OUTFIT_COLORS.map((c) => ({ name: c.name, hex: c.A }))} value={cfg.outfitColor} onChange={(i) => update({ outfitColor: i })} />
      </div>);

  }
  if (cat === 'ACCESSORY') {
    return (
      <div className={grid} role="radiogroup" aria-label="Accessory">
        {(Object.keys(ACCESSORY_LABELS) as Accessory[]).map((a) =>
        <OptionTile key={a} label={ACCESSORY_LABELS[a]} preview={{ ...cfg, accessory: a }} selected={cfg.accessory === a} onSelect={() => update({ accessory: a })} />
        )}
      </div>);

  }
  return (
    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Effect">
      {(Object.keys(EFFECT_LABELS) as Effect[]).map((ef) =>
      <OptionTile key={ef} label={EFFECT_LABELS[ef]} preview={{ ...cfg, effect: ef }} selected={cfg.effect === ef} onSelect={() => update({ effect: ef })} showEffect />
      )}
    </div>);

}

function Swatches({ label, colors, value, onChange }: {label: string;colors: {name: string;hex: string;}[];value: number;onChange: (i: number) => void;}) {
  return (
    <div>
      <p className="mb-3 font-px text-[10px] tracking-widest text-mute">
        {label} <span className="text-ink">{'//'} {colors[value]?.name}</span>
      </p>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={label}>
        {colors.map((c, i) =>
        <button
          key={c.name}
          role="radio"
          aria-checked={value === i}
          aria-label={c.name}
          onClick={() => onChange(i)}
          className={cn('px-frame-sm h-9 w-9 p-1.5', value === i ? '[--b:#ffffff]' : '[--b:#2f2670] hover:[--b:#5546c9]')}>
          
            <span className="block h-full w-full" style={{ background: c.hex }} />
          </button>
        )}
      </div>
    </div>);

}







