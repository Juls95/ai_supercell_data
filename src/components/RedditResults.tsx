import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle, ArrowUpCircle } from 'lucide-react';
import { RedditPost } from '../types';

interface RedditResultsProps {
  results: RedditPost[];
}

export const RedditResults: React.FC<RedditResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-3">
        <div className="h-6 w-6 mr-2 rounded-full bg-[#FF4500]"></div>
        <h3 className="text-xl font-medium">Reddit Posts</h3>
      </div>
      
      <div className="space-y-4">
        {results.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[#1E2A59] p-5 rounded-lg border border-[#3A4B80] hover:border-[#F5793B] transition-all"
          >
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <h4 className="text-lg font-medium group-hover:text-[#F5793B] transition-colors line-clamp-2">
                {post.title}
              </h4>
              
              {post.selftext && (
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {post.selftext}
                </p>
              )}
              
              {post.thumbnail && (
                <img 
                  src={post.thumbnail}
                  alt={post.title}
                  className="mt-3 rounded-md w-full h-32 object-cover"
                />
              )}
              
              <div className="flex items-center justify-between mt-3 text-sm text-gray-300">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <MessageCircle size={16} className="mr-1" />
                    <span>{post.numComments} comments</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowUpCircle size={16} className="mr-1" />
                    <span>{post.score}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-[#F5793B]">
                  <span>Read More</span>
                  <ExternalLink size={16} className="ml-1" />
                </div>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  );
};