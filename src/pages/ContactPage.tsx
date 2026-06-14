import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Contact from "@/components/site/Contact";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar variant="solid" />
      <Contact />
      <Footer />
    </main>
  );
};

export default ContactPage;
