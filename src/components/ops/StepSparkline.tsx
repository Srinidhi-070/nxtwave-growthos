'use client';
import React from 'react';

interface StepSparklineProps {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function StepSparkline({ values, color = '#19c9b6', width = 96, height = 28 }: StepSparklineProps) {
  const max = Math.max(...values, 1);
  const step = width / values.length;
  let d = '';
  values.forEach((v, i) => {
    const y = height - 2 - v / max * (height - 4);
    d += i === 0 ? `M0 ${y} H${step}` : ` V${y} H${(i + 1) * step}`;
  });
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} shapeRendering="crispEdges" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth={2} />
    </svg>);

}
