import axios from 'axios';

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

export interface APODData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export const getAPOD = async (): Promise<APODData> => {
  try {
    const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to fetch NASA APOD data');
  }
};