'use client';
import { Rocket, Lock, PartyPopper } from 'lucide-react';

export default function FooterCards() {
  const cards = [
    {
      icon: <Rocket className="w-8 h-8 text-red-500" />,
      title: "Fair Launch",
      desc: "No presale, no team tokens.",
      bg: "bg-yellow-100" // Light yellow circle bg for icon
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-500" />,
      title: "LP Locked",
      desc: "Liquidity locked for 100 years.",
      bg: "bg-blue-100"
    },
    {
      icon: <PartyPopper className="w-8 h-8 text-pink-500" />,
      title: "New Year Hype",
      desc: "First coin of the new cycle.",
      bg: "bg-pink-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12 mb-20">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
          <div className={`${card.bg} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
            {card.icon}
          </div>
          <h3 className="text-xl font-black text-orange-400 mb-2">{card.title}</h3>
          <p className="text-gray-500 text-sm font-medium">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}

