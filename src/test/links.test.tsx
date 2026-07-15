import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Footer from "@/components/site/Footer";
import Contact from "@/components/site/Contact";
import Navbar from "@/components/site/Navbar";
import Resources from "@/components/site/Resources";
import Services from "@/components/site/Services";
import Steps from "@/components/site/Steps";
import ServiceDetail from "@/pages/ServiceDetail";
import ServicesPage from "@/pages/ServicesPage";
import NotFound from "@/pages/NotFound";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { slugFor } from "@/i18n/catalogSlugs";
import { CONTACTS } from "@/lib/contacts";

const renderAt = (ui: React.ReactNode) =>
  render(
    <MemoryRouter>
      <LanguageProvider>{ui}</LanguageProvider>
    </MemoryRouter>,
  );

const hrefs = (c: HTMLElement) =>
  Array.from(c.querySelectorAll("a")).map((a) => a.getAttribute("href") ?? "");

describe("contact links", () => {
  it("footer exposes real, reachable contacts", () => {
    const { container } = renderAt(<Footer />);
    const h = hrefs(container);
    expect(h).toContain(`mailto:${CONTACTS.email}`);
    expect(h).toContain(`tel:${CONTACTS.phone}`);
    expect(h).toContain(CONTACTS.telegramUrl);
    expect(h).toContain(CONTACTS.facebookUrl);
    expect(h).toContain("/contact");
    expect(h).toContain("/#about");
    // visible text
    expect(screen.getByText(CONTACTS.email)).toBeInTheDocument();
    expect(screen.getByText(CONTACTS.phoneDisplay)).toBeInTheDocument();
  });

  it("groups every channel — including Facebook — inside the Contact column", () => {
    const { container } = renderAt(<Footer />);
    const col = Array.from(container.querySelectorAll<HTMLElement>(".grid.md\\:grid-cols-12 > div")).find(
      (d) => d.querySelector("a")?.getAttribute("href") === `mailto:${CONTACTS.email}`,
    );
    expect(col, "no column owns the email link").toBeDefined();
    expect(hrefs(col!)).toEqual([
      `mailto:${CONTACTS.email}`,
      `tel:${CONTACTS.phone}`,
      CONTACTS.telegramUrl,
      CONTACTS.facebookUrl,
    ]);
    // each channel appears exactly once in the whole footer
    for (const url of [CONTACTS.telegramUrl, CONTACTS.facebookUrl]) {
      expect(hrefs(container).filter((h) => h === url)).toHaveLength(1);
    }
  });

  it("no component ships a dead or placeholder link", () => {
    for (const ui of [<Footer />, <Contact />, <Navbar />, <Resources />]) {
      const { container, unmount } = renderAt(ui);
      for (const href of hrefs(container)) {
        expect(href, `dead href in ${JSON.stringify(href)}`).not.toBe("#");
        expect(href).not.toBe("");
        expect(href).not.toMatch(/anglconsulting\.com|380 ?12 ?345|javascript:void/);
        expect(href).not.toMatch(/^https:\/\/(www\.)?(facebook|instagram)\.com\/?$/);
      }
      unmount();
    }
  });

  it("every external social link is a full deep link opened safely", () => {
    const { container } = renderAt(<Footer />);
    const ext = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("http"),
    );
    expect(ext.length).toBeGreaterThan(0);
    for (const a of ext) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
      expect(a.getAttribute("href")!.split("/").length).toBeGreaterThan(3);
    }
  });

  it("icon-only links still carry an accessible name", () => {
    for (const ui of [<Footer />, <Contact />]) {
      const { container, unmount } = renderAt(ui);
      const iconOnly = Array.from(container.querySelectorAll("a")).filter(
        (a) => !a.textContent?.trim() && a.querySelector("svg"),
      );
      expect(iconOnly.length).toBeGreaterThan(0);
      for (const a of iconOnly) {
        expect(a.getAttribute("aria-label"), `icon link ${a.getAttribute("href")} has no label`).toBeTruthy();
      }
      unmount();
    }
  });

  it("resources CTA points to a route that exists, not a missing anchor", () => {
    const { container } = renderAt(<Resources />);
    const h = hrefs(container);
    expect(h.every((x) => x !== "#contact")).toBe(true);
    expect(h).toContain("/contact");
  });

  it("navbar CTA uses SPA routing", () => {
    const { container } = renderAt(<Navbar />);
    expect(hrefs(container)).toContain("/contact");
  });

  it("contact section links out to email, phone, telegram, facebook", () => {
    const { container } = renderAt(<Contact />);
    const h = hrefs(container);
    expect(h).toContain(`mailto:${CONTACTS.email}`);
    expect(h).toContain(`tel:${CONTACTS.phone}`);
    expect(h).toContain(CONTACTS.telegramUrl);
    expect(h).toContain(CONTACTS.facebookUrl);
  });
});

