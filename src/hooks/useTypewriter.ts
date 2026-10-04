'use client';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useTypewriter(text: string, speed = 26, delay = 0) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay, reduce]);

  return { text: text.slice(0, count), done: count >= text.length };
}
