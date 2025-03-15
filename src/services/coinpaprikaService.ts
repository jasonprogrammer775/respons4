import type { CoinMarketData } from '../types/coinpaprikaTypes';

const BASE_URL = 'https://api.coinpaprika.com/v1';

export const getTopCoins = async (limit: number = 10): Promise<CoinMarketData[]> => {
  try {
    const response = await fetch(`${BASE_URL}/tickers?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }
    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      rank: coin.rank,
      price_usd: coin.quotes.USD.price,
      percent_change_24h: coin.quotes.USD.percent_change_24h,
      market_cap_usd: coin.quotes.USD.market_cap,
      volume_24h_usd: coin.quotes.USD.volume_24h
    }));
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw error;
  }
};