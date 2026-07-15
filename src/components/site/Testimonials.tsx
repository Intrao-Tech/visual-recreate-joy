import { Star } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

const Testimonials = () => {
  const { t } = useLang();
  return (
    <section className="py-8 md:py-12 bg-cream-soft">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <span className="pill">{t.testimonials.pill}</span>
          <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
            {t.testimonials.titlePre} <span className="italic text-primary">{t.testimonials.titleItalic}</span> {t.testimonials.titlePost}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.reviews.map((r) => (
            <div key={r.name} className="rounded-3xl bg-background p-8 shadow-soft border border-border flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed flex-1">"{r.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10 text-primary font-medium flex items-center justify-center">
                  {initials(r.name)}
                </div>
                <div className="font-medium">{r.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
