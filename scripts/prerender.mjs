/**
 * Writes a real HTML file for every route, so crawlers get content instead of
 * an empty `<div id="root"></div>`.
 *
 * Runs after both Vite builds:
 *   1. `vite build`                              -> dist/ (client bundle + index.html)
 *   2. `vite build --ssr src/entry-server.tsx`   -> dist/server/ (Node-runnable app)
 *   3. this script                               -> dist/**\/index.html
 *
 * The URL list comes from the same module the sitemap uses, so the sitemap, the
 * router and the prerendered files cannot disagree about which pages exist.
 *
 * Fails loudly and non-zero on any error: a half-finished prerender silently
 * ships empty shells for the routes it never reached, and nothing downstream
 * would notice — the build would still look green.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

// The SSR bundle is built outside dist/ on purpose — it is a build tool, not
// something to upload to the CDN.
const { render, prerenderUrls } = await import(
  pathToFileURL(join(root, ".prerender/entry-server.js")).href
);

const templatePath = join(dist, "index.html");
if (!existsSync(templatePath)) {
  throw new Error("prerender: dist/index.html is missing — run `vite build` first");
}
const template = readFileSync(templatePath, "utf8");

const urls = prerenderUrls();
if (urls.length === 0) throw new Error("prerender: no URLs to render");

/** "/" -> dist/index.html, "/en/services" -> dist/en/services/index.html */
const outputPathFor = (url) =>
  url === "/" ? join(dist, "index.html") : join(dist, url.replace(/^\//, ""), "index.html");

let written = 0;
const failures = [];

for (const url of urls) {
  try {
    const html = await render(url, template);

    // A silent regression to guard against: if the app ever fails to render,
    // renderToString returns an empty string and we would happily write the
    // same empty shell we are trying to eliminate.
    if (!/<div id="root">\s*<[^>]/.test(html)) {
      throw new Error("rendered markup is empty");
    }

    const out = outputPathFor(url);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    written++;
  } catch (error) {
    failures.push(`${url}: ${error.message}`);
  }
}

/**
 * dist/404.html — the styled NotFound page, prerendered.
 *
 * This is what fixes "unknown URLs return 200": on a static host with no
 * catch-all rewrite, a path with no matching file is genuinely missing, and the
 * host answers 404 while serving this document. Every real route now exists as
 * a real file, so the SPA fallback that caused the 200s isn't needed any more.
 *
 * Hosts that use this convention include Cloudflare Pages, Netlify and GitHub
 * Pages. Lovable's own hosting ignores it and keeps answering 200 — its
 * extensionless SPA fallback is not configurable from this repo, which is why
 * point 4 only lands once hosting moves.
 */
try {
  const html = await render("/__404__", template);
  writeFileSync(join(dist, "404.html"), html);
  written++;
} catch (error) {
  failures.push(`404.html: ${error.message}`);
}

if (failures.length > 0) {
  console.error(`\nprerender FAILED for ${failures.length} route(s):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}

console.log(`prerender: ${urls.length} routes + 404.html written as static HTML`);
