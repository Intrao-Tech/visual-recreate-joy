import about from "@/assets/about.jpg";
import { useLang } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useLang();
  return (
    <section className="py-8 md:py-12 container">
      <div className="grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-8">
          <h2 className="text-4xl md:text-6xl leading-[1.1]">
            {t.about.headPre}{" "}
            <span className="relative inline-flex items-center justify-center align-baseline mx-2 px-8 md:px-12 rounded-full overflow-hidden">
              <img src={about} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <span className="relative italic text-white drop-shadow-md whitespace-nowrap leading-[1.1]">
                {t.about.headFigure}
              </span>
            </span>
            {t.about.headMid}{" "}
            <span className="italic text-primary">{t.about.headItalic}</span>{" "}
            {t.about.headPost}
          </h2>
        </div>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-12 border-t border-border pt-12">
        {t.about.stats.map((s) => (
          <div key={s.l}>
            <div className="text-6xl font-display text-primary">{s.n}</div>
            <div className="mt-2 text-lg">{s.l}</div>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">{s.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
