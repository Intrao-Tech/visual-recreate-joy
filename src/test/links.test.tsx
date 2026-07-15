import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "@/components/site/Footer";
import Contact from "@/components/site/Contact";
import Navbar from "@/components/site/Navbar";
import Resources from "@/components/site/Resources";
import { LanguageProvider } from "@/i18n/LanguageContext";
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
