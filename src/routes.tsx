import Index from "./pages/Index.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import ServiceDetail from "./pages/ServiceDetail.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import ResourcesPage from "./pages/ResourcesPage.tsx";
import { routePaths } from "./routePaths";

/**
 * Binds each route path to its page. The path list lives in routePaths.ts so the
 * sitemap generator can read it without importing React components.
 */
const elements: Record<string, JSX.Element> = {
  "": <Index />,
  services: <ServicesPage />,
  "services/:slug": <ServiceDetail />,
  contact: <ContactPage />,
  resources: <ResourcesPage />,
};

export type SiteRoute = { path: string; element: JSX.Element };

export const siteRoutes: SiteRoute[] = routePaths.map((r) => {
  const element = elements[r.path];
  if (!element) throw new Error(`routes.tsx: no page bound to route "${r.path}"`);
  return { path: r.path, element };
});

export { staticPaths } from "./routePaths";
