export interface CampusLocation {
  id: string;
  name: string;
  to: string;
  x: number;
  y: number;
  color: string;
  desc: string;
  status: string;
}

export const CAMPUS_LOCATIONS: CampusLocation[] = [
{ id: 'hub', name: 'WORKSHOP HUB', to: '/countdown', x: 22, y: 30, color: '#3ef2ff', desc: 'The domed hall where the live workshop opens.', status: 'Opens in 02D 14H' },
{ id: 'lab', name: 'AI LAB', to: '/project', x: 52, y: 22, color: '#b6ff3b', desc: 'Your project workstation and AI core.', status: 'Passport: IDEA' },
{ id: 'crew', name: 'CREW DISTRICT', to: '/crew', x: 18, y: 68, color: '#ff3fa4', desc: 'Where your crew gathers and signals travel.', status: '3 crew · 5 second-degree' },
{ id: 'vault', name: 'PROJECT VAULT', to: '/project', x: 78, y: 64, color: '#ffc94a', desc: 'Shipped projects from every campus, archived.', status: '0 shipped yet' },
{ id: 'hall', name: 'ACHIEVEMENT HALL', to: '/achievements', x: 48, y: 74, color: '#b4a8ff', desc: 'Badges earned across your journey.', status: '3 / 8 unlocked' },
{ id: 'board', name: 'CAMPUS LEADERBOARD', to: '/leaderboard', x: 82, y: 26, color: '#19c9b6', desc: 'The tower that tracks campus champions.', status: 'You are #27' }];
