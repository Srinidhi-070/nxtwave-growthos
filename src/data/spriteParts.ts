import type { Accessory, EyeStyle, FaceStyle, HairStyle, OutfitStyle } from '../types/character';

export type Pt = [number, number, string];

export const SPRITE_W = 16;
export const SPRITE_H = 22;

export const SKIN_TONES: {name: string;S: string;s: string;}[] = [
{ name: 'Porcelain', S: '#f8d9bf', s: '#e2b393' },
{ name: 'Honey', S: '#eebc95', s: '#d19a72' },
{ name: 'Amber', S: '#cf9466', s: '#b07548' },
{ name: 'Umber', S: '#a06a45', s: '#80522f' },
{ name: 'Ebony', S: '#6e452b', s: '#55331e' }];


export const HAIR_COLORS: {name: string;H: string;h: string;}[] = [
{ name: 'Indigo', H: '#4a3aa8', h: '#2e2373' },
{ name: 'Neon Pink', H: '#ff4fae', h: '#c42479' },
{ name: 'Cyan', H: '#4ff0ff', h: '#1aa6c0' },
{ name: 'Silver', H: '#e9e4ff', h: '#aaa0dc' },
{ name: 'Lime', H: '#bfff4a', h: '#78b51a' },
{ name: 'Cocoa', H: '#7b4b2c', h: '#53301a' }];


export const OUTFIT_COLORS: {name: string;O: string;o: string;A: string;}[] = [
{ name: 'Cyan Grid', O: '#1d86ad', o: '#135a7a', A: '#3ef2ff' },
{ name: 'Neon Rose', O: '#a8287a', o: '#6f1a52', A: '#ff7ac6' },
{ name: 'Volt', O: '#4c7d1a', o: '#30520f', A: '#b6ff3b' },
{ name: 'Ultraviolet', O: '#5a3fc0', o: '#3a2885', A: '#b4a8ff' },
{ name: 'Solar', O: '#b5741c', o: '#7a4c10', A: '#ffc94a' },
{ name: 'Graphite', O: '#34315a', o: '#1f1d3a', A: '#e9e6ff' }];


export const FIXED: Record<string, string> = {
  K: '#0b0820',
  E: '#170f3a',
  W: '#ffffff',
  T: '#e4e0fb',
  P: '#2a2160',
  B: '#130e30',
  G: '#cfc8ff',
  R: '#ff7ab0'
};

export const BASE: string[] = [
'................',
'................',
'................',
'....KKKKKKKK....',
'...KSSSSSSSSK...',
'..KSSSSSSSSSSK..',
'..KSSSSSSSSSSK..',
'..KSSSSSSSSSSK..',
'..KSSSSSSSSSSK..',
'..KSSSSSSSSSSK..',
'..KsSSSSSSSSsK..',
'...KsSSSSSSsK...',
'....KKSSSSKK....',
'...KOOOOOOOOK...',
'..KOOOOOOOOOOK..',
'.KOKOOOOOOOOKOK.',
'.KOKOOOOOOOOKOK.',
'.KSKooooooooKSK.',
'...KPPPPPPPPK...',
'...KPPK..KPPK...',
'...KBBK..KBBK...',
'...KKKK..KKKK...'];


