import React from 'react';
import { motion } from 'framer-motion';
import defaultImage from '../assets/images/clash-troops.jpg';
import defaultImage2 from '../assets/images/clinder_coc.png';

interface ClinderImageProps {
  show: boolean;
}

export const ClinderImage: React.FC<ClinderImageProps> = ({ show }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-8 text-center"
    >
      <img 
        src={defaultImage}
        alt="Clash of Clans Troops"
        className="mx-auto rounded-2xl shadow-lg max-w-md w-full object-cover h-64 mb-4"
        loading="lazy"
      />
      <p className="text-xl text-gray-300 mb-8">
        Enter your question above to find strategies
      </p>

      <div className="max-w-2xl mx-auto mb-8 p-6 bg-[#1E2A59]/90 rounded-2xl shadow-lg border-2 border-[#3A4B80]">
        <h2 className="text-2xl font-bold mb-6 text-[#F5793B]">How Clinder Works 🏰</h2>
        <ul className="space-y-4 text-left">
          <li className="flex items-start">
            <span className="text-2xl mr-3">🔍</span>
            <span className="text-gray-300">Look for what you need - Search for strategies, base layouts, or troop combinations</span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🤖</span>
            <span className="text-gray-300">Get the AI summary - Our AI analyzes the best strategies and gives you a concise breakdown</span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">📚</span>
            <span className="text-gray-300">Get the top 3 sources - Access the most relevant Reddit discussions and YouTube videos</span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">⚔️</span>
            <span className="text-gray-300">
              Copy/paste troops or bases - Easily copy army compositions and base layouts to try them out
              <span className="text-[#F5793B] text-sm italic ml-1">(TBD when together with Supercell implements it🤞🏻)</span>
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">⭐</span>
            <span className="text-gray-300">
              Qualify Clinder - Help us improve by rating the strategies and sharing your feedback
              <span className="text-[#F5793B] text-sm italic ml-1">(TBD when together with Supercell implements it🤞🏻)</span>
            </span>
          </li>
        </ul>
      </div>

      <img 
        src={defaultImage2}
        alt="Clash of Clans Clinder"
        className="mx-auto rounded-2xl shadow-lg max-w-md w-full object-cover h-64 mb-4"
        loading="lazy"
      />
    </motion.div>
  );
}; 