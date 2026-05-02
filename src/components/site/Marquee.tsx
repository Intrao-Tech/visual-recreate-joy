import { Sparkle } from "lucide-react";

const items = [
  "Strategic Roadmapping",
  "Collaborative Ideation",
  "Proactive Problem Solving",
  "Premium Customer Support",
  "Lifetime Membership",
  "Free 30 Minute Call",
];

const Marquee = () => {
  const row = [...items, ...items];
  return (
    <div className="bg-primary text-primary-foreground py-5 overflow-hidden border-y border-primary-foreground/10">
      <div className="flex marquee-track w-max gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-3 text-sm md:text-base font-medium">
            <Sparkle className="h-4 w-4" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
