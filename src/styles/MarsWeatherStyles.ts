import styled from '@emotion/styled';

export const MarsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const MarsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MarsItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

export const MarsSeason = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
`;

export const SunTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;