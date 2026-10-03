import { Suspense } from 'react';
import RegistrationForm from './RegistrationForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
          NxtWave <span className="text-blue-500">GrowthOS</span>
        </h1>
        <p className="text-slate-400">Join the simulation network.</p>
      </div>
      <Suspense fallback={<div className="text-white">Loading form...</div>}>
        <RegistrationForm />
      </Suspense>
    </main>
  );
}
