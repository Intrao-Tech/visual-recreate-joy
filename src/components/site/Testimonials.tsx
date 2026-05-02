import { Star } from "lucide-react";
import t1 from "@/assets/team-3.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-4.jpg";

const reviews = [
  { name: "Ralph Edwards", role: "Marketing Coordinator", img: t1 },
  { name: "Esther Howard", role: "Dog Trainer", img: t2 },
  { name: "Dianne Russell", role: "Medical Assistant", img: t3 },
];

const Testimonials = () => (
  <section className="py-24 md:py-32 bg-cream-soft">
    <div className="container">
      <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
        <div className="md:col-span-8">
          <span className="pill">Our customer review</span>
          <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
            Trusted by over <span className="italic text-primary">300,000 accounts</span> and agencies
          </h2>
        </div>
        <div className="md:col-span-4">
          <div className="text-7xl font-display text-primary">4.8</div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Score on TrustPilot</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="rounded-3xl bg-background p-8 shadow-soft border border-border">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/80 leading-relaxed">
              "I was skeptical at first, but exceeded my all expectations. The robust analytics and reporting tools provided valuable insights into our business performance, allowing us to make data-driven decisions."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img src={r.img} alt={r.name} loading="lazy" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-muted-foreground">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
