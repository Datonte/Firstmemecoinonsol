'use client';
import { useState, useEffect } from 'react';
import { fetchBondingProgress } from '../lib/pumpfun';

export default function BondingProgress() {
  const [progress, setProgress] = useState(0); 
  const [isBonded, setIsBonded] = useState(false);
  const [solRaised, setSolRaised] = useState(0);
  const [targetSol, setTargetSol] = useState(85);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bonding curve data
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchBondingProgress();
      setProgress(data.progress);
      setSolRaised(data.solRaised);
      setTargetSol(data.targetSol);
      setIsBonded(data.isBonded);
      setLoading(false);
    };

    fetchData();

    // Refresh every 10 seconds
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl max-w-2xl mx-auto w-full mt-16 relative">
      <div className="flex justify-between items-end mb-3 px-1">
        <h3 className="text-gray-500 font-black text-sm uppercase tracking-widest">
          {isBonded ? "BONDED ✓" : "BONDING PROGRESS"}
        </h3>
        <span className="text-orange-500 font-black text-2xl">
          {loading ? '...' : `${progress}%`}
        </span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="w-full bg-gray-100 rounded-full h-8 overflow-hidden inner-shadow">
        <div 
          className="h-full rounded-full transition-all duration-1000 relative"
          style={{ width: `${progress}%` }}
        >
            {/* Striped Pattern (CSS or Image) */}
            <div className="absolute inset-0 bg-yellow-300 w-full h-full" 
                 style={{ 
                   backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 20px)' 
                 }}>
            </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-3 px-1">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
          {isBonded ? "GRADUATED TO RAYDIUM!" : "Get in before graduation!"}
        </p>
        {!loading && (
          <p className="text-xs text-gray-500 font-bold">
            {solRaised.toFixed(2)} / {targetSol} SOL
          </p>
        )}
      </div>
    </div>
  );
}
