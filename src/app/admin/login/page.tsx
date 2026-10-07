'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PixelPanel } from '@/components/pixel/PixelPanel';
import { PixelButton } from '@/components/pixel/PixelButton';
import { LockIcon } from 'lucide-react';

export default function AdminLogin() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Basic prototype protection
    try {
      if (code.trim().toUpperCase() === 'NXTWAVE2026') {
        document.cookie = "growthos_admin_session=authorized; path=/";
        window.location.href = '/admin';
      } else {
        setError('ACCESS DENIED. INVALID DIRECTIVE.');
      }
    } catch (err) {
      setError('SYSTEM ERROR DURING AUTHENTICATION.');
    }
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <PixelPanel tone="danger" className="bg-void/90 p-8">
          <div className="flex flex-col items-center text-center">
            <LockIcon className="w-12 h-12 text-danger mb-4" />
            <h1 className="font-pixel text-[18px] text-ink mb-2">GROWTHOS ADMIN</h1>
            <p className="font-term text-lg text-mute mb-8">RESTRICTED OBSERVATORY ACCESS</p>

            <input
              type="password"
              placeholder="ENTER PASSCODE"
              value={code}
              onChange={e => { setCode(e.target.value); setError(''); }}
              className="w-full bg-deep border-2 border-line text-ink font-term text-xl p-3 text-center mb-4 focus:border-cyan focus:outline-none"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />

            {error && <p className="text-danger font-px text-[10px] mb-4 tracking-widest">{error}</p>}

            <PixelButton onClick={handleLogin} className="w-full">
              AUTHORIZE
            </PixelButton>
          </div>
        </PixelPanel>
      </div>
    </div>
  );
}

