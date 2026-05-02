import { ArrowUpRight } from "lucide-react";
import s1 from "@/assets/service-1.jpg";
import s2 from "@/assets/service-2.jpg";
import s3 from "@/assets/service-3.jpg";
import s4 from "@/assets/service-4.jpg";

const services = [
  { n: "01", title: "Business Strategy", img: s1 },
  { n: "02", title: "Finance Management", img: s2 },
  { n: "03", title: "Small Business", img: s3 },
  { n: "04", title: "Growth Planner", img: s4 },
  { n: "05", title: "Prosper Planners", img: s1 },
  { n: "06", title: "Market Research", img: s2 },
];

const Services = () => (
  <section className="py-24 md:py-32 bg-ink text-background">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="pill-light">How we can help</span>
          <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
            Our services <span className="italic text-primary">cover all area</span>
          </h2>
        </div>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <a
            key={s.n}
            href="#"
            className="group relative block overflow-hidden rounded-3xl bg-background/5 border border-background/10 p-6 transition-all duration-500 hover:bg-primary"
          >
            <div className="flex items-center justify-between text-xs text-background/60 group-hover:text-background">
              <span>{s.n}</span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
            </div>
            <div className="mt-6 aspect-[4/3] overflow-hidden rounded-2xl">
              <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <h3 className="mt-6 text-2xl">{s.title}</h3>
            <p className="mt-2 text-sm text-background/60 group-hover:text-background/90">
              It is a long established fact that a reader will be distracted.
            </p>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
