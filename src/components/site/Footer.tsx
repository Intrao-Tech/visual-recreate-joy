import { Sparkle } from "lucide-react";

const cols = [
  { h: "Company", l: ["About", "Career", "Contact"] },
  { h: "Solutions", l: ["Freelancer", "Data Analytics", "Small Business"] },
  { h: "Resource", l: ["Customers", "Strategic Finance", "Ebooks & Guides"] },
  { h: "Follow us", l: ["Twitter", "LinkedIn", "Instagram"] },
];

const Footer = () => (
  <footer id="contact" className="bg-ink text-background pt-24 pb-10">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-10 items-center pb-16 border-b border-background/10">
        <h3 className="text-4xl md:text-5xl leading-[1.1] font-display">
          Schedule a free <span className="italic text-primary">online meeting.</span>
        </h3>
        <div className="md:text-right">
          <a href="#" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground hover:bg-background hover:text-ink transition-all">
            Book A Free Meeting →
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-10 py-16">
        <div className="md:col-span-4">
          <a href="#" className="flex items-center gap-2">
            <Sparkle className="h-5 w-5 fill-primary stroke-primary" />
            <span className="font-display text-3xl">Consult</span>
          </a>
          <p className="mt-6 text-background/70 max-w-xs">
            It is a long established fact that a reader will be distracted by the readable content of a page at its layout.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h} className="md:col-span-2">
            <h4 className="text-sm uppercase tracking-widest text-background/50 font-sans">{c.h}</h4>
            <ul className="mt-4 space-y-3">
              {c.l.map((it) => (
                <li key={it}>
                  <a href="#" className="text-background/85 hover:text-primary transition-colors">{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-background/60">
        <p>© 2026 All Rights Reserved</p>
        <p>Crafted with care.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
