import { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import s1 from "@/assets/service-1.jpg";
import s2 from "@/assets/service-2.jpg";
import s3 from "@/assets/service-3.jpg";
import s4 from "@/assets/service-4.jpg";
import { useLang } from "@/i18n/LanguageContext";

const imgs = [s1, s2, s3, s4, s1, s2];

const Services = () => {
  const { t } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 bg-ink text-background overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="pill-light">{t.services.pill}</span>
            <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
              {t.services.titlePre} <span className="italic text-primary">{t.services.titleItalic}</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="h-12 w-12 rounded-full border border-background/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="h-12 w-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-6 md:px-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {t.services.items.map((s, i) => (
            <a
              key={i}
              href="#"
              data-card
              className="group relative flex-none w-[260px] sm:w-[280px] snap-start overflow-hidden rounded-3xl bg-background/5 border border-background/10 p-5 transition-all duration-500 hover:bg-primary"
            >
              <div className="flex items-center justify-between text-xs text-background/60 group-hover:text-background">
                <span>0{i + 1}</span>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <div className="mt-5 aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={imgs[i % imgs.length]}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-5 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-background/60 group-hover:text-background/90">{s.copy}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
