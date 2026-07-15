import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "@/i18n/Link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { UnroutedContext } from "@/i18n/routing";
import { useSeo } from "@/lib/useSeo";

const NotFound = () => {
  const { t } = useLang();
  const location = useLocation();

  // Hosting still answers 200 here (see the prerender/hosting work), so the
  // noindex is what actually keeps missing pages out of the index for now.
  useSeo({ ...t.seo.notFound, noindex: true });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    // Tells the language switcher this URL exists in no language, so it links
    // to each language's home rather than to a path that would 404 again — and
    // renders nothing derived from the current path, which is what lets the
    // prerendered 404 hydrate cleanly at whatever missing URL it is served at.
    <UnroutedContext.Provider value={true}>
      <main className="min-h-screen bg-ink text-background flex flex-col">
        <Navbar />
        <section className="flex-1 pt-40 pb-20">
          <div className="container max-w-3xl">
            <span className="pill-light">404</span>
            <h1 className="mt-6 text-5xl md:text-6xl leading-[1.05]">{t.notFound.title}</h1>
            <p className="mt-6 text-background/70 max-w-md">{t.notFound.desc}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-background hover:text-ink transition-colors"
              >
                {t.notFound.button} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-3 text-sm text-background/80 hover:border-primary hover:text-primary transition-colors"
              >
                {t.nav.services}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-3 text-sm text-background/80 hover:border-primary hover:text-primary transition-colors"
              >
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </UnroutedContext.Provider>
  );
};

export default NotFound;
