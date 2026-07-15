import { Link } from "@/i18n/Link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { slugFor } from "@/i18n/catalogSlugs";

const ServicesPage = () => {
  const { t } = useLang();
  return (
    <main className="min-h-screen bg-ink text-background">
      <Navbar />
      <section className="pt-40 pb-20">
        <div className="container">
          <span className="pill-light">{t.catalog.pill}</span>
          <h1 className="mt-6 text-5xl md:text-6xl leading-[1.05] max-w-4xl">
            {t.catalog.titlePre} <span className="italic text-primary">{t.catalog.titleItalic}</span>
          </h1>

          <div className="mt-16 space-y-16">
            {t.catalog.categories.map((cat, ci) => (
              <div key={ci} id={`cat-${ci}`} className="scroll-mt-32">
                <div className="flex items-baseline gap-4 border-b border-background/15 pb-4">
                  <span className="text-sm text-background/50 tabular-nums">
                    {ci < 9 ? `0${ci + 1}` : `${ci + 1}`}
                  </span>
                  <h2 className="text-2xl md:text-3xl leading-tight">{cat.title}</h2>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((it, ii) => (
                    <Link
                      key={ii}
                      to={`/services/${slugFor(ci, ii)}`}
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

                {cat.note && (
                  <p className="mt-5 text-xs italic text-background/50 max-w-3xl">{cat.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ServicesPage;
