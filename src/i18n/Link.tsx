import { forwardRef } from "react";
import { Link as RouterLink, type LinkProps } from "react-router-dom";
import { useLang } from "./LanguageContext";
import { withLang } from "./routing";

/**
 * Drop-in replacement for react-router's `Link` that keeps the visitor in the
 * language they are browsing.
 *
 * Site-absolute targets are written plainly (`to="/contact"`) and rewritten to
 * `/en/contact` or `/ru/contact` as needed; query strings, hashes and non-path
 * targets pass through untouched. Making this the default is deliberate — a
 * link that forgets its prefix silently drops the visitor back into Ukrainian,
 * and `noDirectRouterLink.test.ts` fails the build if a component imports
 * react-router's Link directly.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const { lang } = useLang();
  // `to` also accepts a Partial<Path> object. Localize its pathname too —
  // passing the object straight through would silently drop the visitor back
  // into Ukrainian, and that failure is invisible in review.
  const localized =
    typeof to === "string"
      ? withLang(to, lang)
      : { ...to, ...(to.pathname ? { pathname: withLang(to.pathname, lang) } : {}) };
  return <RouterLink ref={ref} to={localized} {...props} />;
});

Link.displayName = "Link";

export default Link;
export { Link };
