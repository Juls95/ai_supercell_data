import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, WifiOff, Clock, Search } from 'lucide-react';
import { SearchResult } from '../types';
import defaultImage from '../assets/images/clash-troops.jpg';

interface ResultsProps {
  results: SearchResult | null;
  isLoading: boolean;
}

export const Results: React.FC<ResultsProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5793B]"></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="text-center p-8">
        <img 
          src={defaultImage}
          alt="Clash of Clans Troops"
          className="mx-auto rounded-2xl shadow-lg max-w-md w-full object-cover h-64 mb-6"
        />
        <p className="text-xl text-gray-300">
          Enter your question above to find strategies
        </p>
      </div>
    );
  }

  if (results.redditPosts.length === 0 && results.youtubeVideos.length === 0) {
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
    >
      {results.aiAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-8 bg-[#1E2A59]/90 rounded-2xl shadow-lg border-2 border-[#3A4B80]"
        >
          <h2 className="text-2xl font-bold mb-4 text-[#F5793B]">AI Analysis</h2>
          <p className="text-gray-300 whitespace-pre-line">{results.aiAnalysis}</p>
        </motion.div>
      )}

      <div className="bg-[#1E2A59]/90 p-8 rounded-2xl shadow-lg border-2 border-[#3A4B80]">
        <h2 className="text-2xl font-bold mb-8 text-[#F5793B]">Strategy Results</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reddit Posts Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#F5793B]">Reddit Discussions</h3>
            <div className="space-y-4">
              {results.redditPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#2A3655] p-4 rounded-lg hover:bg-[#2A3655]/80 transition-colors"
                >
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2">{post.title}</h4>
                    {post.selftext && (
                      <p className="text-gray-300 line-clamp-2 mb-2">{post.selftext}</p>
                    )}
                    <div className="flex items-center text-sm text-gray-400">
                      <span>Posted by {post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.created * 1000).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.numComments} comments</span>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* YouTube Videos Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#F5793B]">YouTube Videos</h3>
            <div className="space-y-4">
              {results.youtubeVideos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#2A3655] rounded-lg overflow-hidden hover:bg-[#2A3655]/80 transition-colors"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white px-2 py-1 text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white line-clamp-2 mb-2">{video.title}</h4>
                      <p className="text-sm text-gray-300 line-clamp-2 mb-2">{video.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{video.channelTitle}</span>
                        <div className="flex items-center space-x-2">
                          <span>👁️ {video.viewCount.toLocaleString()}</span>
                          <span>👍 {video.likeCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};