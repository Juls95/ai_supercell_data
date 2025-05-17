import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Eye, ThumbsUp, Clock } from 'lucide-react';
import { YouTubeVideo } from '../types';

interface YouTubeResultsProps {
  results: YouTubeVideo[];
}

function formatDuration(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '';
  
  const hours = match[1] ? match[1].replace('H', '') : '0';
  const minutes = match[2] ? match[2].replace('M', '') : '0';
  const seconds = match[3] ? match[3].replace('S', '') : '0';
  
  if (hours !== '0') {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.padStart(2, '0')}`;
}

function formatViewCount(count: number) {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export const YouTubeResults: React.FC<YouTubeResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-3">
        <div className="h-6 w-6 mr-2 rounded-full bg-[#FF0000]"></div>
        <h3 className="text-xl font-medium">YouTube Videos</h3>
      </div>
      
      <div className="space-y-4">
        {results.map((video, index) => (
          <motion.article
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[#1E2A59] rounded-lg border border-[#3A4B80] hover:border-[#F5793B] transition-all overflow-hidden"
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={48} fill="white" className="text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-sm">
                  <span>{formatDuration(video.duration)}</span>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="text-lg font-medium group-hover:text-[#F5793B] transition-colors line-clamp-2">
                  {video.title}
                </h4>
                
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between mt-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Eye size={16} className="mr-1" />
                      <span>{formatViewCount(video.viewCount)}</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp size={16} className="mr-1" />
                      <span>{formatViewCount(video.likeCount)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-[#F5793B]">
                    <span>Watch</span>
                    <ExternalLink size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  );
};