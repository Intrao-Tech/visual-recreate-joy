import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import { Providers } from "./providers";
import Index from "@/pages/Index";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import ResourcesPage from "@/pages/ResourcesPage";
import NotFound from "@/pages/NotFound";
import { translations } from "@/i18n/translations";

const renderPage = (ui: React.ReactNode) => render(<Providers>{ui}</Providers>);

/**
 * Every indexable page needs exactly one h1 — zero reads as thin content to
 * crawlers, and two makes the page's topic ambiguous. `/resources` and
 * `/contact` shipped with zero (their sections start at h2 because they are
 * also mounted on `/`, where Hero owns the h1).
 */
const pages: { name: string; ui: React.ReactNode }[] = [
  { name: "/", ui: <Index /> },
  { name: "/services", ui: <ServicesPage /> },
  { name: "/contact", ui: <ContactPage /> },
  { name: "/resources", ui: <ResourcesPage /> },
  { name: "404", ui: <NotFound /> },
];

describe("heading structure", () => {
  it.each(pages)("$name has exactly one h1", ({ ui }) => {
    const { container } = renderPage(ui);
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent?.trim()).not.toBe("");
  });

  it("the /resources h1 carries the section's real title, not a bolted-on string", () => {
    const { container } = renderPage(<ResourcesPage />);
    const h1 = container.querySelector("h1");
    // Same copy the section always displayed; only the tag changed.
    expect(h1?.textContent).toContain(translations.uk.resources.titlePre);
    expect(h1?.textContent).toContain(translations.uk.resources.titleItalic);
  });

  it("the /contact h1 carries the section's real title", () => {
    const { container } = renderPage(<ContactPage />);
    expect(container.querySelector("h1")?.textContent?.trim()).not.toBe("");
  });

  it("mounting Resources and Contact on / keeps them at h2 so Hero stays the only h1", () => {
    const { container } = renderPage(<Index />);
    const resources = container.querySelector("#resources");
    const contact = container.querySelector("#contact");
    expect(resources).not.toBeNull();
    expect(contact).not.toBeNull();
    expect(within(resources as HTMLElement).queryByRole("heading", { level: 1 })).toBeNull();
    expect(within(contact as HTMLElement).queryByRole("heading", { level: 1 })).toBeNull();
    expect(within(resources as HTMLElement).getAllByRole("heading", { level: 2 }).length).toBe(1);
    expect(within(contact as HTMLElement).getAllByRole("heading", { level: 2 }).length).toBe(1);
  });
});
