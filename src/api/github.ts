import { API_BASE_URL, REPOSITORIES_PER_PAGE } from "../config";
import { GithubRepository, GithubUser } from "../types/github";

export class GithubApiError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`GitHub API responded with status ${status}`);
    this.name = "GithubApiError";
    this.status = status;
  }
}

const request = async <T>(path: string, signal: AbortSignal): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal });
  if (!response.ok) {
    throw new GithubApiError(response.status);
  }
  return response.json();
};

export const fetchUser = (login: string, signal: AbortSignal) =>
  request<GithubUser>(`users/${encodeURIComponent(login)}`, signal);

export const fetchRepositories = (
  login: string,
  page: number,
  signal: AbortSignal
) =>
  request<GithubRepository[]>(
    `users/${encodeURIComponent(login)}/repos?type=owner&page=${page}&per_page=${REPOSITORIES_PER_PAGE}&sort=created`,
    signal
  );
