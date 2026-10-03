'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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

      // Navigate to welcome/dashboard
      router.push('/welcome');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 rounded-xl p-8 border border-slate-800 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-2">Secure your spot</h2>
      <p className="text-slate-400 mb-6 text-sm">Build your first AI project in 60 minutes.</p>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="student@college.edu"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Phone (Optional)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="+91..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">College ID</label>
            <input
              type="text"
              name="collegeId"
              required
              value={formData.collegeId}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. IITM"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Graduation Year</label>
            <select
              name="graduationYear"
              required
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          <div className="bg-blue-900/20 border border-blue-500/30 rounded px-3 py-2 mt-4 text-xs text-blue-300 flex items-center">
            <span className="font-semibold mr-1">Invite Code Applied:</span> {referralCode}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Register for Workshop'}
        </button>
      </form>
    </div>
  );
}
