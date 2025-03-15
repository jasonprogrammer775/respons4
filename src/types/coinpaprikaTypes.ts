export interface CoinMarketData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  price_usd: number;
  percent_change_24h: number;
  market_cap_usd: number;
  volume_24h_usd: number;
}

export interface CoinpaprikaError {
  error: string;
}