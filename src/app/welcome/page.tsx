'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();
  const [referralCode, setReferralCode] = useState('');
  const [userId, setUserId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const code = localStorage.getItem('growthos_referral_code');
    const uid = localStorage.getItem('growthos_user_id');
    if (!code || !uid) {
      router.push('/register');
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReferralCode(code);
    setUserId(uid);
  }, [router]);

  const shareLink = typeof window !== 'undefined' ? `${window.location.origin}/register?ref=${referralCode}&utm_source=referral&utm_medium=community` : '';

  const handleShareClick = async (platform: string) => {
    // Fire tracking event for share intent
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'share_clicked',
        userId,
        propertiesJson: JSON.stringify({ platform }),
      }),
    });

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (platform === 'whatsapp') {
      const text = encodeURIComponent(`I just registered for the free AI project workshop! Join me using my invite link and we can unlock the AI Project Starter Pack together: ${shareLink}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  if (!referralCode) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 rounded-xl p-8 border border-slate-800 shadow-2xl text-center">
        <div className="w-16 h-16 bg-green-900/50 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">You&apos;re in.</h2>
        <p className="text-slate-300 mb-8">
          Invite 3 classmates and unlock the <strong className="text-blue-400">AI Project Starter Pack</strong>.
        </p>

        <div className="bg-slate-950 rounded-lg p-6 border border-slate-800 mb-6">
          <p className="text-sm text-slate-400 mb-3 text-left font-medium">Your Unique Invite Link</p>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              readOnly 
              value={shareLink} 
              className="flex-1 bg-slate-900 border border-slate-700 rounded p-2 text-slate-300 text-sm focus:outline-none"
            />
            <button 
              onClick={() => handleShareClick('copy')}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded transition-colors text-sm font-medium"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => handleShareClick('whatsapp')}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Share on WhatsApp
          </button>
          
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
