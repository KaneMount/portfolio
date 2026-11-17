import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Committed GitHub Pages site", () => {
  it("includes index.html, identical 404.html and an empty .nojekyll", () => {
    const index = readFileSync("docs/index.html", "utf8");
    expect(readFileSync("docs/404.html", "utf8")).toBe(index);
    expect(statSync("docs/.nojekyll").size).toBe(0);
  });

  it("prerenders the name and all four project titles as real HTML", () => {
    const html = new DOMParser().parseFromString(readFileSync("docs/index.html", "utf8"), "text/html");
    expect(html.querySelector("h1")?.textContent).toBe("Margus Mägi");
    const titles = Array.from(html.querySelectorAll('[id$="-title"]')).map((element) => element.textContent);
    expect(titles).toEqual(["Cradle of Sins", "God Machine", "Slum Ball", "GScan"]);
  });

  it("prefixes every local HTML asset URL with /portfolio/ and includes its file", () => {
    const html = new DOMParser().parseFromString(readFileSync("docs/index.html", "utf8"), "text/html");
    const assets = Array.from(html.querySelectorAll('script[src], img[src], video[src], source[src], link[rel="stylesheet"], link[rel="modulepreload"], link[rel="icon"]'));
    expect(assets.length).toBeGreaterThan(0);
    for (const asset of assets) {
      const url = asset.getAttribute("src") ?? asset.getAttribute("href") ?? "";
      if (url.startsWith("https://fonts.googleapis.com/")) continue;
      expect(url.startsWith("/portfolio/")).toBe(true);
      expect(existsSync(resolve("docs", url.slice("/portfolio/".length)))).toBe(true);
    }
  });

  it("does not retain the GitHub Actions deployment", () => {
    expect(existsSync(".github/workflows/deploy.yml")).toBe(false);
  });
});