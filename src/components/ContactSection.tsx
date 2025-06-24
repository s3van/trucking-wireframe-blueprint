
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Need Help? Contact Us</h2>
          <p className="text-xl text-gray-600">
            Our team is ready to assist you with your trucking compliance needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <Mail className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-2xl font-semibold mb-4">Email Us</h3>
              <p className="text-lg text-gray-600 mb-2">
                <a href="mailto:info@carrierauthorityfilings.com" className="text-blue-600 hover:underline">
                  info@carrierauthorityfilings.com
                </a>
              </p>
              <p className="text-gray-500">We typically respond within 24 hours</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <Phone className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-2xl font-semibold mb-4">Call Us</h3>
              <p className="text-lg text-gray-600 mb-2">
                <a href="tel:425-655-7955" className="text-blue-600 hover:underline">
                  425-655-7955
                </a>
              </p>
              <p className="text-gray-500">Mon–Fri, 8:30 AM–5:30 PM EST</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Our Office</h3>
            <div className="text-lg text-gray-600 space-y-1">
              <p>200 E AGNES ST</p>
              <p>PO BOX 336</p>
              <p>MCLOUTH, KS 66054</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
