
const CaliforniaSection = () => {
  return (
    <section className="py-20 px-4 bg-blue-900 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <div className="text-6xl mb-6">🏴‍☠️</div>
          <h2 className="text-4xl font-bold mb-6">For California Carriers</h2>
          <p className="text-xl mb-8 leading-relaxed">
            We help you file your CA Number and MCP Permit to operate in the Golden State
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
            <p className="text-lg mb-2">Need assistance with California requirements?</p>
            <p className="text-blue-200">
              Contact: <a href="mailto:motorcarrierprofile@chp.ca.gov" className="underline hover:text-white transition-colors">
                motorcarrierprofile@chp.ca.gov
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaliforniaSection;
