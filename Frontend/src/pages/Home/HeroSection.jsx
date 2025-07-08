import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import Loader from "../../components/Loader";

const HeroSection = ({ scrollToProducts }) => {
  const [cards, setCards] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardResponse, bannerResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/card/getCards"),
          axios.get("http://localhost:8000/api/card/getBanner"),
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
    <section className="flex flex-col md:flex-row gap-4 px-2 md:px-4 pt-3 pb-14 sm:pb-0 sm:mb-12 lg:mb-8 md:mb-8 lg:min-h-[680px] md:min-h-[680px] sm:min-h-[1000px] md:h-[380px] h-[640px] mb-24">
      {/* Banner Image */}
      <div
        className="md:w-3/5 w-full h-[630px] bg-cover bg-center rounded-lg hidden md:block"
        style={{ backgroundImage: `url(${banner})` }}
      ></div>

      {/* Slider */}
      <div className="md:w-2/5 w-full h-[630px]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={cards.length > 1}
          className="h-full"
        >
          {cards.map((item, index) => (
            <SwiperSlide key={index} className="flex flex-col h-full">
              <div className="w-full h-[60%]">
                <img
                  src={item.image}
                  alt={`Card ${index + 1}`}
                  className="w-full h-105 object-cover rounded-t-lg"
                />
              </div>

              <div className="w-full h-[40%] bg-white px-2 flex flex-col justify-center rounded-b-lg">
                <div className="flex items-center">
                  {item.icon && item.icon}
                  <h3 className="text-3xl font-bold text-black mt-8">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-lg md:text-base mt-2 mb-5 break-words line-clamp-3">
                  {item.description}
                </p>

                <button
                  className="bg-green-700 text-white px-4 py-2 rounded text-sm md:text-base hover:bg-yellow-500 transition self-start"
                  onClick={scrollToProducts}
                >
                  Shop Now
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
