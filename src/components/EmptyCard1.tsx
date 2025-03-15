import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import { getTopStoriesWithDetails } from '../services/hackerNewsService';
import type { HackerNewsStory } from '../types/hackerNewsTypes';
import styled from '@emotion/styled';

const StoryContainer = styled.div`
  padding: 1rem;
`;

const StoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StoryItem = styled.a`
  color: white;
  text-decoration: none;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }
`;

const StoryMeta = styled.div`
  font-size: 0.9rem;
  margin-top: 0.5rem;
  opacity: 0.8;
`;

const EmptyCard1 = () => {
  const [stories, setStories] = useState<HackerNewsStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getTopStoriesWithDetails(5);
        setStories(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load Hacker News stories');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <Card>Loading Hacker News...</Card>;
  if (error) return <Card>{error}</Card>;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)"
    >
      <StoryContainer>
        <h2>Hacker News</h2>
        <StoryList>
          {stories.map(story => (
            <StoryItem
              key={story.id}
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{story.title}</h3>
              <StoryMeta>
                ⭐ {story.score} points • 
                👤 {story.by} • 
                💬 {story.descendants} comments
              </StoryMeta>
            </StoryItem>
          ))}
        </StoryList>
      </StoryContainer>
    </Card>
  );
};

export default EmptyCard1;