import axios from 'axios';
import { CryptoNewsResponse } from '../types/cryptoTypes';

const fallbackNews = {
  success: true,
  data: {
    news: [
      {
        id: '1',
        title: 'Bitcoin Reaches New Milestone in Market Adoption',
        description: 'Major financial institutions are increasingly adopting Bitcoin',
        url: 'https://example.com/crypto-news-1',
        source: 'Crypto Daily',
        published_at: new Date().toISOString(),
        categories: ['Bitcoin', 'Adoption']
      },
      {
        id: '2',
        title: 'Ethereum 2.0 Development Progresses',
        description: 'New updates on ETH 2.0 development timeline',
        url: 'https://example.com/crypto-news-2',
        source: 'ETH News',
        published_at: new Date().toISOString(),
        categories: ['Ethereum', 'Technology']
      },
      {
        id: '3',
        title: 'DeFi Market Shows Strong Growth',
        description: 'Decentralized Finance continues to expand',
        url: 'https://example.com/crypto-news-3',
        source: 'DeFi Pulse',
        published_at: new Date().toISOString(),
        categories: ['DeFi', 'Market']
      }
    ]
  }
};

export const getCryptoNews = async (): Promise<CryptoNewsResponse> => {
  try {
    // Get top coins data
    const coinsResponse = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 5,
          sparkline: false
        }
      }
    );

    // Format the response to match our news structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedNews = coinsResponse.data.map((coin: any) => ({
      id: coin.id,
      title: `${coin.name} (${coin.symbol.toUpperCase()})`,
      description: `Current Price: $${coin.current_price.toLocaleString()} | 24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%`,
      url: `https://www.coingecko.com/en/coins/${coin.id}`,
      source: 'CoinGecko',
      published_at: new Date().toISOString(),
      categories: ['Price Update']
    }));

    return {
      success: true,
      data: {
        news: formattedNews
      }
    };
  } catch (error) {
    console.error('Crypto API Error:', error);
    return fallbackNews;
  }
};