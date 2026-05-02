import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Steps from "@/components/site/Steps";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import CTA from "@/components/site/CTA";
import Team from "@/components/site/Team";
import Testimonials from "@/components/site/Testimonials";
import Resources from "@/components/site/Resources";
import Footer from "@/components/site/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Marquee />
      <Steps />
      <About />
      <Services />
      <CTA />
      <Team />
      <Testimonials />
      <Resources />
      <Footer />
    </main>
  );
};

export default Index;
