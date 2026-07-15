import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { createHead, UnheadProvider } from "@unhead/react/client";
import { LanguageProvider } from "@/i18n/LanguageContext";

/**
 * Wraps UI in the same providers main.tsx and App.tsx give it, so tests
 * exercise pages the way they actually render.
 *
 * A fresh head per call keeps tags from one test leaking into the next.
 */
export const Providers = ({ children, route = "/" }: { children: ReactNode; route?: string }) => (
  <UnheadProvider head={createHead()}>
    <MemoryRouter initialEntries={[route]}>
      <LanguageProvider>{children}</LanguageProvider>
    </MemoryRouter>
  </UnheadProvider>
);
