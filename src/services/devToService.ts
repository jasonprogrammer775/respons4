import axios from 'axios';
import { DevToArticle, DevToProfile } from '../types/devToTypes';

const devToApi = axios.create({
  baseURL: 'https://dev.to/api'
});

export const getDevToProfile = async (username: string): Promise<DevToProfile> => {
  try {
    const response = await devToApi.get(`/users/by_username?url=${username}`);
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to fetch DEV profile');
  }
};

export const getDevToArticles = async (username: string): Promise<DevToArticle[]> => {
  try {
    const response = await devToApi.get(`/articles?username=${username}`);
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to fetch DEV articles');
  }
};