import step1 from "@/assets/step-1.jpg";
import step2 from "@/assets/step-2.jpg";
import step3 from "@/assets/step-3.jpg";
import { useLang } from "@/i18n/LanguageContext";

const imgs = [step1, step2, step3];

const Steps = () => {
  const { t } = useLang();
  return (
    <section className="py-24 md:py-32 container">
      <div className="max-w-3xl">
        <h2 className="text-5xl md:text-6xl leading-[1.05]">{t.steps.titleA}</h2>
        <h2 className="text-5xl md:text-6xl leading-[1.05] italic text-primary">{t.steps.titleB}</h2>
        <p className="mt-6 text-muted-foreground max-w-md">{t.steps.intro}</p>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {t.steps.items.map((s, i) => (
          <div key={i} className="group relative overflow-hidden rounded-3xl bg-cream-soft">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={imgs[i]} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-7">
              <span className="text-xs text-muted-foreground tracking-widest">0{i + 1}</span>
              <h3 className="mt-2 text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
