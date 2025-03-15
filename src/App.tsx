import './App.css'
import WeatherCard from './components/WeatherCard'
import NewsCard from './components/NewsCard'
import MarsWeatherCard from './components/MarsWeatherCard'
import CryptoCard from './components/CryptoCard'
import SystemCard from './components/SystemCard'
import ActionsCard from './components/ActionsCard'
import TrafficCard from './components/TrafficCard'
import ResourcesCard from './components/ResourcesCard'
import EmptyCard1 from './components/EmptyCard1'
import EmptyCard2 from './components/EmptyCard2'
import EmptyCard3 from './components/EmptyCard3'
import EmptyCard4 from './components/EmptyCard4'


import { Grid } from './styles/StyledComponents'
import styled from '@emotion/styled'

const IframeContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 1rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`

function App() {
  return (
    <>
      <IframeContainer>
        <iframe src="https://jport1.netlify.app/" title="Avatar Jay" />
      </IframeContainer>
      <Grid>
        <WeatherCard />
        <NewsCard />
        <MarsWeatherCard />
        <CryptoCard />
        <SystemCard />
        <ActionsCard />
        <TrafficCard />
        <ResourcesCard />
      
          <EmptyCard1 />
          <EmptyCard2 />
          <EmptyCard3 />
          <EmptyCard4 />
      </Grid>
      <IframeContainer>
        <iframe src="https://avatarjay.netlify.app/" title="Avatar Jay" />
      </IframeContainer>


    </>
  )
}

export default App