import {
  ACCESSORIES,
  BACKPACK_BACK,
  BASE,
  EYES,
  FACES,
  FIXED,
  HAIRS,
  HAIR_COLORS,
  OUTFITS,
  OUTFIT_COLORS,
  SKIN_TONES,
  SPRITE_H,
  SPRITE_W,
  type Pt } from
'../data/spriteParts';
import type { CharacterConfig, Pixel } from '../types/character';

export function buildSprite(cfg: CharacterConfig): Pixel[] {
  const skin = SKIN_TONES[cfg.skin] ?? SKIN_TONES[0];
  const hair = HAIR_COLORS[cfg.hairColor] ?? HAIR_COLORS[0];
  const outfit = OUTFIT_COLORS[cfg.outfitColor] ?? OUTFIT_COLORS[0];
  const pal: Record<string, string> = {
    ...FIXED,
    S: skin.S,
    s: skin.s,
    H: hair.H,
    h: hair.h,
    O: outfit.O,
    o: outfit.o,
    A: outfit.A,
    L: outfit.A,
    l: outfit.O
  };

  const grid: (string | null)[][] = Array.from({ length: SPRITE_H }, () => Array(SPRITE_W).fill(null));

  const paintRows = (rows: string[], y0: number) => {
    rows.forEach((row, dy) => {
      const y = y0 + dy;
      if (y < 0 || y >= SPRITE_H) return;
      for (let x = 0; x < Math.min(row.length, SPRITE_W); x++) {
        const ch = row[x];
        if (ch !== '.' && pal[ch]) grid[y][x] = pal[ch];
      }
    });
  };
  const paintPts = (pts: Pt[]) => {
    pts.forEach(([x, y, role]) => {
      if (y >= 0 && y < SPRITE_H && x >= 0 && x < SPRITE_W && pal[role]) grid[y][x] = pal[role];
    });
  };

  if (cfg.accessory === 'backpack') paintPts(BACKPACK_BACK);
  paintRows(BASE, 0);
  paintRows(OUTFITS[cfg.outfit].rows, OUTFITS[cfg.outfit].y);
  paintPts(EYES[cfg.eyes]);
  paintPts(FACES[cfg.face]);
  paintRows(HAIRS[cfg.hair].rows, HAIRS[cfg.hair].y);
  if (cfg.accessory !== 'none') paintPts(ACCESSORIES[cfg.accessory]);

  const out: Pixel[] = [];
  grid.forEach((row, y) => row.forEach((c, x) => c && out.push({ x, y, c })));
  return out;
}

export function accentOf(cfg: CharacterConfig): string {
  return (OUTFIT_COLORS[cfg.outfitColor] ?? OUTFIT_COLORS[0]).A;
}