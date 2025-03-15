import styled from '@emotion/styled';

export const FinanceContainer = styled.div`
  padding: 1rem;
`;

export const StockInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const StockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const PriceChange = styled.span<{ isPositive: boolean }>`
  color: ${props => props.isPositive ? '#4CAF50' : '#FF5252'};
  font-weight: bold;
`;

export const StockDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

export const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NewsItem = styled.a`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const NewsHeader = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

export const NewsMetadata = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
`;