'use client';
import { useEffect, useState } from 'react';

export const WORKSHOP_START = Date.now() + ((2 * 24 + 14) * 3600 + 28 * 60 + 15) * 1000;

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function useCountdown(target: number = WORKSHOP_START) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total % 86400 / 3600),
    minutes: Math.floor(total % 3600 / 60),
    seconds: total % 60,
    isLive: diff === 0
  };
}
