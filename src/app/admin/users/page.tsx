'use client';
import React, { useState } from 'react';
import { SearchIcon, UserIcon, MapIcon, UsersIcon } from 'lucide-react';
import { OpsPageHeader, OpsPanel } from '@/components/ops/OpsPanel';
import { LEADERS } from '@/data/leaderboard';

export default function UserInspectorPage() {
  const [query, setQuery] = useState('');
  
  const filtered = LEADERS.filter(l => 
    l.name.toLowerCase().includes(query.toLowerCase()) || 
    l.campus.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-[1400px]">
      <OpsPageHeader eyebrow="DATABASE // INSPECTOR" title="USER INSPECTOR" />
      
      <div className="mb-8 relative max-w-xl">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan w-5 h-5" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by explorer name or campus..." 
          className="w-full bg-deep border-2 border-line focus:border-cyan h-14 pl-12 pr-4 font-term text-xl text-ink outline-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.slice(0, 12).map((user) => (
          <OpsPanel key={user.name} title={`EXPLORER // ${user.name}`} bodyClassName="p-0">
            <div className="p-5 border-b border-line flex items-center justify-between">
              <span className="font-px text-[10px] tracking-widest text-lime">RANK #{user.rank}</span>
              <span className="font-mono text-ink text-lg">{user.xp.toLocaleString()} XP</span>
            </div>
            <div className="p-5 space-y-4 bg-void">
              <div className="flex items-center gap-3">
                <MapIcon className="w-4 h-4 text-mute" />
                <span className="font-term text-sm text-ink">{user.campus}</span>
              </div>
              <div className="flex items-center gap-3">
                <UsersIcon className="w-4 h-4 text-mute" />
                <span className="font-term text-sm text-ink">{user.crew} Recruits | {user.impact} Impact</span>
              </div>
            </div>
            <div className="p-3 bg-deep border-t border-line text-center">
              <button className="font-px text-[10px] tracking-widest text-cyan hover:text-glow-cyan transition-colors">
                VIEW FULL AUDIT LOG
              </button>
            </div>
          </OpsPanel>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-line">
            <UserIcon className="w-8 h-8 text-mute mx-auto mb-4" />
            <p className="font-term text-xl text-mute">No explorers match your query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
