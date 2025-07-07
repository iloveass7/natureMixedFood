import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Users, BookOpen } from "lucide-react";
import axios from "axios";

const HeroSection = () => {
  const [cards, setCards] = useState([]);
  const [banner, setBanner] = useState(null);

  // Fetch cards and banner images from the database on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cards and banner data
        const cardResponse = await axios.get(
          "http://localhost:8000/api/card/getCards"
        );
        const bannerResponse = await axios.get(
          "http://localhost:8000/api/card/getBanner"
        );

        setCards(cardResponse.data || []); // Ensure it's an array
        setBanner(bannerResponse.data?.image || ""); // Handle banner image correctly
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-col md:flex-row gap-4 px-2 md:px-4 pt-3 pb-14 h-190">
      {/* Banner Image */}
      <div
        className="md:w-3/5 w-full h-full bg-cover bg-center rounded-lg flex items-center justify-center"
        style={{ backgroundImage: `url(${banner})` }}
      ></div>

      {/* Slider */}
      <div className="md:w-2/5 w-full h-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={cards.length > 1} // Only enable loop if there are enough slides
          className="h-full"
        >
          {/* Check if cards is an array before calling .map */}
          {Array.isArray(cards) && cards.length > 0 ? (
            cards.map((item, index) => (
              <SwiperSlide key={index} className="flex flex-col h-full">
                <div className="w-full h-[70%]">
                  <img
                    src={item.image}
                    alt={`Card ${index + 1}`}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>

                <div className="w-full h-[30%] bg-white p-4 flex flex-col justify-center rounded-b-lg">
                  <div className="flex items-center mb-2">
                    {item.icon && item.icon}
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
            ))
          ) : (
            <div>No cards available</div>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;
