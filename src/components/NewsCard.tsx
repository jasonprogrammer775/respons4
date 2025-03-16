import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import { getNews } from '../services/newsService';
import type { NewsArticle } from '../types/newsTypes';
import {
  NewsContent,
  NewsHeader,
  NewsList,
  NewsItem,
  NewsImage,
  NewsText,
  NewsTitle,
  NewsSource
} from '../styles/NewsStyles';

const NewsCard = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNews(data.articles);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load news data');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <Card>Loading News...</Card>;
  if (error) return <Card>{error}</Card>;
  if (!news.length) return null;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #6366f1 0%, #4f46e5 100%), linear-gradient(45deg, rgba(99, 102, 241, 0.3) 0%, rgba(79, 70, 229, 0.3) 100%), radial-gradient(circle at top right, rgba(255, 255, 255, 0.2) 0%, transparent 50%)"
    >
      <NewsContent>
        <NewsHeader>
          <h2>Tech News</h2>
        </NewsHeader>
        <NewsList>
          {news.map((article, index) => (
            <NewsItem 
              key={index} 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <NewsImage 
                src={article.urlToImage || 'https://via.placeholder.com/80'} 
                alt={article.title}
              />
              <NewsText>
                <NewsTitle>{article.title}</NewsTitle>
                <NewsSource>{article.source.name}</NewsSource>
              </NewsText>
            </NewsItem>
          ))}
        </NewsList>
      </NewsContent>
    </Card>
  );
};

export default NewsCard;