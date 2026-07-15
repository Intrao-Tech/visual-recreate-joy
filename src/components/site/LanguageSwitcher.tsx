import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";
import { stripLangPrefix, withLang } from "@/i18n/routing";

const options: { code: Lang; label: string }[] = [
  { code: "uk", label: "UA" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

/**
 * Renders real links to the sibling-language URL of the current page, not
 * buttons: each language is now its own address, so a crawler can only reach
 * /en/ and /ru/ if there is an <a href> pointing at them. `hrefLang` marks up
 * the relationship for search engines.
 *
 * Uses react-router's Link directly — these targets are absolute per-language
 * URLs, so they must not be rewritten again by the language-aware Link.
 */
const LanguageSwitcher = ({ tone = "light" }: { tone?: "light" | "dark" }) => {
  const { lang } = useLang();
  const { pathname, search, hash } = useLocation();
  const barePath = stripLangPrefix(pathname);

  const base =
    tone === "light"
      ? "text-background/70 hover:text-background"
      : "text-foreground/60 hover:text-foreground";
  const active = tone === "light" ? "text-background" : "text-foreground";
  const divider = tone === "light" ? "text-background/30" : "text-foreground/30";

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium tracking-widest">
      {options.map((o, i) => {
        const isActive = lang === o.code;
        return (
          <span key={o.code} className="flex items-center gap-1.5">
            <Link
              to={`${withLang(barePath, o.code)}${search}${hash}`}
              hrefLang={o.code}
              aria-current={isActive ? "true" : undefined}
              className={`transition-colors ${isActive ? active : base}`}
              aria-label={`Switch to ${o.label}`}
            >
              {o.label}
            </Link>
            {i < options.length - 1 && <span className={divider}>/</span>}
          </span>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
