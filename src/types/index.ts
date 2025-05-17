export interface RedditPost {
  id: string;
  title: string;
  url: string;
  author: string;
  numComments: number;
  created: number;
  score: number;
  selftext?: string;
  thumbnail?: string | null;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  duration: string;
}