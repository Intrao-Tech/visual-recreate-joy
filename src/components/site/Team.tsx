import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";
import t4 from "@/assets/team-4.jpg";
import { useLang } from "@/i18n/LanguageContext";

const imgs = [t1, t2, t3, t4];

const Team = () => {
  const { t } = useLang();
  return (
    <section className="py-8 md:py-12 container">
      <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
        <div className="md:col-span-7">
          <span className="pill">{t.team.pill}</span>
          <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
            {t.team.titlePre} <span className="italic text-primary">{t.team.titleItalic}</span>
          </h2>
        </div>
        <div className="md:col-span-5">
          <p className="text-muted-foreground">{t.team.copy}</p>
          <a href="#" className="mt-6 inline-block btn-primary">{t.team.button}</a>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.team.members.map((m, i) => (
          <div key={m.name} className="group">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-cream-soft">
              <img src={imgs[i]} alt={m.name} loading="lazy" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-display">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
