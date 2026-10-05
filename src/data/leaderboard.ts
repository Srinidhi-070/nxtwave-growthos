import type { CharacterConfig } from '../types/character';

export interface LeaderEntry {
  rank: number;
  name: string;
  campus: string;
  xp: number;
  crew: number;
  impact: number;
  config: CharacterConfig;
}

export const LEADERS: LeaderEntry[] = [];
export const MY_RANK = { rank: 1, xp: 0, crew: 0, impact: 0, nextRankXp: 100 };
