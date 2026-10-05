'use client';
import { useEffect, useState } from 'react';

export interface LiveEvent {
  id: number;
  time: string;
  type: string;
  actor: string;
  meta: string;
}

export function useLiveEvents(limit = 40) {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const sse = new EventSource('/api/events');
    
    sse.onopen = () => setConnected(true);
    
    sse.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'ping') return;
        
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        const newEvent: LiveEvent = {
          id: Date.now(),
          time: timeStr,
          type: data.type || 'EVENT',
          actor: data.actor || 'SYSTEM',
          meta: data.text || data.metadata || JSON.stringify(data)
        };
        
        setEvents(prev => [newEvent, ...prev].slice(0, limit));
      } catch (err) {}
    };

    sse.onerror = () => setConnected(false);

    return () => {
      sse.close();
      setConnected(false);
    };
  }, [limit]);

  return { events, connected };
}
