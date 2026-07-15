import type { Lang, Dict } from "@/i18n/translations";
import { CONTACTS } from "./contacts";
import { SITE_URL, SITE_NAME, OG_IMAGE, absoluteUrl } from "./seo";

/**
 * Structured data, built only from facts the site actually states.
 *
 * Deliberately Organization, not LocalBusiness / AccountingService: those are
 * schema.org subtypes that expect a postal address, and the business has not
 * given us one — there is no address, city, EDRPOU or opening hours anywhere in
 * the codebase. Inventing them to unlock a richer type would be feeding Google
 * fabricated business data, which is both dishonest and a manual-action risk.
 * If the owner supplies a real address and hours, upgrading to
 * ProfessionalService/AccountingService becomes correct and worthwhile.
 */

/** Stable @id so Service.provider can reference the Organization instead of repeating it. */
export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export type JsonLd = Record<string, unknown>;

export const organizationLd = (): JsonLd => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  email: CONTACTS.email,
  telephone: CONTACTS.phone,
  // Only profiles the site actually links to.
  sameAs: [CONTACTS.telegramUrl, CONTACTS.facebookUrl],
  areaServed: "UA",
});

export const webSiteLd = (lang: Lang): JsonLd => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: lang,
  publisher: { "@id": ORG_ID },
});

/**
 * Pulls the numeric amount out of a localised price string.
 *
 * The digits are language-independent — "від 1 500 грн", "from 1 500 UAH" and
 * "от 1 500 грн" all carry the same number — so one parser serves all three.
 * Strings with no number ("Безкоштовно", "індивідуально") return undefined and
 * simply get no offer, rather than a made-up one.
 */
export const parseMinPrice = (price: string): number | undefined => {
  //   = non-breaking space, used as a thousands separator in this copy.
  const match = price.replace(/ /g, " ").match(/\d[\d ]*/);
  if (!match) return undefined;
  const value = Number(match[0].replace(/ /g, ""));
  return Number.isFinite(value) && value > 0 ? value : undefined;
};

type Item = Dict["catalog"]["categories"][number]["items"][number];

export const serviceLd = (item: Item, categoryTitle: string, url: string): JsonLd => {
  const minPrice = parseMinPrice(item.price);

  return {
    "@type": "Service",
    name: item.title,
    description: item.copy,
    serviceType: categoryTitle,
    url,
    provider: { "@id": ORG_ID },
    areaServed: "UA",
    // Every priced service is quoted "from X" — a minimum, not a fixed price.
    // Offer.price would assert a fixed amount we don't actually charge, so use
    // a minPrice specification. Services quoted free or "individually" carry no
    // offer at all rather than a fabricated number.
    ...(minPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "UAH",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice,
              priceCurrency: "UAH",
              valueAddedTaxIncluded: false,
            },
          },
        }
      : {}),
  };
};

export const breadcrumbLd = (
  trail: { name: string; path: string }[],
): JsonLd => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

/** Wraps nodes into a single @graph document — one script tag per page. */
export const graph = (nodes: JsonLd[]): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
