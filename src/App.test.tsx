import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import { mockGithub } from "./test/mockGithub";

const searchFor = async (login: string) => {
  const user = userEvent.setup();
  await user.type(
    screen.getByRole("searchbox", { name: "GitHub username" }),
    `${login}{Enter}`
  );
  return user;
};

describe("App", () => {
  it("opens on the start screen", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Find any GitHub developer" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("searchbox")).toHaveLength(1);
  });

  it("shows the profile and repositories after a search", async () => {
    mockGithub({ octocat: {} });
    render(<App />);

    await searchFor("octocat");

    expect(
      await screen.findByRole("heading", { name: "The Octocat" })
    ).toBeInTheDocument();
    expect(screen.getByText("octocat-p1-1")).toBeInTheDocument();
    expect(screen.getByText("1 - 4 of 9 items")).toBeInTheDocument();
  });

  it("searches an example user from the start screen", async () => {
    mockGithub({ torvalds: {} });
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "torvalds" }));

    expect(await screen.findByText("torvalds-p1-1")).toBeInTheDocument();
  });

  it("does not search with an empty input", async () => {
    const fetchMock = mockGithub({});
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("uses the searched user, not unsubmitted text, for pagination", async () => {
    mockGithub({ octocat: {} });
    render(<App />);

    const user = await searchFor("octocat");
    await screen.findByText("octocat-p1-1");

    await user.type(screen.getByRole("searchbox"), "unsubmitted");
    await user.click(screen.getByRole("button", { name: "Page 2" }));

    expect(await screen.findByText("octocat-p2-1")).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toHaveValue("unsubmitted");
  });

  it("returns to the first page when another user is searched", async () => {
    mockGithub({ octocat: {}, torvalds: { user: { public_repos: 12 } } });
    render(<App />);

    const user = await searchFor("octocat");
    await screen.findByText("octocat-p1-1");
    await user.click(screen.getByRole("button", { name: "Page 2" }));
    await screen.findByText("octocat-p2-1");

    await user.type(screen.getByRole("searchbox"), "torvalds{Enter}");

    expect(await screen.findByText("1 - 4 of 12 items")).toBeInTheDocument();
    const pagination = screen.getByRole("navigation", { name: "Pagination" });
    expect(
      within(pagination).getByRole("button", { name: /Page 1/ })
    ).toHaveAttribute("aria-current", "page");
  });

  it("replaces the previous profile with a not found message", async () => {
    mockGithub({ octocat: {} });
    render(<App />);

    const user = await searchFor("octocat");
    await screen.findByText("octocat-p1-1");
    await user.type(screen.getByRole("searchbox"), "missing{Enter}");

    expect(await screen.findByText("User not found")).toBeInTheDocument();
    expect(screen.queryByText("The Octocat")).not.toBeInTheDocument();
  });

  it("tells the user when the rate limit is reached", async () => {
    mockGithub({ octocat: { status: 403 } });
    render(<App />);

    await searchFor("octocat");

    expect(await screen.findByText(/rate limit exceeded/)).toBeInTheDocument();
  });

  it("returns to the start screen when the logo is clicked", async () => {
    mockGithub({ octocat: {} });
    render(<App />);

    const user = await searchFor("octocat");
    await screen.findByText("octocat-p1-1");
    await user.type(screen.getByRole("searchbox"), "draft");
    await user.click(
      screen.getByRole("link", { name: "Go to the start page" })
    );

    expect(
      screen.getByRole("heading", { name: "Find any GitHub developer" })
    ).toBeInTheDocument();
    expect(screen.queryByText("The Octocat")).not.toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });
});
