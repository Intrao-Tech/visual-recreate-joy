import { Star } from "lucide-react";
import teamPhoto from "@/assets/team-portrait-no-grid-2026.jpg";
import { useLang } from "@/i18n/LanguageContext";

const imgs = [teamPhoto, teamPhoto, teamPhoto];

const Testimonials = () => {
  const { t } = useLang();
  return (
    <section className="py-8 md:py-12 bg-cream-soft">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
          <div className="md:col-span-8">
            <span className="pill">{t.testimonials.pill}</span>
            <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
              {t.testimonials.titlePre} <span className="italic text-primary">{t.testimonials.titleItalic}</span> {t.testimonials.titlePost}
            </h2>
          </div>
          <div className="md:col-span-4">
            <div className="text-7xl font-display text-primary">4.8</div>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{t.testimonials.score}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.reviews.map((r, i) => (
            <div key={r.name} className="rounded-3xl bg-background p-8 shadow-soft border border-border">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed">"{t.testimonials.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={imgs[i]} alt={r.name} loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
