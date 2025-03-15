import styled from '@emotion/styled';

export const NewsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

export const NewsItem = styled.a`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 60px 1fr;
  }
`;

export const NewsImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const NewsText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NewsTitle = styled.h3`
  font-size: 0.9rem;
  margin: 0;
`;

export const NewsSource = styled.span`
  font-size: 0.8rem;
  opacity: 0.7;
`;