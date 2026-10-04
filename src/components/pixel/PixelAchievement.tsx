'use client';
import React, { useMemo } from 'react';
import { FlagIcon, GraduationCapIcon, LockIcon, MapPinIcon, NetworkIcon, RocketIcon, SignalIcon, SunriseIcon, UsersIcon } from 'lucide-react';
import type { BadgeIcon, BadgeShape } from '../../data/achievements';

const SHAPES: Record<BadgeShape, string[]> = {
  circle: ['...XXXXXX...', '..XXXXXXXX..', '.XXXXXXXXXX.', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', '.XXXXXXXXXX.', '..XXXXXXXX..', '...XXXXXX...'],
  shield: ['XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', '.XXXXXXXXXX.', '.XXXXXXXXXX.', '..XXXXXXXX..', '..XXXXXXXX..', '...XXXXXX...', '....XXXX....', '.....XX.....'],
  diamond: ['.....XX.....', '....XXXX....', '...XXXXXX...', '..XXXXXXXX..', '.XXXXXXXXXX.', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', '.XXXXXXXXXX.', '..XXXXXXXX..', '...XXXXXX...', '....XXXX....', '.....XX.....'],
  hex: ['..XXXXXXXX..', '.XXXXXXXXXX.', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', '.XXXXXXXXXX.', '..XXXXXXXX..'],
  star: ['.....XX.....', '....XXXX....', '...XXXXXX...', 'XXXXXXXXXXXX', 'XXXXXXXXXXXX', '.XXXXXXXXXX.', '..XXXXXXXX..', '..XXXXXXXX..', '.XXXXXXXXXX.', '.XXXXXXXXXX.', 'XXXX....XXXX', 'XX........XX']
};

const ICONS: Record<BadgeIcon, React.ComponentType<{className?: string;style?: React.CSSProperties;}>> = {
  signal: SignalIcon,
  users: UsersIcon,
  network: NetworkIcon,
  sunrise: SunriseIcon,
  mapPin: MapPinIcon,
  graduation: GraduationCapIcon,
  rocket: RocketIcon,
  flag: FlagIcon
};

interface PixelAchievementProps {
  shape: BadgeShape;
  icon: BadgeIcon;
  color: string;
  unlocked: boolean;
  size?: number;
}

export function PixelAchievement({ shape, icon, color, unlocked, size = 96 }: PixelAchievementProps) {
  const cells = useMemo(() => {
    const rows = SHAPES[shape];
    const inside = (x: number, y: number) => rows[y]?.[x] === 'X';
    const out: {x: number;y: number;rim: boolean;}[] = [];
    rows.forEach((row, y) =>
    row.split('').forEach((ch, x) => {
      if (ch !== 'X') return;
      const rim = !(inside(x - 1, y) && inside(x + 1, y) && inside(x, y - 1) && inside(x, y + 1));
      out.push({ x, y, rim });
    })
    );
    return out;
  }, [shape]);

  const Icon = unlocked ? ICONS[icon] : LockIcon;
  const rimColor = unlocked ? color : '#2f2670';
  const fill = unlocked ? `${color}26` : '#120d33';

  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 12 12" width={size} height={size} shapeRendering="crispEdges" aria-hidden className="absolute inset-0">
        {cells.map((c) =>
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1.02} height={1.02} fill={c.rim ? rimColor : fill} />
        )}
        {unlocked && <rect x={3} y={2} width={2} height={1} fill="#ffffff" opacity={0.5} />}
      </svg>
      <Icon className="relative" style={{ width: size * 0.32, height: size * 0.32, color: unlocked ? color : '#4a4185' }} />
    </span>);

}

