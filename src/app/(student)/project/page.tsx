'use client';

import { useState, useEffect } from 'react';
import PixelButton from '@/components/ui/PixelButton';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = [
  { id: 'env', title: 'ENVIRONMENT', desc: 'Provisioning AI Sandbox', status: 'completed' },
  { id: 'repo', title: 'REPOSITORY', desc: 'Syncing source control', status: 'completed' },
  { id: 'copilot', title: 'AI COPILOT', desc: 'Initializing neural assistant', status: 'active' },
  { id: 'build', title: 'COMPILATION', desc: 'Executing build matrix', status: 'locked' },
  { id: 'deploy', title: 'DEPLOYMENT', desc: 'Routing to global edge network', status: 'locked' }
];

export default function ProjectPassportPage() {
  const [logs, setLogs] = useState<string[]>(['> SYSTEM INITIALIZED', '> AWAITING USER COMMAND']);
  const [activeStage, setActiveStage] = useState(2); // 0-based index of STAGES
  const [isDeploying, setIsDeploying] = useState(false);
  
  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${msg}`].slice(-8));
  };

  const simulateDeploy = () => {
    setIsDeploying(true);
    let step = 0;
    const msgs = [
      'ALLOCATING COMPUTE RESOURCES...',
      'PULLING DOCKER IMAGE [NODE:18-ALPINE]...',
      'INSTALLING DEPENDENCIES...',
      'EXECUTING TESTS (14/14 PASSED)...',
      'BUILDING PRODUCTION BUNDLE...',
      'UPLOADING ASSETS TO EDGE NETWORK...',
      'DEPLOYMENT SUCCESSFUL.'
    ];
    const interval = setInterval(() => {
      addLog(msgs[step]);
      step++;
      if (step >= msgs.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDeploying(false);
          setActiveStage(4);
        }, 1000);
      }
    }, 800);
  };

  return (
    <div className="w-full h-full flex flex-col relative z-10 p-4 md:p-8 pb-20 md:pb-8 overflow-y-auto overflow-x-hidden scrollbar-hide">
      
      <div className="shrink-0 mb-6 z-20 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-pixel text-white tracking-widest mb-2 uppercase drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">PROJECT LAB</h1>
          <p className="text-xs text-blue-300 font-pixel tracking-widest uppercase opacity-80">LOCAL DEVELOPMENT ENVIRONMENT // ROOT</p>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col xl:flex-row gap-6 h-full relative">
        
        {/* LEFT: PIPELINE STATUS */}
        <div className="w-full xl:w-96 shrink-0 flex flex-col gap-6 h-full">
          
          <div className="bg-slate-900/90 border border-slate-700 p-6 shadow-xl flex-1 relative overflow-hidden">
             {/* Scanline overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50" />
             
             <h3 className="font-pixel text-xs text-blue-400 tracking-widest uppercase mb-6 flex justify-between border-b border-slate-700 pb-4">
                <span>DEPLOYMENT PIPELINE</span>
                <span className="text-emerald-400">ONLINE</span>
             </h3>
             
             <div className="flex flex-col gap-4 relative z-10">
               {STAGES.map((stage, idx) => {
                 const isCompleted = idx < activeStage;
                 const isActive = idx === activeStage;
                 
                 return (
                   <div key={stage.id} className={`flex items-start gap-4 p-3 border ${
                     isCompleted ? 'border-slate-700 bg-slate-800/30' : 
                     isActive ? 'border-cyan-500/50 bg-cyan-900/20' : 
                     'border-transparent opacity-50'
                   }`}>
                     <div className={`mt-1 w-4 h-4 shrink-0 flex items-center justify-center border ${
                       isCompleted ? 'border-blue-500 bg-blue-900 text-blue-400' : 
                       isActive ? 'border-cyan-400 bg-cyan-900 text-cyan-400 animate-pulse' : 
                       'border-slate-600 bg-slate-800'
                     }`}>
                       {isCompleted && <div className="w-2 h-2 bg-blue-500" />}
                       {isActive && <div className="w-2 h-2 bg-cyan-400" />}
                     </div>
                     <div>
                       <div className={`font-pixel text-xs tracking-widest uppercase mb-1 ${
                         isCompleted ? 'text-blue-300' : 
                         isActive ? 'text-cyan-300' : 
                         'text-slate-500'
                       }`}>{stage.title}</div>
                       <div className="font-pixel text-[8px] text-slate-400 tracking-wider uppercase">{stage.desc}</div>
                     </div>
                   </div>
                 )
               })}
             </div>
          </div>
        </div>

        {/* RIGHT: TERMINAL & CODE */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* MAIN CODE TERMINAL */}
          <div className="flex-1 bg-[#020617] border border-slate-700 shadow-xl flex flex-col relative overflow-hidden">
             
             <div className="h-10 bg-slate-900 border-b border-slate-700 flex items-center px-4 justify-between shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500/80 border border-red-700" />
                  <div className="w-3 h-3 bg-yellow-500/80 border border-yellow-700" />
                  <div className="w-3 h-3 bg-green-500/80 border border-green-700" />
                </div>
                <div className="font-pixel text-[10px] text-slate-400 tracking-widest">ai-copilot-agent.ts</div>
                <div className="w-16" /> {/* spacer */}
             </div>
             
             <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-y-auto">
                <pre className="text-slate-400">
                  <code>
<span className="text-pink-500">import</span> {'{'} GrowthOS {'}'} <span className="text-pink-500">from</span> <span className="text-green-400">'@growthos/core'</span>;{'\n'}
<span className="text-pink-500">import</span> {'{'} OpenAIAgent {'}'} <span className="text-pink-500">from</span> <span className="text-green-400">'@growthos/ai'</span>;{'\n'}
{'\n'}
<span className="text-blue-400">const</span> agent = <span className="text-blue-400">new</span> <span className="text-yellow-200">OpenAIAgent</span>({'{'}{'\n'}
{'  '}model: <span className="text-green-400">'gpt-4-turbo'</span>,{'\n'}
{'  '}role: <span className="text-green-400">'Data Analyst'</span>,{'\n'}
{'  '}tools: [GrowthOS.tools.database_query]{'\n'}
{'}'});{'\n'}
{'\n'}
<span className="text-blue-400">export default async function</span> <span className="text-yellow-200">runAgent</span>(query: <span className="text-teal-300">string</span>) {'{'}{'\n'}
{'  '}<span className="text-blue-400">const</span> response = <span className="text-pink-500">await</span> agent.<span className="text-yellow-200">execute</span>(query);{'\n'}
{'  '}<span className="text-pink-500">return</span> response;{'\n'}
{'}'}{'\n'}
{/* Blinking cursor */}
<span className="animate-pulse bg-slate-400 w-2 h-4 inline-block align-middle" />
                  </code>
                </pre>
             </div>

             {/* ACTIONS OVERLAY */}
             <div className="absolute bottom-6 right-6 flex gap-4">
               <PixelButton variant="secondary" className="px-6 py-3 text-xs opacity-50 cursor-not-allowed">
                 RUN TESTS
               </PixelButton>
               <PixelButton 
                 variant="primary" 
                 onClick={simulateDeploy}
                 disabled={isDeploying || activeStage === 4}
                 className="px-8 py-3 text-sm shadow-[0_0_20px_rgba(59,130,246,0.5)]"
               >
                 {isDeploying ? 'DEPLOYING...' : activeStage === 4 ? 'SHIPPED' : 'INITIATE BUILD'}
               </PixelButton>
             </div>
          </div>

          {/* BUILD LOG TERMINAL */}
          <div className="h-48 shrink-0 bg-[#000000] border-2 border-slate-800 p-4 font-pixel text-[10px] sm:text-xs text-slate-300 tracking-wider flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 text-slate-600">STDOUT</div>
             <div className="flex-1 flex flex-col justify-end">
               {logs.map((log, i) => (
                 <div key={i} className={`mb-2 ${log.includes('SUCCESS') ? 'text-emerald-400' : ''}`}>
                   {log}
                 </div>
               ))}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}

