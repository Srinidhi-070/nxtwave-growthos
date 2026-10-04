'use client';

import React from 'react';

const generateStars = (count: number, size: number, color: string) => {
  let shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows.push(`${x}px ${y}px ${color}`);
  }
  return shadows.join(', ');
};

export default function StarfieldBackground() {
  const [starsSmall, setStarsSmall] = React.useState('');
  const [starsMedium, setStarsMedium] = React.useState('');
  const [starsLarge, setStarsLarge] = React.useState('');

  React.useEffect(() => {
    setStarsSmall(generateStars(300, 1, '#60a5fa'));
    setStarsMedium(generateStars(100, 2, '#a78bfa'));
    setStarsLarge(generateStars(30, 3, '#34d399'));
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#0f0c29] overflow-hidden pointer-events-none">
      {/* Deep space gradient matching the retro city sky */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#090914_0%,#1a103c_100%)]" />
      
      {/* Star layers using box-shadow */}
      <div 
        className="absolute top-0 left-0 rounded-none animate-[starDrift_100s_linear_infinite]"
        style={{ width: '1px', height: '1px', boxShadow: starsSmall }} 
      />
      <div 
        className="absolute top-0 left-0 rounded-none animate-[starDrift_150s_linear_infinite]"
        style={{ width: '2px', height: '2px', boxShadow: starsMedium }} 
      />
      <div 
        className="absolute top-0 left-0 rounded-none animate-[starDrift_200s_linear_infinite]"
        style={{ width: '3px', height: '3px', boxShadow: starsLarge }} 
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes starDrift {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-1000px) translateX(-500px); }
        }
      `}} />
      
      {/* City Silhouette overlay at the bottom for grounding */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxwYXRoIGQ9Ik0wLDEwMCBMMCw4MCBMMTAsODAgTDEwLDcwIEwyMCw3MCBMMjAsNjAgTDMwLDYwIEwzMCw5MCBMNDAsOTAgTDQwLDQwIEw1MCw0MCBMNTAsODAgTDYwLDgwIEw2MCwyMCBMNzAsMjAgTDcwLDUwIEw4MCw1MCBMODAsOTAgTDkwLDkwIEw5MCw2MCBMMTAwLDYwIEwxMDAsMTAwIFoiIGZpbGw9IiMwOTA5MTQiIC8+PC9zdmc+')] opacity-50 bg-repeat-x" style={{ backgroundSize: '200px 100%' }}></div>
    </div>
  );
}

