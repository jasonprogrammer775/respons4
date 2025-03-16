/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { getRepositories } from '../services/githubService';
import { getLanguageColor } from '../utils/languageColors';

const RepoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RepoItem = styled(motion.a)`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const RepoName = styled.span`
  font-weight: 500;
`;

const RepoDescription = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
  margin: 0;
`;

const RepoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.875rem;
`;

const LanguageIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LanguageDot = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const RepoStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  opacity: 0.8;
`;

const ActionsCard = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await getRepositories('jasonprogrammer775');
        setRepos(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) return <Card>Loading Repositories...</Card>;
  if (error) return <Card>{error}</Card>;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #1a5f7a 0%, #159957 100%)"
    >
      <h2>Recent Repositories</h2>
      <RepoList>
   
     
        {repos.map((repo: any) => (
          <RepoItem
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
          >
            <RepoHeader>
              <RepoName>{repo.name}</RepoName>
              <RepoStats>
                <span>⭐ {repo.stargazers_count}</span>
                <span>🔄 {repo.forks_count}</span>
              </RepoStats>
            </RepoHeader>
            {repo.description && (
              <RepoDescription>{repo.description}</RepoDescription>
            )}
            <RepoFooter>
              <LanguageIndicator>
                {repo.language && (
                  <>
                    <LanguageDot color={getLanguageColor(repo.language)} />
                    <span>{repo.language}</span>
                  </>
                )}
              </LanguageIndicator>
              <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
            </RepoFooter>
          </RepoItem>
        ))}
      </RepoList>
    </Card>
  );
};

export default ActionsCard;