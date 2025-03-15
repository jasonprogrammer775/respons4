
import { Card } from '../styles/StyledComponents'

interface CardProps {
  title: string
  content: string
  gradient?: string
  delay?: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const DashboardCard = ({ title, content, gradient, delay = 0 }: CardProps) => {
  return (
    <Card
      gradient={gradient}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.3, delay }}
    >
      <h2>{title}</h2>
      <p>{content}</p>
    </Card>
  )
}

export default DashboardCard