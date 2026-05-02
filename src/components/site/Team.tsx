import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";
import t4 from "@/assets/team-4.jpg";

const team = [
  { name: "Jane Cooper", role: "Certified life coach", img: t1 },
  { name: "Esther Howard", role: "Business coach", img: t2 },
  { name: "Robert Fox", role: "Certified life coach", img: t3 },
  { name: "Leslie Alexander", role: "Business CEO coach", img: t4 },
];

const Team = () => (
  <section className="py-24 md:py-32 container">
    <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
      <div className="md:col-span-7">
        <span className="pill">Our team members</span>
        <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
          Guiding your journey to <span className="italic text-primary">business brilliance</span>
        </h2>
      </div>
      <div className="md:col-span-5">
        <p className="text-muted-foreground">
          Established fact that a reader will be distracted by the way readable content of a page when looking at its layout.
        </p>
        <a href="#" className="mt-6 inline-block btn-primary">Learn About Us →</a>
      </div>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((m) => (
        <div key={m.name} className="group">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-cream-soft">
            <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-display">{m.name}</h3>
            <p className="text-sm text-muted-foreground">{m.role}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Team;
