'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOutIcon, AlertTriangleIcon } from 'lucide-react';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { audio } from '@/utils/audio';

export default function SettingsPage() {
  const [notifs, setNotifs] = useState(true);
  const [sound, setSound] = useState(true);
  
  useEffect(() => {
    setSound(audio.enabled);
  }, []);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    audio.enabled = next;
    if (next) audio.success();
  };
  
  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-x-hidden p-6 md:p-8">
      <div className="relative z-10 max-w-[800px] mx-auto">
        <header className="mb-10">
          <p className="font-px text-[10px] tracking-widest text-mute">SYSTEM CONFIGURATION</p>
          <h1 className="font-pixel text-[24px] text-ink mt-2">SETTINGS</h1>
        </header>

        <div className="flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <PixelPanel tone="default" className="bg-void p-6 border border-line">
              <h2 className="font-px text-[11px] tracking-widest text-cyan mb-6 border-b-2 border-line pb-2">PREFERENCES</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-term text-xl text-ink">Mission Alerts</h3>
                    <p className="font-term text-sm text-mute">Receive emails when your crew levels up or new quests drop.</p>
                  </div>
                  <button 
                    onClick={() => setNotifs(!notifs)} 
                    className={`w-12 h-6 border-2 flex items-center p-1 ${notifs ? 'border-lime bg-lime/20 justify-end' : 'border-line bg-deep justify-start'}`}
                  >
                    <div className={`w-3 h-3 ${notifs ? 'bg-lime' : 'bg-mute'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-term text-xl text-ink">Terminal Audio</h3>
                    <p className="font-term text-sm text-mute">Enable mechanical UI sound effects (if available).</p>
                  </div>
                  <button 
                    onClick={toggleSound} 
                    className={`w-12 h-6 border-2 flex items-center p-1 ${sound ? 'border-cyan bg-cyan/20 justify-end' : 'border-line bg-deep justify-start'}`}
                  >
                    <div className={`w-3 h-3 ${sound ? 'bg-cyan' : 'bg-mute'}`} />
                  </button>
                </div>
              </div>
            </PixelPanel>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <PixelPanel tone="magenta" className="bg-void p-6 border border-line">
              <h2 className="font-px text-[11px] tracking-widest text-danger mb-6 border-b-2 border-danger/30 pb-2 flex items-center gap-2">
                <AlertTriangleIcon className="w-4 h-4 text-danger" /> DANGER ZONE
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="font-term text-xl text-ink">Terminate Session</h3>
                  <p className="font-term text-sm text-mute">Log out of this terminal securely.</p>
                </div>
                <PixelButton variant="danger" icon={<LogOutIcon className="w-4 h-4" />}>
                  Log Out
                </PixelButton>
              </div>
            </PixelPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
