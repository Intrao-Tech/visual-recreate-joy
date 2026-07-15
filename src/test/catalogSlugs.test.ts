import { describe, it, expect } from "vitest";
import {
  catalogSlugs,
  allServiceSlugs,
  slugFor,
  positionForSlug,
  legacySlugToSlug,
} from "@/i18n/catalogSlugs";
import { translations, type Lang } from "@/i18n/translations";

const langs: Lang[] = ["uk", "en", "ru"];

/**
 * catalogSlugs is positional against translations.<lang>.catalog.categories.
 * If someone adds, removes or reorders a service without touching the slug
 * table, URLs silently start pointing at the wrong service. These tests are the
 * guard that makes that coupling safe — they must fail loudly on any drift.
 */
describe("catalog slug table stays in lockstep with the catalog", () => {
  it.each(langs)("has one slug per service in %s", (lang) => {
    const categories = translations[lang].catalog.categories;
    expect(catalogSlugs).toHaveLength(categories.length);
    categories.forEach((cat, ci) => {
      expect(catalogSlugs[ci]).toHaveLength(cat.items.length);
    });
  });

  it("all three languages describe the same catalog shape", () => {
    const shapes = langs.map((l) =>
      translations[l].catalog.categories.map((c) => c.items.length).join(","),
    );
    expect(new Set(shapes).size).toBe(1);
  });

  it("every slug is unique across the whole catalog", () => {
    expect(new Set(allServiceSlugs).size).toBe(allServiceSlugs.length);
  });

  it("covers all 26 services across 8 categories", () => {
    expect(catalogSlugs).toHaveLength(8);
    expect(allServiceSlugs).toHaveLength(26);
  });

  it("every slug is URL-safe and readable — no indices, no encoding needed", () => {
    for (const slug of allServiceSlugs) {
      expect(slug).toMatch(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/);
      expect(encodeURIComponent(slug)).toBe(slug);
      // The bug being fixed: index-shaped slugs like "0-0".
      expect(slug).not.toMatch(/^\d+-\d+$/);
    }
  });
});

describe("slug resolution", () => {
  it("round-trips every position through its slug and back", () => {
    translations.uk.catalog.categories.forEach((cat, ci) => {
      cat.items.forEach((_item, ii) => {
        const slug = slugFor(ci, ii);
        expect(slug).toBeDefined();
        expect(positionForSlug(slug as string)).toEqual({ ci, ii });
      });
    });
  });

  it("returns undefined for unknown slugs rather than a wrong service", () => {
    expect(positionForSlug("no-such-service")).toBeUndefined();
    expect(slugFor(99, 0)).toBeUndefined();
    expect(slugFor(0, 99)).toBeUndefined();
  });
});

describe("legacy /services/0-0 URLs still resolve", () => {
  it("maps every old index URL to its new slug", () => {
    translations.uk.catalog.categories.forEach((cat, ci) => {
      cat.items.forEach((_item, ii) => {
        expect(legacySlugToSlug(`${ci}-${ii}`)).toBe(slugFor(ci, ii));
      });
    });
  });

  it("ignores non-legacy and out-of-range input", () => {
    expect(legacySlugToSlug("individual-consultation")).toBeUndefined();
    expect(legacySlugToSlug("99-99")).toBeUndefined();
    // Leading zeros were never valid under the old route regex either.
    expect(legacySlugToSlug("00-1")).toBeUndefined();
    expect(legacySlugToSlug("01-1")).toBeUndefined();
  });
});
