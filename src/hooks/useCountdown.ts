'use client';
import { useEffect, useState } from 'react';

// Hardcoded future date for workshop start (no more Date.now() mismatches)
export const WORKSHOP_START = new Date("2026-10-15T18:00:00Z").getTime();

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function useCountdown(target: number = WORKSHOP_START) {
  const [now, setNow] = useState<number | null>(null);
  
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  
  if (now === null) {
    // Return all zeros during SSR to perfectly match client's initial render
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false };
  }

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
