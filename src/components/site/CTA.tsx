import { useLang } from "@/i18n/LanguageContext";

const CTA = () => {
  const { t } = useLang();
  return (
    <section className="py-24 container">
      <div className="rounded-[2.5rem] bg-gradient-warm p-12 md:p-20 text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-8">
            <span className="pill-light">{t.cta.pill}</span>
            <h2 className="mt-6 text-4xl md:text-6xl leading-[1.05]">
              {t.cta.titlePre} <span className="italic">{t.cta.titleItalic}</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-sm font-medium text-background hover:bg-background hover:text-ink transition-all">
              {t.cta.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
