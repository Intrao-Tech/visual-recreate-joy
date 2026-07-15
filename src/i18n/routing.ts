import type { Lang } from "./translations";

/**
 * Language lives in the URL, not in localStorage.
 *
 * Ukrainian stays unprefixed at `/` and is the x-default: those URLs are the
 * ones already indexed, and moving them to /uk/ would orphan every existing
 * link and ranking for no benefit. English and Russian get /en/ and /ru/
 * prefixes — new URLs with nothing to lose.
 */
export const DEFAULT_LANG: Lang = "uk";

/** Languages that carry a URL prefix. `uk` is served bare, so it is absent here. */
export const PREFIXED_LANGS = ["en", "ru"] as const;

export const LANGS: readonly Lang[] = ["uk", ...PREFIXED_LANGS];

const isPrefixedLang = (segment: string): segment is (typeof PREFIXED_LANGS)[number] =>
  (PREFIXED_LANGS as readonly string[]).includes(segment);

/** The language a pathname addresses. Unprefixed paths are the default language. */
export const langFromPath = (pathname: string): Lang => {
  const segment = pathname.split("/")[1] ?? "";
  return isPrefixedLang(segment) ? segment : DEFAULT_LANG;
};

/** Strips any `/en` or `/ru` prefix, returning the language-agnostic path. */
export const stripLangPrefix = (pathname: string): string => {
  const segment = pathname.split("/")[1] ?? "";
  if (!isPrefixedLang(segment)) return pathname || "/";
  const rest = pathname.slice(segment.length + 1);
  return rest === "" ? "/" : rest;
};

/**
 * Rewrites a link target into `lang`. Preserves query and hash, and leaves
 * anything that isn't a site-absolute path (mailto:, https://, tel:) untouched.
 */
export const withLang = (to: string, lang: Lang): string => {
  if (!to.startsWith("/")) return to;

  const marker = to.search(/[?#]/);
  const path = marker === -1 ? to : to.slice(0, marker);
  const suffix = marker === -1 ? "" : to.slice(marker);

  const bare = stripLangPrefix(path);
  if (lang === DEFAULT_LANG) return `${bare}${suffix}`;

  return `${bare === "/" ? `/${lang}` : `/${lang}${bare}`}${suffix}`;
};

/** Language-agnostic paths of every indexable route, used for hreflang and the sitemap. */
export const localizedPath = (path: string, lang: Lang): string => withLang(path, lang);
