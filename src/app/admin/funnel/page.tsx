'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FilterIcon } from 'lucide-react';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';

const FUNNEL = [
  { step: 'LANDING PAGE', users: 15420, rate: '100%', color: '#2f2670' },
  { step: 'REGISTRATION STARTED', users: 8904, rate: '57.7%', color: '#3b2f8f' },
  { step: 'EMAIL VERIFIED', users: 7120, rate: '79.9%', color: '#3ef2ff' },
  { step: 'CHARACTER FORGED', users: 5340, rate: '75.0%', color: '#b6ff3b' },
  { step: 'WORKSHOP READY', users: 3210, rate: '60.1%', color: '#ffc94a' },
];

export default function FunnelPage() {
  const maxUsers = FUNNEL[0].users;

  return (
    <div className="mx-auto max-w-[1200px]">
      <OpsPageHeader eyebrow="ANALYTICS // FUNNEL" title="CONVERSION FUNNEL" />
      
      <div className="mb-6 flex gap-4">
        <button className="flex items-center gap-2 bg-deep border border-line px-4 py-2 font-px text-[10px] tracking-widest text-ink hover:bg-void">
          <FilterIcon className="w-3 h-3" /> ALL CAMPUSES
        </button>
        <button className="flex items-center gap-2 bg-deep border border-line px-4 py-2 font-px text-[10px] tracking-widest text-ink hover:bg-void">
          LAST 24 HOURS
        </button>
      </div>

      <OpsPanel title="USER JOURNEY DROPOFF">
        <div className="mt-8 flex flex-col gap-6 relative">
          {FUNNEL.map((f, i) => {
            const width = (f.users / maxUsers) * 100;
            return (
              <div key={f.step} className="flex flex-col relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <p className="font-px text-[11px] tracking-widest text-mute">0{i + 1} {'//'} {f.step}</p>
                  <div className="text-right">
                    <p className="font-mono text-[20px] text-ink">{f.users.toLocaleString()}</p>
                    <p className="font-term text-sm text-mute">{i === 0 ? 'Total' : `Conv: ${f.rate}`}</p>
                  </div>
                </div>
                <div className="h-10 bg-deep border border-line w-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                    className="h-full border-r-2 border-void"
                    style={{ background: f.color }}
                  />
                </div>
              </div>
            );
          })}
          
          <div className="absolute left-0 top-0 bottom-0 w-px bg-line/50 -z-0 ml-4" />
        </div>
      </OpsPanel>
    </div>
  );
}

