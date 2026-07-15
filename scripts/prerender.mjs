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
const { render, prerenderUrls, PREFIXED_LANGS } = await import(
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
 * 404.html — the styled NotFound page, prerendered once per language.
 *
 * This is what fixes "unknown URLs return 200". Cloudflare Pages: "If your
 * project does not include a top-level 404.html file, Pages assumes that you
 * are deploying a single-page application" and routes every path to `/`. The
 * presence of this file is what turns that off, so a path with no matching
 * file is genuinely missing and the host answers a real 404.
 *
 * One per language because Pages "will continue to look up the directory tree
 * for a matching 404.html file": /en/nope finds dist/en/404.html. A single
 * Ukrainian 404.html would be served for /en/nope too, and the client — which
 * reads the language from the URL — would hydrate it as English against
 * Ukrainian markup, mismatch, and re-render with a visible flash.
 *
 * Lovable's hosting ignores all of this and keeps answering 200; its
 * extensionless SPA fallback isn't configurable from this repo, which is why
 * point 4 only lands once hosting moves.
 */
const notFoundPages = [
  { path: "404.html", url: "/__404__" },
  ...PREFIXED_LANGS.map((lang) => ({ path: `${lang}/404.html`, url: `/${lang}/__404__` })),
];

for (const page of notFoundPages) {
  try {
    const html = await render(page.url, template);
    const out = join(dist, page.path);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    written++;
  } catch (error) {
    failures.push(`${page.path}: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error(`\nprerender FAILED for ${failures.length} route(s):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}

console.log(
  `prerender: ${urls.length} routes + ${notFoundPages.length} 404 pages written as static HTML`,
);
