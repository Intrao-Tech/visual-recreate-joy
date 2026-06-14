import { Download } from "lucide-react";
import r1 from "@/assets/service-1.jpg";
import r2 from "@/assets/service-4.jpg";
import r3 from "@/assets/about.jpg";
import r4 from "@/assets/service-2.jpg";
import { useLang } from "@/i18n/LanguageContext";

const imgs = [r1, r2, r3, r4];

const Resources = () => {
  const { t } = useLang();
  return (
    <section className="py-8 md:py-12 container">
      <div className="max-w-3xl mb-14">
        <span className="pill">{t.resources.pill}</span>
        <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
          {t.resources.titlePre} <span className="italic text-primary">{t.resources.titleItalic}</span>
        </h2>
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
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                <Download className="h-4 w-4" /> {t.resources.download}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Resources;
