import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import r1 from "@/assets/service-1.jpg";
import r2 from "@/assets/service-4.jpg";
import r3 from "@/assets/about.jpg";
import r4 from "@/assets/service-2.jpg";
import { useLang } from "@/i18n/LanguageContext";

const imgs = [r1, r2, r3, r4];

/** `h2` on the homepage, where Hero owns the h1; `h1` when this section is the whole page. */
type ResourcesProps = { headingAs?: "h1" | "h2" };

const Resources = ({ headingAs: Heading = "h2" }: ResourcesProps) => {
  const { t } = useLang();
  return (
    <section id="resources" className="py-8 md:py-12 container scroll-mt-24">
      <div className="max-w-3xl mb-14">
        <span className="pill">{t.resources.pill}</span>
        <Heading className="mt-6 text-5xl md:text-6xl leading-[1.05]">
          {t.resources.titlePre} <span className="italic text-primary">{t.resources.titleItalic}</span>
        </Heading>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.resources.items.map((r, i) => (
          <article key={i} className="group rounded-3xl overflow-hidden bg-cream-soft hover:shadow-soft transition-all duration-500">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={imgs[i]} alt={r.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <span className="pill">[{r.tag}]</span>
              <h3 className="mt-4 text-xl font-display leading-tight">{r.title}</h3>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                {t.resources.download} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Resources;
