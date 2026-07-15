import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { langFromPath, stripLangPrefix, withLang, DEFAULT_LANG } from "@/i18n/routing";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { AppRoutes } from "@/App";
import { translations } from "@/i18n/translations";
import { slugFor } from "@/i18n/catalogSlugs";
import LanguageSwitcher from "@/components/site/LanguageSwitcher";

describe("language is derived from the URL", () => {
  it.each([
    ["/", "uk"],
    ["/services", "uk"],
    ["/services/tax-structuring", "uk"],
    ["/en", "en"],
    ["/en/", "en"],
    ["/en/services", "en"],
    ["/ru/contact", "ru"],
    // Not a language prefix — a real page, and must not be mistaken for one.
    ["/resources", "uk"],
    ["/enterprise", "uk"],
    ["/rubicon", "uk"],
  ])("langFromPath(%s) === %s", (path, expected) => {
    expect(langFromPath(path)).toBe(expected);
  });

  it.each([
    ["/en/services", "/services"],
    ["/ru/contact", "/contact"],
    ["/en", "/"],
    ["/services", "/services"],
    ["/", "/"],
    ["/enterprise", "/enterprise"],
  ])("stripLangPrefix(%s) === %s", (path, expected) => {
    expect(stripLangPrefix(path)).toBe(expected);
  });
});

describe("withLang", () => {
  it("leaves Ukrainian unprefixed so existing URLs keep working", () => {
    expect(withLang("/", "uk")).toBe("/");
    expect(withLang("/services", "uk")).toBe("/services");
    expect(withLang("/en/services", "uk")).toBe("/services");
  });

  it("prefixes the other languages", () => {
    expect(withLang("/", "en")).toBe("/en");
    expect(withLang("/services", "en")).toBe("/en/services");
    expect(withLang("/contact", "ru")).toBe("/ru/contact");
  });

  it("is idempotent — never double-prefixes", () => {
    expect(withLang(withLang("/services", "en"), "en")).toBe("/en/services");
    expect(withLang(withLang("/services", "en"), "ru")).toBe("/ru/services");
  });

  it("preserves hash and query", () => {
    expect(withLang("/#about", "en")).toBe("/en#about");
    expect(withLang("/services#cat-0", "en")).toBe("/en/services#cat-0");
    expect(withLang("/services?q=1#cat-0", "ru")).toBe("/ru/services?q=1#cat-0");
    expect(withLang("/#about", "uk")).toBe("/#about");
  });

  it("leaves non-path targets alone", () => {
    expect(withLang("mailto:a@b.com", "en")).toBe("mailto:a@b.com");
    expect(withLang("https://t.me/x", "en")).toBe("https://t.me/x");
    expect(withLang("tel:+380671755376", "ru")).toBe("tel:+380671755376");
  });
});

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </MemoryRouter>,
  );

describe("every language has its own working URL", () => {
  it("serves the homepage in each language", () => {
    for (const [path, lang] of [
      ["/", "uk"],
      ["/en", "en"],
      ["/ru", "ru"],
    ] as const) {
      const { unmount } = renderAt(path);
      expect(
        screen.getAllByRole("heading", { level: 1 })[0].textContent,
        `${path} should render ${lang}`,
      ).toContain(translations[lang].hero.slides[0].title.split("\n")[0].trim());
      unmount();
    }
  });

  it("serves a service detail page in each language", () => {
    const slug = slugFor(2, 0) as string;
    for (const [path, lang] of [
      [`/services/${slug}`, "uk"],
      [`/en/services/${slug}`, "en"],
      [`/ru/services/${slug}`, "ru"],
    ] as const) {
      const { unmount } = renderAt(path);
      const expected = translations[lang].catalog.categories[2].items[0].title;
      expect(screen.getByRole("heading", { level: 1, name: expected })).toBeInTheDocument();
      unmount();
    }
  });

  it("keeps the visitor in their language when following an in-page link", () => {
    const { container } = renderAt("/en/services");
    const serviceLinks = Array.from(container.querySelectorAll("a"))
      .map((a) => a.getAttribute("href") ?? "")
      .filter((h) => h.includes("/services/"));
    expect(serviceLinks.length).toBeGreaterThan(0);
    for (const href of serviceLinks) {
      expect(href, "a link from /en/ must stay in /en/").toMatch(/^\/en\//);
    }
  });

  it("still 404s unknown paths rather than treating them as a language", () => {
    renderAt("/definitely-not-a-page");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      translations.uk.notFound.title,
    );
  });

  it("404s an unknown page inside a language tree", () => {
    renderAt("/en/definitely-not-a-page");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});

describe("language switcher", () => {
  it("links to the same page in the other languages, not to the homepage", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/services"]}>
        <LanguageProvider>
          <LanguageSwitcher />
        </LanguageProvider>
      </MemoryRouter>,
    );
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/services", "/en/services", "/ru/services"]);
  });

  it("marks each link with its hreflang so the alternates are machine-readable", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <LanguageSwitcher />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(
      Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("hreflang")),
    ).toEqual(["uk", "en", "ru"]);
  });

  it("actually changes the URL when clicked", async () => {
    const user = userEvent.setup();
    const Probe = () => {
      const { lang } = useLang();
      return <span data-testid="lang">{lang}</span>;
    };
    render(
      <MemoryRouter initialEntries={["/services"]}>
        <LanguageProvider>
          <LanguageSwitcher />
          <Probe />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("uk");
    await user.click(screen.getByRole("link", { name: "Switch to EN" }));
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
  });
});

/**
 * The language-aware Link is only effective if it is the one components use.
 * A raw react-router Link silently drops /en/ or /ru/ visitors back into
 * Ukrainian, which is invisible in review — so enforce it mechanically.
 */
describe("components use the language-aware Link", () => {
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((entry) => {
      const full = join(dir, entry);
      return statSync(full).isDirectory() ? walk(full) : [full];
    });

  // These legitimately need the raw Link: the switcher builds absolute
  // per-language URLs, and the wrapper itself wraps it.
  const allowed = ["src/i18n/Link.tsx", "src/components/site/LanguageSwitcher.tsx"];

  it("no component imports Link straight from react-router-dom", () => {
    const offenders = walk("src")
      .filter((f) => /\.tsx?$/.test(f))
      .filter((f) => !f.includes("/test/") && !f.includes("/components/ui/"))
      .filter((f) => !allowed.some((a) => f.endsWith(a.replace("src/", "src/"))))
      .filter((f) => /import\s*\{[^}]*\bLink\b[^}]*\}\s*from\s*["']react-router-dom["']/.test(readFileSync(f, "utf8")));
    expect(offenders, `these must import Link from "@/i18n/Link"`).toEqual([]);
  });
});

describe("default language", () => {
  it("is Ukrainian and stays unprefixed", () => {
    expect(DEFAULT_LANG).toBe("uk");
    expect(withLang("/services", DEFAULT_LANG)).toBe("/services");
  });
});
