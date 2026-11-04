import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Profile from "./Profile";
import { buildRepositories, buildUser } from "../../test/mockGithub";

describe("Profile", () => {
  it("falls back to the login when the user has no name", () => {
    render(
      <Profile
        user={buildUser({ name: null, public_repos: 0 })}
        repositories={[]}
        repositoriesStatus="ready"
      />
    );

    expect(
      screen.getByRole("heading", { name: "octocat" })
    ).toBeInTheDocument();
  });

  it("formats large follower counts compactly", () => {
    render(
      <Profile
        user={buildUser({ followers: 999950, following: 1500 })}
        repositories={[]}
        repositoriesStatus="ready"
      />
    );

    expect(screen.getByText(/1M followers/)).toBeInTheDocument();
    expect(screen.getByText(/1\.5K following/)).toBeInTheDocument();
  });

  it("shows a placeholder for repositories without a description", () => {
    render(
      <Profile
        user={buildUser()}
        repositories={buildRepositories("octocat", 1)}
        repositoriesStatus="ready"
      />
    );

    expect(screen.getAllByText("No description")).toHaveLength(4);
  });

  it("shows the empty state for a user without repositories", () => {
    render(
      <Profile
        user={buildUser({ public_repos: 0 })}
        repositories={[]}
        repositoriesStatus="ready"
      />
    );

    expect(screen.getByText("Repository list is empty")).toBeInTheDocument();
  });

  it("shows an error when repositories fail to load", () => {
    render(
      <Profile
        user={buildUser()}
        repositories={[]}
        repositoriesStatus="error"
      />
    );

    expect(screen.getByText(/Could not load repositories/)).toBeInTheDocument();
  });
});
