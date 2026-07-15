import { describe, it, expect, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { Providers } from "./providers";
import { AppRoutes } from "@/App";
import { translations } from "@/i18n/translations";
import { allServiceSlugs, positionForSlug } from "@/i18n/catalogSlugs";
import { parseMinPrice, ORG_ID } from "@/lib/jsonLd";
import { CONTACTS } from "@/lib/contacts";

/**
 * JSON-LD graph nodes are heterogeneous by design — Organization, Service and
 * BreadcrumbList share no shape. Narrowing every field access here would bury
 * the assertions in type guards for no safety gain: these tests read parsed
 * JSON and assert on it, which is exactly what `any` is for.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Node = Record<string, any>;

const renderLd = async (path: string) => {
  const utils = render(
    <Providers route={path}>
      <AppRoutes />
    </Providers>,
  );
  await waitFor(() =>
    expect(document.querySelector('script[type="application/ld+json"]')).not.toBeNull(),
  );
  const raw = document.querySelector('script[type="application/ld+json"]')!.innerHTML;
  return { ...utils, graph: JSON.parse(raw) as { "@context": string; "@graph": Node[] } };
};

const nodeOfType = (graph: { "@graph": Node[] }, type: string) =>
  graph["@graph"].find((n) => n["@type"] === type);

beforeEach(() => {
  document.head.innerHTML = "";
});

describe("json-ld is emitted and well-formed", () => {
  it("puts exactly one ld+json block on a page", async () => {
    await renderLd("/");
    expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1);
  });

  it("is valid JSON with a schema.org context", async () => {
    const { graph } = await renderLd("/");
    expect(graph["@context"]).toBe("https://schema.org");
    expect(Array.isArray(graph["@graph"])).toBe(true);
  });
});

describe("Organization", () => {
  it("carries only contact details the site actually publishes", async () => {
    const { graph } = await renderLd("/");
    const org = nodeOfType(graph, "Organization")!;
    expect(org.name).toBe("ANGL Consulting");
    expect(org.url).toBe("https://angl-consulting.com/");
    expect(org.email).toBe(CONTACTS.email);
    expect(org.telephone).toBe(CONTACTS.phone);
    expect(org.sameAs).toEqual([CONTACTS.telegramUrl, CONTACTS.facebookUrl]);
  });

  /**
   * The business has given us no address, city, EDRPOU or opening hours.
   * LocalBusiness/AccountingService imply a physical presence and expect an
   * address; claiming one we don't have would be fabricated business data.
   */
  it("is not typed as a LocalBusiness, and invents no address or hours", async () => {
    const { graph } = await renderLd("/");
    const org = nodeOfType(graph, "Organization")!;
    expect(org["@type"]).toBe("Organization");
    expect(org.address).toBeUndefined();
    expect(org.openingHours).toBeUndefined();
    expect(org.openingHoursSpecification).toBeUndefined();
    expect(org.geo).toBeUndefined();
    expect(org.priceRange).toBeUndefined();
    for (const node of graph["@graph"]) {
      expect(["LocalBusiness", "AccountingService", "ProfessionalService"]).not.toContain(
        node["@type"],
      );
    }
  });

  it("is referenced by @id rather than repeated on service pages", async () => {
    const { graph } = await renderLd("/services/tax-audit-support");
    const service = nodeOfType(graph, "Service")!;
    expect(service.provider).toEqual({ "@id": ORG_ID });
  });
});

