import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import styled from '@emotion/styled';
import { getDevToProfile, getDevToArticles } from '../services/devToService';
import type { DevToProfile, DevToArticle } from '../types/devToTypes';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Article = styled.a`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TrafficCard = () => {
  const [profile, setProfile] = useState<DevToProfile | null>(null);
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDevToData = async () => {
      try {
        const [profileData, articlesData] = await Promise.all([
          getDevToProfile('jasonprogrammer775'),
          getDevToArticles('jasonprogrammer775')
        ]);
        setProfile(profileData);
        setArticles(articlesData.slice(0, 3));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load DEV.to data');
      } finally {
        setLoading(false);
      }
    };

    fetchDevToData();
  }, []);

  if (loading) return <Card>Loading DEV.to Data...</Card>;
  if (error) return <Card>{error}</Card>;
  if (!profile) return null;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #00BCD4 0%,rgb(12, 59, 97) 100%)"
    >
      <ContentWrapper>
        <ProfileSection>
          <Avatar src={profile.profile_image} alt={profile.name} />
          <div>
            <h2>{profile.name}</h2>
            <p>@{profile.username}</p>
          </div>
        </ProfileSection>

        <Stats>
          <StatItem>
            <h3>Articles</h3>
            <p>{articles.length}</p>
          </StatItem>
          <StatItem>
            <h3>Total Reactions</h3>
            <p>{articles.reduce((sum, article) => sum + article.positive_reactions_count, 0)}</p>
          </StatItem>
        </Stats>

        <h3>Recent Posts</h3>
        <ArticleList>
          {articles.map(article => (
            <Article 
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>{article.title}</h4>
              <small>
                ❤️ {article.positive_reactions_count} • 
                💬 {article.comments_count} • 
                ⏱️ {article.reading_time_minutes} min read
              </small>
            </Article>
          ))}
        </ArticleList>
      </ContentWrapper>
    </Card>
  );
};

export default TrafficCard;