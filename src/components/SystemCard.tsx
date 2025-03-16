/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import styled from '@emotion/styled';
import { getGithubProfile } from '../services/githubService';
import type { GithubProfile } from '../types/githubTypes';

const ClockContainer = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: rgba(0, 255, 0, 0.1);
  border-radius: 8px;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, #0f0, transparent);
    animation: scan 2s linear infinite;
  }
  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
`;

const TimeZoneSelect = styled.select`
  background: rgba(0, 255, 0, 0.1);
  color: white;
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  width: 100%;
  cursor: pointer;
  option {
    background: #1a1a1a;
  }
`;

const LocationInfo = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const WorldClockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const WorldClockItem = styled.div`
  background: rgba(0, 255, 0, 0.05);
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatusItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover::after {
    opacity: 1;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  animation: pulse 2s ease-in-out infinite;
  @keyframes pulse {
    0% { box-shadow: 0 0 15px rgba(0, 255, 0, 0.5); }
    50% { box-shadow: 0 0 25px rgba(0, 255, 0, 0.8); }
    100% { box-shadow: 0 0 15px rgba(0, 255, 0, 0.5); }
  }
`;

const ProfileLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BioText = styled.p`
  margin: 0.75rem 0;
  font-style: italic;
  opacity: 0.9;
  line-height: 1.4;
  font-size: 0.95rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  
  > * {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }
  }
`;

const WORLD_CITIES = [
  { city: 'New York', timezone: 'America/New_York' },
  { city: 'London', timezone: 'Europe/London' },
  { city: 'Tokyo', timezone: 'Asia/Tokyo' },
  { city: 'Sydney', timezone: 'Australia/Sydney' }
];

const SystemCard = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [time, setTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setSelectedTimezone(userTimezone);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_API_KEY`
            );
            const data = await response.json();
            if (data.results?.[0]?.formatted) {
              setLocation(data.results[0].formatted);
            }
          } catch (error) {
            console.error('Error fetching location:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      <ClockContainer>
        {time.toLocaleTimeString('en-US', { hour12: false, timeZone: selectedTimezone })}
      </ClockContainer>

      <TimeZoneSelect
        value={selectedTimezone}
        onChange={(e) => setSelectedTimezone(e.target.value)}
      >
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-explicit-any, @typescript-eslint/no-explicit-any, @typescript-eslint/no-explicit-any
        {(Intl as any).supportedValuesOf('timeZone').map((zone: string) => (
          <option key={zone} value={zone}>
            {zone.replace('_', ' ')}
          </option>
        ))}
      </TimeZoneSelect>

      {location && (
        <LocationInfo>
          📍 {location}
        </LocationInfo>
      )}

      <WorldClockGrid>
        {WORLD_CITIES.map(({ city, timezone }) => (
          <WorldClockItem key={city}>
            <span>{city}</span>
            <span>
              {time.toLocaleTimeString('en-US', {
                hour12: false,
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </WorldClockItem>
        ))}
      </WorldClockGrid>
      <ProfileHeader>
        <Avatar src={profile.avatar_url} alt={profile.name} />
        <div>
          <ProfileLink href={profile.html_url} target="_blank" rel="noopener noreferrer">
            <h2>{profile.name || 'GitHub Profile'}</h2>
          </ProfileLink>
          {profile.bio && <BioText>{profile.bio}</BioText>}
        </div>
      </ProfileHeader>

      <ProfileInfo>
        {profile.location && (
          <span>📍 {profile.location}</span>
        )}
        {profile.blog && (
          <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} 
             target="_blank" 
             rel="noopener noreferrer">
            🌐 Website
          </a>
        )}
        {profile.twitter_username && (
          <a href={`https://twitter.com/${profile.twitter_username}`}
             target="_blank"
             rel="noopener noreferrer">
            🐦 Twitter
          </a>
        )}
      </ProfileInfo>

      <StatusGrid>
        <StatusItem>
          <h3>Repositories</h3>
          <p>{profile.public_repos}</p>
        </StatusItem>
        <StatusItem>
          <h3>Gists</h3>
          <p>{profile.public_gists}</p>
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