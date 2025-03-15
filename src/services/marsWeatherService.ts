import axios from 'axios';
import { MarsWeatherData } from '../types/marsWeather';

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const BASE_URL = 'https://api.nasa.gov/insight_weather';

export const getMarsWeather = async (): Promise<MarsWeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/?api_key=${API_KEY}&feedtype=json&ver=1.0`
    );
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to fetch Mars weather data');
  }
};