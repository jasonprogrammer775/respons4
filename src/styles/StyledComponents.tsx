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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.07);
  cursor: pointer;
  min-height: 200px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
    transform: translateX(-100%);
    transition: transform 0.7s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
  
  h2 {
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
  }
  
  &:hover h2 {
    transform: translateY(-2px);
  }
  
  p {
    position: relative;
    z-index: 2;
    transition: opacity 0.3s ease;
  }
  
  &:hover p {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 150px;
  }
`