import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const XAI_API_KEY = process.env.XAI_API_KEY;

/**
 * Analyze Reddit posts using Grok AI
 * @param {Array} posts - Array of Reddit posts
 * @returns {Promise<string>} - AI-generated summary
 */
export async function analyzeRedditPosts(posts) {
  try {
    if (!XAI_API_KEY) {
      console.log('X.AI API key is missing, using local analysis');
      return generateGrokStyleAnalysis(posts);
    }

    // Prepare the content for analysis
    const content = posts.map(post => `
Title: ${post.title}
Content: ${post.selftext}
URL: ${post.url}
`).join('\n---\n');

    // Call Grok API
    const response = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: 'grok-3-beta',
        messages: [
          {
            role: 'system',
            content: 'You are Grok, a highly intelligent Clash of Clans strategy expert. Analyze these Reddit posts and provide a concise, witty, and practical summary of the key strategies and tips discussed. Use your characteristic direct and sometimes sarcastic tone while maintaining helpfulness.'
          },
          {
            role: 'user',
            content: `Please analyze these Clash of Clans strategy posts and provide a summary:\n\n${content}`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${XAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Grok API error:', error);
    if (error.response?.data?.error) {
      console.error('Grok API error details:', error.response.data.error);
    }
    console.log('Falling back to local analysis');
    return generateGrokStyleAnalysis(posts);
  }
}

function generateGrokStyleAnalysis(posts) {
  // Extract key information from posts
  const titles = posts.map(post => post.title);
  const contents = posts.map(post => post.selftext);
  
  // Identify common themes and strategies
  const themes = extractThemes(titles, contents);
  const sentiment = analyzeSentiment(contents);
  const difficulty = assessDifficulty(contents);
  
  // Generate a Grok-style analysis
  let analysis = generateIntroduction(sentiment);
  
  // Add main strategy points
  analysis += "\n🔥 Key Takeaways:\n";
  themes.forEach((theme, index) => {
    analysis += `${index + 1}. ${theme}\n`;
  });
  
  // Add difficulty assessment
  analysis += `\n🎯 Difficulty Level: ${difficulty}\n`;
  
  // Add a witty conclusion
  analysis += "\n💡 Pro Tip: " + generateWittyTip(sentiment, difficulty);
  
  return analysis;
}

function generateIntroduction(sentiment) {
  const introductions = [
    "Alright, let me break this down for you in a way that won't put you to sleep:",
    "Listen up, because I'm about to drop some knowledge that might actually be useful:",
    "Let's cut through the noise and get to what actually works:",
    "Time to separate the good advice from the 'I-watched-one-YouTube-video' advice:",
    "Here's what the pros won't tell you (but I will):"
  ];
  return introductions[Math.floor(Math.random() * introductions.length)];
}

function extractThemes(titles, contents) {
  const themes = new Set();
  
  // Enhanced strategy keywords
  const keywords = {
    'attack': ['attack', 'raid', 'push', 'offense', 'strategy', 'combo', 'funnel'],
    'defense': ['defense', 'base', 'layout', 'protect', 'wall', 'trap', 'inferno'],
    'resources': ['farm', 'loot', 'gold', 'elixir', 'dark', 'gem', 'pass'],
    'troops': ['troops', 'army', 'composition', 'spells', 'siege', 'pet'],
    'heroes': ['hero', 'king', 'queen', 'warden', 'champion', 'ability'],
    'clan': ['clan', 'war', 'league', 'capital', 'clan games'],
    'upgrade': ['upgrade', 'level', 'max', 'priority', 'order']
  };
  
  // Analyze titles and contents for themes
  [...titles, ...contents].forEach(text => {
    Object.entries(keywords).forEach(([theme, words]) => {
      if (words.some(word => text.toLowerCase().includes(word))) {
        themes.add(theme);
      }
    });
  });
  
  // Convert themes to readable format with more detailed advice
  return Array.from(themes).map(theme => {
    switch(theme) {
      case 'attack':
        return "Attack Strategy: Master the art of funneling and timing your spells";
      case 'defense':
        return "Base Defense: Protect your resources and Town Hall with a well-designed layout";
      case 'resources':
        return "Resource Management: Balance farming and upgrades for optimal progress";
      case 'troops':
        return "Army Composition: Match troops to your strategy and upgrade priorities";
      case 'heroes':
        return "Hero Usage: Level up and time your hero abilities for maximum impact";
      case 'clan':
        return "Clan Strategy: Participate in wars and events for better rewards";
      case 'upgrade':
        return "Upgrade Priority: Focus on key defenses and troops first";
      default:
        return theme;
    }
  });
}

function analyzeSentiment(contents) {
  const positiveWords = ['best', 'great', 'effective', 'success', 'win', 'easy'];
  const negativeWords = ['hard', 'difficult', 'fail', 'struggle', 'nerf', 'weak'];
  
  let sentiment = 0;
  contents.forEach(content => {
    positiveWords.forEach(word => {
      if (content.toLowerCase().includes(word)) sentiment++;
    });
    negativeWords.forEach(word => {
      if (content.toLowerCase().includes(word)) sentiment--;
    });
  });
  
  return sentiment > 0 ? 'positive' : sentiment < 0 ? 'negative' : 'neutral';
}

function assessDifficulty(contents) {
  const difficultyWords = {
    'easy': ['easy', 'simple', 'basic', 'beginner'],
    'medium': ['moderate', 'average', 'standard'],
    'hard': ['hard', 'difficult', 'challenging', 'advanced']
  };
  
  let difficulty = 'medium';
  let maxCount = 0;
  
  Object.entries(difficultyWords).forEach(([level, words]) => {
    let count = 0;
    contents.forEach(content => {
      words.forEach(word => {
        if (content.toLowerCase().includes(word)) count++;
      });
    });
    if (count > maxCount) {
      maxCount = count;
      difficulty = level;
    }
  });
  
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

function generateWittyTip(sentiment, difficulty) {
  const tips = {
    positive: [
      "If it's working, don't fix it. Unless it's your base layout, then definitely fix it.",
      "Success in Clash is like a good meme - it's all about timing and execution.",
      "The best strategy is the one you can actually pull off without panicking.",
    ],
    negative: [
      "If at first you don't succeed, blame the matchmaking algorithm.",
      "Remember, even the pros started by accidentally deploying all their troops at once.",
      "Your base might be getting three-starred, but at least you're not using the default layout.",
    ],
    neutral: [
      "The only thing more predictable than a three-star attack is a one-star defense.",
      "Your heroes are like your ex - they're never ready when you need them.",
      "If you're still using the same strategy from 2015, it's time to evolve, my friend.",
    ]
  };
  
  const difficultyTips = {
    easy: "Even a training dummy could pull this off.",
    medium: "Not too easy, not too hard - just the way we like it.",
    hard: "This is where the real players separate themselves from the casuals."
  };
  
  const selectedTips = tips[sentiment];
  return selectedTips[Math.floor(Math.random() * selectedTips.length)] + 
         " " + difficultyTips[difficulty.toLowerCase()];
} 