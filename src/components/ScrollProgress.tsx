import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 9998;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => isNaN(props.width) ? 0 : props.width}%;
  background: linear-gradient(90deg, #6366f1, #4f46e5);
  transition: width 0.2s ease-out;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
`;

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100) : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <ProgressBar>
      <Progress width={progress} />
    </ProgressBar>
  );
};

export default ScrollProgress;