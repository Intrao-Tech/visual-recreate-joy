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
  const localized = typeof to === "string" ? withLang(to, lang) : to;
  return <RouterLink ref={ref} to={localized} {...props} />;
});

Link.displayName = "Link";

export default Link;
export { Link };
