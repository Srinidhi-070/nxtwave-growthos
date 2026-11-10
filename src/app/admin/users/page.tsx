'use client';
import React, { useState } from 'react';
import { SearchIcon, UserIcon, MapIcon, UsersIcon, ChevronDownIcon, ChevronUpIcon, ShieldAlertIcon, CheckCircleIcon } from 'lucide-react';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';
import { PixelCharacter } from '@/components/pixel/PixelCharacter';
import { JOURNEY_STUDENTS, type JourneyStudent } from '@/data/ops';

/* ── Audit Log Drawer ───────────────────────────────────────────── */
function AuditDrawer({ student }: { student: JourneyStudent }) {
  return (
    <div className="border-t border-line bg-void px-5 py-4">
      <p className="mb-3 font-px text-[9px] tracking-widest text-mute">JOURNEY TIMELINE</p>
      <ol className="relative border-l border-line ml-2 space-y-3">
        {student.timeline.filter(t => t.step).map((t, i) => (
          <li key={i} className="pl-4">
            <span className="absolute -left-[5px] mt-1 h-2.5 w-2.5 bg-cyan border border-void" />
            <div className="flex items-start justify-between gap-2">
              <span className="font-px text-[9px] tracking-widest text-ink">{t.step}</span>
              {t.time && (
                <span className="font-term text-xs text-mute whitespace-nowrap">{t.time}</span>
              )}
            </div>
            {t.note && (
              <span className="mt-0.5 block font-term text-xs text-mute">{t.note}</span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-deep p-3">
          <p className="font-px text-[8px] tracking-widest text-mute mb-1">EXPERIMENT</p>
          <p className="font-term text-sm text-ink">{student.experiment || '—'}</p>
        </div>
        <div className="bg-deep p-3">
          <p className="font-px text-[8px] tracking-widest text-mute mb-1">INVITED BY</p>
          <p className="font-term text-sm text-ink">{student.invitedBy || '—'}</p>
        </div>
      </div>
    </div>
  );
}

/* ── User Card ──────────────────────────────────────────────────── */
function UserCard({ student }: { student: JourneyStudent }) {
  const [open, setOpen] = useState(false);
  const isHighRisk = student.risk === 'high';
  const isMedRisk  = student.risk === 'medium';

  return (
    <div
      className="border border-line flex flex-col overflow-hidden"
      style={{ borderColor: isHighRisk ? 'var(--danger)' : isMedRisk ? 'var(--amber)' : 'var(--line)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-line bg-panel">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-px text-[10px] tracking-widest text-cyan truncate">{student.name}</span>
          {isHighRisk && <ShieldAlertIcon className="w-3.5 h-3.5 text-danger shrink-0" />}
          {!isHighRisk && !isMedRisk && <CheckCircleIcon className="w-3.5 h-3.5 text-teal shrink-0" />}
        </div>
        <span
          className="font-term text-xs px-2 py-0.5 shrink-0"
          style={{
            background: isHighRisk ? 'rgba(255,77,94,0.15)' : isMedRisk ? 'rgba(255,201,74,0.15)' : 'rgba(25,201,182,0.15)',
            color: isHighRisk ? 'var(--danger)' : isMedRisk ? 'var(--amber)' : 'var(--teal)',
          }}
        >
          {student.risk.toUpperCase()} RISK
        </span>
      </div>

      {/* Body */}
      <div className="flex gap-4 p-4 bg-void">
        {/* Avatar */}
        <div className="shrink-0">
          <PixelCharacter config={student.config} size={64} />
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <MapIcon className="w-3.5 h-3.5 text-mute shrink-0" />
            <span className="font-term text-sm text-ink truncate">{student.campus}</span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-3.5 h-3.5 text-mute shrink-0" />
            <span className="font-term text-sm text-ink">
              {student.crew.direct} direct · {student.crew.second} 2nd-degree
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="w-3.5 h-3.5 text-mute shrink-0" />
            <span className="font-term text-xs text-mute">{student.id} · {student.source}</span>
          </div>
        </div>
      </div>

      {/* Timeline steps preview */}
      <div className="px-4 pb-3 bg-void flex flex-wrap gap-1">
        {student.timeline.filter(t => t.time).map((t, i) => (
          <span
            key={i}
            className="font-px text-[7px] tracking-widest px-1.5 py-0.5"
            style={{ background: 'var(--deep)', color: 'var(--teal)', border: '1px solid var(--line)' }}
          >
            {t.step}
          </span>
        ))}
      </div>

      {/* Expand button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center gap-2 py-2.5 font-px text-[9px] tracking-widest text-cyan border-t border-line bg-deep hover:bg-line transition-colors"
      >
        {open ? <ChevronUpIcon className="w-3.5 h-3.5" /> : <ChevronDownIcon className="w-3.5 h-3.5" />}
        {open ? 'HIDE AUDIT LOG' : 'VIEW FULL AUDIT LOG'}
      </button>

      {/* Expandable audit drawer */}
      {open && <AuditDrawer student={student} />}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function UserInspectorPage() {
  const [query, setQuery] = useState('');

  const filtered = JOURNEY_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.campus.toLowerCase().includes(query.toLowerCase()) ||
    s.id.toLowerCase().includes(query.toLowerCase())
  );

  const highRisk  = filtered.filter(s => s.risk === 'high');
  const medRisk   = filtered.filter(s => s.risk === 'medium');
  const lowRisk   = filtered.filter(s => s.risk === 'low');
  const ordered   = [...highRisk, ...medRisk, ...lowRisk];

  return (
    <div className="mx-auto max-w-[1400px]">
      <OpsPageHeader eyebrow="DATABASE // INSPECTOR" title="USER INSPECTOR" />

      {/* Search */}
      <div className="mb-6 relative max-w-xl">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, campus, or user ID..."
          className="w-full bg-deep border-2 border-line focus:border-cyan h-14 pl-12 pr-4 font-term text-xl text-ink outline-none transition-colors"
        />
      </div>

      {/* Stats strip */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="bg-panel border border-line px-4 py-2">
          <span className="font-term text-sm text-mute">Total&nbsp;</span>
          <span className="font-px text-[11px] text-ink">{filtered.length}</span>
        </div>
        <div className="bg-panel border border-danger/30 px-4 py-2">
          <span className="font-term text-sm text-mute">High Risk&nbsp;</span>
          <span className="font-px text-[11px] text-danger">{highRisk.length}</span>
        </div>
        <div className="bg-panel border border-amber/30 px-4 py-2">
          <span className="font-term text-sm text-mute">Med Risk&nbsp;</span>
          <span className="font-px text-[11px] text-amber">{medRisk.length}</span>
        </div>
        <div className="bg-panel border border-teal/30 px-4 py-2">
          <span className="font-term text-sm text-mute">Low Risk&nbsp;</span>
          <span className="font-px text-[11px] text-teal">{lowRisk.length}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {ordered.map((student) => (
          <UserCard key={student.id} student={student} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center border border-dashed border-line">
            <UserIcon className="w-8 h-8 text-mute mx-auto mb-4" />
            <p className="font-term text-xl text-mute">No explorers match your query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
