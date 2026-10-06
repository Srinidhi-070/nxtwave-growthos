'use client';
import React from 'react';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';
import { CAMPUSES } from '@/data/ops';

export default function CampusAnalyticsPage() {
  const maxRegs = Math.max(...CAMPUSES.map(c => c.regs));

  return (
    <div className="mx-auto max-w-[1400px]">
      <OpsPageHeader eyebrow="ANALYTICS // CAMPUS" title="CAMPUS LEADERBOARD" />
      
      <OpsPanel title="REGISTRATIONS BY COLLEGE">
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-line font-px text-[10px] tracking-widest text-mute">
                <th className="py-4 pl-4 font-normal">CAMPUS NAME</th>
                <th className="py-4 font-normal">SHORTCODE</th>
                <th className="py-4 font-normal">VOLUME</th>
                <th className="py-4 pr-4 font-normal text-right">TOTAL REGS</th>
              </tr>
            </thead>
            <tbody>
              {CAMPUSES.map((c) => (
                <tr key={c.short} className="border-b border-line/50 hover:bg-void transition-colors">
                  <td className="py-4 pl-4 font-term text-lg text-ink">{c.name || 'Unknown Campus'}</td>
                  <td className="py-4 font-mono text-mute">{c.short}</td>
                  <td className="py-4 w-[40%]">
                    <div className="h-4 bg-deep">
                      <div 
                        className="h-full bg-cyan" 
                        style={{ width: `${(c.regs / maxRegs) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4 pr-4 font-mono text-[20px] text-right text-ink">
                    {c.regs.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </OpsPanel>
    </div>
  );
}

