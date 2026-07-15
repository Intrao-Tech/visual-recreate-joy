import { useEffect, useState } from "react";
import { Menu, Sparkle, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "@/i18n/Link";
import { useLang } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

type NavbarProps = { variant?: "overlay" | "solid" };

const Navbar = ({ variant = "overlay" }: NavbarProps) => {
  const { t } = useLang();
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.about, to: "/#about" },
    { label: t.nav.services, to: "/services" },
    { label: t.nav.resources, to: "/resources" },
    { label: t.nav.contact, to: "/contact" },
  ];
  const isSolid = variant === "solid";

  // A tap on a link that resolves to the current location won't change route, so close explicitly.
  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={
        isSolid
          ? "relative z-50 pt-6 pb-2 w-full"
          : "absolute top-0 left-0 right-0 z-50 pt-6"
      }
    >
      <div
        className={`container flex items-center justify-between rounded-full px-6 py-3 border shadow-lg ${
          isSolid
            ? "bg-ink backdrop-blur-md border-white/10 shadow-soft"
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
          <Link to="/contact" className="hidden sm:inline-flex btn-light !py-3 !px-5 text-xs">
            {t.nav.cta}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-background hover:bg-background hover:text-ink transition-colors"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="container md:hidden">
          <nav
            id="mobile-nav"
            className="mt-2 rounded-3xl bg-ink/95 backdrop-blur-md border border-white/10 shadow-soft p-3"
          >
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm text-background/80 hover:bg-background/10 hover:text-background transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-full bg-primary px-5 py-3 text-xs font-medium text-primary-foreground hover:bg-background hover:text-ink transition-colors"
            >
              {t.nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