export const HAIRS: Record<HairStyle, {y: number;rows: string[];}> = {
  short: {
    y: 2,
    rows: [
    '....HHHHHHHH....',
    '...HHHHHHHHHH...',
    '..HHHHHHHHHHHH..',
    '..HHhHHHHHHhHH..',
    '..HH........HH..',
    '..H..........H..']

  },
  spiky: {
    y: 0,
    rows: [
    '....H..H..H.....',
    '...HH.HH.HH.H...',
    '..HHHHHHHHHHHH..',
    '..HHHHHHHHHHHHH.',
    '.HHHHHHHHHHHHHH.',
    '.HHhHHhHHhHHHH..',
    '..HH.h....h.HH..',
    '..H..........H..']

  },
  long: {
    y: 2,
    rows: [
    '....HHHHHHHH....',
    '...HHHHHHHHHH...',
    '..HHHHHHHHHHHH..',
    '.HHHhHHHHHHhHHH.',
    '.HHH........HHH.',
    '.HH..........HH.',
    '.HH..........HH.',
    '.HH..........HH.',
    '.HH..........HH.',
    '.HHh........hHH.',
    '.HHh........hHH.',
    '..h..........h..']

  },
  bun: {
    y: 0,
    rows: [
    '......HHHH......',
    '.....HhHHhH.....',
    '....HHHHHHHH....',
    '...HHHHHHHHHH...',
    '..HHHHHHHHHHHH..',
    '..HHhHHHHHHhHH..',
    '..HH........HH..',
    '..H..........H..']

  },
  mohawk: {
    y: 0,
    rows: [
    '.......HH.......',
    '......HHHH......',
    '......HHHH......',
    '.....HHHHHH.....',
    '...hHHHHHHHHh...',
    '..h.HHhhhhHH.h..']

  },
  bob: {
    y: 2,
    rows: [
    '....HHHHHHHH....',
    '...HHHHHHHHHH...',
    '..HHHHHHHHHHHH..',
    '..HHHHHHHHHHHH..',
    '..HHhhhhhhhhHH..',
    '..HH........HH..',
    '..HH........HH..',
    '..HH........HH..',
    '..HHh......hHH..']

  }
};

export const OUTFITS: Record<OutfitStyle, {y: number;rows: string[];}> = {
  hoodie: {
    y: 13,
    rows: [
    '...KOOAOOAOOK...',
    '..KOOOAOOAOOOK..',
    '.KOKOOOOOOOOKOK.',
    '.KOKOAAAAAAOKOK.',
    '.KSKooooooooKSK.']

  },
  jacket: {
    y: 13,
    rows: [
    '...KOOTTTTOOK...',
    '..KOOOTTTTOOOK..',
    '.KOKOOTAATOOKOK.',
    '.KOKOOTTTTOOKOK.',
    '.KSKooTTTToOKSK.']

  },
  techsuit: {
    y: 13,
    rows: [
    '...KOOOOOOOOK...',
    '..KOAAAAAAAAOK..',
    '.KOKOOOAAOOOKOK.',
    '.KOKOOOAAOOOKOK.',
    '.KSKooooooooKSK.']

  },
  labcoat: {
    y: 13,
    rows: [
    '...KTTOOOOTTK...',
    '..KTTTOOOOTTTK..',
    '.KTKTTOAAOTTKTK.',
    '.KTKTTOOOOTTKTK.',
    '.KSKTTooooTTKSK.',
    '...KTPPPPPPTK...']

  }
};

export const EYES: Record<EyeStyle, Pt[]> = {
  round: [
  [4, 7, 'E'], [5, 7, 'W'], [4, 8, 'E'], [5, 8, 'E'],
  [10, 7, 'E'], [11, 7, 'W'], [10, 8, 'E'], [11, 8, 'E']],

  spark: [
  [5, 7, 'L'], [5, 8, 'L'], [4, 8, 'E'],
  [10, 7, 'L'], [10, 8, 'L'], [11, 8, 'E']],

  calm: [
  [4, 8, 'E'], [5, 8, 'E'], [10, 8, 'E'], [11, 8, 'E']],

  cat: [
  [4, 8, 'E'], [5, 7, 'E'], [5, 8, 'E'],
  [10, 7, 'E'], [10, 8, 'E'], [11, 8, 'E']]

};

export const FACES: Record<FaceStyle, Pt[]> = {
  smile: [[7, 10, 'K'], [8, 10, 'K']],
  blush: [[3, 9, 'R'], [4, 9, 'R'], [11, 9, 'R'], [12, 9, 'R'], [7, 10, 'K'], [8, 10, 'K']],
  grin: [[6, 10, 'K'], [7, 10, 'W'], [8, 10, 'W'], [9, 10, 'K']],
  focused: [[7, 10, 'K'], [4, 6, 'E'], [5, 6, 'E'], [10, 6, 'E'], [11, 6, 'E']],
  freckles: [[4, 9, 's'], [6, 9, 's'], [9, 9, 's'], [11, 9, 's'], [7, 10, 'K'], [8, 10, 'K']]
};

