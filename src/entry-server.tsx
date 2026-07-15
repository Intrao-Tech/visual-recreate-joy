import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { createHead, UnheadProvider, transformHtmlTemplate } from "@unhead/react/server";
import { AppShell } from "./App";

// Re-exported so the prerender script gets the URL list from the same SSR
// bundle it renders with — one import, and no chance of the two disagreeing.
export { prerenderUrls } from "./urls";
export { PREFIXED_LANGS } from "./i18n/routing";

/**
 * Renders one route to complete HTML at build time.
 *
 * This is what makes the site's text exist for crawlers: previously Googlebot
 * received `<div id="root"></div>` and nothing else. Effects never run here, so
 * anything that only sets head tags in a useEffect would be invisible — which is
 * exactly why useSeo is built on @unhead (it writes during render) rather than
 * on document.title.
 */
export const render = async (url: string, template: string): Promise<string> => {
  // Server-side createHead/UnheadProvider — note the server provider takes
  // `value`, the client one takes `head`.
  const head = createHead();

  const appHtml = renderToString(
    <UnheadProvider value={head}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </UnheadProvider>,
  );

  const withApp = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  // Merges this route's title/meta/canonical/hreflang/JSON-LD into the template
  // head, replacing the static fallbacks rather than appending duplicates.
  return transformHtmlTemplate(head, withApp);
};
