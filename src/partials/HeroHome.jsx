import React from 'react';

function HeroHome() {
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
              Discover the Power of Fashion: Ignite Your Confidence,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Unleash Your Style</span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                Welcome to our captivating world of fashion, where style knows no bounds. Step into a realm where creativity
                and self-expression converge, and fashion becomes a powerful tool to showcase your unique identity.
              </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="#latestnews">
                    The Latest Trends
                  </a>
                </div>
                <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#favblog">
                    Unleash Your Style
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
         
            
          
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
