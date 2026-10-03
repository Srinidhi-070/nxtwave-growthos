import { Suspense } from 'react';
import RegistrationForm from './RegistrationForm';

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-pixel text-white tracking-widest mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] uppercase">
            Create Your GrowthOS ID
          </h1>
          <p className="text-slate-400 font-sans text-sm">Your journey starts here.</p>
        </div>
        <Suspense fallback={<div className="text-white font-pixel animate-pulse text-center">LOADING TERMINAL...</div>}>
          <RegistrationForm />
        </Suspense>
      </div>
    </main>
  );
}
