'use client';
import { useState, useEffect } from 'react';
import { fetchBondingProgress } from '../lib/pumpfun';

export default function BondingProgress() {
  const [progress, setProgress] = useState(0); 
  const [isBonded, setIsBonded] = useState(false);
  const [currentMarketCap, setCurrentMarketCap] = useState(0);
  const [athMarketCap, setAthMarketCap] = useState(0);
  const [loading, setLoading] = useState(true);

  // Format market cap with K/M suffix
  const formatMarketCap = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${value.toFixed(0)}`;
    }
  };

  useEffect(() => {
    // Fetch bonding curve data
    const fetchData = async () => {
      try {
        console.log('Fetching bonding data...');
        const data = await fetchBondingProgress();
        console.log('Received data:', data);
        
        setProgress(data.progress);
        setCurrentMarketCap(data.currentMarketCap);
        setAthMarketCap(data.athMarketCap);
        setIsBonded(data.isBonded);
        setLoading(false);
      } catch (error) {
        console.error('Error in fetchData:', error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Refresh every 5 seconds for more real-time feel
    const interval = setInterval(fetchData, 5000);

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
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${Math.max(2, progress)}%` }}
        >
            {/* Striped Pattern */}
            <div 
              className={`absolute inset-0 w-full h-full ${
                isBonded ? 'bg-green-400' : 'bg-yellow-300'
              }`}
              style={{ 
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 20px)' 
              }}>
            </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 px-1">
        <div className="text-left">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            Current Market Cap
          </p>
          <p className="text-lg text-gray-700 font-black">
            {loading ? '...' : formatMarketCap(currentMarketCap)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            All-Time High
          </p>
          <p className="text-lg text-green-600 font-black">
            {loading ? '...' : formatMarketCap(athMarketCap)}
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 font-bold mt-4 uppercase tracking-wider">
        {isBonded ? "GRADUATED TO RAYDIUM!" : "Get in before graduation!"}
      </p>
    </div>
  );
}
