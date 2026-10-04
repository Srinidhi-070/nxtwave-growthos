'use client';
import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { StepSparkline } from './StepSparkline';

interface TelemetryCardProps {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  sub: string;
  color?: string;
  spark?: number[];
  delay?: number;
}

/** PixelTelemetryCard */
export function TelemetryCard({ label, value, decimals = 0, suffix, sub, color = '#19c9b6', spark, delay = 0 }: TelemetryCardProps) {
  const v = useCountUp(value, 900, delay);
  return (
    <div className="px-frame-sm flex flex-col bg-[#0b0924] p-4 [--b:#221c55]">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5" style={{ background: color }} aria-hidden />
        <p className="font-px text-[10px] tracking-[0.2em] text-mute">{label}</p>
      </div>
      <p className="mt-3 font-mono text-[28px] font-medium leading-none text-ink" aria-label={`${value}${suffix ?? ''}`}>
        {v.toFixed(decimals)}
        {suffix && <span className="ml-0.5 text-[18px] text-mute">{suffix}</span>}
      </p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <p className="text-[12px] leading-snug text-mute">{sub}</p>
        {spark && <StepSparkline values={spark} color={color} width={72} height={22} />}
      </div>
    </div>);

}
