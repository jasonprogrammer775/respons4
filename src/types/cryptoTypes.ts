export interface CryptoNews {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  published_at: string;
  categories: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface CryptoNewsResponse {
  success: boolean;
  data: {
    news: CryptoNews[];
  };
}