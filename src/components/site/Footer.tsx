import { Sparkle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACTS, MAILTO, TEL } from "@/lib/contacts";
import { FacebookIcon, TelegramIcon } from "./BrandIcons";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer id="footer" className="bg-ink text-background pt-12 pb-6">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 items-center pb-8 border-b border-background/10">
          <h3 className="text-2xl md:text-3xl leading-[1.1] font-display">
            {t.footer.titlePre} <span className="italic text-primary">{t.footer.titleItalic}</span>
          </h3>
          <div className="md:text-right">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-background hover:text-ink transition-all"
            >
              {t.footer.button}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 py-8">
          <div className="md:col-span-3">
            <Link to="/" className="flex items-center gap-2">
              <Sparkle className="h-5 w-5 fill-primary stroke-primary" />
              <span className="font-display text-2xl">ANGL Consulting</span>
            </Link>
            <p className="mt-3 text-xs text-background/70 max-w-xs">{t.footer.desc}</p>
          </div>

          {/* Services — compact grid */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] uppercase tracking-widest text-background/50 font-sans mb-3">
              {t.footer.servicesH}
            </h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
              {t.catalog.categories.map((cat, i) => (
                <li key={i}>
                  <Link
                    to={`/services#cat-${i}`}
                    className="text-background/70 hover:text-primary transition-colors block leading-snug"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-widest text-background/50 font-sans mb-3">
              {t.footer.contactH}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href={MAILTO} className="text-background/70 hover:text-primary transition-colors break-all">
                  {CONTACTS.email}
                </a>
              </li>
              <li>
                <a href={TEL} className="text-background/70 hover:text-primary transition-colors">
                  {CONTACTS.phoneDisplay}
                </a>
              </li>
            </ul>

            <div className="mt-3 flex items-center gap-2">
              <a
                href={CONTACTS.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Telegram ${CONTACTS.telegramHandle}`}
                title={`Telegram ${CONTACTS.telegramHandle}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-background/20 text-background/70 hover:border-primary hover:text-primary transition-colors"
              >
                <TelegramIcon className="h-4 w-4" />
              </a>
              <a
                href={CONTACTS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-background/20 text-background/70 hover:border-primary hover:text-primary transition-colors"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Company + Social */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-widest text-background/50 font-sans mb-3">
              {t.footer.companyH}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/#about" className="text-background/70 hover:text-primary transition-colors">
                  {t.footer.companyAbout}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/70 hover:text-primary transition-colors">
                  {t.footer.companyContact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-background/10 flex flex-col md:flex-row justify-between gap-3 text-[10px] text-background/60">
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
