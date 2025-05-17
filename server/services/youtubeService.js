import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Search for Clash of Clans related videos on YouTube
 * @param {string} query - The search query
 * @returns {Promise<Array>} - Array of YouTube videos
 */
export async function searchYouTube(query) {
  try {
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
        key: YOUTUBE_API_KEY
      }
    });

    const videoIds = searchResponse.data.items.map(item => item.id.videoId);

    // Get additional video details
    const detailsResponse = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'statistics,contentDetails',
        id: videoIds.join(','),
        key: YOUTUBE_API_KEY
      }
    });

    // Combine search results with video details
    const videos = searchResponse.data.items.map((item, index) => {
      const details = detailsResponse.data.items[index];
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

    return videos;
  } catch (error) {
    console.error('YouTube API error:', error);
    if (error.response?.data?.error) {
      console.error('YouTube API error details:', error.response.data.error);
    }
    return [];
  }
}