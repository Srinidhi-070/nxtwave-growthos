import { Suspense } from 'react';
import RegistrationForm from './RegistrationForm';
import StarfieldBackground from '@/components/ui/StarfieldBackground';

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* --- PARALLAX STARFIELD BACKGROUND --- */}
      <StarfieldBackground />
      
      <div className="relative z-10 w-full max-w-lg mt-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-pixel text-white tracking-widest mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] uppercase">
            Create Your GrowthOS ID
          </h1>
          <p className="font-pixel text-[10px] sm:text-xs tracking-wider uppercase leading-relaxed text-slate-400">Your journey starts here.</p>
        </div>
        <Suspense fallback={<div className="text-white font-pixel animate-pulse text-center">LOADING TERMINAL...</div>}>
          <RegistrationForm />
        </Suspense>
      </div>
    </main>
  );
}
