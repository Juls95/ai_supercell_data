import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { RedditPost, YouTubeVideo } from '../types';

interface AppContextType {
  redditResults: RedditPost[];
  youtubeResults: YouTubeVideo[];
  aiAnalysis: string | null;
  isLoading: boolean;
  hasSearched: boolean;
  error: string | null;
  searchStrategies: (query: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [redditResults, setRedditResults] = useState<RedditPost[]>([]);
  const [youtubeResults, setYoutubeResults] = useState<YouTubeVideo[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchStrategies = async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use relative URL for API calls
      const response = await axios.get('/api/search', {
        params: { query },
        timeout: 10000 // 10 second timeout
      });
      
      if (!response.data) {
        throw new Error('No data received from the server');
      }

      setRedditResults(response.data.redditPosts || []);
      setYoutubeResults(response.data.youtubeVideos || []);
      setAiAnalysis(response.data.aiAnalysis || null);
      setHasSearched(true);
    } catch (err) {
      console.error('Search error:', err);
      let errorMessage = 'An unexpected error occurred. Please try again later.';
      
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          errorMessage = 'Request timed out. Please check your internet connection and try again.';
        } else if (err.response?.status === 429) {
          errorMessage = 'Too many requests. Please wait a moment before trying again.';
        } else if (err.response?.status === 404) {
          errorMessage = 'Search service is currently unavailable. Please try again later.';
        } else if (!navigator.onLine) {
          errorMessage = 'No internet connection. Please check your network and try again.';
        }
      }
      
      setError(errorMessage);
      setRedditResults([]);
      setYoutubeResults([]);
      setAiAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    redditResults,
    youtubeResults,
    aiAnalysis,
    isLoading,
    hasSearched,
    error,
    searchStrategies,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};