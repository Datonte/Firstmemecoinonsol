'use client';
import { Twitter, BarChart3, Copy, Check, Send, Rocket } from 'lucide-react';
import Image from "next/image";
import { useState } from "react";
import Countdown from "./components/Countdown";
import BondingProgress from "./components/BondingProgress";
import FooterCards from "./components/FooterCards";
import { CONTRACT_ADDRESS, SOCIAL_LINKS, TOKEN_MINT_ADDRESS } from "./config";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(TOKEN_MINT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center py-10 px-4">
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center">
        
        {/* Top Header Removed as requested */}

        {/* Logo Section */}
        <div className="relative mt-20 mb-2">
           {/* Main Circle Image */}
           <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-[6px] border-white shadow-2xl mx-auto z-10">
              <Image 
                src="/assets/first_logo.jpeg" 
                alt="$FIRST Logo" 
                fill 
                className="object-cover"
                priority
              />
           </div>
           
           {/* "1st" Badge */}
           <div className="absolute -bottom-2 -right-2 md:right-4 z-20 transform rotate-12">
              <div className="bg-yellow-400 border-4 border-white rounded-3xl px-6 py-4 shadow-lg">
                <span className="text-white font-black text-4xl drop-shadow-md">1st</span>
              </div>
           </div>
           
           {/* Floating Decorations around logo - Removed as requested */}
        </div>

        {/* Title Text */}
        <div className="mb-12 mt-6 relative">
          <h1 className="text-5xl md:text-8xl font-black text-yellow-400 uppercase tracking-tighter leading-tight text-stroke drop-shadow-xl">
            The First Memecoin
          </h1>
          <div className="bg-white px-10 py-3 rounded-full inline-block mt-2 shadow-sm transform -rotate-1">
            <h2 className="text-2xl md:text-4xl font-black text-orange-400 uppercase tracking-wide">
              Of 2026
            </h2>
          </div>
           {/* Party Popper Emoji - Removed as requested */}
        </div>

        {/* Countdown Component */}
        <Countdown />

        {/* Bonding Progress */}
        <BondingProgress />

        {/* Contract Address Input */}
        <div className="mt-10 bg-white p-2 rounded-full shadow-md flex items-center max-w-xl w-full mx-auto border border-gray-100">
             <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center ml-1">
                <span className="text-gray-400 text-lg">📦</span>
             </div>
             <input 
               type="text" 
               value={`${TOKEN_MINT_ADDRESS.slice(0, 6)}...${TOKEN_MINT_ADDRESS.slice(-6)}`} 
               readOnly
               className="flex-1 bg-transparent border-none outline-none px-4 text-gray-600 font-mono text-sm"
             />
             <button 
                onClick={handleCopy}
                className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold hover:bg-yellow-500 transition-colors mr-1"
             >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
             </button>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap gap-4 justify-center mt-12 items-center">
           
           {/* X (Twitter) Button - Circular */}
           <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-black"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
           </a>

           {/* Dexscreener Button - Circular */}
           <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer" className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-500"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
           </a>

        </div>

        {/* Footer Cards */}
        <FooterCards />

      </div>

      {/* Simple Footer Text */}
      <footer className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mt-8 opacity-50">
        © 2026 $FIRST Memecoin. To the moon.
      </footer>
    </main>
  );
}
