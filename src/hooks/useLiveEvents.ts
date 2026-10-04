'use client';
import { useEffect, useRef, useState } from 'react';
import { EVENT_POOL, SEED_EVENTS } from '../data/ops';

export interface LiveEvent {
  id: number;
  time: string;
  type: string;
  actor: string;
  meta: string;
}

function addSeconds(t: string, s: number): string {
  const [h, m, sec] = t.split(':').map(Number);
  const total = h * 3600 + m * 60 + sec + s;
  const hh = Math.floor(total / 3600) % 24;
  const mm = Math.floor(total % 3600 / 60);
  const ss = total % 60;
  return [hh, mm, ss].map((n) => String(n).padStart(2, '0')).join(':');
}

export function useLiveEvents(intervalMs = 2400, paused = false, limit = 40) {
  const [events, setEvents] = useState<LiveEvent[]>(() => SEED_EVENTS.map((e, i) => ({ ...e, id: SEED_EVENTS.length - i })));
  const idx = useRef(0);
  const nextId = useRef(SEED_EVENTS.length + 1);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setEvents((prev) => {
        const tmpl = EVENT_POOL[idx.current % EVENT_POOL.length];
        idx.current += 1;
        const time = addSeconds(prev[0]?.time ?? '21:14:43', 3 + idx.current % 9);
        return [{ ...tmpl, time, id: nextId.current++ }, ...prev].slice(0, limit);
      });
    }, intervalMs);
    return () => clearInterval(t);
  }, [intervalMs, paused, limit]);

  return events;
}
