import { useState, useEffect } from 'react';
import { Card } from '../styles/StyledComponents';
import { getWeather } from '../services/weatherService';
import type { WeatherData } from '../types/weather';
import {
  WeatherContent,
  WeatherInfo,
  WeatherItem,
  WeatherIcon
} from '../styles/WeatherStyles';

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather('Amsterdam');
        setWeather(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <Card>Loading...</Card>;
  if (error) return <Card>{error}</Card>;
  if (!weather) return null;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <WeatherContent>
        <h2>{weather.name} Weather</h2>
        <WeatherIcon 
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <WeatherInfo>
          <WeatherItem>
            <h3>Temperature</h3>
            <p>{Math.round(weather.main.temp)}°C</p>
          </WeatherItem>
          <WeatherItem>
            <h3>Feels Like</h3>
            <p>{Math.round(weather.main.feels_like)}°C</p>
          </WeatherItem>
          <WeatherItem>
            <h3>Humidity</h3>
            <p>{weather.main.humidity}%</p>
          </WeatherItem>
          <WeatherItem>
            <h3>Condition</h3>
            <p>{weather.weather[0].main}</p>
          </WeatherItem>
        </WeatherInfo>
      </WeatherContent>
    </Card>
  );
};

export default WeatherCard;