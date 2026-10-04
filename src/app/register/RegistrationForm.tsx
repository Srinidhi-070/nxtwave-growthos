'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PixelButton from '@/components/ui/PixelButton';
import PixelPanel from '@/components/ui/PixelPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, KeyRound, User, Terminal } from 'lucide-react';

export default function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    code: searchParams.get('ref') || '',
    otp: ''
  });

  const [simulatedLog, setSimulatedLog] = useState<string[]>([]);

  useEffect(() => {
    if (step === 1) {
      setSimulatedLog(['> AWAITING USER CREDENTIALS...']);
    } else if (step === 2) {
      setSimulatedLog(['> VERIFYING ENCRYPTED PAYLOAD...', '> TRANSMITTING SECURE OTP...']);
    }
  }, [step]);

  const addLog = (msg: string) => {
    setSimulatedLog(prev => [...prev, `> ${msg}`].slice(-4));
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email) {
      setError('NAME AND EMAIL REQUIRED.');
      return;
    }

    try {
      setLoading(true);
      addLog('ESTABLISHING SECURE CONNECTION...');
      
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_otp',
          name: formData.name,
          email: formData.email,
          referredByCode: formData.code || undefined
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Connection failed.');
      }
      
      addLog('OTP TRANSMITTED SUCCESSFULLY.');
      setStep(2);
    } catch (err: any) {
      setError(err.message);
      addLog(`ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.otp) {
      setError('OTP REQUIRED.');
      return;
    }

    try {
      setLoading(true);
      addLog('VERIFYING OTP HASH...');

      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_otp',
          email: formData.email,
          otp: formData.otp
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      addLog('VERIFICATION SUCCESS. GENERATING ACCESS TOKEN...');
      
      // Store auth state
      localStorage.setItem('growthos_user_id', data.data.user.id);
      localStorage.setItem('growthos_referral_code', data.data.user.referralCode);
      
      addLog('ACCESS GRANTED. REDIRECTING...');
      
      // Artificial delay for terminal effect
      setTimeout(() => {
        router.push('/character/create');
      }, 1000);

    } catch (err: any) {
      setError(err.message);
      addLog(`ERROR: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
       
       {/* STEP PROGRESS BAR */}
       <div className="w-full max-w-sm mb-8 flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-800 -translate-y-1/2 z-0" />
          
          {[1, 2, 3].map((num) => (
             <div key={num} className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center font-pixel text-[10px] ${
                  step > num ? 'bg-emerald-500 text-black shadow-[0_0_15px_#10b981]' :
                  step === num ? 'bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4] animate-pulse' :
                  'bg-slate-900 border border-slate-700 text-slate-500'
                }`}>
                   {num}
                </div>
                <div className="absolute -bottom-6 font-pixel text-[8px] tracking-widest text-slate-400">
                  {num === 1 ? 'IDENT' : num === 2 ? 'VERIFY' : 'ACCESS'}
                </div>
             </div>
          ))}
       </div>

       {/* TERMINAL UI */}
       <div className="w-full max-w-md bg-[#020617]/90 border border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden">
          
          {/* Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none z-20" />
          
          <div className="bg-slate-900 border-b border-slate-700 p-2 flex justify-between items-center relative z-10">
             <div className="flex gap-2">
               <div className="w-2 h-2 bg-red-500/80" />
               <div className="w-2 h-2 bg-yellow-500/80" />
               <div className="w-2 h-2 bg-green-500/80" />
             </div>
             <div className="font-pixel text-[8px] text-slate-500 tracking-widest">SECURE_LOGIN.EXE</div>
          </div>

          <div className="p-6 relative z-10">
             
             {error && (
               <div className="mb-6 p-3 border border-red-900 bg-red-950/30 text-red-500 font-pixel text-[10px] tracking-widest uppercase animate-pulse">
                 [!] {error}
               </div>
             )}

             <AnimatePresence mode="wait">
               {step === 1 ? (
                 <motion.form 
                   key="step1"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   onSubmit={handleSendOtp}
                   className="flex flex-col gap-5"
                 >
                    <div>
                      <label className="flex items-center gap-2 font-pixel text-[8px] text-cyan-500 mb-2 tracking-widest">
                        <User className="w-3 h-3" /> FULL IDENTIFICATION
                      </label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value.toUpperCase()})}
                        placeholder="ENTER NAME_"
                        className="w-full bg-slate-950 border border-slate-700 p-3 font-pixel text-xs text-white tracking-widest focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-700"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 font-pixel text-[8px] text-cyan-500 mb-2 tracking-widest">
                        <Mail className="w-3 h-3" /> COMM_CHANNEL (EMAIL)
                      </label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value.toLowerCase()})}
                        placeholder="ENTER EMAIL_"
                        className="w-full bg-slate-950 border border-slate-700 p-3 font-pixel text-xs text-white tracking-widest focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-700"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 font-pixel text-[8px] text-slate-500 mb-2 tracking-widest">
                        <Terminal className="w-3 h-3" /> ACCESS CODE (OPTIONAL)
                      </label>
                      <input 
                        type="text"
                        value={formData.code}
                        onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
                        placeholder="NXTWAVE100"
                        className="w-full bg-slate-950/50 border border-slate-800 p-3 font-pixel text-xs text-slate-400 tracking-widest focus:outline-none focus:border-slate-500 transition-colors placeholder:text-slate-800"
                      />
                    </div>

                    <div className="mt-4">
                      <PixelButton type="submit" variant="primary" disabled={loading} className="w-full text-xs py-4">
                        {loading ? 'TRANSMITTING...' : 'INITIALIZE CONNECTION'}
                      </PixelButton>
                    </div>
                 </motion.form>
               ) : (
                 <motion.form 
                   key="step2"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   onSubmit={handleVerifyOtp}
                   className="flex flex-col gap-5"
                 >
                    <div className="p-4 bg-slate-950 border border-slate-800 mb-2">
                       <div className="font-pixel text-[8px] text-slate-500 tracking-widest mb-1">TARGET EMAIL:</div>
                       <div className="font-pixel text-xs text-cyan-400 tracking-widest">{formData.email}</div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 font-pixel text-[8px] text-emerald-500 mb-2 tracking-widest">
                        <KeyRound className="w-3 h-3" /> ONE-TIME PASSWORD
                      </label>
                      <input 
                        type="text"
                        required
                        maxLength={6}
                        value={formData.otp}
                        onChange={e => setFormData({...formData, otp: e.target.value.replace(/[^0-9]/g, '')})}
                        placeholder="000000"
                        className="w-full bg-slate-950 border border-emerald-900 p-4 font-pixel text-2xl text-center text-white tracking-[1em] focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-800"
                      />
                      <p className="font-pixel text-[8px] text-slate-500 mt-2 text-center">CHECK INBOX FOR 6-DIGIT CODE</p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <PixelButton type="button" variant="secondary" onClick={() => setStep(1)} disabled={loading} className="px-4 py-4 text-[10px]">
                        BACK
                      </PixelButton>
                      <PixelButton type="submit" variant="primary" disabled={loading || formData.otp.length < 6} className="flex-1 text-xs py-4">
                        {loading ? 'VERIFYING...' : 'AUTHORIZE'}
                      </PixelButton>
                    </div>
                 </motion.form>
               )}
             </AnimatePresence>

          </div>

          {/* SIMULATED TERMINAL OUTPUT */}
          <div className="bg-black border-t border-slate-800 p-4 h-24 flex flex-col justify-end relative z-10">
             {simulatedLog.map((log, i) => (
                <div key={i} className="font-pixel text-[8px] text-slate-500 tracking-widest mb-1">
                   {log}
                </div>
             ))}
          </div>

       </div>
    </div>
  );
}
