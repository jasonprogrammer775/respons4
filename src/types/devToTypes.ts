export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  positive_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
}

export interface DevToProfile {
  name: string;
  username: string;
  summary: string;
  github_username: string;
  twitter_username: string;
  location: string;
  joined_at: string;
  profile_image: string;
}