import { translations } from "./translations";

/**
 * Human-readable URL slugs for the service catalog.
 *
 * Deliberately language-independent and hand-authored rather than derived from
 * `item.title`:
 *
 *  - Titles differ per language, so deriving slugs would produce a different URL
 *    per language and break the hreflang pairing between /services/x and
 *    /en/services/x — they must address the same resource.
 *  - Editors rename display titles; URLs must survive that. Deriving slugs from
 *    titles would silently change indexed URLs on a copy edit.
 *
 * Positional: catalogSlugs[ci][ii] addresses
 * translations.<lang>.catalog.categories[ci].items[ii]. This mirrors the
 * positional parity the catalog already relies on (ServiceDetail resolves an
 * index against whichever language is active), and catalogSlugs.test.ts fails
 * the build if the two ever drift apart.
 */
export const catalogSlugs: readonly (readonly string[])[] = [
  // 0 — Експертні консультації (разові послуги)
  ["individual-consultation", "written-expert-opinion", "strategic-session-business-owner"],
  // 1 — Фінансовий менеджмент та управлінський облік
  ["managerial-accounting-system", "cost-calculation-development", "financial-health-audit"],
  // 2 — Податковий консалтинг та захист бізнесу
  ["tax-structuring", "tax-audit-support", "vat-invoice-unblocking"],
  // 3 — Фінансовий моніторинг та банки
  ["financial-monitoring-support", "account-unblocking"],
  // 4 — Готові пакети для малого бізнесу
  ["safe-start-package", "outsourced-cfo-package"],
  // 5 — Онлайн-навчання та підвищення кваліфікації персоналу
  [
    "accountant-online-intensive",
    "excel-google-sheets-workshop",
    "corporate-team-course",
    "digital-instructions-regulations",
  ],
  // 6 — Міжнародна колаборація та вихід на ринок Німеччини
  [
    "german-market-entry",
    "datev-sap-integration-prep",
    "european-partners-calculation-base",
    "compliance-communication-support",
  ],
  // 7 — Незалежний фінансовий консалтинг у Німеччині
  [
    "insurance-germany",
    "pension-planning-germany",
    "investment-wealth-building",
    "financing-germany",
    "free-portfolio-analysis",
  ],
];

export type CatalogPosition = { ci: number; ii: number };

const bySlug = new Map<string, CatalogPosition>();
catalogSlugs.forEach((items, ci) =>
  items.forEach((slug, ii) => {
    bySlug.set(slug, { ci, ii });
  }),
);

/** Every service slug, in catalog order. Used by the sitemap and the prerenderer. */
export const allServiceSlugs: string[] = catalogSlugs.flatMap((items) => [...items]);

/** The canonical slug for a catalog position, or undefined if out of range. */
export const slugFor = (ci: number, ii: number): string | undefined => catalogSlugs[ci]?.[ii];

/** Resolve a human-readable slug to its catalog position. */
export const positionForSlug = (slug: string): CatalogPosition | undefined => bySlug.get(slug);

/** Matches the retired index-based URLs, e.g. `0-0`, `7-4`. */
const LEGACY_SLUG = /^(0|[1-9]\d*)-(0|[1-9]\d*)$/;

/**
 * Resolves a legacy `<category>-<item>` URL to its replacement slug so old links
 * and any already-indexed /services/0-0 URLs keep working. Returns undefined
 * when the slug isn't legacy-shaped or points outside the catalog.
 */
export const legacySlugToSlug = (slug: string): string | undefined => {
  const match = LEGACY_SLUG.exec(slug);
  if (!match) return undefined;
  return slugFor(Number(match[1]), Number(match[2]));
};

/** Catalog shape, derived from the source language. Exported for the parity test. */
export const catalogShape = (): number[] =>
  translations.uk.catalog.categories.map((c) => c.items.length);
