import step1 from "@/assets/step-1.jpg";
import step2 from "@/assets/step-2.jpg";
import step3 from "@/assets/step-3.jpg";

const steps = [
  { n: "01", title: "Book Time", img: step1, copy: "It is a long established fact that a reader will be distracted by the readable." },
  { n: "02", title: "Meet Experts", img: step2, copy: "It is a long established fact that a reader will be distracted by the readable." },
  { n: "03", title: "Get Results", img: step3, copy: "It is a long established fact that a reader will be distracted by the readable." },
];

const Steps = () => (
  <section className="py-24 md:py-32 container">
    <div className="max-w-3xl">
      <h2 className="text-5xl md:text-6xl leading-[1.05]">Your success depends</h2>
      <h2 className="text-5xl md:text-6xl leading-[1.05] italic text-primary">on easy actionable steps</h2>
      <p className="mt-6 text-muted-foreground max-w-md">
        There are many variations of passages of available, but the majority have suffered.
      </p>
    </div>

    <div className="mt-16 grid md:grid-cols-3 gap-6">
      {steps.map((s, i) => (
        <div key={s.n} className="group relative overflow-hidden rounded-3xl bg-cream-soft" style={{ animationDelay: `${i * 120}ms` }}>
          <div className="aspect-[4/5] overflow-hidden">
            <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-7">
            <span className="text-xs text-muted-foreground tracking-widest">{s.n}</span>
            <h3 className="mt-2 text-2xl">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{s.copy}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Steps;
