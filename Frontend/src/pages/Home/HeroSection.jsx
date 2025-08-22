import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import Loader from "../../components/Loader";
import { api } from "../../config/api";

const HeroSection = ({ scrollToProducts }) => {
  const [cards, setCards] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardResponse, bannerResponse] = await Promise.all([
          api.get("/card/getCards"),
          api.get("/card/getBanner"),
        ]);

        setCards(cardResponse.data || []);
        setBanner(bannerResponse.data?.image || "");
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[640px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Mobile/Tablet View (sm and md) - Only Slider */}
      <div className="lg:hidden w-full h-[720px] px-4 sm:px-6 mb-6"> {/* Added horizontal padding */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={cards.length > 1}
          className="h-full"
        >
          {cards.map((item, index) => (
            <SwiperSlide key={index} className="flex flex-col h-full top-3">
              <div className="w-full h-[70%]"> {/* Increased image height */}
                <img
                  src={item.image}
                  alt={`Card ${index + 1}`}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="w-full h-[25%] bg-white px-4 flex flex-col justify-center rounded-b-lg"> {/* Reduced content height */}
                <div className="flex items-center gap-2">
                  {item.icon && item.icon}
                  <h3 className="text-3xl font-bold text-black mt-3"> {/* Reduced text size */}
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-lg  mt-2 mb-4  break-words line-clamp-2"> {/* Reduced text size and margins */}
                  {item.description}
                </p>
                <button
                  className="bg-green-700 text-white px-6 py-2 rounded text-lg hover:bg-yellow-500 transition self-start mt-1" /* Reduced button size */
                  onClick={scrollToProducts}
                >
                  Shop Now
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View (lg+) - Original Layout */}
      <div className="hidden lg:flex flex-row gap-4 px-4 pt-3 pb-16 min-h-[680px]">
        {/* Banner Image */}
        <div
          className="w-3/5 h-[680px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>

        {/* Slider */}
        <div className="w-2/5 h-[680px]">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={cards.length > 1}
            className="h-full"
          >
            {cards.map((item, index) => (
              <SwiperSlide key={index} className="flex flex-col h-full">
                <div className="w-full lg:h-[70%]">
                  <img
                    src={item.image}
                    alt={`Card ${index + 1}`}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="w-full lg:h-[30%] bg-white px-4 flex flex-col justify-center rounded-b-lg">
                  <div className="flex items-center">
                    {item.icon && item.icon}
                    <h3 className="text-3xl font-bold text-black">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-base mt-2 mb-4 break-words line-clamp-3">
                    {item.description}
                  </p>
                  <button
                    className="bg-green-700 text-white px-6 py-2 text-lg rounded hover:bg-yellow-500 transition self-start"
                    onClick={scrollToProducts}
                  >
                    Shop Now
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;