'use client';
import React, { useState } from 'react';
import { PlayIcon, StopCircleIcon, ZapIcon } from 'lucide-react';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';
import { PixelButton } from '@/components/pixel/PixelButton';

export default function SimulatorPage() {
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="mx-auto max-w-[1000px]">
      <OpsPageHeader eyebrow="SYSTEM // DEMO" title="TRAFFIC SIMULATOR" />
      
      <OpsPanel title="SIMULATION CONTROLS">
        <div className="flex flex-col gap-8 p-4">
          <p className="font-term text-lg text-mute">
            The Demo Simulator generates fake traffic, registrations, and quest completions to populate the admin dashboard for presentations.
          </p>

          <div className="flex items-center gap-6 p-6 bg-deep border border-line">
            <div className="flex-1">
              <h3 className="font-px text-[12px] tracking-widest text-ink mb-2">SIMULATOR ENGINE</h3>
              <p className="font-term text-sm text-mute">Status: {running ? <span className="text-lime">RUNNING</span> : <span className="text-danger">STOPPED</span>}</p>
            </div>
            <PixelButton 
              onClick={() => setRunning(!running)} 
              variant={running ? 'danger' : 'primary'}
              icon={running ? <StopCircleIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
            >
              {running ? 'HALT ENGINE' : 'ENGAGE ENGINE'}
            </PixelButton>
          </div>

          <div>
            <h3 className="font-px text-[12px] tracking-widest text-ink mb-4 flex items-center gap-2">
              <ZapIcon className="w-4 h-4 text-cyan" /> SPEED MULTIPLIER
            </h3>
            <div className="flex gap-4">
              {[1, 5, 10, 50].map(s => (
                <button 
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`flex-1 py-3 border-2 font-mono text-xl ${speed === s ? 'border-cyan bg-cyan/20 text-cyan' : 'border-line bg-void text-mute hover:bg-deep'}`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </OpsPanel>
    </div>
  );
}
