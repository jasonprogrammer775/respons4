import { Card } from '../styles/StyledComponents';
import styled from '@emotion/styled';

const ResourceMeter = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div<{ value: number }>`
  background: rgba(255, 255, 255, 0.2);
  height: 8px;
  border-radius: 4px;
  position: relative;
  margin-top: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.value}%;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
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
      gradient="linear-gradient(135deg, #FF5722 0%, #FF9800 100%)"
    >
      <h2>Server Resources</h2>
      <ResourceMeter>
        <div>CPU Usage</div>
        <ProgressBar value={65} />
        <div style={{ textAlign: 'right' }}>65%</div>
      </ResourceMeter>
      <ResourceMeter>
        <div>Memory Usage</div>
        <ProgressBar value={45} />
        <div style={{ textAlign: 'right' }}>45%</div>
      </ResourceMeter>
      <ResourceMeter>
        <div>Disk Space</div>
        <ProgressBar value={80} />
        <div style={{ textAlign: 'right' }}>80%</div>
      </ResourceMeter>
    </Card>
  );
};

export default ResourcesCard;