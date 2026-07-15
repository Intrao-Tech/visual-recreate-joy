import { allServiceSlugs } from "./i18n/catalogSlugs";
import { staticPaths } from "./routePaths";
import { LANGS, withLang } from "./i18n/routing";

/**
 * Every indexable URL on the site, language-prefixed.
 *
 * Single source of truth shared by the sitemap generator and the prerenderer:
 * if the sitemap advertised a URL the prerenderer never wrote, that URL would
 * be a soft-404 for crawlers — and vice versa, a prerendered page missing from
 * the sitemap is a page nobody finds.
 */

/** Language-agnostic paths: the static routes plus one per service. */
export const barePaths = (): string[] => [
  ...staticPaths,
  ...allServiceSlugs.map((slug) => `/services/${slug}`),
];

/** Every path × every language. 30 pages × 3 languages = 90. */
export const prerenderUrls = (): string[] =>
  barePaths().flatMap((path) => LANGS.map((lang) => withLang(path, lang)));
