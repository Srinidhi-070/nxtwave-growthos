'use client';
import React from 'react';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';
import { EventStream } from '@/components/ops/EventStream';
import { useLiveEvents } from '@/hooks/useLiveEvents';
import { ActivityIcon, ServerIcon } from 'lucide-react';

export default function TelemetryPage() {
  const { events } = useLiveEvents();

  return (
    <div className="mx-auto max-w-[1400px]">
      <OpsPageHeader eyebrow="SYSTEM // LOGS" title="LIVE TELEMETRY" />
      
      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
        <OpsPanel title="GLOBAL FIREHOSE" bodyClassName="py-1">
          <EventStream events={events} max={50} />
        </OpsPanel>

        <div className="flex flex-col gap-5">
          <OpsPanel title="SERVER STATUS">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="font-px text-[10px] tracking-widest text-mute">DATABASE</span>
                <span className="font-mono text-lime flex items-center gap-2">
                  <ServerIcon className="w-4 h-4" /> 12ms
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="font-px text-[10px] tracking-widest text-mute">EVENT BUS</span>
                <span className="font-mono text-lime flex items-center gap-2">
                  <ActivityIcon className="w-4 h-4" /> HEALTHY
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="font-px text-[10px] tracking-widest text-mute">ACTIVE WS</span>
                <span className="font-mono text-cyan">4,812</span>
              </div>
            </div>
          </OpsPanel>

          <OpsPanel title="THROUGHPUT">
            <p className="font-mono text-[48px] text-ink">45.2</p>
            <p className="font-px text-[10px] tracking-widest text-mute">EVENTS / SEC</p>
          </OpsPanel>
        </div>
      </div>
    </div>
  );
}
