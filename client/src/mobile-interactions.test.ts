import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const sourceRoot = resolve(import.meta.dirname);

async function readSource(relativePath: string) {
  return readFile(resolve(sourceRoot, relativePath), "utf8");
}

describe("mobile interaction safeguards", () => {
  it("keeps the WebGL artifact passive for touch scrolling and resets cancelled pointers", async () => {
    const component = await readSource("components/HeroArtifact.tsx");
    const styles = await readSource("index.css");

    expect(component).toContain('event.pointerType === "touch"');
    expect(component).toContain('pointercancel');
    expect(styles).toContain("touch-action: pan-y");
    expect(styles).toContain("overscroll-behavior: contain");
  });

  it("keeps carousel drags snap-based and gives touch controls usable hit areas", async () => {
    const carousel = await readSource("components/ProjectMediaCarousel.tsx");
    const styles = await readSource("index.css");

    expect(carousel).toContain("dragFree: false");
    expect(carousel).toContain('containScroll: "trimSnaps"');
    expect(styles).toContain(".media-arrow { min-width: 2.75rem; min-height: 2.75rem; }");
  });

  it("reveals content when IntersectionObserver is unavailable instead of leaving it hidden", async () => {
    const home = await readSource("pages/Home.tsx");

    expect(home).toContain('if (!("IntersectionObserver" in window))');
    expect(home).toContain('target.setAttribute("data-inview", "true")');
    expect(home).toContain('{ rootMargin: "0px 0px -12% 0px", threshold: 0 }');
  });
});
