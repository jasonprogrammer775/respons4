import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import { getStockQuote, getCompanyNews } from '../services/finnhubService';
import type { StockQuote, CompanyNews } from '../services/finnhubService';
import {
  FinanceContainer,
  StockInfo,
  StockHeader,
  PriceChange,
  StockDetails,
  NewsList,
  NewsItem,
  NewsHeader,
  NewsMetadata
} from '../styles/FinanceStyles';

const FinanceCard = () => {
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [news, setNews] = useState<CompanyNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const symbol = 'AAPL'; // Default to Apple Inc.

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        setLoading(true);
        const [quoteData, newsData] = await Promise.all([
          getStockQuote(symbol),
          getCompanyNews(symbol)
        ]);
        setQuote(quoteData);
        setNews(newsData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to fetch financial data');
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
    const interval = setInterval(fetchFinanceData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (loading) return <Card>Loading Financial Data...</Card>;
  if (error) return <Card>{error}</Card>;
  if (!quote) return null;

  const priceChange = quote.c - quote.pc;
  const priceChangePercent = (priceChange / quote.pc) * 100;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)"
    >
      <FinanceContainer>
        <h2>Stock Market</h2>
        <StockInfo>
          <StockHeader>
            <h3>{symbol}</h3>
            <PriceChange isPositive={priceChange >= 0}>
              {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChangePercent).toFixed(2)}%
            </PriceChange>
          </StockHeader>
          <StockDetails>
            <div>Current: {formatPrice(quote.c)}</div>
            <div>Previous Close: {formatPrice(quote.pc)}</div>
            <div>High: {formatPrice(quote.h)}</div>
            <div>Low: {formatPrice(quote.l)}</div>
          </StockDetails>
        </StockInfo>

        <h3>Latest News</h3>
        <NewsList>
          {news.map(item => (
            <NewsItem
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <NewsHeader>{item.headline}</NewsHeader>
              <NewsMetadata>
                {item.source} • {formatDate(item.datetime)}
              </NewsMetadata>
            </NewsItem>
          ))}
        </NewsList>
      </FinanceContainer>
    </Card>
  );
};

export default FinanceCard;