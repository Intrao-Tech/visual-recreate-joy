import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/Link";
import s1 from "@/assets/service-1.jpg";
import s2 from "@/assets/service-2.jpg";
import s3 from "@/assets/service-3.jpg";
import s4 from "@/assets/service-4.jpg";
import s5 from "@/assets/hero-1.jpg";
import s6 from "@/assets/hero-2.jpg";
import s7 from "@/assets/office-clean-2026.jpg";
import s8 from "@/assets/about.jpg";
import { useLang } from "@/i18n/LanguageContext";
import { slugFor } from "@/i18n/catalogSlugs";

/** One image per catalog category — kept in sync by the catalog-images test. */
const imgs = [s1, s2, s3, s4, s5, s6, s7, s8];

const Services = () => {
  const { t } = useLang();
  // Carousel reflects actual catalog categories
  const cats = t.catalog.categories;
  const carouselItems = [...cats, ...cats];

  return (
    <section id="services" className="py-8 md:py-12 bg-ink text-background overflow-hidden">
      <div className="container">
        <div>
          <span className="pill-light">{t.services.pill}</span>
          <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
            {t.services.titlePre} <span className="italic text-primary">{t.services.titleItalic}</span>
          </h2>
        </div>
      </div>

      <div className="mt-12 md:mt-16 overflow-hidden">
        <div className="flex services-track gap-6 w-max px-6">
          {carouselItems.map((cat, i) => {
            const ci = i % cats.length;
            const num = ci + 1;
            const numStr = num < 10 ? `0${num}` : `${num}`;
            const firstCopy = cat.items[0]?.copy ?? "";
            return (
              <Link
                key={i}
                to={`/services#cat-${ci}`}
                className="group relative flex-none w-[280px] overflow-hidden rounded-3xl bg-background/5 border border-background/10 p-5 transition-all duration-500 hover:bg-primary"
              >
                <div className="flex items-center justify-between text-xs text-background/60 group-hover:text-background">
                  <span>{numStr}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                </div>
                <div className="mt-5 aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={imgs[ci]}
                    alt={cat.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-5 text-xl leading-snug">{cat.title}</h3>
                <p className="mt-2 text-sm text-background/60 group-hover:text-background/90 line-clamp-2">
                  {firstCopy}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="container mt-20 md:mt-28">
        <div className="max-w-3xl">
          <span className="pill-light">{t.catalog.pill}</span>
          <h2 className="mt-6 text-4xl md:text-5xl leading-[1.05]">
            {t.catalog.titlePre} <span className="italic text-primary">{t.catalog.titleItalic}</span>
          </h2>
        </div>

        <div className="mt-12 md:mt-16 space-y-16">
          {cats.map((cat, ci) => (
            <div key={ci} id={`cat-${ci}`} className="scroll-mt-32">
              <div className="flex items-baseline gap-4 border-b border-background/15 pb-4">
                <span className="text-sm text-background/50 tabular-nums">
                  {ci < 9 ? `0${ci + 1}` : `${ci + 1}`}
                </span>
                <h3 className="text-2xl md:text-3xl leading-tight">{cat.title}</h3>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((it, ii) => (
                  <Link
                    key={ii}
                    to={`/services/${slugFor(ci, ii)}`}
                    className="group relative flex flex-col rounded-3xl border border-background/10 bg-background/5 p-6 transition-all duration-500 hover:bg-primary"
                  >
                    <h4 className="text-lg leading-snug">{it.title}</h4>
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
                <p className="mt-5 text-xs italic text-background/50 max-w-3xl">
                  {cat.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
