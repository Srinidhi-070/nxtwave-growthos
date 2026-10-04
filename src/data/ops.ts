import { NPC_CONFIGS } from './characters';
import type { CharacterConfig } from '../types/character';

export const CAMPAIGN = { day: 4, totalDays: 7, registrations: 427, target: 500, referred: 286, activeReferrers: 104, characterCompletion: 93.9, workshopReady: 241 };

export const DAILY_REGS = [
{ day: 'D1', value: 160 },
{ day: 'D2', value: 118 },
{ day: 'D3', value: 87 },
{ day: 'D4', value: 62, partial: true }];

export const PROJECTED_REGS = [
{ day: 'D5', low: 34, high: 48 },
{ day: 'D6', low: 22, high: 35 },
{ day: 'D7', low: 15, high: 24 }];


export const FUNNEL = [
{ key: 'LANDING', count: 6820 },
{ key: 'WORKSHOP VIEW', count: 3410 },
{ key: 'REGISTER START', count: 612 },
{ key: 'ACCOUNT CREATED', count: 427 },
{ key: 'CHARACTER CREATED', count: 401 },
{ key: 'FIRST QUEST', count: 352 },
{ key: 'FIRST REFERRAL', count: 104 },
{ key: 'ACTIVE STUDENT', count: 88 }];


export const FUNNEL_SOURCES: Record<string, {source: string;share: number;}[]> = {
  default: [
  { source: 'WhatsApp groups', share: 41 },
  { source: 'Campus ambassadors', share: 27 },
  { source: 'Instagram', share: 19 },
  { source: 'Direct / other', share: 13 }]

};

export type Risk = 'low' | 'medium' | 'high';

export interface CampusStat {
  name: string;
  short: string;
  regs: number;
  refs: number;
  cvr: number;
  growth: number;
  top: string;
  risk: Risk;
  x: number;
  y: number;
}

export const CAMPUSES: CampusStat[] = [
{ name: 'VIT Vellore', short: 'VIT', regs: 92, refs: 64, cvr: 7.4, growth: 18, top: 'VIKRAM.S', risk: 'low', x: 60, y: 44 },
{ name: 'SRM Chennai', short: 'SRM', regs: 71, refs: 48, cvr: 6.1, growth: 22, top: 'NISHA', risk: 'medium', x: 74, y: 46 },
{ name: 'PES University', short: 'PES', regs: 58, refs: 41, cvr: 6.8, growth: 15, top: 'ARJUN.K', risk: 'low', x: 42, y: 44 },
{ name: 'RV College of Engg.', short: 'RVCE', regs: 49, refs: 33, cvr: 5.9, growth: 9, top: 'KABIR', risk: 'low', x: 37, y: 38 },
{ name: 'Manipal MIT', short: 'MIT', regs: 44, refs: 27, cvr: 5.2, growth: 6, top: 'SANA.M', risk: 'low', x: 16, y: 40 },
{ name: 'CBIT Hyderabad', short: 'CBIT', regs: 41, refs: 29, cvr: 6.3, growth: 31, top: 'ROHAN.P', risk: 'high', x: 50, y: 10 },
{ name: 'NIT Trichy', short: 'NITT', regs: 38, refs: 24, cvr: 6.6, growth: 12, top: 'ADITYA', risk: 'low', x: 64, y: 64 },
{ name: 'Anna University', short: 'ANNA', regs: 34, refs: 20, cvr: 4.8, growth: 4, top: 'KAVYA', risk: 'low', x: 80, y: 38 }];


export const CAMPUS_LINKS: [string, string, number][] = [
['PES', 'RVCE', 9],
['VIT', 'SRM', 7],
['SRM', 'ANNA', 5],
['PES', 'VIT', 4],
['VIT', 'NITT', 3],
['RVCE', 'MIT', 3],
['CBIT', 'PES', 2]];


export interface ExperimentMetric {
  key: string;
  control: number;
  variant: number;
  nControl: number;
  nVariant: number;
  ci?: [number, number];
  probBetter?: number;
  note?: string;
}

export const EXPERIMENT = {
  id: '007',
  name: 'Character Onboarding Variant',
  hypothesis: 'Letting students build their explorer before the account form raises completion and early referrals.',
  status: 'RUNNING',
  day: 3,
  split: '50 / 50',
  control: { label: 'CONTROL', desc: 'Account form → character creation', visitors: 1840 },
  variant: { label: 'VARIANT', desc: 'Character creation → account form', visitors: 1812 },
  metrics: [
  { key: 'Registration CVR', control: 11.9, variant: 13.6, nControl: 1840, nVariant: 1812, ci: [2.1, 26.4], probBetter: 97 },
  { key: 'Character Completion', control: 91.2, variant: 96.4, nControl: 219, nVariant: 246, ci: [1.4, 10.3], probBetter: 99 },
  { key: 'First Quest', control: 78.0, variant: 84.1, nControl: 200, nVariant: 237, ci: [-1.8, 17.5], probBetter: 91 },
  { key: 'First Referral', control: 22.1, variant: 26.0, nControl: 156, nVariant: 199, note: '48h attribution window still open for 61% of users — no interval reported yet.' }] as
  ExperimentMetric[]
};

