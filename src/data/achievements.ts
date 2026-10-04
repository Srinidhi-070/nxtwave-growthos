export type BadgeShape = 'hex' | 'shield' | 'diamond' | 'star' | 'circle';
export type BadgeIcon = 'signal' | 'users' | 'network' | 'sunrise' | 'mapPin' | 'graduation' | 'rocket' | 'flag';

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  xp: number;
  unlocked: boolean;
  date?: string;
  progress?: {current: number;target: number;};
  shape: BadgeShape;
  color: string;
  icon: BadgeIcon;
  rarity: string;
}

export const ACHIEVEMENTS: Achievement[] = [
{ id: 'first-signal', name: 'FIRST SIGNAL', desc: 'Sent your first crew invite into the network.', xp: 50, unlocked: true, date: 'Day 4 · 10:14', shape: 'circle', color: '#3ef2ff', icon: 'signal', rarity: 'Common · 71% of explorers' },
{ id: 'crew-builder', name: 'CREW BUILDER', desc: 'Recruited 3 explorers into your crew.', xp: 100, unlocked: true, date: 'Day 4 · 11:05', shape: 'shield', color: '#b6ff3b', icon: 'users', rarity: 'Uncommon · 24% of explorers' },
{ id: 'chain-reaction', name: 'CHAIN REACTION', desc: 'Your crew recruited 10 explorers of their own.', xp: 250, unlocked: false, progress: { current: 5, target: 10 }, shape: 'hex', color: '#ff3fa4', icon: 'network', rarity: 'Rare · 6% of explorers' },
{ id: 'early-explorer', name: 'EARLY EXPLORER', desc: 'Joined GrowthOS in the first week of the signal.', xp: 75, unlocked: true, date: 'Day 4 · 09:58', shape: 'diamond', color: '#ffc94a', icon: 'sunrise', rarity: 'Limited · closes Day 7' },
{ id: 'campus-node', name: 'CAMPUS NODE', desc: 'Became a top-10 connector on your campus.', xp: 150, unlocked: false, progress: { current: 27, target: 10 }, shape: 'hex', color: '#19c9b6', icon: 'mapPin', rarity: 'Rare · 10 per campus' },
{ id: 'workshop-complete', name: 'WORKSHOP COMPLETE', desc: 'Attended the live workshop end to end.', xp: 300, unlocked: false, shape: 'shield', color: '#b4a8ff', icon: 'graduation', rarity: 'Unlocks on workshop day' },
{ id: 'project-started', name: 'PROJECT STARTED', desc: 'Opened your AI Project Passport.', xp: 100, unlocked: false, shape: 'star', color: '#3ef2ff', icon: 'flag', rarity: 'Unlocks after workshop' },
{ id: 'project-shipped', name: 'PROJECT SHIPPED', desc: 'Deployed a live AI project with a shareable link.', xp: 500, unlocked: false, shape: 'star', color: '#b6ff3b', icon: 'rocket', rarity: 'Legendary' }];