/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import styled from '@emotion/styled';
import { getCryptoNews } from '../services/cryptoService';
import type { CryptoNews } from '../types/cryptoTypes';

const CryptoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsItem = styled.a`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const NewsTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const NewsSource = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
`;

const CryptoCard = () => {
  const [news, setNews] = useState<CryptoNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getCryptoNews();
        setNews(response.data.news);
      } catch (err) {
        setError('Failed to load crypto news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <Card>Loading Crypto News...</Card>;
  if (error) return <Card>{error}</Card>;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #FF9900 0%, #FF5733 100%)"
    >
      <h2>Crypto News</h2>
      <CryptoContent>
        {news.map((item, index) => (
          <NewsItem 
            key={item.id || index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <NewsTitle>{item.title}</NewsTitle>
            <NewsSource>
              {item.source} • {new Date(item.published_at).toLocaleDateString()}
            </NewsSource>
          </NewsItem>
        ))}
      </CryptoContent>
    </Card>
  );
};

export default CryptoCard;