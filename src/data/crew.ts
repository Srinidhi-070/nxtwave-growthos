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

export const CREW: CrewMember[] = [];


export const CREW_MILESTONES = [
{ label: 'First Signal', target: 1, reward: '+50 XP' },
{ label: 'Crew of 3', target: 3, reward: '+100 XP' },
{ label: 'Crew of 5', target: 5, reward: 'Crew Builder badge' },
{ label: 'Chain Reaction', target: 10, reward: 'Holo card frame' }];
