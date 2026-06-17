export interface Project {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
  language?: string | null;
}
