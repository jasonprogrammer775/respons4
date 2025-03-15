import { Card } from '../styles/StyledComponents';
import styled from '@emotion/styled';

const ResourceContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;

const ResourceTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ResourceDescription = styled.p`
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

const ResourceLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    opacity: 0.8;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
      transform: translateY(-2px);
    }
  }
`;

const ResourcesCard = () => {
  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #2D3748 0%, #4A5568 100%)"
    >
      <ResourceContainer>
        <ResourceTitle>Developer Resources</ResourceTitle>
        <ResourceDescription>
          Connect with the developer community and explore resources to enhance your coding journey.
        </ResourceDescription>
        <ResourceLinks>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://dev.to" target="_blank" rel="noopener noreferrer">
            DEV Community
          </a>
          <a href="https://daily.dev/" target="_blank" rel="noopener noreferrer">
            Daily Dev
          </a>
        </ResourceLinks>
      </ResourceContainer>
    </Card>
  );
};

export default ResourcesCard;