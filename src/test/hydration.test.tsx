import { describe, it, expect, vi, afterEach } from "vitest";
import { hydrateRoot } from "react-dom/client";
import { act } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { BrowserRouter } from "react-router-dom";
import { createHead as createServerHead, UnheadProvider as ServerUnheadProvider } from "@unhead/react/server";
import { createHead as createClientHead, UnheadProvider as ClientUnheadProvider } from "@unhead/react/client";
import { AppShell } from "@/App";

/**
 * Hydration is the sharp edge of prerendering: if the server and client render
 * different trees, React throws the prerendered HTML away and re-renders, which
 * shows up as a flash and a console error — and nothing else fails, so it would
 * ship unnoticed.
 */
const serverRender = (url: string) =>
  renderToString(
    <ServerUnheadProvider value={createServerHead()}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </ServerUnheadProvider>,
  );

afterEach(() => {
  vi.restoreAllMocks();
  window.history.replaceState(null, "", "/");
});

describe("prerendered markup hydrates cleanly", () => {
  it.each(["/", "/services", "/contact", "/resources", "/services/tax-audit-support", "/en", "/ru/contact"])(
    "%s hydrates with no mismatch",
    async (url) => {
      const html = serverRender(url);
      expect(html).not.toBe("");

      window.history.replaceState(null, "", url);
      const container = document.createElement("div");
      container.innerHTML = html;
      document.body.appendChild(container);

      const errors: unknown[][] = [];
      vi.spyOn(console, "error").mockImplementation((...args) => errors.push(args));

      await act(async () => {
        hydrateRoot(
          container,
          <ClientUnheadProvider head={createClientHead()}>
            <BrowserRouter>
              <AppShell />
            </BrowserRouter>
          </ClientUnheadProvider>,
        );
      });

      const mismatches = errors
        .map((e) => String(e[0]))
        .filter((m) => /hydrat|did not match|Text content does not match/i.test(m));
      expect(mismatches, `hydration mismatch on ${url}:\n${mismatches.join("\n")}`).toEqual([]);

      container.remove();
    },
  );

  /**
   * The 404 page is the one file served at a URL other than the one it was
   * rendered at: dist/en/404.html is built from "/en/__404__" but served at
   * "/en/anything-missing". Language comes from the URL, so a single Ukrainian
   * 404.html served under /en/ would hydrate as English against Ukrainian
   * markup — a mismatch and a visible flash. Hence one 404 per language.
   */
  it.each([
    ["/__404__", "/definitely-missing", "uk"],
    ["/en/__404__", "/en/definitely-missing", "en"],
    ["/ru/__404__", "/ru/definitely-missing", "ru"],
  ])("404 built at %s hydrates cleanly when served at %s", async (buildUrl, servedUrl) => {
    const html = serverRender(buildUrl);

    window.history.replaceState(null, "", servedUrl);
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    const errors: unknown[][] = [];
    vi.spyOn(console, "error").mockImplementation((...args) => errors.push(args));

    await act(async () => {
      hydrateRoot(
        container,
        <ClientUnheadProvider head={createClientHead()}>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </ClientUnheadProvider>,
      );
    });

    const mismatches = errors
      .map((e) => String(e[0]))
      .filter((m) => /hydrat|did not match|Text content does not match/i.test(m));
    expect(
      mismatches,
      `${buildUrl} served at ${servedUrl} mismatched:\n${mismatches.join("\n")}`,
    ).toEqual([]);

    container.remove();
  });

  it("each language's 404 is built in that language", () => {
    expect(serverRender("/__404__")).toContain("Такої сторінки не існує");
    expect(serverRender("/en/__404__")).toContain("This page doesn");
    expect(serverRender("/ru/__404__")).toContain("Такой страницы не существует");
  });

  it("server and client produce identical markup for the same URL", () => {
    // Any divergence here is a hydration mismatch waiting to happen.
    for (const url of ["/", "/en/services", "/ru/services/tax-structuring"]) {
      window.history.replaceState(null, "", url);
      const server = serverRender(url);
      const client = renderToString(
        <ClientUnheadProvider head={createClientHead()}>
          <StaticRouter location={url}>
            <AppShell />
          </StaticRouter>
        </ClientUnheadProvider>,
      );
      expect(client, `${url} renders differently on server vs client`).toBe(server);
    }
  });
});
