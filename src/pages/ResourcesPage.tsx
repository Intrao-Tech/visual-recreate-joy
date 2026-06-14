import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Resources from "@/components/site/Resources";

const ResourcesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar variant="solid" />
      <Resources />
      <Footer />
    </main>
  );
};

export default ResourcesPage;
