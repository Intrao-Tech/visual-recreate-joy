import { Sparkle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

type NavbarProps = { variant?: "overlay" | "solid" };

const Navbar = ({ variant = "overlay" }: NavbarProps) => {
  const { t } = useLang();
  const links = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.about, to: "/#about" },
    { label: t.nav.cases, to: "/services" },
    { label: t.nav.pricing, to: "/resources" },
    { label: t.nav.contact, to: "/contact" },
  ];
  const isSolid = variant === "solid";
  return (
    <header
      className={
        isSolid
          ? "relative z-30 pt-6 pb-2 bg-background"
          : "absolute top-0 left-0 right-0 z-30 pt-6"
      }
    >
      <div
        className={`container flex items-center justify-between rounded-full px-6 py-3 border ${
          isSolid
            ? "bg-ink/95 backdrop-blur-md border-ink/20"
            : "bg-background/40 backdrop-blur-md border-white/10"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 text-background">
          <Sparkle className="h-5 w-5 fill-primary stroke-primary" />
          <span className="font-display text-2xl">ANGL Consulting</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm text-background/80 hover:text-background transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher tone="light" />
          <a href="/contact" className="hidden sm:inline-flex btn-light !py-3 !px-5 text-xs">
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
