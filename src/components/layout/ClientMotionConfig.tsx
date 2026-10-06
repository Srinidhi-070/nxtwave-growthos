'use client';
import { MotionConfig } from 'framer-motion';

export function ClientMotionConfig({ children }: { children: React.ReactNode }) {
  // force animations to play regardless of OS settings
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
