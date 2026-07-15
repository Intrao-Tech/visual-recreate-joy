import { describe, it, expect, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { Providers } from "./providers";
import { AppRoutes } from "@/App";
import { translations } from "@/i18n/translations";
import { slugFor, allServiceSlugs } from "@/i18n/catalogSlugs";
import { SITE_URL, absoluteUrl, alternatesFor, clampDescription, fillTemplate } from "@/lib/seo";
import { withLang } from "@/i18n/routing";

/** Reads what actually landed in <head> after render. */
const head = () => ({
  title: document.title,
  description: document
    .querySelector('meta[name="description"]')
    ?.getAttribute("content"),
  robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
  canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
  alternates: Array.from(document.querySelectorAll('link[rel="alternate"]')).map((l) => ({
    hreflang: l.getAttribute("hreflang"),
    href: l.getAttribute("href"),
  })),
  ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
  ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content"),
  ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
  ogLocale: document.querySelector('meta[property="og:locale"]')?.getAttribute("content"),
});

const renderAt = async (path: string) => {
  const utils = render(
    <Providers route={path}>
      <AppRoutes />
    </Providers>,
  );
  // unhead flushes to the DOM asynchronously.
  await waitFor(() => expect(document.title).not.toBe(""));
  return utils;
};

beforeEach(() => {
  document.head.querySelectorAll("meta, link, title").forEach((n) => n.remove());
  document.title = "";
});

describe("every page has its own title and description", () => {
  const pages = [
    { path: "/", key: "home" },
    { path: "/services", key: "services" },
    { path: "/contact", key: "contact" },
    { path: "/resources", key: "resources" },
  ] as const;

  it.each(pages)("$path has the title written for it", async ({ path, key }) => {
    await renderAt(path);
    const expected = `${translations.uk.seo[key].title}${translations.uk.seo.titleSuffix}`;
    expect(head().title).toBe(expected);
  });

  it("no two pages share a title or a description", async () => {
    const seen: { title?: string; description?: string }[] = [];
    for (const { path } of pages) {
      const { unmount } = await renderAt(path);
      const h = head();
      seen.push({ title: h.title, description: h.description });
      unmount();
    }
    // The reported bug: one title and one description across the whole site.
    expect(new Set(seen.map((s) => s.title)).size).toBe(pages.length);
    expect(new Set(seen.map((s) => s.description)).size).toBe(pages.length);
    for (const s of seen) {
      expect(s.title).toBeTruthy();
      expect(s.description).toBeTruthy();
    }
  });

  it("a service page is titled after its service, not the site", async () => {
    const slug = slugFor(2, 1) as string;
    await renderAt(`/services/${slug}`);
    const item = translations.uk.catalog.categories[2].items[1];
    expect(head().title).toContain(item.title);
    expect(head().description).toBeTruthy();
  });

  it("gives each of the 26 services a distinct title", async () => {
    const titles = new Set<string>();
    for (const slug of allServiceSlugs) {
      const { unmount } = await renderAt(`/services/${slug}`);
      titles.add(head().title);
      unmount();
    }
    expect(titles.size).toBe(allServiceSlugs.length);
  });

  it("localises the title per language", async () => {
    for (const [path, lang] of [
      ["/services", "uk"],
      ["/en/services", "en"],
      ["/ru/services", "ru"],
    ] as const) {
      const { unmount } = await renderAt(path);
      expect(head().title).toBe(
        `${translations[lang].seo.services.title}${translations[lang].seo.titleSuffix}`,
      );
      unmount();
    }
  });
});

describe("canonical", () => {
  it.each([
    ["/", "https://angl-consulting.com/"],
    ["/services", "https://angl-consulting.com/services"],
    ["/en/services", "https://angl-consulting.com/en/services"],
    ["/ru/contact", "https://angl-consulting.com/ru/contact"],
  ])("%s self-references %s", async (path, expected) => {
    await renderAt(path);
    expect(head().canonical).toBe(expected);
  });

  it("is absolute against the production domain, never the preview host", async () => {
    await renderAt("/services");
    const h = head();
    expect(h.canonical?.startsWith(SITE_URL)).toBe(true);
    expect(h.canonical).not.toContain("lovable.app");
    expect(h.canonical).not.toContain("localhost");
    // og:url must agree with the canonical or they fight each other.
    expect(h.ogUrl).toBe(h.canonical);
  });

  it("points a language page at itself, not at the Ukrainian original", async () => {
    await renderAt("/en/contact");
    expect(head().canonical).toBe("https://angl-consulting.com/en/contact");
  });
});

describe("hreflang", () => {
  it("lists every language plus x-default, and is self-inclusive", async () => {
    await renderAt("/services");
    const alts = head().alternates;
    expect(alts).toEqual([
      { hreflang: "uk", href: "https://angl-consulting.com/services" },
      { hreflang: "en", href: "https://angl-consulting.com/en/services" },
      { hreflang: "ru", href: "https://angl-consulting.com/ru/services" },
      { hreflang: "x-default", href: "https://angl-consulting.com/services" },
    ]);
  });

  it("is reciprocal — the cluster is identical whichever language you land on", async () => {
    const seen: string[] = [];
    for (const path of ["/services", "/en/services", "/ru/services"]) {
      const { unmount } = await renderAt(path);
      seen.push(JSON.stringify(head().alternates));
      unmount();
    }
    // Google discards a cluster whose members disagree about each other.
    expect(new Set(seen).size).toBe(1);
  });

  it("x-default points at the unprefixed Ukrainian URL", () => {
    const xDefault = alternatesFor("/contact").find((a) => a.hreflang === "x-default");
    expect(xDefault?.href).toBe("https://angl-consulting.com/contact");
  });
});

describe("404", () => {
  it("is noindex so a missing page cannot be indexed while hosting still answers 200", async () => {
    await renderAt("/no-such-page");
    expect(head().robots).toBe("noindex, follow");
  });

  it("real pages stay indexable", async () => {
    await renderAt("/services");
    expect(head().robots).toBe("index, follow");
  });

  it("emits no canonical or hreflang, which would contradict the noindex", async () => {
    await renderAt("/no-such-page");
    const h = head();
    expect(h.canonical).toBeUndefined();
    expect(h.alternates).toEqual([]);
  });
});

describe("social tags", () => {
  it("points og:image at our own domain, not the Lovable preview bucket", async () => {
    await renderAt("/");
    const h = head();
    expect(h.ogImage).toBe("https://angl-consulting.com/og-image.jpg");
    expect(h.ogImage).not.toContain("r2.dev");
  });

  it("sets og:locale per language", async () => {
    for (const [path, locale] of [
      ["/", "uk_UA"],
      ["/en", "en_US"],
      ["/ru", "ru_RU"],
    ] as const) {
      const { unmount } = await renderAt(path);
      expect(head().ogLocale).toBe(locale);
      unmount();
    }
  });

  it("keeps og:title in step with the page title", async () => {
    await renderAt("/contact");
    const h = head();
    expect(h.ogTitle).toBe(h.title);
  });
});

describe("the static tags in index.html", () => {
  it("are replaced by the per-page ones, not duplicated alongside them", async () => {
    // index.html still ships fallback tags for crawlers that read the raw file.
    // If unhead appended instead of replacing, every page would serve two
    // conflicting og:title tags and the crawler would pick arbitrarily.
    document.head.innerHTML = `
      <title>ANGL Consulting — Бухгалтерські послуги</title>
      <meta name="description" content="STATIC">
      <meta property="og:title" content="STATIC">
      <meta property="og:description" content="STATIC">
      <meta property="og:url" content="https://angl-consulting.com/">
      <meta name="twitter:title" content="STATIC">
    `;
    await renderAt("/services");

    for (const sel of [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:url"]',
      'meta[name="twitter:title"]',
    ]) {
      expect(document.head.querySelectorAll(sel), `${sel} is duplicated`).toHaveLength(1);
      expect(document.head.querySelector(sel)?.getAttribute("content")).not.toBe("STATIC");
    }
    expect(document.title).toBe(
      `${translations.uk.seo.services.title}${translations.uk.seo.titleSuffix}`,
    );
  });
});

describe("seo helpers", () => {
  it("absoluteUrl does not produce a double slash or a trailing slash", () => {
    expect(absoluteUrl("/")).toBe("https://angl-consulting.com/");
    expect(absoluteUrl("/services")).toBe("https://angl-consulting.com/services");
    expect(absoluteUrl("/services/")).toBe("https://angl-consulting.com/services");
  });

  it("clampDescription keeps descriptions within the snippet limit, on a word boundary", () => {
    const long = "Побудова системи управлінського обліку ".repeat(10);
    const out = clampDescription(long);
    expect(out.length).toBeLessThanOrEqual(160);
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toMatch(/\s…$/);
  });

  it("clampDescription leaves short text untouched", () => {
    expect(clampDescription("Коротко.")).toBe("Коротко.");
  });

  it("fillTemplate substitutes tokens and leaves unknown ones visible", () => {
    expect(fillTemplate("{a} and {b}", { a: "x", b: "y" })).toBe("x and y");
    expect(fillTemplate("{missing}", {})).toBe("{missing}");
  });

  it("every description is written to fit, so none is served with an ellipsis", () => {
    for (const lang of ["uk", "en", "ru"] as const) {
      for (const key of ["home", "services", "contact", "resources", "notFound"] as const) {
        const written = translations[lang].seo[key].description;
        expect(written.length, `${lang}.${key} is ${written.length} chars: ${written}`).toBeLessThanOrEqual(160);
        // Written short enough that clamping is a no-op.
        expect(clampDescription(written)).toBe(written);
      }
    }
  });

  it("titles stay short enough not to be truncated in results", () => {
    for (const lang of ["uk", "en", "ru"] as const) {
      for (const key of ["home", "services", "contact", "resources"] as const) {
        const full = `${translations[lang].seo[key].title}${translations[lang].seo.titleSuffix}`;
        expect(full.length, `${lang}.${key} title is ${full.length} chars: ${full}`).toBeLessThanOrEqual(70);
      }
    }
  });

  it("alternatesFor matches withLang for every language", () => {
    for (const path of ["/", "/services", "/contact"]) {
      for (const lang of ["uk", "en", "ru"] as const) {
        const alt = alternatesFor(path).find((a) => a.hreflang === lang);
        expect(alt?.href).toBe(absoluteUrl(withLang(path, lang)));
      }
    }
  });
});
