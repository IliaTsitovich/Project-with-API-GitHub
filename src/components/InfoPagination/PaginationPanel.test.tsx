import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PaginationPanel from "./PaginationPanel";

describe("PaginationPanel", () => {
  it.each([
    [1, "1 - 4 of 9 items"],
    [2, "5 - 8 of 9 items"],
    [3, "9 - 9 of 9 items"],
  ])("shows the item range for page %i", (currentPage, label) => {
    render(
      <PaginationPanel
        allItemsOfRepo={9}
        currentPage={currentPage}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("reports the selected page as a 1-based number", async () => {
    const onPageChange = vi.fn();
    render(
      <PaginationPanel
        allItemsOfRepo={9}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "Page 3" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
