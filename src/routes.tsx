import Index from "./pages/Index.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import ServiceDetail from "./pages/ServiceDetail.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import ResourcesPage from "./pages/ResourcesPage.tsx";

/**
 * The site's routes, language-agnostic. `path` has no leading slash and no
 * language prefix; App builds the Ukrainian (bare) and /en//ru/ trees from
 * this one list, and the sitemap generator reads it so the two can't disagree
 * about which pages exist.
 */
export type SiteRoute = {
  /** Language-agnostic path, no leading slash. "" is the home page. */
  path: string;
  element: JSX.Element;
  /** Dynamic routes are expanded per-slug by the sitemap; static ones are listed as-is. */
  dynamic?: boolean;
};

export const siteRoutes: SiteRoute[] = [
  { path: "", element: <Index /> },
  { path: "services", element: <ServicesPage /> },
  { path: "services/:slug", element: <ServiceDetail />, dynamic: true },
  { path: "contact", element: <ContactPage /> },
  { path: "resources", element: <ResourcesPage /> },
];

/** Static (non-parameterised) paths, with a leading slash. */
export const staticPaths: string[] = siteRoutes
  .filter((r) => !r.dynamic)
  .map((r) => (r.path === "" ? "/" : `/${r.path}`));
