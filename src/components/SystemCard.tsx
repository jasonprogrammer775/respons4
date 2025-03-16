import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import styled from '@emotion/styled';
import { getGithubProfile } from '../services/githubService';
import type { GithubProfile } from '../types/githubTypes';

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StatusItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const ProfileLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SystemCard = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getGithubProfile('jasonprogrammer775');
        setProfile(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load GitHub profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Card>Loading GitHub Profile...</Card>;
  if (error) return <Card>{error}</Card>;
  if (!profile) return null;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #4CAF50 0%,rgb(6, 66, 8) 100%)"
    >
      <ProfileHeader>
        <Avatar src={profile.avatar_url} alt={profile.name} />
        <ProfileLink href={profile.html_url} target="_blank" rel="noopener noreferrer">
          <h2>{profile.name || 'GitHub Profile'}</h2>
        </ProfileLink>
      </ProfileHeader>
      <StatusGrid>
        <StatusItem>
          <h3>Repositories</h3>
          <p>{profile.public_repos}</p>
        </StatusItem>
        <StatusItem>
          <h3>Followers</h3>
          <p>{profile.followers}</p>
        </StatusItem>
        <StatusItem>
          <h3>Following</h3>
          <p>{profile.following}</p>
        </StatusItem>
        <StatusItem>
          <h3>Member Since</h3>
          <p>{new Date(profile.created_at).getFullYear()}</p>
        </StatusItem>
      </StatusGrid>
    </Card>
  );
};

export default SystemCard;