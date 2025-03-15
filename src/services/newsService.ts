import axios from 'axios';
import { NewsResponse } from '../types/newsTypes';

// Fallback data for production
const fallbackNews = {
  status: "ok",
  totalResults: 5,
  articles: [
    {
      title: "The Future of AI in Tech Industry",
      description: "How artificial intelligence is shaping the future of technology",
      url: "https://example.com/ai-future",
      urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      publishedAt: new Date().toISOString(),
      source: { name: "Tech Daily" }
    },
    {
      title: "Latest Developments in Web Development",
      description: "New frameworks and tools revolutionizing web development",
      url: "https://example.com/web-dev",
      urlToImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      publishedAt: new Date().toISOString(),
      source: { name: "Web Weekly" }
    },
    {
      title: "Cybersecurity Trends 2024",
      description: "Essential security practices for modern applications",
      url: "https://example.com/security",
      urlToImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      publishedAt: new Date().toISOString(),
      source: { name: "Security Now" }
    }
  ]
};

export const getNews = async (): Promise<NewsResponse> => {
  // Check if we're running locally
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';

  if (!isLocalhost) {
    return fallbackNews;
  }

  const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/top-headlines',
    params: {
      country: 'us',
      category: 'technology',
      pageSize: 5
    },
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_NEWS_API_KEY}`
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('News API Error:', error);
    return fallbackNews;
  }
};