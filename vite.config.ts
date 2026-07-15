import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { writeSitemap } from "./scripts/sitemap";

/**
 * Regenerates public/sitemap.xml from the app's own routes on every build.
 *
 * Lives in the Vite config rather than a standalone node script so that Vite
 * compiles the TypeScript it imports: no experimental Node flags, and nothing
 * that depends on the build host's Node version.
 */
const sitemap = (): Plugin => ({
  name: "angl-sitemap",
  // `buildStart` so the file exists in public/ before Vite copies it to dist/.
  buildStart() {
    const count = writeSitemap(path.resolve(__dirname, "./public/sitemap.xml"));
    this.info?.(`sitemap.xml: ${count} URLs`);
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
  },
  plugins: [react(), sitemap(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
