import { describe, expect, it } from "vitest";
import { assetUrl } from "@/lib/utils";

describe("assetUrl", () => {
  it("prefixes local files with the site base", () => {
    expect(assetUrl("media/a.jpg")).toBe(`${import.meta.env.BASE_URL}media/a.jpg`);
    expect(assetUrl("/media/a.jpg")).toBe(`${import.meta.env.BASE_URL}media/a.jpg`);
  });
  it("leaves external URLs unchanged", () => {
    expect(assetUrl("https://example.com/a.jpg")).toBe("https://example.com/a.jpg");
  });
});
