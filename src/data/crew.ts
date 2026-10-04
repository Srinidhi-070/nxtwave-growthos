import { NPC_CONFIGS } from './characters';
import type { CharacterConfig } from '../types/character';

export interface CrewMember {
  id: string;
  name: string;
  campus: string;
  branch: string;
  level: number;
  xp: number;
  stage: number;
  degree: 0 | 1 | 2;
  parentId?: string;
  active: boolean;
  joined: string;
  config: CharacterConfig;
}

export const JOURNEY_STAGES = ['INVITED', 'REGISTERED', 'ACTIVE', 'WORKSHOP READY', 'PROJECT STARTED', 'PROJECT SHIPPED'];

export const INVITER: CrewMember = {
  id: 'arjun', name: 'ARJUN.K', campus: 'PES University', branch: 'CSE', level: 4, xp: 820, stage: 3, degree: 0, active: true, joined: 'Day 1 · 18:02', config: NPC_CONFIGS.arjun
};

export const CREW: CrewMember[] = [
{ id: 'meera', name: 'MEERA', campus: 'PES University', branch: 'ECE', level: 3, xp: 540, stage: 3, degree: 1, active: true, joined: 'Day 2 · 21:40', config: NPC_CONFIGS.meera },
{ id: 'kabir', name: 'KABIR', campus: 'RV College of Engg.', branch: 'ISE', level: 2, xp: 310, stage: 2, degree: 1, active: true, joined: 'Day 3 · 09:12', config: NPC_CONFIGS.kabir },
{ id: 'zoya', name: 'ZOYA', campus: 'PES University', branch: 'AI & DS', level: 1, xp: 120, stage: 1, degree: 1, active: false, joined: 'Day 4 · 11:05', config: NPC_CONFIGS.zoya },
{ id: 'rohan', name: 'ROHAN', campus: 'PES University', branch: 'Mechanical', level: 2, xp: 260, stage: 2, degree: 2, parentId: 'meera', active: true, joined: 'Day 3 · 13:22', config: NPC_CONFIGS.rohan },
{ id: 'ananya', name: 'ANANYA', campus: 'BMS College', branch: 'CSE', level: 1, xp: 110, stage: 1, degree: 2, parentId: 'meera', active: true, joined: 'Day 4 · 08:47', config: NPC_CONFIGS.ananya },
{ id: 'dev', name: 'DEV', campus: 'RV College of Engg.', branch: 'EEE', level: 1, xp: 100, stage: 1, degree: 2, parentId: 'kabir', active: false, joined: 'Day 4 · 10:30', config: NPC_CONFIGS.dev },
{ id: 'isha', name: 'ISHA', campus: 'RV College of Engg.', branch: 'CSE', level: 2, xp: 280, stage: 2, degree: 2, parentId: 'kabir', active: true, joined: 'Day 3 · 19:55', config: NPC_CONFIGS.isha },
{ id: 'tanvi', name: 'TANVI', campus: 'PES University', branch: 'IT', level: 0, xp: 0, stage: 0, degree: 2, parentId: 'zoya', active: false, joined: 'Invite sent · Day 4', config: NPC_CONFIGS.tanvi }];


export const CREW_MILESTONES = [
{ label: 'First Signal', target: 1, reward: '+50 XP' },
{ label: 'Crew of 3', target: 3, reward: '+100 XP' },
{ label: 'Crew of 5', target: 5, reward: 'Crew Builder badge' },
{ label: 'Chain Reaction', target: 10, reward: 'Holo card frame' }];