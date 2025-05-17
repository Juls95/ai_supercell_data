import axios from 'axios';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

/**
 * Search for Clash of Clans related videos on YouTube
 * @param {string} query - The search query
 * @returns {Promise<Array>} - Array of YouTube videos
 */
export async function searchYouTube(query) {
  try {
    // Check cache first
    const cacheKey = `youtube_${query}`;
    const cachedResults = cache.get(cacheKey);
    if (cachedResults) {
      return cachedResults;
    }

    if (!YOUTUBE_API_KEY) {
      console.error('YouTube API key is missing');
      return [];
    }

    // Format the search query for YouTube
    const formattedQuery = `Clash of Clans ${query} strategy guide`;
    
    // Search for videos
    const searchResponse = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        part: 'snippet',
        q: formattedQuery,
        maxResults: 3,
        type: 'video',
        relevanceLanguage: 'en',
        videoDuration: 'medium', // Filter for medium length videos
        key: YOUTUBE_API_KEY,
        order: 'relevance'
      }
    });

    const videoIds = searchResponse.data.items.map(item => item.id.videoId);

    // Get additional video details
    const detailsResponse = await getVideoDetails(videoIds);

    // Combine search results with video details
    const videos = searchResponse.data.items.map((item, index) => {
      const details = detailsResponse[index];
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        viewCount: parseInt(details.statistics.viewCount),
        likeCount: parseInt(details.statistics.likeCount),
        duration: details.contentDetails.duration
      };
    });

    // Cache the results
    cache.set(cacheKey, videos);
    return videos;
  } catch (error) {
    console.error('YouTube API error:', error);
    if (error.response?.data?.error) {
      console.error('YouTube API error details:', error.response.data.error);
    }
    return [];
  }
}

async function getVideoDetails(videoIds) {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'statistics,contentDetails',
        id: videoIds.join(','),
        key: YOUTUBE_API_KEY
      }
    });
    return response.data.items;
  } catch (error) {
    console.error('YouTube video details error:', error);
    return [];
  }
}