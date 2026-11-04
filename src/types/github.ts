export type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
};

export type GithubRepository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
};
