import React from 'react';
import { Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-[#3A4B80]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          {/* Disclaimer */}
          <p className="text-sm text-gray-400">
            Clash Strategy Finder is not affiliated with Supercell. Reddit and YouTube content belongs to their respective creators.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/yourusername/clash-strategy-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#F5793B] transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#F5793B] transition-colors"
            >
              <Twitter size={24} />
            </a>
          </div>

          {/* Credits */}
          <p className="text-sm text-gray-400">
            Made with ❤️ from LATAM by{' '}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5793B] hover:text-[#F5793B]/80 transition-colors"
            >
              julian
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};