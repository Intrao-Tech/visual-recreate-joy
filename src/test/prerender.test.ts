import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { prerenderUrls } from "@/urls";
import { allServiceSlugs, catalogSlugs } from "@/i18n/catalogSlugs";
import { translations } from "@/i18n/translations";
import { LANGS } from "@/i18n/routing";

/**
 * These assert against dist/, so they need a build first.
 *
 * Deliberately NOT skipped when dist/ is missing: skipping would let a
 * pipeline that forgot to build report all-green while never checking the one
 * thing this suite exists to guarantee — that the prerender actually produced
 * content. A silent skip is indistinguishable from a pass, and that is how the
 * __404__ og:url leak shipped. `npm test` runs `npm run build` first (pretest),
 * so this failing means something is genuinely wrong.
 */
const built = existsSync("dist/index.html") && existsSync("dist/404.html");
const read = (p: string) => readFileSync(p, "utf8");
const fileFor = (url: string) =>
  url === "/" ? "dist/index.html" : `dist${url}/index.html`;

describe("the build ran before these tests", () => {
  it("has a dist/ to check — run `npm run build` if this fails", () => {
    expect(built, "dist/index.html or dist/404.html missing: prerender tests cannot verify anything").toBe(true);
  });
});

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

  it("builds a 404 per language, so /en/ misses aren't served Ukrainian", () => {
    for (const [file, lang, marker] of [
      ["dist/404.html", "uk", translations.uk.notFound.title],
      ["dist/en/404.html", "en", translations.en.notFound.title],
      ["dist/ru/404.html", "ru", translations.ru.notFound.title],
    ] as const) {
      expect(existsSync(file), `${file} missing`).toBe(true);
      expect(read(file)).toMatch(new RegExp(`<html[^>]*lang="${lang}"`));
      expect(read(file)).toContain(marker);
    }
  });

  /**
   * The 404 page is rendered at a sentinel path and served at arbitrary missing
   * URLs, so any URL baked into it is wrong by construction. The sentinel
   * leaking into og:url shipped once already — it is invisible unless asserted.
   */
  it("never leaks the __404__ sentinel into any built file", () => {
    const leaked = [
      "dist/404.html",
      "dist/en/404.html",
      "dist/ru/404.html",
      "dist/index.html",
      "dist/sitemap.xml",
      "dist/_redirects",
    ].filter((f) => existsSync(f) && read(f).includes("__404__"));
    expect(leaked, "these files leak the sentinel path").toEqual([]);
  });

  it("never bakes a per-page URL into the 404, which is served at URLs it wasn't built at", () => {
    for (const f of ["dist/404.html", "dist/en/404.html", "dist/ru/404.html"]) {
      const ogUrl = read(f).match(/<meta property="og:url" content="([^"]*)"/)?.[1];
      // useSeo emits no og:url on a noindex page, so what remains is index.html's
      // static fallback pointing at the homepage. That is fine — sharing a 404
      // previews the site. What must never appear is the sentinel path or a
      // claim about a specific page that doesn't exist.
      if (ogUrl !== undefined) {
        expect(ogUrl).toBe("https://angl-consulting.com/");
      }
      expect(read(f)).not.toContain("__404__");
    }
  });

  it("points the 404 language switcher at language homes, not at the missing path", () => {
    // Linking to the current path in another language would 404 again, and would
    // differ between build time and serve time — a hydration mismatch.
    const hrefs = Array.from(read("dist/404.html").matchAll(/hreflang="(uk|en|ru)"[^>]*href="([^"]*)"|href="([^"]*)"[^>]*hreflang="(uk|en|ru)"/g));
    for (const m of hrefs) {
      const href = m[2] ?? m[3];
      expect(href).not.toContain("__404__");
    }
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
