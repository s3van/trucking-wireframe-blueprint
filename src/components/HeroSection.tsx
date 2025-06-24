import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import headerVideo from "@/video/header.mp4";

const HeroSection = () => {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form');
    quoteSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-4 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          src={headerVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              New to Trucking? We're Here to Help You Start Strong
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed drop-shadow-md">
              We help you get your DOT & MC numbers and stay compliant in all 50 states.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={scrollToQuote}
              >
                Apply for DOT Number
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm shadow-xl">
              <Truck size={200} className="text-white/80 drop-shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
