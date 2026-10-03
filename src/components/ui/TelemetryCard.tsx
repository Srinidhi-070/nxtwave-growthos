'use client';

import { ReactNode } from 'react';

interface TelemetryCardProps {
  title: string;
  value: string | number;
  delta?: number;
  deltaType?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode;
  subtitle?: string;
}

export default function TelemetryCard({ title, value, delta, deltaType = 'neutral', icon, subtitle }: TelemetryCardProps) {
  return (
    <div className="bg-[#111] border border-white/10 p-5 rounded-xl shadow-sm flex flex-col justify-between transition-colors hover:bg-[#151515]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{title}</h3>
        {icon && <div className="text-zinc-500">{icon}</div>}
      </div>
      <div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-semibold text-white tracking-tight">{value}</span>
          {delta !== undefined && (
            <span className={`text-xs font-medium ${
              deltaType === 'positive' ? 'text-emerald-400' : 
              deltaType === 'negative' ? 'text-rose-400' : 'text-zinc-400'
            }`}>
              {delta > 0 ? '+' : ''}{delta}%
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
