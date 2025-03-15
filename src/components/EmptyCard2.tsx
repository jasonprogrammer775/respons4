import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import { getTopCoins } from '../services/coinpaprikaService';
import type { CoinMarketData } from '../types/coinpaprikaTypes';
import styled from '@emotion/styled';

const CryptoContainer = styled.div`
  padding: 1rem;
`;

const CoinList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const CoinItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const CoinHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CoinStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const PriceChange = styled.span<{ isPositive: boolean }>`
  color: ${props => props.isPositive ? '#4CAF50' : '#FF5252'};
`;

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

const formatMarketCap = (num: number): string => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return formatNumber(num);
};

const EmptyCard2 = () => {
  const [coins, setCoins] = useState<CoinMarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getTopCoins(5);
        setCoins(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load cryptocurrency data');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) return <Card>Loading Cryptocurrency Data...</Card>;
  if (error) return <Card>{error}</Card>;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #1F2937 0%, #111827 100%)"
    >
      <CryptoContainer>
        <h2>Crypto Market</h2>
        <CoinList>
          {coins.map(coin => (
            <CoinItem key={coin.id}>
              <CoinHeader>
                <h3>{coin.name} ({coin.symbol})</h3>
                <PriceChange isPositive={coin.percent_change_24h >= 0}>
                  {coin.percent_change_24h >= 0 ? '↑' : '↓'} {Math.abs(coin.percent_change_24h).toFixed(2)}%
                </PriceChange>
              </CoinHeader>
              <CoinStats>
                <div>Price: {formatNumber(coin.price_usd)}</div>
                <div>Rank: #{coin.rank}</div>
                <div>Market Cap: {formatMarketCap(coin.market_cap_usd)}</div>
                <div>24h Vol: {formatMarketCap(coin.volume_24h_usd)}</div>
              </CoinStats>
            </CoinItem>
          ))}
        </CoinList>
      </CryptoContainer>
    </Card>
  );
};

export default EmptyCard2;