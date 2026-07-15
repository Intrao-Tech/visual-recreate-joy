import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Resources from "@/components/site/Resources";
import { useLang } from "@/i18n/LanguageContext";
import { useSeo } from "@/lib/useSeo";

const ResourcesPage = () => {
  const { t } = useLang();
  useSeo(t.seo.resources);

  return (
    <main className="min-h-screen bg-background">
      <Navbar variant="solid" />
      <Resources headingAs="h1" />
      <Footer />
    </main>
  );
};

export default ResourcesPage;
