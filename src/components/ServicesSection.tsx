
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Truck, Building, Hash } from "lucide-react";

const ServicesSection = () => {
  const services = [
    { icon: FileText, title: "DOT Number", description: "Get your DOT number for interstate commerce compliance" },
    { icon: Truck, title: "MC Number", description: "Motor Carrier authority for freight transportation" },
    { icon: Building, title: "LLC / Corporation Filing", description: "Business entity formation and registration" },
    { icon: Hash, title: "EIN Registration", description: "Federal tax identification number setup" },
    { icon: FileText, title: "BOC-3", description: "Process agent designation filing" },
    { icon: FileText, title: "UCR", description: "Unified Carrier Registration compliance" },
    { icon: FileText, title: "Broker Authority", description: "Freight broker operating authority" },
    { icon: FileText, title: "MC Reinstatement", description: "Restore revoked or suspended MC authority" },
    { icon: FileText, title: "DOT Reactivation/Deactivation", description: "Update your DOT status as needed" },
    { icon: FileText, title: "Biennial Updates", description: "Required two-year DOT information updates" },
    { icon: FileText, title: "Address/Info Changes", description: "Update your business information with FMCSA" },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive trucking compliance services to get you on the road and keep you compliant
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
