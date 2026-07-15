// Relative, not "@/"-aliased: the sitemap plugin in vite.config.ts imports this
// module, and Vite bundles its own config before the alias config applies.
import type { Lang } from "../i18n/translations";
import { LANGS, DEFAULT_LANG, withLang } from "../i18n/routing";

/**
 * The production origin, hardcoded on purpose.
 *
 * Never derive this from window.location.origin: the same build is also served
 * from the *.lovable.app preview domain, which would then self-canonicalize and
 * compete with the real site instead of pointing at it. It must also stay
 * non-www — https://www.angl-consulting.com 302s to the bare domain, so the
 * bare domain is the one that serves 200s and the one to canonicalize to.
 */
export const SITE_URL = "https://angl-consulting.com";

export const SITE_NAME = "ANGL Consulting";

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Absolute URL for a site-absolute path. */
export const absoluteUrl = (path: string): string => {
  // Collapse leading slashes: "//services" would otherwise yield a
  // protocol-relative-looking "https://host//services".
  const clean = `/${path.replace(/^\/+/, "")}`;
  // Trailing slash only on the root, so /services and /services/ don't become two URLs.
  return `${SITE_URL}${clean === "/" ? "/" : clean.replace(/\/+$/, "")}`;
};

/** BCP 47 codes for hreflang. `uk`/`en`/`ru` are already valid language subtags. */
const HREFLANG: Record<Lang, string> = { uk: "uk", en: "en", ru: "ru" };

export type Alternate = { hreflang: string; href: string };

/**
 * The hreflang cluster for a page, given its language-agnostic path.
 *
 * Every language links to every other one, including itself — an hreflang set
 * must be reciprocal and self-inclusive or Google ignores it. x-default points
 * at Ukrainian, the unprefixed default.
 */
export const alternatesFor = (barePath: string): Alternate[] => [
  ...LANGS.map((l) => ({ hreflang: HREFLANG[l], href: absoluteUrl(withLang(barePath, l)) })),
  { hreflang: "x-default", href: absoluteUrl(withLang(barePath, DEFAULT_LANG)) },
];

/** Fills {token} placeholders in a copy template. */
export const fillTemplate = (template: string, values: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);

/**
 * Meta descriptions get truncated in results around ~160 characters. Cut on a
 * word boundary so the snippet doesn't end mid-word.
 *
 * Note for anyone writing serviceDesc-style templates: this cuts from the end,
 * so whatever you put last is what gets dropped. Lead with the facts that must
 * survive (price), not with prose.
 */
/**
 * If the last space falls before this fraction of the limit, the text is one
 * very long token and there is no sensible word boundary to cut on — take the
 * hard cut rather than throw most of the snippet away.
 */
const MIN_WORD_BOUNDARY_RATIO = 0.6;

export const clampDescription = (text: string, max = 160): string => {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const body = lastSpace > max * MIN_WORD_BOUNDARY_RATIO ? cut.slice(0, lastSpace) : cut;
  return `${body.replace(/[.,;:!?—-]+$/, "")}…`;
};

/** og:locale wants a territory, e.g. uk_UA. */
export const OG_LOCALE: Record<Lang, string> = {
  uk: "uk_UA",
  en: "en_US",
  ru: "ru_RU",
};
