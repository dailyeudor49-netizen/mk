import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) return { minutes: 14, seconds: 59 };
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-neon-500 text-white py-2 px-4 sticky top-0 z-50 flex justify-between items-center text-xs md:text-sm font-bold shadow-lg border-b border-white/20">
      <div className="flex items-center gap-2">
         <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
         <span className="uppercase tracking-wide text-white drop-shadow-md">PONUDA 69,99€ (-50%)</span>
      </div>
      <div className="flex items-center gap-2 font-mono bg-black/20 px-2 py-1 rounded text-white">
        <Timer className="w-3 h-3" />
        <span>ISTIČE ZA:</span>
        {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  );
};