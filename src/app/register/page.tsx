import { Suspense } from 'react';
import RegistrationForm from './RegistrationForm';

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* --- RETRO CITY BACKGROUND --- */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/retro_city_bg.jpg)',
          imageRendering: 'pixelated', 
          backgroundSize: 'cover',
          animation: 'panBackground 60s linear infinite alternate' 
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes panBackground {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}} />
      </div>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-0 bg-slate-950/70 mix-blend-multiply pointer-events-none"></div>

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
