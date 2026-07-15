import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { allServiceSlugs } from "@/i18n/catalogSlugs";
import { LANGS, withLang } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { staticPaths } from "@/routes";

const xml = readFileSync("public/sitemap.xml", "utf8");
const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);

/**
 * The sitemap is generated, but it's committed to the repo — so it can still go
 * stale if someone edits the catalog and doesn't rebuild. These tests fail the
 * suite in that case, which is the whole point of generating it.
 */
describe("sitemap.xml matches the routes the app actually serves", () => {
  it("is checked in and non-empty", () => {
    expect(locs.length).toBeGreaterThan(0);
  });

  it("lists every page in every language, and nothing else", () => {
    const barePaths = [...staticPaths, ...allServiceSlugs.map((s) => `/services/${s}`)];
    const expected = barePaths
      .flatMap((p) => LANGS.map((l) => absoluteUrl(withLang(p, l))))
      .sort();
    expect([...locs].sort()).toEqual(expected);
  });

  it("covers 30 pages across 3 languages", () => {
    expect(locs).toHaveLength((4 + allServiceSlugs.length) * LANGS.length);
    expect(locs).toHaveLength(90);
  });

  it("has no duplicate URLs", () => {
    expect(new Set(locs).size).toBe(locs.length);
  });

  it("lists only absolute production URLs", () => {
    for (const loc of locs) {
      expect(loc.startsWith("https://angl-consulting.com")).toBe(true);
      expect(loc).not.toContain("lovable.app");
      expect(loc).not.toContain("localhost");
    }
  });

  it("contains no retired index-style service URLs", () => {
    for (const loc of locs) {
      expect(loc).not.toMatch(/\/services\/\d+-\d+$/);
    }
  });

  it("excludes the 404, which is noindex", () => {
    expect(locs.some((l) => l.includes("not-found") || l.includes("404"))).toBe(false);
  });

  it("uses the sitemaps.org namespace", () => {
    // sitemaps.org, plural — the singular form is a common typo that makes
    // Search Console reject the file.
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  });

  it("gives every URL a reciprocal hreflang cluster", () => {
    const blocks = xml.split("<url>").slice(1);
    expect(blocks).toHaveLength(locs.length);
    for (const block of blocks) {
      const langs = Array.from(block.matchAll(/hreflang="([^"]+)"/g)).map((m) => m[1]);
      expect(langs).toEqual(["uk", "en", "ru", "x-default"]);
    }
  });

  it("points x-default at the unprefixed Ukrainian URL", () => {
    const block = xml.split("<url>").find((b) => b.includes("<loc>https://angl-consulting.com/en/contact</loc>"));
    expect(block).toBeDefined();
    expect(block).toContain(
      '<xhtml:link rel="alternate" hreflang="x-default" href="https://angl-consulting.com/contact"/>',
    );
  });
});

describe("robots.txt", () => {
  const robots = readFileSync("public/robots.txt", "utf8");

  it("points crawlers at the sitemap", () => {
    expect(robots).toContain("Sitemap: https://angl-consulting.com/sitemap.xml");
  });

  it("does not block anything the sitemap advertises", () => {
    expect(robots).not.toMatch(/^Disallow: \/\s*$/m);
  });
});
