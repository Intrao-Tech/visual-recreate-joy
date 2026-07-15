import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Contact from "@/components/site/Contact";
import { useLang } from "@/i18n/LanguageContext";
import { useSeo } from "@/lib/useSeo";

const ContactPage = () => {
  const { t } = useLang();
  useSeo(t.seo.contact);

  return (
    <main className="min-h-screen bg-background">
      <Navbar variant="solid" />
      <Contact headingAs="h1" />
      <Footer />
    </main>
  );
};

export default ContactPage;
