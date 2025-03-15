import { Card } from '../styles/StyledComponents';
import styled from '@emotion/styled';

const TrafficContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TrafficStat = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TrafficCard = () => {
  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #00BCD4 0%, #2196F3 100%)"
    >
      <h2>Traffic Analytics</h2>
      <TrafficContent>
        <TrafficStat>
          <span>Active Users</span>
          <span>1,234</span>
        </TrafficStat>
        <TrafficStat>
          <span>Page Views</span>
          <span>5,678</span>
        </TrafficStat>
        <TrafficStat>
          <span>Bounce Rate</span>
          <span>32%</span>
        </TrafficStat>
        <TrafficStat>
          <span>Avg. Session</span>
          <span>4m 32s</span>
        </TrafficStat>
      </TrafficContent>
    </Card>
  );
};

export default TrafficCard;