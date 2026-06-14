import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Resources from "@/components/site/Resources";

const ResourcesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32" />
      <Resources />
      <Footer />
    </main>
  );
};

export default ResourcesPage;
