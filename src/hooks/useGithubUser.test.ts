import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { buildRepositories, buildUser, mockGithub } from "../test/mockGithub";
import { useGithubUser } from "./useGithubUser";

const renderUseGithubUser = () => renderHook(() => useGithubUser());

describe("useGithubUser", () => {
  it("starts idle", () => {
    const { result } = renderUseGithubUser();

    expect(result.current.status).toBe("idle");
    expect(result.current.user).toBeNull();
  });

  it("loads the user with the first page of repositories", async () => {
    mockGithub({ octocat: {} });
    const { result } = renderUseGithubUser();

    await act(() => result.current.search("octocat"));

    expect(result.current.status).toBe("success");
    expect(result.current.user?.login).toBe("octocat");
    expect(result.current.repositories).toEqual(
      buildRepositories("octocat", 1)
    );
  });

  it("does not request repositories for a user without any", async () => {
    const fetchMock = mockGithub({ empty: { user: { public_repos: 0 } } });
    const { result } = renderUseGithubUser();

    await act(() => result.current.search("empty"));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.current.repositories).toEqual([]);
  });

  it("encodes the login in the request URL", async () => {
    const fetchMock = mockGithub({});
    const { result } = renderUseGithubUser();

    await act(() => result.current.search("../rate_limit"));

    expect(fetchMock.mock.calls[0][0]).toContain("users/..%2Frate_limit");
  });

  it.each([
    [404, "notFound"],
    [403, "rateLimited"],
    [429, "rateLimited"],
    [500, "error"],
  ])("maps HTTP %i to the %s status", async (status, expected) => {
    mockGithub({ octocat: { status } });
    const { result } = renderUseGithubUser();

    await act(() => result.current.search("octocat"));

    expect(result.current.status).toBe(expected);
  });

  it("drops the previous user when a new search fails", async () => {
    mockGithub({ octocat: {} });
    const { result } = renderUseGithubUser();

    await act(() => result.current.search("octocat"));
    await act(() => result.current.search("missing"));

    expect(result.current.status).toBe("notFound");
    expect(result.current.user).toBeNull();
    expect(result.current.repositories).toEqual([]);
  });

  it("ignores a slow response once a newer search has started", async () => {
    let resolveSlow: (response: Response) => void = () => {};
    const fast = mockGithub({ fast: {} });
    const fastImplementation = fast.getMockImplementation()!;

    fast.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          resolveSlow = resolve;
        })
    );
    fast.mockImplementation(fastImplementation);

    const { result } = renderUseGithubUser();

    act(() => {
      result.current.search("slow");
    });
    await act(() => result.current.search("fast"));
    await act(async () => {
      resolveSlow(
        new Response(JSON.stringify(buildUser({ login: "slow" })), {
          status: 200,
        })
      );
    });

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.user?.login).toBe("fast");
  });

  it("loads another page for the searched user", async () => {
    mockGithub({ octocat: {} });
    const { result } = renderUseGithubUser();

    await act(() => result.current.search("octocat"));
    await act(() => result.current.loadPage(2));

    expect(result.current.page).toBe(2);
    expect(result.current.repositories).toEqual(
      buildRepositories("octocat", 2)
    );
  });

  it("keeps the user and reports an error when a page fails", async () => {
    const fetchMock = mockGithub({ octocat: {} });
    const { result } = renderUseGithubUser();

    await act(() => result.current.search("octocat"));
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 500 }));
    await act(() => result.current.loadPage(2));

    expect(result.current.status).toBe("success");
    expect(result.current.repositories).toEqual([]);
    expect(result.current.repositoriesStatus).toBe("error");
  });

  it("returns to the idle state and cancels pending work on reset", async () => {
    const pending = vi.fn(
      (_url: string, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError"))
          );
        })
    );
    vi.stubGlobal("fetch", pending);
    const { result } = renderUseGithubUser();

    act(() => {
      result.current.search("octocat");
    });
    await act(async () => result.current.reset());

    expect(result.current.status).toBe("idle");
    expect(pending.mock.calls[0][1]?.signal?.aborted).toBe(true);
  });
});
