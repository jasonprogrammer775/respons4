/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const BASE_URL = 'https://api.nasa.gov/techtransfer/software';

export interface NasaTechNews {
  id: string;
  title: string;
  description: string;
  category: string;
  publishedDate: string;
  url: string;
}

export const getTechNews = async (): Promise<NasaTechNews[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/?engine&api_key=${API_KEY}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.results.map((item: any) => ({
      id: item[0],
      title: item[2].length > 100 ? `${item[2].substring(0, 100)}...` : item[2],
      description: item[3].length > 200 ? `${item[3].substring(0, 200)}...` : item[3],
      category: item[4],
      publishedDate: item[7],
      url: item[10]
    })).slice(0, 3);
  } catch (error) {
    throw new Error('Failed to fetch NASA Tech News data');
  }
};