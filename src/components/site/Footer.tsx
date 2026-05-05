import { Sparkle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer id="contact" className="bg-ink text-background pt-24 pb-10">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center pb-16 border-b border-background/10">
          <h3 className="text-4xl md:text-5xl leading-[1.1] font-display">
            {t.footer.titlePre} <span className="italic text-primary">{t.footer.titleItalic}</span>
          </h3>
          <div className="md:text-right">
            <a href="#" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground hover:bg-background hover:text-ink transition-all">
              {t.footer.button}
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 py-16">
          <div className="md:col-span-4">
            <a href="#" className="flex items-center gap-2">
              <Sparkle className="h-5 w-5 fill-primary stroke-primary" />
              <span className="font-display text-3xl">ANGL Consulting</span>
            </a>
            <p className="mt-6 text-background/70 max-w-xs">{t.footer.desc}</p>
          </div>
          {t.footer.cols.map((c) => (
            <div key={c.h} className="md:col-span-2">
              <h4 className="text-sm uppercase tracking-widest text-background/50 font-sans">{c.h}</h4>
              <ul className="mt-4 space-y-3">
                {c.l.map((it) => (
                  <li key={it}>
                    <a href="#" className="text-background/85 hover:text-primary transition-colors">{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-background/60">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <LanguageSwitcher tone="light" />
            <p>{t.footer.crafted}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
