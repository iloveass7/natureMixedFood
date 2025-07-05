import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Users, BookOpen } from "lucide-react";

const HeroSection = () => {
  const sliderContent = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1750353386208-7e189f9845ef?q=80&w=687&auto=format&fit=crop",
      title: "Summer Collection",
      description: "Discover our new summer arrivals with 30% off",
      icon: <Users className="text-green-500" size={36} />,
      cta: "Shop Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1750875936215-0c35c1742cd6?q=80&w=688&auto=format&fit=crop",
      title: "Winter Specials",
      description: "Warm up with our cozy winter collection",
      icon: <BookOpen className="text-green-400" size={36} />,
      cta: "Explore",
    },
    {
      image:
        "https://images.unsplash.com/photo-1750439889444-dad033c8e825?q=80&w=687&auto=format&fit=crop",
      title: "New Arrivals",
      description: "Fresh styles just landed in our store",
      icon: <Users className="text-green-400" size={36} />,
      cta: "View All",
    },
  ];

  const bannerImage =
    "https://images.unsplash.com/photo-1750875936215-0c35c1742cd6?q=80&w=688&auto=format&fit=crop";

  return (
    <section className="flex flex-col md:flex-row gap-4 px-2 md:px-4 pt-3 pb-14 h-190">
      {/* Banner Image */}
      <div
        className="md:w-3/5 w-full h-full bg-cover bg-center rounded-lg flex items-center justify-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      ></div>

      {/* Slider */}
      <div className="md:w-2/5 w-full h-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full"
        >
          {sliderContent.map((item, index) => (
            <SwiperSlide key={index} className="flex flex-col h-full">
              <div className="w-full h-[70%]">
                <img
                  src={item.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>

              <div className="w-full h-[30%] bg-white p-4 flex flex-col justify-center rounded-b-lg">
                <div className="flex items-center mb-2">
                  {item.icon}
                  <h3 className="text-3xl font-bold ml-2 text-black">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 text-xl">
                  {item.description}
                </p>
                <button className="bg-green-700 text-white px-4 py-2 rounded text-lg hover:bg-yellow-500 transition self-start">
                  {item.cta}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default HeroSection;