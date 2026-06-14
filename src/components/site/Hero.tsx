import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import heroPhoto from "@/assets/city-view-no-people.jpg";
import { useLang } from "@/i18n/LanguageContext";

const images = [heroPhoto];

const Hero = () => {
  const { t } = useLang();
  const slides = t.hero.slides;
  const [i, setI] = useState(0);
  useEffect(() => {
    const tt = setInterval(() => setI((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(tt);
  }, [slides.length]);

  const next = () => setI((p) => (p + 1) % slides.length);
  const prev = () => setI((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[100vh] min-h-[720px] overflow-hidden bg-ink text-background">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={images[idx % images.length]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
            style={{ animationPlayState: idx === i ? "running" : "paused" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 container h-full flex flex-col justify-center pt-32">
        <div key={`${i}-${slides[i].title}`} className="max-w-3xl animate-fade-up">
          <span className="pill-light">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {slides[i].eyebrow}
          </span>
          <h1 className="mt-8 text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] font-display whitespace-pre-line">
            {slides[i].title}
          </h1>
          <div className="mt-10">
            <a href="#contact" className="btn-light">{t.hero.cta}</a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 right-8 z-10 flex gap-3">
        <button onClick={prev} aria-label="Previous slide" className="h-12 w-12 rounded-full border border-background/40 text-background flex items-center justify-center hover:bg-background hover:text-foreground transition-all">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button onClick={next} aria-label="Next slide" className="h-12 w-12 rounded-full border border-background/40 text-background flex items-center justify-center hover:bg-background hover:text-foreground transition-all">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