describe("mobile navigation", () => {
  it("reaches every destination on a phone, where the desktop nav is hidden", async () => {
    const user = userEvent.setup();
    const { container } = renderAt(<Navbar />);

    // Nothing is open until the user asks for it.
    expect(container.querySelector("#mobile-nav")).toBeNull();

    await user.click(screen.getByRole("button", { name: translations.uk.nav.menu }));
    const panel = container.querySelector("#mobile-nav");
    expect(panel, "hamburger did not open a nav panel").not.toBeNull();

    // The panel must carry the full destination set, not a subset.
    expect(hrefs(panel as HTMLElement)).toEqual(["/", "/#about", "/services", "/resources", "/contact", "/contact"]);

    await user.click(screen.getByRole("button", { name: translations.uk.nav.close }));
    expect(container.querySelector("#mobile-nav")).toBeNull();
  });

  it("labels the toggle for screen readers in the active language", async () => {
    const user = userEvent.setup();
    renderAt(<Navbar />);
    const toggle = screen.getByRole("button", { name: translations.uk.nav.menu });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-nav");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});

describe("service detail slugs", () => {
  const renderSlug = (slug: string) =>
    render(
      <MemoryRouter initialEntries={[`/services/${slug}`]}>
        <LanguageProvider>
          <Routes>
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>,
    );

  it("renders the addressed service for a canonical slug", () => {
    renderSlug("financial-health-audit");
    const { title } = translations.uk.catalog.categories[1].items[2];
    expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
  });

  it("redirects non-canonical spellings instead of serving duplicate pages", () => {
    // Each of these used to resolve to a real page, giving one service many URLs.
    for (const slug of ["-1", "01-02", "1.0-2", "1-2-3", "1e0-2", "%201-2", "1", "abc", "8-0", "7-5"]) {
      const { container, unmount } = renderSlug(slug);
      // The catalog listing renders category anchors; a detail page never does.
      expect(container.querySelector("#cat-0"), `/services/${slug} served a detail page`).not.toBeNull();
      unmount();
    }
  });

  it("every catalog entry has a reachable detail page", () => {
    translations.uk.catalog.categories.forEach((cat, ci) =>
      cat.items.forEach((item, ii) => {
        const { unmount } = renderSlug(slugFor(ci, ii) as string);
        expect(screen.getByRole("heading", { level: 1, name: item.title })).toBeInTheDocument();
        unmount();
      }),
    );
  });

  it("retired /services/0-0 URLs still land on the right service", () => {
    // Old index URLs may be indexed or linked externally; they must not 404 or
    // land on the wrong service.
    translations.uk.catalog.categories.forEach((cat, ci) =>
      cat.items.forEach((item, ii) => {
        const { unmount } = renderSlug(`${ci}-${ii}`);
        expect(screen.getByRole("heading", { level: 1, name: item.title })).toBeInTheDocument();
        unmount();
      }),
    );
  });

  it("links out of the catalog use readable slugs, never indices", () => {
    const { container } = renderAt(<ServicesPage />);
    const serviceLinks = hrefs(container).filter((h) => h.startsWith("/services/"));
    expect(serviceLinks).toHaveLength(26);
    for (const href of serviceLinks) {
      expect(href).not.toMatch(/^\/services\/\d+-\d+$/);
      expect(href.replace("/services/", "")).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });
});

describe("404 page", () => {
  it("is translated and keeps the visitor inside the SPA", () => {
    const { container } = renderAt(<NotFound />);
    expect(screen.getByRole("heading", { level: 1, name: translations.uk.notFound.title })).toBeInTheDocument();
    // Not the English scaffold copy.
    expect(container.textContent).not.toMatch(/Oops! Page not found|Return to Home/);
    // Navbar + Footer present, so it is not a dead end.
    expect(hrefs(container)).toContain("/services");
    expect(hrefs(container)).toContain(`mailto:${CONTACTS.email}`);
  });
});

describe("imagery", () => {
  it("never renders an image without a source", () => {
    // Guards the image arrays that run parallel to translated content.
    for (const ui of [<Services />, <Steps />, <Resources />]) {
      const { container, unmount } = render(
        <MemoryRouter>
          <LanguageProvider>{ui}</LanguageProvider>
        </MemoryRouter>,
      );
      const imgs = Array.from(container.querySelectorAll("img"));
      expect(imgs.length).toBeGreaterThan(0);
      for (const img of imgs) {
        expect(img.getAttribute("src"), `image "${img.getAttribute("alt")}" has no src`).toBeTruthy();
      }
      unmount();
    }
  });

  it("gives every catalog category its own image", () => {
    const { container } = render(
      <MemoryRouter>
        <LanguageProvider>
          <Services />
        </LanguageProvider>
      </MemoryRouter>,
    );
    // The carousel duplicates the list, so dedupe by alt text before comparing.
    const byAlt = new Map(
      Array.from(container.querySelectorAll("img")).map((i) => [i.getAttribute("alt"), i.getAttribute("src")]),
    );
    const srcs = translations.uk.catalog.categories.map((c) => byAlt.get(c.title));
    expect(srcs.every(Boolean), "a category rendered with no image").toBe(true);
    expect(new Set(srcs).size, "two categories share an image").toBe(srcs.length);
  });
});
