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

  // A noindex page gets no canonical and no hreflang. Google's guidance is not
  // to mix noindex with rel=canonical: faced with both, it tends to honour the
  // canonical *over* the noindex — so a self-canonical here would argue for
  // indexing the very 404 we are trying to keep out of the index. 404s are also
  // not part of any language cluster: there is no Ukrainian equivalent of a URL
  // that doesn't exist.
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

  // og:url is dropped on noindex pages for the same reason as the canonical —
  // it is a canonical claim in Open Graph clothing. It also must not exist on
  // the 404: that page is prerendered once at a sentinel path and then served
  // at whatever URL is missing, so any URL baked into it is wrong by
  // construction.
  const ogUrl = noindex ? [] : [{ property: "og:url", content: canonical }];

  useHead({
    title: fullTitle,
    htmlAttrs: { lang },
    meta: [
      { name: "description", content: desc },
      { name: "robots", content: noindex ? "noindex, follow" : "index, follow" },

      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: OG_LOCALE[lang] },
      ...ogUrl,
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
