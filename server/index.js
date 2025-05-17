import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchReddit } from './services/redditService.js';
import { searchYouTube } from './services/youtubeService.js';

// Load environment variables
dotenv.config();

const app = express();

// Validate required environment variables
const requiredEnvVars = ['REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET', 'YOUTUBE_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Run API requests in parallel
    const [redditPosts, youtubeVideos] = await Promise.all([
      searchReddit(query),
      searchYouTube(query)
    ]);

    res.json({
      redditPosts,
      youtubeVideos
    });
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ 
      error: 'An error occurred while fetching results',
      details: error.message 
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;