export const RISK_DISTRIBUTION = [
{ level: 'LOW', count: 389, color: '#19c9b6' },
{ level: 'MEDIUM', count: 29, color: '#ffc94a' },
{ level: 'HIGH', count: 9, color: '#ff4d5e' }];


export const RISK_SIGNALS = [
{ key: 'Velocity anomaly', severity: 'high' as Risk, count: 6, detail: '14 referrals registered within 9 minutes from one inviter.', trend: [0, 0, 1, 0, 2, 6] },
{ key: 'Device overlap', severity: 'medium' as Risk, count: 11, detail: '11 accounts share 4 device fingerprints.', trend: [1, 2, 2, 4, 6, 11] },
{ key: 'Duplicate identity', severity: 'medium' as Risk, count: 3, detail: '3 pairs with matching name + phone hash.', trend: [0, 1, 1, 2, 2, 3] },
{ key: 'Referral cluster', severity: 'high' as Risk, count: 1, detail: 'Closed loop of 8 accounts referring each other at CBIT.', trend: [0, 0, 0, 0, 1, 1] }];


export const FLAGGED = [
{ id: 'u_3121', name: 'ROHAN.P', campus: 'CBIT Hyderabad', score: 0.91, signals: ['Velocity', 'Cluster'], status: 'Rewards held' },
{ id: 'u_3188', name: 'CHAITU99', campus: 'CBIT Hyderabad', score: 0.87, signals: ['Cluster', 'Device'], status: 'Review' },
{ id: 'u_2954', name: 'NEON_K', campus: 'SRM Chennai', score: 0.74, signals: ['Device'], status: 'Review' },
{ id: 'u_3012', name: 'PRIYA.S2', campus: 'SRM Chennai', score: 0.68, signals: ['Duplicate'], status: 'Review' },
{ id: 'u_2877', name: 'AJAY.R', campus: 'VIT Vellore', score: 0.52, signals: ['Device'], status: 'Watching' }];


export const EVENT_TYPES: Record<string, string> = {
  CHARACTER_CREATED: '#3ef2ff',
  QUEST_ACCEPTED: '#ffc94a',
  REFERRAL_SHARED: '#ff3fa4',
  REFERRAL_REGISTERED: '#b6ff3b',
  ACHIEVEMENT_UNLOCKED: '#b4a8ff',
  WORKSHOP_READY: '#19c9b6',
  RISK_FLAGGED: '#ff4d5e'
};

export const SEED_EVENTS = [
{ time: '21:14:43', type: 'ACHIEVEMENT_UNLOCKED', actor: 'MEERA', meta: 'CREW BUILDER · PES' },
{ time: '21:14:31', type: 'REFERRAL_REGISTERED', actor: 'ISHA', meta: 'via KABIR · RVCE' },
{ time: '21:14:15', type: 'REFERRAL_SHARED', actor: 'SRINIDHI', meta: 'WhatsApp · PES' },
{ time: '21:14:07', type: 'QUEST_ACCEPTED', actor: 'DEV', meta: 'BUILD YOUR CREW · RVCE' },
{ time: '21:14:02', type: 'CHARACTER_CREATED', actor: 'ANANYA', meta: 'BMS College' }];


export const EVENT_POOL = [
{ type: 'CHARACTER_CREATED', actor: 'KAVYA', meta: 'Anna University' },
{ type: 'REFERRAL_SHARED', actor: 'VIKRAM.S', meta: 'Instagram · VIT' },
{ type: 'REFERRAL_REGISTERED', actor: 'TEJAS', meta: 'via VIKRAM.S · VIT' },
{ type: 'QUEST_ACCEPTED', actor: 'TEJAS', meta: 'BUILD YOUR CREW · VIT' },
{ type: 'WORKSHOP_READY', actor: 'NISHA', meta: 'SRM Chennai' },
{ type: 'ACHIEVEMENT_UNLOCKED', actor: 'ADITYA', meta: 'CHAIN REACTION · NITT' },
{ type: 'RISK_FLAGGED', actor: 'CHAITU99', meta: 'device overlap · CBIT' },
{ type: 'CHARACTER_CREATED', actor: 'FARHAN', meta: 'Manipal MIT' },
{ type: 'REFERRAL_REGISTERED', actor: 'LIYA', meta: 'via MEERA · PES' },
{ type: 'QUEST_ACCEPTED', actor: 'KABIR', meta: 'PREPARE FOR WORKSHOP · RVCE' }];


