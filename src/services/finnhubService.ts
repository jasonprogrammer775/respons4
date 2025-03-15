import axios from 'axios';

const FINNHUB_API_KEY = 'cvaplc1r01qgjh3tomtgcvaplc1r01qgjh3tomu0'; // Replace with your Finnhub API key
const BASE_URL = 'https://finnhub.io/api/v1';

const finnhubClient = axios.create({
  baseURL: BASE_URL,
  params: {
    token: FINNHUB_API_KEY
  }
});

export interface StockQuote {
  c: number;  // Current price
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
  t: number;  // Timestamp
}

export interface CompanyNews {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    const response = await finnhubClient.get(`/quote`, {
      params: { symbol: symbol.toUpperCase() }
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to fetch stock quote');
  }
};

export const getCompanyNews = async (symbol: string): Promise<CompanyNews[]> => {
  try {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const response = await finnhubClient.get(`/company-news`, {
      params: {
        symbol: symbol.toUpperCase(),
        from: lastWeek.toISOString().split('T')[0],
        to: today.toISOString().split('T')[0]
      }
    });
    return response.data.slice(0, 5); // Return only the latest 5 news items
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to fetch company news');
  }
};