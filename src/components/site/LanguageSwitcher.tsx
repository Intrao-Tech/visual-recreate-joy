import { useLang } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";

const options: { code: Lang; label: string }[] = [
  { code: "uk", label: "UA" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

const LanguageSwitcher = ({ tone = "light" }: { tone?: "light" | "dark" }) => {
  const { lang, setLang } = useLang();
  const base =
    tone === "light"
      ? "text-background/70 hover:text-background"
      : "text-foreground/60 hover:text-foreground";
  const active = tone === "light" ? "text-background" : "text-foreground";
  const divider = tone === "light" ? "text-background/30" : "text-foreground/30";

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium tracking-widest">
      {options.map((o, i) => (
        <span key={o.code} className="flex items-center gap-1.5">
          <button
            onClick={() => setLang(o.code)}
            className={`transition-colors ${lang === o.code ? active : base}`}
            aria-label={`Switch to ${o.label}`}
          >
            {o.label}
          </button>
          {i < options.length - 1 && <span className={divider}>/</span>}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
