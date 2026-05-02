import about from "@/assets/about.jpg";

const About = () => (
  <section className="py-24 md:py-32 container">
    <div className="grid md:grid-cols-12 gap-10 items-end">
      <div className="md:col-span-8">
        <h2 className="text-4xl md:text-6xl leading-[1.1]">
          Your business needs expert{" "}
          <span className="inline-flex items-center align-middle mx-2">
            <img src={about} alt="" loading="lazy" className="h-14 md:h-20 w-28 md:w-40 object-cover rounded-full" />
          </span>{" "}
          opinion to set it on the right track{" "}
          <span className="italic text-primary">so that you get a consistent revenue</span>{" "}
          for the longer time period.
        </h2>
      </div>
    </div>

    <div className="mt-20 grid md:grid-cols-3 gap-12 border-t border-border pt-12">
      {[
        { n: "6.2k+", l: "Project completed" },
        { n: "3k+", l: "Happy clients" },
        { n: "98%", l: "Client satisfaction" },
      ].map((s) => (
        <div key={s.l}>
          <div className="text-6xl font-display text-primary">{s.n}</div>
          <div className="mt-2 text-lg">{s.l}</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            It is a long established fact that a reader will be distracted.
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default About;
