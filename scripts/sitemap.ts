import { writeFileSync } from "node:fs";
import { allServiceSlugs, catalogSlugs } from "../src/i18n/catalogSlugs";
import { barePaths } from "../src/urls";
import { LANGS, DEFAULT_LANG, withLang } from "../src/i18n/routing";
import { SITE_URL, absoluteUrl } from "../src/lib/seo";

/**
 * Builds sitemap.xml from the app's own route and catalog data.
 *
 * Generated, not hand-written: a hand-maintained sitemap drifts the moment
 * someone adds, removes or reorders a service — stale entries become soft-404s
 * and new services never get listed.
 *
 * It imports the very modules the app routes from, so the two cannot disagree
 * about which URLs exist. Run from the Vite plugin in vite.config.ts, which
 * means Vite compiles the TypeScript — no experimental Node flags, and no
 * dependency on the build host's Node version.
 */

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const priorityFor = (barePath: string) =>
  barePath === "/" ? "1.0" : barePath === "/services" ? "0.9" : "0.7";

export const buildSitemap = (): { xml: string; count: number } => {
  // Same list the prerenderer renders, so the sitemap can't advertise a URL
  // that was never written (a soft-404), or omit one that was.
  const paths = barePaths();
  if (allServiceSlugs.length === 0) throw new Error("sitemap: catalog produced no service slugs");

  const entries = paths.flatMap((bare) => {
    // The sitemap's alternates must match the ones the pages emit, or Google
    // discards the cluster. Same shape as alternatesFor() in src/lib/seo.ts.
    const alternates = [
      ...LANGS.map((l) => ({ hreflang: l as string, href: absoluteUrl(withLang(bare, l)) })),
      { hreflang: "x-default", href: absoluteUrl(withLang(bare, DEFAULT_LANG)) },
    ];
    const links = alternates
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${escapeXml(a.href)}"/>`)
      .join("\n");

    return LANGS.map(
      (lang) => `  <url>
    <loc>${escapeXml(absoluteUrl(withLang(bare, lang)))}</loc>
${links}
    <changefreq>monthly</changefreq>
    <priority>${priorityFor(bare)}</priority>
  </url>`,
    );
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
  return { xml, count: entries.length };
};

export const robotsTxt = () =>
  `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

/**
 * `_redirects` — real 301s from the retired index-based service URLs.
 *
 * Once every route is a real static file there is no SPA fallback to catch
 * /services/0-0, so those URLs would simply 404. The in-app redirect only fires
 * if the SPA loads, which on a static host it no longer does for a missing
 * path.
 *
 * Cloudflare Pages and Netlify both read this file, which upgrades the old
 * client-side shim to a genuine 301 — the redirect Google actually consolidates
 * ranking signals through. Lovable's hosting ignores it, but there the SPA
 * fallback still serves the shell and the in-app redirect handles it, so old
 * URLs work on both.
 */
export const buildRedirects = (): { text: string; count: number } => {
  const lines: string[] = [
    "# Retired index-based service URLs -> canonical slugs.",
    "# Generated from src/i18n/catalogSlugs.ts — do not edit by hand.",
  ];

  catalogSlugs.forEach((items, ci) =>
    items.forEach((slug, ii) => {
      for (const lang of LANGS) {
        const from = withLang(`/services/${ci}-${ii}`, lang);
        const to = withLang(`/services/${slug}`, lang);
        lines.push(`${from} ${to} 301`);
      }
    }),
  );

  return { text: `${lines.join("\n")}\n`, count: lines.length - 2 };
};

/** Writes public/sitemap.xml so the file is also present for `vite dev` and in git. */
export const writeSitemap = (outPath: string) => {
  const { xml, count } = buildSitemap();
  writeFileSync(outPath, xml);
  return count;
};

export const writeRedirects = (outPath: string) => {
  const { text, count } = buildRedirects();
  writeFileSync(outPath, text);
  return count;
};
