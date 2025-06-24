
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TermsSection = () => {
  const terms = [
    {
      title: "Terms of Service",
      content: "By using our services, you agree to comply with all applicable laws and regulations. We provide professional DOT and MC number filing services with accuracy and timeliness as our priority. All information provided must be accurate and complete."
    },
    {
      title: "Refund Policy", 
      content: "Refunds are available within 30 days of service initiation if no government filings have been submitted. Once filings are submitted to government agencies, refunds are not available due to non-recoverable government fees and processing costs."
    },
    {
      title: "Limitation of Liability",
      content: "Our liability is limited to the amount paid for services. We are not responsible for indirect damages, lost profits, or consequential damages. Clients are responsible for maintaining compliance after initial filings are complete."
    },
    {
      title: "Client Responsibility", 
      content: "Clients must provide accurate, complete, and current information for all filings. Clients are responsible for maintaining ongoing compliance, renewals, and updates after initial filings are completed. Any changes to business information must be communicated promptly."
    },
    {
      title: "Privacy Policy",
      content: "We protect your personal and business information with industry-standard security measures. Information is only shared with authorized government agencies as required for filings. We do not sell or share your information with third parties for marketing purposes."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Terms & Legal Information</h2>
          <p className="text-xl text-gray-600">
            Important information about our services and policies
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {terms.map((term, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-md border-0">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="text-lg font-semibold text-gray-900">{term.title}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{term.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default TermsSection;
