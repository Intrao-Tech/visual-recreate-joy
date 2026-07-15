import { createContext, useContext, useEffect, useMemo, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations, Lang, Dict } from "./translations";
import { langFromPath, stripLangPrefix, withLang } from "./routing";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

/**
 * Language is derived from the URL, never from stored state.
 *
 * It used to live in localStorage, which meant all three languages shared one
 * set of URLs: a crawler could only ever see Ukrainian, so the English and
 * Russian content was unindexable, and sharing a link showed the recipient the
 * sender's language rather than the page they were reading. Deriving it from
 * the path gives every language its own addressable URL.
 *
 * Deliberately no auto-redirect from a remembered or Accept-Language
 * preference: redirecting `/` based on stored state sends crawlers somewhere
 * other than the canonical URL and makes the page flicker on load. Visitors
 * choose via the switcher, which navigates.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(pathname);

  const setLang = (next: Lang) => {
    navigate(`${withLang(stripLangPrefix(pathname), next)}${search}${hash}`);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: translations[lang] }),
    // setLang closes over the current location, so it must be rebuilt with it.
    [lang, pathname, search, hash],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
