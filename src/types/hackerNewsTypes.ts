export interface HackerNewsStory {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}

export interface HackerNewsState {
  stories: HackerNewsStory[];
  loading: boolean;
  error: string | null;
}