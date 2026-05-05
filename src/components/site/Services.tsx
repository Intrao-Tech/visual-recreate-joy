import { ArrowUpRight } from "lucide-react";
import s1 from "@/assets/service-1.jpg";
import s2 from "@/assets/service-2.jpg";
import s3 from "@/assets/service-3.jpg";
import s4 from "@/assets/service-4.jpg";
import { useLang } from "@/i18n/LanguageContext";

const imgs = [s1, s2, s3, s4, s1, s2];

const Services = () => {
  const { t } = useLang();
  const items = [...t.services.items, ...t.services.items];

  return (
    <section className="py-8 md:py-12 bg-ink text-background overflow-hidden">
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
          {items.map((s, i) => {
            const num = (i % t.services.items.length) + 1;
            const numStr = num < 10 ? `0${num}` : `${num}`;
            return (
              <a
                key={i}
                href="#"
                className="group relative flex-none w-[280px] overflow-hidden rounded-3xl bg-background/5 border border-background/10 p-5 transition-all duration-500 hover:bg-primary"
              >
                <div className="flex items-center justify-between text-xs text-background/60 group-hover:text-background">
                  <span>{numStr}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                </div>
                <div className="mt-5 aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={imgs[(i % t.services.items.length) % imgs.length]}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-background/60 group-hover:text-background/90">{s.copy}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