export const COPILOT_SIGNALS = [
{ id: 's1', title: 'Referral growth spike', time: '6h window', tone: '#b6ff3b' },
{ id: 's2', title: 'Register-start leak on mobile', time: '24h window', tone: '#ffc94a' },
{ id: 's3', title: 'CBIT cluster growth', time: '3h window', tone: '#ff4d5e' }];


export const REFERRAL_HOURLY = [3, 4, 2, 5, 3, 4, 6, 5, 7, 6, 8, 6];

export interface JourneyStudent {
  id: string;
  name: string;
  campus: string;
  source: string;
  invitedBy: string;
  crew: {direct: number;second: number;};
  experiment: string;
  risk: Risk;
  config: CharacterConfig;
  timeline: {step: string;time?: string;note?: string;}[];
}

const STEPS = ['REGISTERED', 'CHARACTER CREATED', 'QUEST STARTED', 'REFERRAL', 'CREW EXPANSION', 'WORKSHOP READY', 'PROJECT STARTED', 'PROJECT SHIPPED'];

export const JOURNEY_STUDENTS: JourneyStudent[] = [
{
  id: 'u_3304', name: 'SRINIDHI', campus: 'PES University', source: 'Referral · WhatsApp', invitedBy: 'ARJUN.K', crew: { direct: 3, second: 5 }, experiment: '#007 · VARIANT', risk: 'low', config: { skin: 1, hair: 'bob', hairColor: 1, face: 'blush', eyes: 'round', outfit: 'jacket', outfitColor: 0, accessory: 'headphones', effect: 'aura' },
  timeline: STEPS.map((s, i) => ({ step: s, time: ['D4 09:52', 'D4 09:58', 'D4 10:01', 'D4 10:14', 'D4 11:05'][i], note: ['', 'Pixel Bob · Headphones', 'BUILD YOUR CREW', 'First invite via WhatsApp', '3 direct · 5 second-degree'][i] }))
},
{
  id: 'u_2210', name: 'MEERA', campus: 'PES University', source: 'Referral · direct link', invitedBy: 'SRINIDHI', crew: { direct: 2, second: 0 }, experiment: '#007 · CONTROL', risk: 'low', config: NPC_CONFIGS.meera,
  timeline: STEPS.map((s, i) => ({ step: s, time: ['D2 21:40', 'D2 21:47', 'D2 21:50', 'D3 08:12', 'D3 13:22', 'D4 20:58'][i], note: ['', 'Long Stream · AI Visor', 'BUILD YOUR CREW', 'Shared on Instagram', '2 direct', 'Readiness 4/4'][i] }))
},
{
  id: 'u_1002', name: 'ARJUN.K', campus: 'PES University', source: 'Campus ambassador', invitedBy: '—', crew: { direct: 8, second: 11 }, experiment: '—', risk: 'low', config: NPC_CONFIGS.arjun,
  timeline: STEPS.map((s, i) => ({ step: s, time: ['D1 18:02', 'D1 18:05', 'D1 18:06', 'D1 18:30', 'D2 10:10', 'D3 19:00'][i], note: ['', 'Static Spikes · Glasses', 'BUILD YOUR CREW', 'First invite', 'Crew of 8', 'Readiness 4/4'][i] }))
},
{
  id: 'u_3121', name: 'ROHAN.P', campus: 'CBIT Hyderabad', source: 'Referral · unknown device', invitedBy: 'CHAITU99', crew: { direct: 14, second: 2 }, experiment: '#007 · VARIANT', risk: 'high', config: NPC_CONFIGS.rohan,
  timeline: STEPS.map((s, i) => ({ step: s, time: ['D4 19:31', 'D4 19:32', 'D4 19:32', 'D4 19:40', 'D4 19:49'][i], note: ['', 'Default loadout', 'BUILD YOUR CREW', 'Velocity anomaly', '14 invites in 9 min — rewards held'][i] }))
},
{
  id: 'u_3290', name: 'ZOYA', campus: 'PES University', source: 'Referral · WhatsApp', invitedBy: 'SRINIDHI', crew: { direct: 1, second: 0 }, experiment: '#007 · CONTROL', risk: 'low', config: NPC_CONFIGS.zoya,
  timeline: STEPS.map((s, i) => ({ step: s, time: ['D4 11:05', 'D4 11:20', '', 'D4 12:02'][i] || undefined, note: ['', 'Core Bun · Headphones', '', 'Invited TANVI'][i] }))
}];