const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

import type { HackerNewsStory } from '../types/hackerNewsTypes';

export const getTopStories = async (): Promise<number[]> => {
  const response = await fetch(`${BASE_URL}/topstories.json`);
  if (!response.ok) throw new Error('Failed to fetch top stories');
  return response.json();
};

export const getStory = async (id: number): Promise<HackerNewsStory> => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  if (!response.ok) throw new Error(`Failed to fetch story ${id}`);
  return response.json();
};

export const getTopStoriesWithDetails = async (limit = 10): Promise<HackerNewsStory[]> => {
  const storyIds = await getTopStories();
  const stories = await Promise.all(
    storyIds.slice(0, limit).map(id => getStory(id))
  );
  return stories;
};