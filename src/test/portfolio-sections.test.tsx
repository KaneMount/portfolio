import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Contact } from "@/components/portfolio/Contact";
import { experience, profile } from "@/data/portfolio";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("Portfolio section rules", () => {
  it("keeps the God Machine game jam out of professional experience", () => {
    expect(experience.flatMap((entry) => entry.relatedProjectIds)).not.toContain("god-machine");
    expect(experience.flatMap((entry) => entry.relatedProjectIds)).toEqual(["cradle-of-sins", "gscan", "slum-ball"]);
  });

  it("copies the real email and clears confirmation after two seconds", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<Contact />);
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Copy" })); });
    expect(writeText).toHaveBeenCalledWith("margus@dynamicrenderinteractive.com");
    expect(screen.getByRole("button", { name: "Copied" })).toBeDefined();
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByRole("button", { name: "Copy" })).toBeDefined();
  });

  it("offers a CV download only when an actual CV URL is configured", () => {
    const previousUrl = profile.cvUrl;
    try {
      profile.cvUrl = null;
      const view = render(<Contact />);
      expect(screen.queryByRole("link", { name: "Download CV" })).toBeNull();
      profile.cvUrl = "portfolio-cv.pdf";
      view.rerender(<Contact />);
      expect(screen.getByRole("link", { name: "Download CV" }).getAttribute("href")).toBe(`${import.meta.env.BASE_URL}portfolio-cv.pdf`);
    } finally {
      profile.cvUrl = previousUrl;
    }
  });
});