import { Sparkle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const Marquee = () => {
  const { t } = useLang();
  const row = [...t.marquee, ...t.marquee];
  return (
    <div className="bg-primary text-primary-foreground py-5 overflow-hidden border-y border-primary-foreground/10">
      <div className="flex marquee-track w-max gap-12 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-sm md:text-base font-medium">
            <Sparkle className="h-4 w-4" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
