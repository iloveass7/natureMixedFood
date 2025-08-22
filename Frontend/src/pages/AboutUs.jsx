import React from 'react';
import { Sparkles, Heart, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-green-800 text-white py-16 sm:py-20 md:py-24 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
        </div>
        <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 text-center max-w-3xl lg:container lg:mx-auto lg:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">
            Crafting Meaningful <span className="text-amber-400">Connections</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mx-auto font-light opacity-90">
            Where quality meets passion, and every purchase tells a story
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-20 lg:mx-31 lg:max-w-10xl">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16">
          <div className="md:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80 md:h-96 lg:h-140">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Our team working together"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6 text-white">
                <p className="text-sm sm:text-base md:text-lg font-light">Since 2015</p>
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">Our humble beginnings</h3>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6 leading-tight">
              More than just a marketplace — we're a <span className="text-green-600">community</span>
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg md:text-2xl leading-relaxed">
              Founded in a small workshop with nothing but passion and determination, we've grown into a trusted destination for quality products and exceptional service. What started as a dream between friends has blossomed into a platform serving thousands of happy customers.
            </p>
            <p className="text-gray-600 text-base sm:text-lg md:text-2xl leading-relaxed">
              Every product in our collection is carefully curated, every partnership thoughtfully established, and every customer interaction handled with care. We believe commerce should be human, personal, and meaningful.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 lg:py-8 lg:pb-20">
        <div className="px-4 sm:px-6 md:px-8 lg:px-5 lg:mx-35 lg:max-w-8xl">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-block px-4 sm:px-6 md:px-10 py-2 sm:py-3 md:py-4 my-3 sm:my-4 md:my-5 text-sm sm:text-base md:text-xl bg-green-100 text-green-700 rounded-full font-medium mb-3 sm:mb-4">
              Our Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">Values that define us</h2>
            <p className="text-gray-500 text-base sm:text-lg md:text-2xl mx-auto max-w-2xl sm:max-w-3xl">
              These principles guide every decision we make and every interaction we have
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-14">
            {[
              {
                icon: <Sparkles className="text-green-600" size={28} />, // slightly smaller on sm/md
                title: 'Exceptional Quality',
                desc: 'We source only the finest products and stand behind everything we sell with confidence.'
              },
              {
                icon: <Heart className="text-green-600" size={28} />,
                title: 'Customer First',
                desc: 'Your satisfaction is our priority. We listen, adapt, and go the extra mile every time.'
              },
              {
                icon: <Shield className="text-green-600" size={28} />,
                title: 'Integrity',
                desc: 'Honest pricing, transparent policies, and ethical business practices always.'
              }
            ].map((value, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:bg-green-100 mb-6 sm:mb-8 md:mb-10 lg:mb-13">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-xl">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-10 sm:py-12 md:py-14 lg:py-15 bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:container lg:mx-auto lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="p-4 sm:p-5 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-2.5 md:mb-3">1M+</div>
              <div className="text-amber-400 text-xl sm:text-2xl md:text-4xl font-extrabold">Customers</div>
            </div>
            <div className="p-4 sm:p-5 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-2.5 md:mb-3">50K+</div>
              <div className="text-amber-400 text-xl sm:text-2xl md:text-4xl font-extrabold">Quality Products</div>
            </div>
            <div className="p-4 sm:p-5 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-2.5 md:mb-3">24/7</div>
              <div className="text-amber-400 text-xl sm:text-2xl md:text-4xl font-extrabold">Support</div>
            </div>
            <div className="p-4 sm:p-5 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-2.5 md:mb-3">100%</div>
              <div className="text-amber-400 text-xl sm:text-2xl md:text-4xl font-extrabold">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
