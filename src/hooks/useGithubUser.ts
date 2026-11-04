import { useCallback, useEffect, useRef, useState } from "react";
import { fetchRepositories, fetchUser, GithubApiError } from "../api/github";
import { GithubRepository, GithubUser } from "../types/github";

export type SearchStatus =
  | "idle"
  | "loading"
  | "success"
  | "notFound"
  | "rateLimited"
  | "error";

export type RepositoriesStatus = "ready" | "loading" | "error";

type State = {
  status: SearchStatus;
  user: GithubUser | null;
  repositories: GithubRepository[];
  page: number;
  repositoriesStatus: RepositoriesStatus;
};

const INITIAL_STATE: State = {
  status: "idle",
  user: null,
  repositories: [],
  page: 1,
  repositoriesStatus: "ready",
};

const getFailureStatus = (error: unknown): SearchStatus => {
  if (error instanceof GithubApiError) {
    if (error.status === 404) return "notFound";
    if (error.status === 403 || error.status === 429) return "rateLimited";
  }
  return "error";
};

export const useGithubUser = () => {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const controllerRef = useRef<AbortController | null>(null);
  const login = state.user?.login;

  // Only the latest request may update the state.
  const startRequest = () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    return controller.signal;
  };

  useEffect(() => () => controllerRef.current?.abort(), []);

  const search = useCallback(async (searchedLogin: string) => {
    const signal = startRequest();
    setState({ ...INITIAL_STATE, status: "loading" });

    try {
      const user = await fetchUser(searchedLogin, signal);
      const repositories =
        user.public_repos > 0
          ? await fetchRepositories(user.login, 1, signal)
          : [];
      setState({ ...INITIAL_STATE, status: "success", user, repositories });
    } catch (error) {
      if (signal.aborted) return;
      console.error("Failed to load GitHub user:", error);
      setState({ ...INITIAL_STATE, status: getFailureStatus(error) });
    }
  }, []);

  const loadPage = useCallback(
    async (page: number) => {
      if (!login) return;

      const signal = startRequest();
      setState((prev) => ({ ...prev, page, repositoriesStatus: "loading" }));

      try {
        const repositories = await fetchRepositories(login, page, signal);
        setState((prev) => ({
          ...prev,
          repositories,
          repositoriesStatus: "ready",
        }));
      } catch (error) {
        if (signal.aborted) return;
        console.error("Failed to load repositories:", error);
        setState((prev) => ({
          ...prev,
          repositories: [],
          repositoriesStatus: "error",
        }));
      }
    },
    [login]
  );

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    setState(INITIAL_STATE);
  }, []);

  return { ...state, search, loadPage, reset };
};
