import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { writeSitemap, writeRedirects } from "./scripts/sitemap";

/**
 * Regenerates the crawler-facing files that must track the app's own routes:
 * public/sitemap.xml and public/_redirects.
 *
 * Lives in the Vite config rather than a standalone node script so that Vite
 * compiles the TypeScript it imports: no experimental Node flags, and nothing
 * that depends on the build host's Node version.
 */
const seoFiles = (): Plugin => ({
  name: "angl-seo-files",
  // `buildStart` so the files exist in public/ before Vite copies them to dist/.
  buildStart() {
    const urls = writeSitemap(path.resolve(__dirname, "./public/sitemap.xml"));
    const redirects = writeRedirects(path.resolve(__dirname, "./public/_redirects"));
    this.info?.(`sitemap.xml: ${urls} URLs, _redirects: ${redirects} rules`);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      // The contact-form API lives in the Cloudflare Worker (src/worker.ts),
      // which Vite doesn't run. Start it alongside `npm run dev` with
      // `npx wrangler dev` (port 8787) to exercise the form locally.
      "/api": "http://localhost:8787",
    },
  },
  plugins: [react(), seoFiles(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
