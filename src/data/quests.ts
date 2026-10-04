export type QuestState = 'done' | 'active' | 'locked';

export interface Quest {
  id: string;
  title: string;
  state: QuestState;
  xp: number;
  region: string;
  desc: string;
  objectives: {label: string;done: boolean;}[];
  x: number;
  y: number;
}

export const QUESTS: Quest[] = [
{ id: 'enter', title: 'ENTER WORLD', state: 'done', xp: 50, region: 'Gate Town', desc: 'Step through the campus gate and claim your GrowthOS ID.', objectives: [{ label: 'Initialize your ID', done: true }], x: 9, y: 84 },
{ id: 'profile', title: 'BUILD PROFILE', state: 'done', xp: 50, region: 'Neon Quarter', desc: 'Forge your explorer and tell the campus who you are.', objectives: [{ label: 'Create your explorer', done: true }, { label: 'Add academic profile', done: true }], x: 21, y: 69 },
{ id: 'crew', title: 'BUILD YOUR CREW', state: 'active', xp: 150, region: 'Signal Bridge', desc: 'Bring friends into GrowthOS. Builders ship faster together.', objectives: [{ label: 'Share your invite link', done: true }, { label: 'Recruit 3 explorers', done: true }, { label: 'Recruit 5 explorers', done: false }], x: 33, y: 57 },
{ id: 'prepare', title: 'PREPARE FOR WORKSHOP', state: 'locked', xp: 100, region: 'Lumen Forest', desc: 'Set up your toolkit so you can build from minute one.', objectives: [{ label: 'Open a Colab notebook', done: false }, { label: 'Watch the 3-min primer', done: false }], x: 45, y: 66 },
{ id: 'ready', title: 'WORKSHOP READY', state: 'locked', xp: 75, region: 'Lumen Forest', desc: 'All systems green. Your seat is locked in.', objectives: [{ label: 'Complete readiness check', done: false }], x: 54, y: 50 },
{ id: 'attend', title: 'ATTEND WORKSHOP', state: 'locked', xp: 300, region: 'Amphitheater', desc: 'Join live and build your first AI project in 60 minutes.', objectives: [{ label: 'Join the live session', done: false }], x: 64, y: 40 },
{ id: 'start', title: 'START PROJECT', state: 'locked', xp: 100, region: 'Foundry Hill', desc: 'Pick your idea and scaffold it in the Project Lab.', objectives: [{ label: 'Choose a project idea', done: false }], x: 73, y: 54 },
{ id: 'build', title: 'BUILD PROJECT', state: 'locked', xp: 200, region: 'Foundry Hill', desc: 'Wire in AI and make it genuinely useful.', objectives: [{ label: 'Connect an AI model', done: false }, { label: 'Build the app screen', done: false }], x: 81, y: 33 },
{ id: 'ship', title: 'SHIP', state: 'locked', xp: 500, region: 'Launch Tower', desc: 'Deploy it. Share the live link. You are a builder now.', objectives: [{ label: 'Publish a live link', done: false }], x: 91, y: 15 }];