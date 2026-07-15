/**
 * The site's route paths, language-agnostic and free of any component imports.
 *
 * Split from routes.tsx so the build tooling (the sitemap plugin in
 * vite.config.ts) can read the route list without pulling in the whole React
 * component tree. Both consume this list, so the sitemap and the router cannot
 * disagree about which pages exist.
 *
 * `path` has no leading slash and no language prefix; "" is the home page.
 */
export type RoutePath = {
  path: string;
  /** Dynamic routes are expanded per-slug by the sitemap; static ones listed as-is. */
  dynamic?: boolean;
};

export const routePaths: RoutePath[] = [
  { path: "" },
  { path: "services" },
  { path: "services/:slug", dynamic: true },
  { path: "contact" },
  { path: "resources" },
];

/** Static (non-parameterised) paths, with a leading slash. */
export const staticPaths: string[] = routePaths
  .filter((r) => !r.dynamic)
  .map((r) => (r.path === "" ? "/" : `/${r.path}`));
