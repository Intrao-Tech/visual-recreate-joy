import { useHead } from "@unhead/react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { stripLangPrefix } from "@/i18n/routing";
import {
  SITE_NAME,
  OG_IMAGE,
  OG_LOCALE,
  absoluteUrl,
  alternatesFor,
  clampDescription,
} from "./seo";

export type SeoOptions = {
  /** Page title without the brand suffix — the suffix is appended here. */
  title: string;
  description: string;
  /** og:type; "website" for listing pages, "article" for a single service. */
  type?: "website" | "article";
  /** Keeps a page out of the index. Used by 404. */
  noindex?: boolean;
};

/**
 * Sets the per-page title, description, canonical and hreflang cluster.
 *
 * Uses @unhead rather than a useEffect that pokes document.title, because the
 * build-time prerenderer renders components to a string in Node, where effects
 * never run — an effect-based title would be invisible in the very HTML the
 * crawler reads, defeating the point.
 *
 * The canonical is always self-referencing and absolute against the production
 * origin, and it is built from the *current language's* URL so /en/services
 * canonicalizes to itself rather than to the Ukrainian page.
 */
export const useSeo = ({ title, description, type = "website", noindex = false }: SeoOptions) => {
  const { lang, t } = useLang();
  const { pathname } = useLocation();

  const barePath = stripLangPrefix(pathname);
  const canonical = absoluteUrl(pathname);
  const fullTitle = `${title}${t.seo.titleSuffix}`;
  const desc = clampDescription(description);

  // A noindex page gets no canonical and no hreflang: a canonical asks search
  // engines to index this URL while noindex tells them not to, and Google
  // discards contradictory pairs rather than guessing. 404s are also not part
  // of any language cluster — there is no Ukrainian "equivalent" of a URL that
  // doesn't exist.
  const indexingLinks = noindex
    ? []
    : [
        { rel: "canonical", href: canonical },
        ...alternatesFor(barePath).map((a) => ({
          rel: "alternate",
          hreflang: a.hreflang,
          href: a.href,
        })),
      ];

  useHead({
    title: fullTitle,
    htmlAttrs: { lang },
    meta: [
      { name: "description", content: desc },
      { name: "robots", content: noindex ? "noindex, follow" : "index, follow" },

      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: OG_LOCALE[lang] },
      { property: "og:url", content: canonical },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: desc },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    link: indexingLinks,
  });
};
