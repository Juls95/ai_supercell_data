import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

async function getAccessToken() {
  try {
    const authString = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');
    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Reddit access token:', error);
    throw new Error('Failed to authenticate with Reddit');
  }
}

/**
 * Search for Clash of Clans related posts on Reddit
 * @param {string} query - The search query
 * @returns {Promise<Array>} - Array of Reddit posts
 */
export async function searchReddit(query) {
  try {
    if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET) {
      console.error('Reddit API credentials are missing');
      return [];
    }

    const accessToken = await getAccessToken();
    
    // Format the search query for Reddit
    const formattedQuery = `${query} subreddit:ClashOfClans`;
    
    // Reddit search API with authentication
    const response = await axios.get('https://oauth.reddit.com/r/ClashOfClans/search', {
      params: {
        q: formattedQuery,
        sort: 'relevance',
        limit: 10,
        restrict_sr: true,
        include_over_18: false
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'ClashStrategyFinder/1.0.0'
      }
    });

    // Extract and format the post data
    const posts = response.data.data.children
      .map(child => {
        const post = child.data;
        return {
          id: post.id,
          title: post.title,
          url: `https://www.reddit.com${post.permalink}`,
          author: post.author,
          numComments: post.num_comments,
          created: post.created_utc,
          score: post.score,
          selftext: post.selftext?.substring(0, 200) || '',
          thumbnail: post.thumbnail !== 'self' && post.thumbnail !== '' ? post.thumbnail : null
        };
      })
      // Filter out any posts that might not be directly related
      .filter(post => {
        const postTitle = post.title.toLowerCase();
        const searchTerms = query.toLowerCase().split(' ');
        return searchTerms.some(term => postTitle.includes(term));
      })
      // Take the top 3 most relevant posts
      .slice(0, 3);

    return posts;
  } catch (error) {
    console.error('Reddit API error:', error);
    if (error.response) {
      console.error('Reddit API error details:', error.response.data);
    }
    return [];
  }
}