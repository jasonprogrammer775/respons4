import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import { getAPOD, APODData } from '../services/nasaService';
import styled from '@emotion/styled';

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  position: relative;
  cursor: pointer;
`;

const APODImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Date = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
`;

const HDLink = styled.a`
  color: #4CAF50;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LoadingText = styled.div`
  padding: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;






const NasaAPODCard = () => {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getAPOD();
        setApodData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load NASA picture of the day');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        gradient="linear-gradient(135deg, #2D3047 0%,rgb(100, 105, 146) 50%,rgb(71, 66, 161) 100%)"
      >
        <LoadingText>Loading NASA Picture of the Day...</LoadingText>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        gradient="linear-gradient(135deg, #2D3047 0%, #1B1F3B 50%,rgb(34, 26, 190) 100%)"
      >
        <LoadingText>{error}</LoadingText>
      </Card>
    );
  }

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%), radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 50%)"
    >
      {apodData && (
        <>
          <ImageContainer>
            <APODImage 
              src={apodData.url} 
              alt={apodData.title} 
              onClick={() => setIsExpanded(!isExpanded)} 
              style={{ height: isExpanded ? '400px' : '200px', transition: 'height 0.3s ease' }}
            />
          </ImageContainer>
          <ContentContainer>
            <Title>{apodData.title}</Title>
            <Description style={{ WebkitLineClamp: isExpanded ? 'unset' : 3 }}>{apodData.explanation}</Description>
            <Date>{apodData.date}</Date>
            <MetaInfo>
              <span>Type: {apodData.media_type}</span>
              {apodData.hdurl && (
                <HDLink href={apodData.hdurl} target="_blank" rel="noopener noreferrer">
                  View HD Version
                </HDLink>
              )}
              <span>API Version: {apodData.service_version}</span>
            </MetaInfo>
          </ContentContainer>
        </>
      )}
    </Card>
  );
};

export default NasaAPODCard;