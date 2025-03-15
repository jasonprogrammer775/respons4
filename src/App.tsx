import './App.css'
import WeatherCard from './components/WeatherCard'
import NewsCard from './components/NewsCard'
import MarsWeatherCard from './components/MarsWeatherCard'
import CryptoCard from './components/CryptoCard'
import SystemCard from './components/SystemCard'
import ActionsCard from './components/ActionsCard'
import TrafficCard from './components/TrafficCard'
import ResourcesCard from './components/ResourcesCard'
import { Grid } from './styles/StyledComponents'

function App() {
  return (
    <Grid>
      <WeatherCard />
      <NewsCard />
      <MarsWeatherCard />
      <CryptoCard />
      <SystemCard />
      <ActionsCard />
      <TrafficCard />
      <ResourcesCard />
    </Grid>
  )
}

export default App