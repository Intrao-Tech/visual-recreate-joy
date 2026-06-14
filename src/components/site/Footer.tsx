import { Sparkle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const EMAIL = "info@anglconsulting.com";
const PHONE = "+380 12 345 67 89";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer id="footer" className="bg-ink text-background pt-24 pb-10">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center pb-16 border-b border-background/10">
          <h3 className="text-4xl md:text-5xl leading-[1.1] font-display">
            {t.footer.titlePre} <span className="italic text-primary">{t.footer.titleItalic}</span>
          </h3>
          <div className="md:text-right">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground hover:bg-background hover:text-ink transition-all"
            >
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
              <a href={`mailto:${EMAIL}`} className="block hover:text-primary transition-colors">
                {EMAIL}
              </a>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="block hover:text-primary transition-colors">
                {PHONE}
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="text-sm uppercase tracking-widest text-background/50 font-sans">
              {t.footer.cols[0]?.h}
            </h4>
            <ul className="mt-4 space-y-3">
              {(t.footer.cols[0]?.l ?? []).map((label, i) => {
                const targets = ["/#about", "/#team", "/contact"];
                return (
                  <li key={label}>
                    <a href={targets[i] ?? "/contact"} className="text-background/85 hover:text-primary transition-colors">
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services — all catalog categories */}
          <div className="md:col-span-3">
            <h4 className="text-sm uppercase tracking-widest text-background/50 font-sans">
              {t.footer.cols[1]?.h}
            </h4>
            <ul className="mt-4 space-y-3">
              {t.catalog.categories.map((cat, i) => (
                <li key={i}>
                  <Link
                    to={`/services#cat-${i}`}
                    className="text-background/85 hover:text-primary transition-colors block leading-snug"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="text-sm uppercase tracking-widest text-background/50 font-sans">
              {t.footer.cols[2]?.h}
            </h4>
            <ul className="mt-4 space-y-3">
              {(t.footer.cols[2]?.l ?? []).map((label) => {
                const href = label.includes("@") ? `mailto:${label}` : `tel:${label.replace(/\s/g, "")}`;
                return (
                  <li key={label}>
                    <a href={href} className="text-background/85 hover:text-primary transition-colors">
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-1">
            <h4 className="text-sm uppercase tracking-widest text-background/50 font-sans">
              {t.footer.cols[3]?.h}
            </h4>
            <ul className="mt-4 space-y-3">
              {(t.footer.cols[3]?.l ?? []).map((label) => {
                const socials: Record<string, string> = {
                  Facebook: "https://facebook.com",
                  Instagram: "https://instagram.com",
                };
                return (
                  <li key={label}>
                    <a
                      href={socials[label] ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-background/85 hover:text-primary transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
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
