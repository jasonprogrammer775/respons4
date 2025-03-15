import { Card } from '../styles/StyledComponents';

const EmptyCard4 = () => {
  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #4A5568 0%, #2D3748 100%)"
    >
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Empty Card 4</h2>
        <p style={{ opacity: 0.8 }}>This is an empty card for future content.</p>
      </div>
    </Card>
  );
};

export default EmptyCard4;