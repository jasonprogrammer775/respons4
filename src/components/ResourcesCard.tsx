import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import styled from '@emotion/styled';
import { getRepositories } from '../services/githubService';
import { getDevToArticles } from '../services/devToService';

const ResourceContainer = styled.div`
  padding: 1.5rem;
  color: white;
`;

const ResourceTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const ContentContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1rem;
`;

const ResourceItem = styled.a`
  display: block;
  padding: 1rem;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 0.75rem;

  &:hover {
    transform: translateX(5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ItemTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ItemMeta = styled.div`
  font-size: 0.875rem;
  opacity: 0.8;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff6b6b;
`;

const ResourcesCard = () => {
  const [activeTab, setActiveTab] = useState<'github' | 'devto'>('github');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [repos, setRepos] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (activeTab === 'github') {
          const repoData = await getRepositories('microsoft');
          setRepos(repoData);
        } else {
          const articleData = await getDevToArticles('ben');
          setArticles(articleData.slice(0, 5));
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load resources');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [activeTab]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #2D3748 0%,rgb(21, 83, 192) 100%)"
    >
      <ResourceContainer>
        <ResourceTitle>Developer Resources</ResourceTitle>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'github'}
            onClick={() => setActiveTab('github')}
          >
            GitHub Trending
          </Tab>
          <Tab 
            active={activeTab === 'devto'}
            onClick={() => setActiveTab('devto')}
          >
            DEV.to Latest
          </Tab>
        </TabContainer>

        <ContentContainer>
          {loading && <LoadingText>Loading resources...</LoadingText>}
          {error && <ErrorText>{error}</ErrorText>}
          
          {!loading && !error && activeTab === 'github' && (
            <div>
              {repos.map(repo => (
                <ResourceItem 
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ItemTitle>{repo.name}</ItemTitle>
                  <ItemMeta>
                    ⭐ {repo.stargazers_count.toLocaleString()} • 
                    Updated {formatDate(repo.updated_at)}
                  </ItemMeta>
                </ResourceItem>
              ))}
            </div>
          )}

          {!loading && !error && activeTab === 'devto' && (
            <div>
              {articles.map(article => (
                <ResourceItem 
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ItemTitle>{article.title}</ItemTitle>
                  <ItemMeta>
                    💖 {article.positive_reactions_count} • 
                    {article.reading_time_minutes} min read • 
                    {formatDate(article.published_at)}
                  </ItemMeta>
                </ResourceItem>
              ))}
            </div>
          )}
        </ContentContainer>
      </ResourceContainer>
    </Card>
  );
};

export default ResourcesCard;