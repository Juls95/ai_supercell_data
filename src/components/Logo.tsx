import React from 'react';
import { Sword } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Sword size={32} className="text-[#F5793B]" />
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        <span className="text-[#F5793B]">Clash</span> Strategy Finder
      </h1>
    </div>
  );
};