'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PixelPanel from '@/components/ui/PixelPanel';
import PixelButton from '@/components/ui/PixelButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    collegeId: '',
    graduationYear: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Persist UTM and referral params
  const referralCode = searchParams.get('ref') || '';
  const source = searchParams.get('utm_source') || '';
  const medium = searchParams.get('utm_medium') || '';
  const campaignId = searchParams.get('utm_campaign') || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          referralCode,
          source,
          medium,
          campaignId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Record local session for demo purposes
      localStorage.setItem('growthos_user_id', data.user.id);
      localStorage.setItem('growthos_referral_code', data.user.referralCode);

      setSuccess(true);
      
      // Dramatic pause before redirecting
      setTimeout(() => {
        router.push('/welcome');
      }, 2500);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center border-4 border-green-500 pixel-corners"
          >
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-pixel text-green-400 mb-4"
            >
              QUEST ACCEPTED
            </motion.h2>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="bg-green-900/40 text-green-300 font-pixel text-xl px-4 py-2 border-2 border-green-700"
            >
              +100 XP
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8 text-slate-400 font-pixel tracking-widest"
            >
              PREPARING DROPSHIP...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <PixelPanel title="PLAYER_INTEL" className={success ? 'opacity-0' : ''}>
        {error && (
          <div className="bg-red-900/50 border-2 border-red-500 text-red-200 px-4 py-2 pixel-corners mb-6 text-sm font-pixel tracking-wide uppercase">
            ERR: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-900 border-2 border-slate-700 p-3 text-white focus:border-blue-500 focus:outline-none font-sans text-sm transition-colors"
              placeholder="student@college.edu"
            />
          </div>

          <div>
            <label className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">Phone (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-900 border-2 border-slate-700 p-3 text-white focus:border-blue-500 focus:outline-none font-sans text-sm transition-colors"
              placeholder="+91..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">College ID</label>
              <input
                type="text"
                name="collegeId"
                required
                value={formData.collegeId}
                onChange={handleChange}
                className="w-full bg-slate-900 border-2 border-slate-700 p-3 text-white focus:border-blue-500 focus:outline-none font-sans text-sm transition-colors uppercase"
                placeholder="e.g. IITM"
              />
            </div>
            <div>
              <label className="block text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest">Grad. Year</label>
              <select
                name="graduationYear"
                required
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full bg-slate-900 border-2 border-slate-700 p-3 text-white focus:border-blue-500 focus:outline-none font-sans text-sm transition-colors"
              >
                <option value="">Select</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>
          </div>

          {referralCode && (
            <div className="bg-blue-900/20 border-2 border-blue-800 p-3 text-xs text-blue-300 flex items-center font-pixel tracking-wide uppercase">
              <span className="text-blue-500 mr-2">▶</span> INVITE CODE DETECTED: {referralCode}
            </div>
          )}

          <PixelButton
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-full mt-4"
          >
            {loading ? 'PROCESSING...' : 'CONFIRM QUEST'}
          </PixelButton>
        </form>
      </PixelPanel>
    </div>
  );
}
