import React from 'react';
import { Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pb-8 text-center text-gray-400 text-sm">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="#" className="hover:text-[#F5793B] transition-colors">
          <Github size={20} />
        </a>
        <a href="#" className="hover:text-[#F5793B] transition-colors">
          <Twitter size={20} />
        </a>
      </div>
      <p>Clash Strategy Finder is not affiliated with Supercell.</p>
      <p>Reddit and YouTube content belongs to their respective creators.</p>
    </footer>
  );
};