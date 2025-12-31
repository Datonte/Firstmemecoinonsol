'use client';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Target: Jan 1, 2026 00:00:00 Local Time
      const targetYear = 2026;
      const newYear = new Date(targetYear, 0, 1, 0, 0, 0).getTime();
      const distance = newYear - now.getTime();

      if (distance < 0) {
        setIsNewYear(true);
        clearInterval(timer);
        // EXPLOSION logic is handled in parent/global for continuous effect, 
        // but we can trigger a specific burst here too if needed.
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isNewYear) {
    return (
      <div className="text-center animate-bounce py-10">
        <h1 className="text-6xl md:text-8xl font-black text-yellow-400 drop-shadow-lg">
          HAPPY NEW YEAR! <br /> WELCOME TO 2026
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8 relative">
      {/* Background container style */}
      <div className="bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-xl border border-white/40">
        
        <h2 className="text-orange-400 font-black text-xl md:text-2xl mb-8 tracking-widest uppercase text-center drop-shadow-sm">
          Countdown to New Year 2026
        </h2>

        <div className="flex justify-center gap-3 md:gap-6">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-[2rem] w-20 h-20 md:w-32 md:h-32 flex items-center justify-center shadow-lg transform rotate-[-2deg]">
              <span className="text-3xl md:text-6xl font-black text-yellow-400">{timeLeft.days}</span>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-500 mt-3 uppercase tracking-widest">Days</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-[2rem] w-20 h-20 md:w-32 md:h-32 flex items-center justify-center shadow-lg transform rotate-[2deg]">
              <span className="text-3xl md:text-6xl font-black text-orange-400">{timeLeft.hours}</span>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-500 mt-3 uppercase tracking-widest">Hrs</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-[2rem] w-20 h-20 md:w-32 md:h-32 flex items-center justify-center shadow-lg transform rotate-[-1deg]">
              <span className="text-3xl md:text-6xl font-black text-yellow-400">{timeLeft.minutes}</span>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-500 mt-3 uppercase tracking-widest">Mins</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-[2rem] w-20 h-20 md:w-32 md:h-32 flex items-center justify-center shadow-lg transform rotate-[1deg]">
              <span className="text-3xl md:text-6xl font-black text-orange-300">{timeLeft.seconds}</span>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-500 mt-3 uppercase tracking-widest">Secs</span>
          </div>
        </div>

        {/* Launching Soon Badge overlapping bottom - Removed as requested */}
      </div>
    </div>
  );
}
