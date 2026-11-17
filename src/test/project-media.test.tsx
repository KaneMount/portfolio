import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { MediaFrame, YouTubeThumbnail } from "@/components/portfolio/Media";
import { projects } from "@/data/portfolio";

afterEach(cleanup);

describe("Project media rules", () => {
  it("keeps the specified order and Slum Ball empty", () => {
    expect(projects.map((p) => p.media.map((m) => m.src))).toEqual([
      ["gsfzphAT3tg", "758txZn6fWg", "media/cradle-of-sins/bongo-tower.jpg", "media/cradle-of-sins/serpents-rest.jpg"],
      ["MPeXPTN0FZI", "media/god-machine/god-machine.jpg"],
      [],
      ["media/gscan/gscan-docks.jpg"],
    ]);
  });

  it("falls back after a failed max-resolution thumbnail", () => {
    render(<YouTubeThumbnail id="gsfzphAT3tg" title="Video" className="" />);
    const image = screen.getByRole("img");
    expect(image.getAttribute("src")).toBe("https://i.ytimg.com/vi/gsfzphAT3tg/maxresdefault.jpg");
    fireEvent.error(image);
    expect(image.getAttribute("src")).toBe("https://i.ytimg.com/vi/gsfzphAT3tg/hqdefault.jpg");
    fireEvent.error(image);
    expect(image.getAttribute("src")).toBe("https://i.ytimg.com/vi/gsfzphAT3tg/hqdefault.jpg");
  });

  it("falls back when YouTube returns its 120px missing placeholder", () => {
    render(<YouTubeThumbnail id="758txZn6fWg" title="Video" className="" />);
    const image = screen.getByRole("img");
    Object.defineProperty(image, "naturalWidth", { value: 120 });
    fireEvent.load(image);
    expect(image.getAttribute("src")).toBe("https://i.ytimg.com/vi/758txZn6fWg/hqdefault.jpg");
  });

  it("switches media and loads YouTube only after the play click", () => {
    const project = projects[0];
    if (!project) throw new Error("Missing Cradle of Sins");
    const { container } = render(<MediaFrame media={project.media} title={project.title} ratio="16:9" />);
    expect(container.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: `Play video: ${project.media[0]?.alt}` }));
    expect(container.querySelector("iframe")?.getAttribute("src")).toBe("https://www.youtube-nocookie.com/embed/gsfzphAT3tg?autoplay=1");
    fireEvent.click(screen.getByRole("button", { name: `Show media 3: ${project.media[2]?.alt}` }));
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByAltText(project.media[2]?.alt ?? "").getAttribute("src")).toBe(`${import.meta.env.BASE_URL}media/cradle-of-sins/bongo-tower.jpg`);
  });

  it("sets the requested sharing image and dimensions in static HTML", () => {
    const html = new DOMParser().parseFromString(readFileSync("docs/index.html", "utf8"), "text/html");
    expect(html.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe("https://kanemount.github.io/portfolio/og-image.jpg");
    expect(html.querySelector('meta[name="twitter:image"]')?.getAttribute("content")).toBe("https://kanemount.github.io/portfolio/og-image.jpg");
    expect(html.querySelector('meta[property="og:image:width"]')?.getAttribute("content")).toBe("1200");
    expect(html.querySelector('meta[property="og:image:height"]')?.getAttribute("content")).toBe("630");
  });
});