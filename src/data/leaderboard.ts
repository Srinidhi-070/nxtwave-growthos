import { NPC_CONFIGS } from './characters';
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

export const LEADERS: LeaderEntry[] = [
{ rank: 1, name: 'VIKRAM.S', campus: 'VIT Vellore', xp: 2480, crew: 14, impact: 31, config: NPC_CONFIGS.vikram },
{ rank: 2, name: 'NISHA', campus: 'SRM Chennai', xp: 2210, crew: 12, impact: 26, config: NPC_CONFIGS.nisha },
{ rank: 3, name: 'ADITYA', campus: 'NIT Trichy', xp: 1960, crew: 11, impact: 22, config: NPC_CONFIGS.aditya },
{ rank: 4, name: 'SANA.M', campus: 'Manipal MIT', xp: 1720, crew: 9, impact: 19, config: NPC_CONFIGS.sana },
{ rank: 5, name: 'ARJUN.K', campus: 'PES University', xp: 1610, crew: 8, impact: 18, config: NPC_CONFIGS.arjun },
{ rank: 6, name: 'MEERA', campus: 'PES University', xp: 1340, crew: 7, impact: 12, config: NPC_CONFIGS.meera },
{ rank: 7, name: 'ROHAN.P', campus: 'CBIT Hyderabad', xp: 1210, crew: 6, impact: 11, config: NPC_CONFIGS.rohan },
{ rank: 8, name: 'ISHA', campus: 'RV College of Engg.', xp: 1090, crew: 6, impact: 9, config: NPC_CONFIGS.isha }];


export const MY_RANK = { rank: 27, xp: 100, crew: 3, impact: 8, nextRankXp: 140 };