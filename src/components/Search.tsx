import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchStrategies, isLoading } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      searchStrategies(query);
    }
  };

  return (
    <div className="mb-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#F5793B]">
          Find the best Clash of Clans strategies
        </h2>
        <p className="text-gray-300 text-lg">
          Ask a question and get top results from Reddit and YouTube
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What's the best TH11 attack strategy?"
            className="w-full px-6 py-4 pr-14 bg-[#1E2A59]/90 border-2 border-[#3A4B80] rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-[#F5793B] transition-all text-lg shadow-lg"
            disabled={isLoading}
          />
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#F5793B] p-3 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:bg-[#FF8A4C] transition-colors"
          >
            <SearchIcon size={24} />
          </motion.button>
        </div>
      </form>
    </div>
  );
};