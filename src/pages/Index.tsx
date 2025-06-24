
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CaliforniaSection from "@/components/CaliforniaSection";
import TaxTable from "@/components/TaxTable";
import HowItWorks from "@/components/HowItWorks";
import QuoteForm from "@/components/QuoteForm";
import TermsSection from "@/components/TermsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      {/* <CaliforniaSection /> */}
      {/* <TaxTable /> */}
      <HowItWorks />
      <QuoteForm />
      <TermsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
