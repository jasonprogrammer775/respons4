/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { getRepositories } from '../services/githubService';

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
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const RepoName = styled.span`
  font-weight: 500;
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
      gradient="linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)"
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
            <RepoName>{repo.name}</RepoName>
            <RepoStats>
              <span>⭐ {repo.stargazers_count}</span>
              <span>🔄 {repo.forks_count}</span>
            </RepoStats>
          </RepoItem>
        ))}
      </RepoList>
    </Card>
  );
};

export default ActionsCard;