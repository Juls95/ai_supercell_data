import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, WifiOff, Clock, Search } from 'lucide-react';
import { RedditResults } from './RedditResults';
import { YouTubeResults } from './YouTubeResults';
import { useAppContext } from '../context/AppContext';
import { Loader } from './Loader';

export const Results: React.FC = () => {
  const { redditResults, youtubeResults, isLoading, hasSearched, error } = useAppContext();
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    const isNetworkError = error.includes('internet connection') || error.includes('network');
    const isTimeout = error.includes('timed out');
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-[#1E2A59]/90 rounded-2xl text-center shadow-lg border-2 border-red-500/30"
      >
        <div className="flex justify-center mb-4">
          {isNetworkError ? (
            <WifiOff size={48} className="text-red-400" />
          ) : isTimeout ? (
            <Clock size={48} className="text-red-400" />
          ) : (
            <AlertCircle size={48} className="text-red-400" />
          )}
        </div>
        <p className="text-red-400 text-lg font-medium mb-2">{error}</p>
        <p className="mt-2 text-gray-300">Please try again with a different query</p>
      </motion.div>
    );
  }
  
  if (!hasSearched) {
    return (
      <div className="text-center p-8">
        <img 
          src="https://images.pexels.com/photos/7130563/pexels-photo-7130563.jpeg"
          alt="Clash of Clans Troops"
          className="mx-auto rounded-2xl shadow-lg max-w-md w-full object-cover h-64 mb-6"
        />
        <p className="text-xl text-gray-300">
          Enter your question above to find strategies
        </p>
      </div>
    );
  }
  
  if (redditResults.length === 0 && youtubeResults.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-[#1E2A59]/90 rounded-2xl text-center shadow-lg border-2 border-[#3A4B80]"
      >
        <div className="flex justify-center mb-4">
          <Search size={48} className="text-gray-400" />
        </div>
        <p className="text-xl mb-2">No results found</p>
        <p className="text-gray-300">
          Try using different keywords or check your spelling
        </p>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1E2A59]/90 p-8 rounded-2xl shadow-lg border-2 border-[#3A4B80]"
    >
      <h2 className="text-2xl font-bold mb-8 text-[#F5793B]">Strategy Results</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RedditResults results={redditResults} />
        <YouTubeResults results={youtubeResults} />
      </div>
    </motion.div>
  );
};