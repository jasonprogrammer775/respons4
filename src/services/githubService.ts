import axios from 'axios';
import { GithubProfile } from '../types/githubTypes';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
  }
});

export const getGithubProfile = async (username: string): Promise<GithubProfile> => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to fetch GitHub profile');
  }
};

export const getRepositories = async (username: string) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 5
      }
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to fetch repositories');
  }
};