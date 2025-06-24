
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Mail, Phone, Check } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Submit Quote Form",
      description: "Fill out our comprehensive quote form with your business details and service needs"
    },
    {
      icon: Mail,
      title: "We Email You Pricing",
      description: "Receive detailed pricing information and service breakdown within 24 hours"
    },
    {
      icon: Phone,
      title: "You Approve & Pay",
      description: "Review the quote, approve the services, and make your secure payment"
    },
    {
      icon: Check,
      title: "We File for You",
      description: "Our experts handle all the paperwork and ensure your compliance filings are complete"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 4-step process gets you compliant quickly and efficiently
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-orange-600" size={32} />
                  </div>
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
