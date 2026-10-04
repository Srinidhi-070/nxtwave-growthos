export type PixelTone = 'default' | 'cyan' | 'magenta' | 'lime' | 'amber' | 'danger' | 'muted';

export const TONE_HEX: Record<PixelTone, string> = {
  default: '#3b2f8f',
  cyan: '#3ef2ff',
  magenta: '#ff3fa4',
  lime: '#b6ff3b',
  amber: '#ffc94a',
  danger: '#ff4d5e',
  muted: '#241d5a'
};