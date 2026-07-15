import { createContext, useContext } from "react";
import type { Lang } from "./translations";

/**
 * True when the current URL matches no route (the 404 page).
 *
 * Two things depend on it. The language switcher must not offer "this page in
 * English" for a page that doesn't exist — that link would just 404 again — so
 * on a 404 it points at each language's home instead. And because the 404 page
 * is prerendered once and then served at arbitrary missing URLs, anything that
 * renders from the current path would differ between build time and serve time
 * and break hydration. Linking to language roots is both the correct UX and the
 * only path-independent option.
 */
export const UnroutedContext = createContext(false);
export const useIsUnrouted = () => useContext(UnroutedContext);

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
