export type HairStyle = 'short' | 'spiky' | 'long' | 'bun' | 'mohawk' | 'bob';
export type FaceStyle = 'smile' | 'blush' | 'grin' | 'focused' | 'freckles';
export type EyeStyle = 'round' | 'spark' | 'calm' | 'cat';
export type OutfitStyle = 'hoodie' | 'jacket' | 'techsuit' | 'labcoat';
export type Accessory = 'none' | 'headphones' | 'glasses' | 'visor' | 'backpack' | 'halo';
export type Effect = 'none' | 'aura' | 'sparks' | 'pulse';

export interface CharacterConfig {
  skin: number;
  hair: HairStyle;
  hairColor: number;
  face: FaceStyle;
  eyes: EyeStyle;
  outfit: OutfitStyle;
  outfitColor: number;
  accessory: Accessory;
  effect: Effect;
}

export interface Pixel {
  x: number;
  y: number;
  c: string;
}