describe("Service", () => {
  it("describes the service the URL addresses", async () => {
    const { graph } = await renderLd("/services/tax-audit-support");
    const service = nodeOfType(graph, "Service")!;
    const pos = positionForSlug("tax-audit-support")!;
    const item = translations.uk.catalog.categories[pos.ci].items[pos.ii];
    expect(service.name).toBe(item.title);
    expect(service.description).toBe(item.copy);
    expect(service.serviceType).toBe(translations.uk.catalog.categories[pos.ci].title);
    expect(service.url).toBe("https://angl-consulting.com/services/tax-audit-support");
  });

  /**
   * Every priced service is quoted "from X" — a minimum. Offer.price would
   * assert a fixed amount the business does not charge.
   */
  it("states a minimum price, never a fixed one", async () => {
    const { graph } = await renderLd("/services/tax-audit-support");
    const offers = nodeOfType(graph, "Service")!.offers;
    expect(offers.price).toBeUndefined();
    expect(offers.priceSpecification.minPrice).toBe(10000);
    expect(offers.priceSpecification.priceCurrency).toBe("UAH");
  });

  it("omits the offer entirely when the service has no numeric price", async () => {
    // "Безкоштовно" / "індивідуально" — no number to state honestly.
    const { graph } = await renderLd("/services/free-portfolio-analysis");
    expect(nodeOfType(graph, "Service")!.offers).toBeUndefined();
  });

  it("localises the service node", async () => {
    const { graph } = await renderLd("/en/services/tax-audit-support");
    const service = nodeOfType(graph, "Service")!;
    const pos = positionForSlug("tax-audit-support")!;
    expect(service.name).toBe(translations.en.catalog.categories[pos.ci].items[pos.ii].title);
    expect(service.url).toBe("https://angl-consulting.com/en/services/tax-audit-support");
  });

  it("emits a valid node for every one of the 26 services", async () => {
    for (const slug of allServiceSlugs) {
      const { graph, unmount } = await renderLd(`/services/${slug}`);
      const service = nodeOfType(graph, "Service");
      expect(service, `no Service node for ${slug}`).toBeDefined();
      expect(service!.name, `empty name for ${slug}`).toBeTruthy();
      expect(service!.description, `empty description for ${slug}`).toBeTruthy();
      if (service!.offers) {
        expect(service!.offers.priceSpecification.minPrice).toBeGreaterThan(0);
      }
      unmount();
      document.head.innerHTML = "";
    }
  });
});

describe("BreadcrumbList", () => {
  it("traces home -> services -> service with absolute URLs", async () => {
    const { graph } = await renderLd("/services/tax-audit-support");
    const crumbs = nodeOfType(graph, "BreadcrumbList")!.itemListElement;
    expect(crumbs).toHaveLength(3);
    expect(crumbs.map((c: Node) => c.position)).toEqual([1, 2, 3]);
    expect(crumbs[0].item).toBe("https://angl-consulting.com/");
    expect(crumbs[1].item).toBe("https://angl-consulting.com/services");
    expect(crumbs[2].item).toBe("https://angl-consulting.com/services/tax-audit-support");
  });

  it("stays inside the language tree", async () => {
    const { graph } = await renderLd("/ru/services/tax-audit-support");
    const crumbs = nodeOfType(graph, "BreadcrumbList")!.itemListElement;
    expect(crumbs[0].item).toBe("https://angl-consulting.com/ru");
    expect(crumbs[1].item).toBe("https://angl-consulting.com/ru/services");
  });
});

describe("parseMinPrice", () => {
  it("reads the same number out of all three languages", () => {
    expect(parseMinPrice("від 1 500 грн / год")).toBe(1500);
    expect(parseMinPrice("from 1 500 UAH / hour")).toBe(1500);
    expect(parseMinPrice("от 1 500 грн / час")).toBe(1500);
  });

  it("handles the non-breaking space used as a thousands separator", () => {
    expect(parseMinPrice("від 20 000 грн / місяць")).toBe(20000);
    expect(parseMinPrice("від 20 000 грн")).toBe(20000);
  });

  it("takes the price, not a number that happens to follow it", () => {
    expect(parseMinPrice("від 4 000 грн (або еквівалент у €)")).toBe(4000);
  });

  it("returns undefined rather than inventing a price", () => {
    expect(parseMinPrice("Безкоштовно")).toBeUndefined();
    expect(parseMinPrice("Free")).toBeUndefined();
    expect(parseMinPrice("індивідуально")).toBeUndefined();
    expect(parseMinPrice("Безкоштовна консультація")).toBeUndefined();
    expect(parseMinPrice("")).toBeUndefined();
  });

  it("agrees across languages for every catalog entry", () => {
    translations.uk.catalog.categories.forEach((cat, ci) =>
      cat.items.forEach((_item, ii) => {
        const prices = (["uk", "en", "ru"] as const).map((l) =>
          parseMinPrice(translations[l].catalog.categories[ci].items[ii].price),
        );
        expect(new Set(prices).size, `price disagrees across languages at ${ci}-${ii}`).toBe(1);
      }),
    );
  });
});