const span = (from: number, to: number, y: number, role: string): Pt[] =>
Array.from({ length: to - from + 1 }, (_, i) => [from + i, y, role] as Pt);

export const BACKPACK_BACK: Pt[] = [
[2, 12, 'o'], [3, 12, 'o'], [12, 12, 'o'], [13, 12, 'o'],
[2, 13, 'o'], [13, 13, 'o'], [2, 14, 'o'], [13, 14, 'o']];


export const ACCESSORIES: Record<Exclude<Accessory, 'none'>, Pt[]> = {
  headphones: [
  ...span(4, 11, 2, 'G'),
  [3, 3, 'G'], [12, 3, 'G'], [2, 4, 'G'], [13, 4, 'G'], [2, 5, 'G'], [13, 5, 'G'],
  [1, 6, 'G'], [2, 6, 'A'], [13, 6, 'A'], [14, 6, 'G'],
  [1, 7, 'G'], [2, 7, 'A'], [13, 7, 'A'], [14, 7, 'G'],
  [1, 8, 'G'], [2, 8, 'A'], [13, 8, 'A'], [14, 8, 'G']],

  glasses: [
  ...span(3, 6, 6, 'K'), ...span(9, 12, 6, 'K'),
  [3, 7, 'K'], [6, 7, 'K'], [7, 7, 'K'], [8, 7, 'K'], [9, 7, 'K'], [12, 7, 'K'],
  [3, 8, 'K'], [6, 8, 'K'], [9, 8, 'K'], [12, 8, 'K'],
  ...span(3, 6, 9, 'K'), ...span(9, 12, 9, 'K')],

  visor: [
  [2, 7, 'K'], ...span(3, 12, 7, 'L'), [13, 7, 'K'],
  [2, 8, 'K'], ...span(3, 12, 8, 'l'), [13, 8, 'K'],
  [4, 7, 'W'], [5, 7, 'W']],

  backpack: [
  [4, 13, 'o'], [4, 14, 'o'], [4, 15, 'o'], [4, 16, 'o'],
  [11, 13, 'o'], [11, 14, 'o'], [11, 15, 'o'], [11, 16, 'o'],
  [4, 15, 'A'], [11, 15, 'A']],

  halo: [...span(5, 10, 0, 'L'), [4, 1, 'L'], [11, 1, 'L']]
};

export const HAIR_LABELS: Record<HairStyle, string> = {
  short: 'Crew Cut', spiky: 'Static Spikes', long: 'Long Stream', bun: 'Core Bun', mohawk: 'Signal Hawk', bob: 'Pixel Bob'
};
export const FACE_LABELS: Record<FaceStyle, string> = {
  smile: 'Easy Smile', blush: 'Warm Blush', grin: 'Big Grin', focused: 'Locked In', freckles: 'Freckles'
};
export const EYE_LABELS: Record<EyeStyle, string> = {
  round: 'Bright', spark: 'Neural Spark', calm: 'Calm', cat: 'Sly'
};
export const OUTFIT_LABELS: Record<OutfitStyle, string> = {
  hoodie: 'Night Hoodie', jacket: 'Campus Jacket', techsuit: 'Tech Suit', labcoat: 'Lab Coat'
};
export const ACCESSORY_LABELS: Record<Accessory, string> = {
  none: 'None', headphones: 'Headphones', glasses: 'Glasses', visor: 'AI Visor', backpack: 'Backpack', halo: 'Signal Halo'
};
export const EFFECT_LABELS: Record<string, string> = {
  none: 'None', aura: 'Neon Aura', sparks: 'Data Sparks', pulse: 'Ground Pulse'
};