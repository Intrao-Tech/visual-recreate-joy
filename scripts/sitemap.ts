import { writeFileSync } from "node:fs";
import { allServiceSlugs } from "../src/i18n/catalogSlugs";
import { staticPaths } from "../src/routePaths";
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
  const barePaths = [...staticPaths, ...allServiceSlugs.map((s) => `/services/${s}`)];
  if (allServiceSlugs.length === 0) throw new Error("sitemap: catalog produced no service slugs");

  const entries = barePaths.flatMap((bare) => {
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

/** Writes public/sitemap.xml so the file is also present for `vite dev` and in git. */
export const writeSitemap = (outPath: string) => {
  const { xml, count } = buildSitemap();
  writeFileSync(outPath, xml);
  return count;
};
