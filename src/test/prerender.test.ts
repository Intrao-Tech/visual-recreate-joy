import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { prerenderUrls } from "@/urls";
import { allServiceSlugs, catalogSlugs } from "@/i18n/catalogSlugs";
import { translations } from "@/i18n/translations";
import { LANGS } from "@/i18n/routing";

/**
 * These assert against dist/, so they only run after a build. A prerender that
 * silently produced empty shells would still exit 0 and look green — which is
 * exactly the failure this suite exists to catch — so skip loudly rather than
 * pass vacuously when dist/ isn't there.
 */
const built = existsSync("dist/index.html") && existsSync("dist/404.html");
const read = (p: string) => readFileSync(p, "utf8");
const fileFor = (url: string) =>
  url === "/" ? "dist/index.html" : `dist${url}/index.html`;

describe.runIf(built)("prerendered output", () => {
  it("writes a file for every URL the sitemap advertises", () => {
    const missing = prerenderUrls().filter((u) => !existsSync(fileFor(u)));
    expect(missing, "these URLs would be soft-404s").toEqual([]);
  });

  it("covers all 90 URLs plus a 404 page", () => {
    expect(prerenderUrls()).toHaveLength(90);
    expect(existsSync("dist/404.html")).toBe(true);
  });

  /** The bug being fixed: Googlebot received `<div id="root"></div>` and nothing else. */
  it("ships real markup, not an empty root div", () => {
    for (const url of ["/", "/services", "/contact", "/resources"]) {
      const html = read(fileFor(url));
      expect(html, `${url} is still an empty shell`).not.toContain('<div id="root"></div>');
      expect(html).toMatch(/<div id="root"><[^>]/);
    }
  });

  it("puts each page's h1 in the raw HTML", () => {
    const html = read(fileFor("/services/tax-audit-support"));
    expect(html).toContain("Супровід податкових перевірок");
    expect(html).toMatch(/<h1[^>]*>[^<]*Супровід податкових перевірок/);
  });

  it("renders each language tree in its own language", () => {
    expect(read(fileFor("/en/services/tax-audit-support"))).toContain("Tax audit support");
    expect(read(fileFor("/ru/services/tax-audit-support"))).toContain(
      translations.ru.catalog.categories[2].items[1].title,
    );
    expect(read(fileFor("/services/tax-audit-support"))).toContain(
      translations.uk.catalog.categories[2].items[1].title,
    );
  });

  it("sets html lang per language", () => {
    expect(read(fileFor("/"))).toMatch(/<html[^>]*lang="uk"/);
    expect(read(fileFor("/en"))).toMatch(/<html[^>]*lang="en"/);
    expect(read(fileFor("/ru"))).toMatch(/<html[^>]*lang="ru"/);
  });

  it("bakes the per-page title, canonical, hreflang and JSON-LD into the file", () => {
    const html = read(fileFor("/en/services"));
    expect(html).toContain("<title>Services and pricing | ANGL Consulting</title>");
    expect(html).toContain('<link rel="canonical" href="https://angl-consulting.com/en/services">');
    expect(html).toContain('hreflang="x-default"');
    expect(html).toContain('type="application/ld+json"');
  });

  it("gives every service page a unique title in the file itself", () => {
    const titles = allServiceSlugs.map(
      (slug) => read(fileFor(`/services/${slug}`)).match(/<title>([^<]*)<\/title>/)?.[1],
    );
    expect(new Set(titles).size).toBe(allServiceSlugs.length);
  });

  it("never leaks the preview domain into a prerendered page", () => {
    for (const url of ["/", "/en", "/ru/contact"]) {
      expect(read(fileFor(url))).not.toContain("lovable.app");
      expect(read(fileFor(url))).not.toContain("r2.dev");
    }
  });

  it("keeps the 404 page noindex and out of the sitemap", () => {
    const html = read("dist/404.html");
    expect(html).toContain('content="noindex, follow"');
    expect(html).not.toContain('rel="canonical"');
    expect(read("dist/sitemap.xml")).not.toContain("__404__");
  });

  it("does not ship the SSR build tooling to the CDN", () => {
    expect(existsSync("dist/server")).toBe(false);
    expect(existsSync("dist/entry-server.js")).toBe(false);
  });
});

describe.runIf(built)("_redirects keeps retired URLs alive", () => {
  const redirects = read("dist/_redirects");

  /**
   * With every route a real file there is no SPA fallback to catch
   * /services/0-0, so without these rules the old indexed URLs would 404.
   */
  it("maps every legacy index URL, in every language, to its slug", () => {
    catalogSlugs.forEach((items, ci) =>
      items.forEach((slug, ii) => {
        expect(redirects).toContain(`/services/${ci}-${ii} /services/${slug} 301`);
        expect(redirects).toContain(`/en/services/${ci}-${ii} /en/services/${slug} 301`);
        expect(redirects).toContain(`/ru/services/${ci}-${ii} /ru/services/${slug} 301`);
      }),
    );
  });

  it("has one rule per service per language", () => {
    const rules = redirects.split("\n").filter((l) => l.endsWith(" 301"));
    expect(rules).toHaveLength(allServiceSlugs.length * LANGS.length);
    expect(rules).toHaveLength(78);
  });

  it("uses 301, not 302 — the redirect that passes ranking signals", () => {
    for (const line of redirects.split("\n").filter((l) => l && !l.startsWith("#"))) {
      expect(line).toMatch(/ 301$/);
    }
  });

  it("never redirects a slug to itself", () => {
    for (const line of redirects.split("\n").filter((l) => l.endsWith(" 301"))) {
      const [from, to] = line.split(" ");
      expect(from).not.toBe(to);
    }
  });
});
