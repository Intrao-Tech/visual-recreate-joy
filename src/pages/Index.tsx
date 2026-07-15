import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Steps from "@/components/site/Steps";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import CTA from "@/components/site/CTA";
import Testimonials from "@/components/site/Testimonials";
import Resources from "@/components/site/Resources";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { useSeo } from "@/lib/useSeo";
import { useJsonLd } from "@/lib/useJsonLd";
import { organizationLd, webSiteLd } from "@/lib/jsonLd";

const Index = () => {
  const { t, lang } = useLang();
  useSeo(t.seo.home);
  useJsonLd([organizationLd(), webSiteLd(lang)]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Marquee />
      <Steps />
      <About />
      <Services />
      <CTA />
      <Testimonials />
      <Resources />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
