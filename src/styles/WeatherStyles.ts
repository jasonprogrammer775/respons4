import styled from '@emotion/styled';

export const WeatherContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const WeatherInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const WeatherItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;
`;

export const WeatherIcon = styled.img`
  width: 50px;
  height: 50px;
`;