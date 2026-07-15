import { useParams, Navigate } from "react-router-dom";
import { Link } from "@/i18n/Link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { positionForSlug, slugFor, legacySlugToSlug, type CatalogPosition } from "@/i18n/catalogSlugs";
import { withLang } from "@/i18n/routing";
import { useSeo } from "@/lib/useSeo";
import { fillTemplate } from "@/lib/seo";

/**
 * Resolves the URL to a catalog position and redirects if it doesn't name one.
 *
 * Split from the view below so that every hook the view needs — including
 * useSeo — runs unconditionally. Calling useSeo after these early returns would
 * change the hook count between renders and break the Rules of Hooks.
 */
const ServiceDetail = () => {
  const { lang } = useLang();
  const { slug = "" } = useParams();

  // Old index-based URLs (/services/0-0) may be indexed or linked from elsewhere;
  // send them to the canonical slug rather than dropping them on /services.
  // Client-side only — Lovable hosting cannot issue a real 301.
  const legacyTarget = legacySlugToSlug(slug);
  if (legacyTarget) {
    return <Navigate to={withLang(`/services/${legacyTarget}`, lang)} replace />;
  }

  const position = positionForSlug(slug);
  if (!position) return <Navigate to={withLang("/services", lang)} replace />;

  return <ServiceDetailView position={position} />;
};

const ServiceDetailView = ({ position }: { position: CatalogPosition }) => {
  const { t, lang } = useLang();
  const { ci, ii } = position;
  const cat = t.catalog.categories[ci];
  const item = cat?.items[ii];

  useSeo({
    title: fillTemplate(t.seo.serviceTitle, { service: item?.title ?? "", category: cat?.title ?? "" }),
    description: fillTemplate(t.seo.serviceDesc, {
      copy: item?.copy ?? "",
      price: item?.price ?? "",
      category: cat?.title ?? "",
      service: item?.title ?? "",
    }),
    type: "article",
  });

  // The slug table and the catalog are shape-checked against each other by
  // catalogSlugs.test.ts, so this is unreachable in practice — but a bad index
  // must not render a half-empty page.
  if (!cat || !item) return <Navigate to={withLang("/services", lang)} replace />;

  // Related items from same category (excluding current)
  const related = cat.items.map((it, idx) => ({ it, idx })).filter((x) => x.idx !== ii);

  const backLabel = { uk: "До всіх послуг", en: "Back to services", ru: "Ко всем услугам" };
  const moreLabel = { uk: "Інші послуги категорії", en: "More services in this category", ru: "Другие услуги категории" };
  const includesLabel = { uk: "Що входить", en: "What's included", ru: "Что входит" };
  const priceLabel = { uk: "Вартість", en: "Price", ru: "Стоимость" };

  return (
    <main className="min-h-screen bg-ink text-background">
      <Navbar />
      <section className="pt-40 pb-20">
        <div className="container max-w-5xl">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {backLabel[lang]}
          </Link>

          <div className="mt-8 flex items-baseline gap-4">
            <span className="text-sm text-background/50 tabular-nums">
              {ci < 9 ? `0${ci + 1}` : `${ci + 1}`}
            </span>
            <span className="text-sm text-background/60">{cat.title}</span>
          </div>

          <h1 className="mt-4 text-4xl md:text-6xl leading-[1.05]">{item.title}</h1>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <div>
                <span className="pill-light">{includesLabel[lang]}</span>
                <p className="mt-4 text-lg md:text-xl text-background/85 leading-relaxed">
                  {item.copy}
                </p>
              </div>

              {cat.note && (
                <p className="text-sm italic text-background/55 border-l-2 border-primary pl-4">
                  {cat.note}
                </p>
              )}
            </div>

            <aside className="rounded-3xl border border-background/10 bg-background/5 p-6 h-fit">
              <div className="text-xs uppercase tracking-widest text-background/50">
                {priceLabel[lang]}
              </div>
              <div className="mt-3 text-3xl font-display text-primary">{item.price}</div>
              <Link
                to="/contact"
                className="mt-6 inline-flex w-full items-center justify-between rounded-full bg-primary px-5 py-3 text-sm font-medium text-ink hover:bg-background transition-colors"
              >
                {t.nav.cta} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl md:text-3xl">{moreLabel[lang]}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {related.map(({ it, idx }) => (
                  <Link
                    key={idx}
                    to={`/services/${slugFor(ci, idx)}`}
                    className="group relative flex flex-col rounded-3xl border border-background/10 bg-background/5 p-6 transition-all duration-500 hover:bg-primary"
                  >
                    <h3 className="text-lg leading-snug">{it.title}</h3>
                    <p className="mt-3 text-sm text-background/65 group-hover:text-background/90 flex-1">
                      {it.copy}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-background/10 group-hover:border-background/30 pt-4">
                      <span className="text-base font-medium">{it.price}</span>
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ServiceDetail;
