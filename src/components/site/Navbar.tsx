import { Sparkle } from "lucide-react";

const links = ["Home", "About", "Case Studies", "Pricing", "Contact"];

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 pt-6">
      <div className="container flex items-center justify-between rounded-full bg-background/40 backdrop-blur-md border border-white/10 px-6 py-3">
        <a href="#" className="flex items-center gap-2 text-background">
          <Sparkle className="h-5 w-5 fill-primary stroke-primary" />
          <span className="font-display text-2xl">Consult</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-background/80 hover:text-background transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-light !py-3 !px-5 text-xs">
          Get This Template
        </a>
      </div>
    </header>
  );
};

export default Navbar;
