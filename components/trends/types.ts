/** Represents one supported repository-trending period. */
export const PERIODS = ["daily", "weekly", "monthly"] as const;

/** Identifies the selected repository-trending period. */
export type Period = (typeof PERIODS)[number];

/** Contains the display details for a repository contributor. */
export type Contributor = {
  avatar: string;
  name?: string;
};

/** Contains repository fields returned by the trending API. */
export type Repository = {
  title?: string;
  url?: string;
  description?: string;
  language?: string;
  languageColor?: string;
  stars?: number | string | null;
  forks?: number | string | null;
  addStars?: number | string | null;
  contributors?: Contributor[];
};
