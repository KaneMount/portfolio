import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { MediaFrame, YouTubeThumbnail } from "@/components/portfolio/Media";
import { projects } from "@/data/portfolio";

afterEach(cleanup);

describe("Project media rules", () => {
  it("keeps the trailer first, existing media ordered, and Slum Ball image set", () => {
    expect(projects.map((p) => p.media.map((m) => m.src))).toEqual([
      ["E5levOlcmms", "gsfzphAT3tg", "758txZn6fWg", "media/cradle-of-sins/bongo-tower.jpg", "media/cradle-of-sins/serpents-rest.jpg"],
      ["MPeXPTN0FZI", "media/god-machine/god-machine.jpg"],
      ["media/slum-ball/slum-ball.jpg"],
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
    expect(container.querySelector("iframe")?.getAttribute("src")).toBe("https://www.youtube-nocookie.com/embed/E5levOlcmms?autoplay=1");
    fireEvent.click(screen.getByRole("button", { name: `Show media 4: ${project.media[3]?.alt}` }));
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByAltText(project.media[3]?.alt ?? "").getAttribute("src")).toBe(`${import.meta.env.BASE_URL}media/cradle-of-sins/bongo-tower.jpg`);
  });

  it("uses a local poster for both video previews without changing click-to-load", () => {
    const { container } = render(<MediaFrame title="Poster video" ratio="16:9" media={[
      { type: "youtube", src: "E5levOlcmms", alt: "Cradle of Sins official trailer", poster: "media/cradle-of-sins/bongo-tower.jpg" },
      { type: "image", src: "media/slum-ball/slum-ball.jpg", alt: "Slum Ball" },
    ]} />);
    const images = container.querySelectorAll("img");
    expect(images[0]?.getAttribute("src")).toBe(`${import.meta.env.BASE_URL}media/cradle-of-sins/bongo-tower.jpg`);
    expect(images[1]?.getAttribute("src")).toBe(`${import.meta.env.BASE_URL}media/cradle-of-sins/bongo-tower.jpg`);
    expect(container.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Play video: Cradle of Sins official trailer" }));
    expect(container.querySelector("iframe")?.getAttribute("src")).toBe("https://www.youtube-nocookie.com/embed/E5levOlcmms?autoplay=1");
  });

  it("sets the requested sharing image and dimensions in static HTML", () => {
    const html = new DOMParser().parseFromString(readFileSync("docs/index.html", "utf8"), "text/html");
    expect(html.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe("https://kanemount.github.io/portfolio/og-image.jpg");
    expect(html.querySelector('meta[name="twitter:image"]')?.getAttribute("content")).toBe("https://kanemount.github.io/portfolio/og-image.jpg");
    expect(html.querySelector('meta[property="og:image:width"]')?.getAttribute("content")).toBe("1200");
    expect(html.querySelector('meta[property="og:image:height"]')?.getAttribute("content")).toBe("630");
  });
});