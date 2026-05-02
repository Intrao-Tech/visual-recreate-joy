import { Download } from "lucide-react";
import r1 from "@/assets/service-1.jpg";
import r2 from "@/assets/service-4.jpg";
import r3 from "@/assets/about.jpg";
import r4 from "@/assets/service-2.jpg";

const resources = [
  { tag: "Book", title: "Writing your success script", img: r1 },
  { tag: "Book", title: "Navigating your path to prosperity", img: r2 },
  { tag: "Video", title: "Unleashing potential together", img: r3 },
  { tag: "Podcast", title: "Blueprinting success stories", img: r4 },
];

const Resources = () => (
  <section className="py-24 md:py-32 container">
    <div className="max-w-3xl mb-14">
      <span className="pill">Resources</span>
      <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
        We've created the resources that <span className="italic text-primary">help you thrive.</span>
      </h2>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {resources.map((r) => (
        <article key={r.title} className="group rounded-3xl overflow-hidden bg-cream-soft hover:shadow-soft transition-all duration-500">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={r.img} alt={r.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-6">
            <span className="pill">[{r.tag}]</span>
            <h3 className="mt-4 text-xl font-display leading-tight">{r.title}</h3>
            <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <Download className="h-4 w-4" /> Download
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Resources;
