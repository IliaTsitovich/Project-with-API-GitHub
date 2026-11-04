import { vi } from "vitest";
import { GithubRepository, GithubUser } from "../types/github";

export const buildUser = (overrides: Partial<GithubUser> = {}): GithubUser => ({
  login: "octocat",
  name: "The Octocat",
  avatar_url: "https://example.com/avatar.png",
  html_url: "https://github.com/octocat",
  followers: 12,
  following: 3,
  public_repos: 9,
  ...overrides,
});

export const buildRepositories = (
  login: string,
  page: number
): GithubRepository[] =>
  [1, 2, 3, 4].map((index) => ({
    id: page * 10 + index,
    name: `${login}-p${page}-${index}`,
    description: null,
    html_url: `https://github.com/${login}/${index}`,
  }));

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status });

type Route = {
  user?: Partial<GithubUser>;
  status?: number;
  repositoriesStatus?: number;
};

/** Stubs fetch with per-login responses, honouring aborted signals. */
export const mockGithub = (routes: Record<string, Route>) => {
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    init?.signal?.throwIfAborted();

    const { pathname, searchParams } = new URL(url);
    const [, , login, resource] = pathname.split("/");
    const route = routes[login] ?? { status: 404 };

    if (route.status) return jsonResponse({}, route.status);

    if (resource === "repos") {
      if (route.repositoriesStatus) {
        return jsonResponse({}, route.repositoriesStatus);
      }
      const page = Number(searchParams.get("page"));
      return jsonResponse(buildRepositories(login, page));
    }

    return jsonResponse(buildUser({ login, ...route.user }));
  });

  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
  return fetchMock;
};
