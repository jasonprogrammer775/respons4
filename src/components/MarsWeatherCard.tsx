import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import { getMarsWeather } from '../services/marsWeatherService';
import type { MarsWeatherData } from '../types/marsWeather';
import {
  MarsContent,
  MarsHeader,
  MarsGrid,
  MarsItem,
  MarsSeason,
  SunTime
} from '../styles/MarsWeatherStyles';

const MarsWeatherCard = () => {
  const [weather, setWeather] = useState<MarsWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMarsWeather = async () => {
      try {
        const data = await getMarsWeather();
        setWeather(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load Mars weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarsWeather();
  }, []);

  if (loading) return <Card>Loading Mars Data...</Card>;
  if (error) return <Card>{error}</Card>;
  if (!weather || !weather.sol_keys || weather.sol_keys.length === 0) return null;

  const latestSol = weather.sol_keys[weather.sol_keys.length - 1];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const latestData = weather[latestSol] as any;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      gradient="linear-gradient(135deg, #FF4D4D 0%, #FF8C8C 100%)"
    >
      <MarsContent>
        <MarsHeader>
          <h2>Mars Weather</h2>
          <MarsSeason>{latestData.Season}</MarsSeason>
        </MarsHeader>

        <MarsGrid>
          <MarsItem>
            <h3>Sol {latestSol}</h3>
            <p>{new Date(latestData.First_UTC).toLocaleDateString()}</p>
          </MarsItem>
          <MarsItem>
            <h3>Temperature</h3>
            <p>High: {Math.round(latestData.AT.mx)}°C</p>
            <p>Low: {Math.round(latestData.AT.mn)}°C</p>
            <p>Avg: {Math.round(latestData.AT.av)}°C</p>
          </MarsItem>
          <MarsItem>
            <h3>Pressure</h3>
            <p>{Math.round(latestData.PRE.av)} Pa</p>
          </MarsItem>
          <MarsItem>
            <h3>Time Range</h3>
            <SunTime>🌅 {new Date(latestData.First_UTC).toLocaleTimeString()}</SunTime>
            <SunTime>🌇 {new Date(latestData.Last_UTC).toLocaleTimeString()}</SunTime>
          </MarsItem>
        </MarsGrid>
      </MarsContent>
    </Card>
  );
};

export default MarsWeatherCard;