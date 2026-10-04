'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PixelButton from '@/components/ui/PixelButton';

const STEPS = ['IDENTITY', 'CAMPUS', 'ACADEMIC', 'SECURE'];

export default function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [invitedScreen, setInvitedScreen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeId: '',
    graduationYear: '',
    password: '', // visual only, no auth DB field
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cinematic, setCinematic] = useState(false);
  const [cinematicText, setCinematicText] = useState('');

  const referralCode = searchParams.get('ref') || '';
  const source = searchParams.get('utm_source') || '';
  const medium = searchParams.get('utm_medium') || '';
  const campaignId = searchParams.get('utm_campaign') || '';

  useEffect(() => {
    if (referralCode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInvitedScreen(true);
    }
  }, [referralCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    return () => {
      if ((window as unknown)._regTimers) {
        (window as unknown)._regTimers.forEach((t: NodeJS.Timeout) => clearTimeout(t));
      }
    };
  }, []);

  const runCinematicSequence = () => {
    setCinematic(true);
    (window as unknown)._regTimers = [];
    
    const sequence = [
      { text: 'CREATING IDENTITY...', delay: 0 },
      { text: 'VERIFYING SIGNAL...', delay: 800 },
      { text: 'CONNECTING TO CAMPUS...', delay: 1600 },
      { text: 'INITIALIZING AI EXPLORER...', delay: 2400 },
      { text: 'READY.', delay: 3200 },
    ];

    sequence.forEach(({ text, delay }) => {
      const t = setTimeout(() => setCinematicText(text), delay);
      (window as unknown)._regTimers.push(t);
    });

    const t2 = setTimeout(() => {
      router.push('/character/create');
    }, 4000);
    (window as unknown)._regTimers.push(t2);
  };

  const handleNext = () => {
    if (step === 0 && (!formData.name || !formData.email || !formData.email.includes('@'))) {
      setError('SIGNAL FORMAT INVALID: Enter valid name and email');
      return;
    }
    if (step === 1 && !formData.collegeId) {
      setError('CAMPUS REQUIRED');
      return;
    }
    if (step === 2 && !formData.graduationYear) {
      setError('PROFILE DATA REQUIRED');
      return;
    }
    setError('');
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    if (!formData.password) {
      setError('SECURITY KEY REQUIRED');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          collegeId: formData.collegeId,
          graduationYear: formData.graduationYear,
          referralCode,
          source,
          medium,
          campaignId,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.error === 'Email already registered') {
            throw new Error('ACCOUNT ALREADY EXISTS. This identity has already entered the GrowthOS network.');
        }
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('growthos_user_id', data.user.id);
      localStorage.setItem('growthos_temp_name', formData.name);

      runCinematicSequence();

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  if (cinematic) {
    return (
      <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center pixel-corners border-4 border-blue-500/30">
        <div className="w-full max-w-md p-8 relative">
          <motion.div 
            key={cinematicText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-pixel text-blue-400 text-center tracking-widest uppercase mb-8"
          >
            {cinematicText}
          </motion.div>
          
          <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-blue-500"
               initial={{ width: '0%' }}
               animate={{ width: '100%' }}
               transition={{ duration: 3.5, ease: 'linear' }}
             />
          </div>
        </div>
      </div>
    );
  }

  if (invitedScreen) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-slate-900/80 border-2 border-slate-700 p-8 text-center"
      >
        <p className="text-slate-400 font-pixel text-sm tracking-widest mb-6">----------------------</p>
        <h2 className="text-xl font-bold text-white tracking-tight uppercase mb-2">YOU WERE INVITED BY</h2>
        <div className="my-6 p-4 border border-blue-500/30 bg-blue-500/10 inline-block pixel-corners">
           <h3 className="text-blue-400 font-pixel text-xl uppercase mb-1">A NETWORK CONNECTOR</h3>
           <p className="text-blue-200 font-sans text-sm">SIGNAL: {referralCode}</p>
        </div>
        <p className="text-slate-400 font-sans text-sm mb-6 max-w-xs mx-auto">
          Your journey into the AI campus starts through their active signal.
        </p>
        <p className="text-slate-400 font-pixel text-sm tracking-widest mb-8">----------------------</p>
        
        <PixelButton onClick={() => setInvitedScreen(false)} className="w-full">
          ACCEPT INVITATION
        </PixelButton>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-8 px-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-col items-center flex-1">
            <div className={`text-xs font-pixel tracking-widest mb-2 ${i <= step ? 'text-blue-400' : 'text-slate-600'}`}>
              0{i + 1}
            </div>
            <div className={`w-3 h-3 rounded-full mb-1 ${i <= step ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-slate-800'}`} />
            {i < STEPS.length - 1 && (
               <div className="absolute h-[2px] bg-slate-800 top-[1.35rem] left-[10%] right-[10%] -z-10" />
            )}
            <div className={`hidden sm:block text-[10px] font-pixel uppercase ${i <= step ? 'text-slate-300' : 'text-slate-600'}`}>
              {s}
            </div>
          </div>
        ))}
        {/* Step 5 - Character */}
        <div className="flex flex-col items-center flex-1">
            <div className={`text-xs font-pixel tracking-widest mb-2 text-slate-600`}>05</div>
            <div className={`w-3 h-3 rounded-full mb-1 bg-slate-800`} />
            <div className={`hidden sm:block text-[10px] font-pixel uppercase text-slate-600`}>EXPLORER</div>
        </div>
      </div>

      <div className="bg-slate-900/80 border-2 border-slate-700 p-6 md:p-8 relative min-h-[300px] flex flex-col">
        {error && (
          <div className="bg-red-900/40 border-2 border-red-500 text-red-200 px-4 py-3 pixel-corners mb-6 text-xs font-pixel tracking-wide uppercase">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-2">Step 01: Identity</h2>
                <div>
                  <label htmlFor="name" className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">Full Name</label>
                    <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white focus:border-blue-500 outline-none font-sans"
                    placeholder="Enter full name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">Email Address</label>
                    <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white focus:border-blue-500 outline-none font-sans"
                    placeholder="student@college.edu" />
                </div>
              </div>
            )}
            
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-2">Step 02: Campus Node</h2>
                <div>
                  <label className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">College ID</label>
                  <input type="text" name="collegeId" value={formData.collegeId} onChange={handleChange} required
                    className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white focus:border-blue-500 outline-none font-sans uppercase"
                    placeholder="e.g. IITM, NITW" />
                </div>
                <div>
                  <label className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">Phone Signal (Optional)</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white focus:border-blue-500 outline-none font-sans"
                    placeholder="+91..." />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-2">Step 03: Academic Profile</h2>
                <div>
                  <label className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">Graduation Year</label>
                  <select name="graduationYear" value={formData.graduationYear} onChange={handleChange} required
                    className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white focus:border-blue-500 outline-none font-sans">
                    <option value="">Select Year</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">Branch (Optional)</label>
                  <input type="text"
                    className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white focus:border-blue-500 outline-none font-sans uppercase"
                    placeholder="e.g. CSE" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-2">Step 04: Secure Account</h2>
                <div>
                  <label className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">Security Key (Password)</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required
                    className="w-full bg-slate-950 border-2 border-slate-700 p-3 text-white focus:border-blue-500 outline-none font-sans"
                    placeholder="-" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} className="text-slate-400 font-pixel text-xs hover:text-white uppercase">
              [ BACK ]
            </button>
          ) : <div />}
          
          {step < 3 ? (
            <PixelButton onClick={handleNext} variant="primary">NEXT STEP</PixelButton>
          ) : (
            <PixelButton onClick={handleSubmit} disabled={loading} variant="primary">
              {loading ? 'PROCESSING...' : 'CREATE ACCOUNT'}
            </PixelButton>
          )}
        </div>
      </div>
    </div>
  );
}



