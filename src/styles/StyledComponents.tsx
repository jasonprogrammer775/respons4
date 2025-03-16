import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
`

export const Card = styled(motion.div)<{ gradient?: string }>`
  background: ${props => props.gradient || 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%), linear-gradient(45deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)'};  
  background-blend-mode: normal;
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  min-height: 200px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 150px;
  }
`