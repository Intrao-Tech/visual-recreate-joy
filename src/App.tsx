import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { PREFIXED_LANGS } from "@/i18n/routing";
import { siteRoutes } from "./routes";

const queryClient = new QueryClient();

/**
 * Every route is declared once per language: Ukrainian bare (`/services`) plus
 * one prefixed tree per other language (`/en/services`, `/ru/services`).
 *
 * Declared explicitly rather than via an optional `/:lang?` segment, which
 * would match `/anything` as a language and quietly turn a typo into the
 * Ukrainian homepage instead of a 404.
 */
export const AppRoutes = () => (
  <Routes>
    {siteRoutes.map((r) => (
      <Route key={`uk-${r.path}`} path={`/${r.path}`} element={r.element} />
    ))}
    {PREFIXED_LANGS.flatMap((lang) =>
      siteRoutes.map((r) => (
        <Route key={`${lang}-${r.path}`} path={`/${lang}/${r.path}`} element={r.element} />
      )),
    )}
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

/**
 * Everything below the router. Kept router-free so the prerenderer can mount it
 * under a StaticRouter while the browser mounts it under a BrowserRouter — both
 * must render the identical tree or hydration mismatches.
 *
 * LanguageProvider reads the language off the URL, so it has to sit inside
 * whichever router wraps this.
 */
export const AppShell = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <ScrollToTop />
        <AppRoutes />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
