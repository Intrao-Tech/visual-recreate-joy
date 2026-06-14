import { Sparkle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const EMAIL = "info@anglconsulting.com";
const PHONE = "+380 12 345 67 89";

const Footer = () => {
  const { t } = useLang();

  // Column resolvers by index: 0 Company, 1 Services, 2 Contact, 3 Social
  const hrefFor = (colIdx: number, itemIdx: number, label: string): { href: string; external?: boolean } => {
    if (colIdx === 0) {
      const targets = ["/#about", "/#team", "/#contact"];
      return { href: targets[itemIdx] ?? "/#contact" };
    }
    if (colIdx === 1) return { href: "/services" };
    if (colIdx === 2) {
      if (label.includes("@")) return { href: `mailto:${label}` };
      return { href: `tel:${label.replace(/\s/g, "")}` };
    }
    const socials: Record<string, string> = {
      Facebook: "https://facebook.com",
      Instagram: "https://instagram.com",
    };
    return { href: socials[label] ?? "#", external: true };
  };

  return (
    <footer id="footer" className="bg-ink text-background pt-24 pb-10">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center pb-16 border-b border-background/10">
          <h3 className="text-4xl md:text-5xl leading-[1.1] font-display">
            {t.footer.titlePre} <span className="italic text-primary">{t.footer.titleItalic}</span>
          </h3>
          <div className="md:text-right">
            <a href="/#contact" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground hover:bg-background hover:text-ink transition-all">
              {t.footer.button}
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 py-16">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2">
              <Sparkle className="h-5 w-5 fill-primary stroke-primary" />
              <span className="font-display text-3xl">ANGL Consulting</span>
            </Link>
            <p className="mt-6 text-background/70 max-w-xs">{t.footer.desc}</p>
            <div className="mt-6 space-y-1 text-sm text-background/70">
              <a href={`mailto:${EMAIL}`} className="block hover:text-primary transition-colors">{EMAIL}</a>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="block hover:text-primary transition-colors">{PHONE}</a>
            </div>
          </div>
          {t.footer.cols.map((c, ci) => (
            <div key={c.h} className="md:col-span-2">
              <h4 className="text-sm uppercase tracking-widest text-background/50 font-sans">{c.h}</h4>
              <ul className="mt-4 space-y-3">
                {c.l.map((it, ii) => {
                  const { href, external } = hrefFor(ci, ii, it);
                  return (
                    <li key={it}>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-background/85 hover:text-primary transition-colors"
                      >
                        {it}
                      </a>
                    </li>
                  );
                })}
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
