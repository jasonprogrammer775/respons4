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
  background: ${props => props.gradient || 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'};
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-height: 200px;

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 150px;
  }
`