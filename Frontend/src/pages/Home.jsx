import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Users, BookOpen, Syringe, PackageSearch, Factory, ShieldCheck, HeartPulse } from 'lucide-react';

export const Home = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Product A", price: "$20", image: "lg.png" },
    { id: 2, name: "Product B", price: "$25", image: "lg.png" },
    { id: 3, name: "Product C", price: "$30", image: "lg.png" },
    { id: 4, name: "Product D", price: "$15", image: "lg.png" },
    { id: 5, name: "Product E", price: "$50", image: "lg.png" },
    { id: 6, name: "Product F", price: "$40", image: "lg.png" },
    { id: 7, name: "Product G", price: "$60", image: "lg.png" },
    { id: 8, name: "Product H", price: "$35", image: "lg.png" },
    { id: 9, name: "Product I", price: "$45", image: "lg.png" },
    { id: 10, name: "Product J", price: "$55", image: "lg.png" },
  ];

  const sliderContent = [
    {
      image: "https://plus.unsplash.com/premium_photo-1750353386208-7e189f9845ef?q=80&w=687&auto=format&fit=crop",
      title: "Summer Collection",
      description: "Discover our new summer arrivals with 30% off",
      icon: <Users className="text-green-500" size={36} />,
      cta: "Shop Now"
    },
    {
      image: "https://images.unsplash.com/photo-1750875936215-0c35c1742cd6?q=80&w=688&auto=format&fit=crop",
      title: "Winter Specials",
      description: "Warm up with our cozy winter collection",
      icon: <BookOpen className="text-green-400" size={36} />,
      cta: "Explore"
    },
    {
      image: "https://images.unsplash.com/photo-1750439889444-dad033c8e825?q=80&w=687&auto=format&fit=crop",
      title: "New Arrivals",
      description: "Fresh styles just landed in our store",
      icon: <Users className="text-green-400" size={36} />,
      cta: "View All"
    }
  ];

  const bannerImage = "https://images.unsplash.com/photo-1750875936215-0c35c1742cd6?q=80&w=688&auto=format&fit=crop";

  const visibleProducts = showAll ? products : products.slice(0, 5);

  return (
    <div className="w-full">

      {/* HERO SECTION */}
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
                    <h3 className="text-3xl font-bold ml-2 text-black">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-xl">{item.description}</p>
                  <button className="bg-green-700 text-white px-4 py-2 rounded text-lg hover:bg-yellow-500 transition self-start">
                    {item.cta}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ALL PRODUCTS SECTION */}
      <section className="px-4 md:px-20 lg:px-40 py-2">
        <h2 className="text-[2.5rem] sm:text-[2.5rem] md:text-[2.8rem] font-bold mb-10 text-center text-green-900 hover:text-amber-400">আমাদের পণ্যসমূহ</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="relative rounded-xl px-7 p-4 flex flex-col items-center shadow-md bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-115 "
            >
              {/* Badge */}
              <span className="absolute top-3 left-3 bg-green-100 font-semibold text-green-700  text-lg px-6 py-1 rounded-full shadow">
                Featured
              </span>

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-56 h-56 object-contain mb-2 mt-4"
              />

              {/* Product Info */}
              <h3 className="text-xl font-bold mb-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-4">Delivered in 2-4 days</p>
              <p className="text-xl font-bold mb-4">{product.price}</p>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full mt-3">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded font-medium hover:bg-green-100 hover:text-green-600 transition"
                >
                  Add Cart
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 bg-green-700 text-white py-2 rounded font-medium hover:bg-yellow-500 transition"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className="bg-green-700 text-white px-8 py-2 rounded font-medium hover:bg-yellow-500 transition mb-6"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      </section>

      {/* INFO CARDS SLIDER SECTION */}
      <section className="px-4 md:px-40 py-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-green-900 hover:text-amber-400">
          আমাদের পণ্য কীভাবে স্বাস্থ্য উন্নত করে
        </h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
        >
          {/* Card 1 */}
          <SwiperSlide>
            <div className="h-90 bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:-translate-y-2 transition transform flex flex-col items-center justify-center text-center">
              <div className="flex justify-center mb-4">
                <Syringe size={68} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">স্বাস্থ্যকেন্দ্রিক পণ্য</h3>
              <p className="text-gray-600 text-lg">
                আমাদের পণ্যসমূহ সকলের জন্য উন্নত স্বাস্থ্য ও সুস্থ জীবনযাপন নিশ্চিত করতে তৈরি।
              </p>
            </div>
          </SwiperSlide>

          {/* Card 2 */}
          <SwiperSlide>
            <div className="h-90 bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:-translate-y-2 transition transform flex flex-col items-center justify-center text-center">
              <div className="flex justify-center mb-4">
                <PackageSearch size={68} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">নিরাপদ প্যাকেজিং</h3>
              <p className="text-gray-600 text-lg">
                পণ্যের গুণমান ও নিরাপত্তা বজায় রাখতে নিরাপদ এবং পরিবেশবান্ধব প্যাকেজিং।
              </p>
            </div>
          </SwiperSlide>

          {/* Card 3 */}
          <SwiperSlide>
            <div className="h-90 bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:-translate-y-2 transition transform flex flex-col items-center justify-center text-center">
              <div className="flex justify-center mb-4">
                <Factory size={68} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">বিশ্বস্ত উৎপাদন</h3>
              <p className="text-gray-600 text-lg">
                সর্বাধুনিক প্রযুক্তিতে স্বাস্থ্যবিধি মেনে অত্যাধুনিক কারখানায় উৎপাদিত।
              </p>
            </div>
          </SwiperSlide>

          {/* Card 4 */}
          <SwiperSlide>
            <div className="h-90 bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:-translate-y-2 transition transform flex flex-col items-center justify-center text-center">
              <div className="flex justify-center mb-4">
                <ShieldCheck size={68} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">সনদপ্রাপ্ত ও নিরাপদ</h3>
              <p className="text-gray-600 text-lg">
                গ্লোবাল অথরিটি কর্তৃক গুণগত মান ও কার্যকারিতা যাচাই সাপেক্ষে সনদপ্রাপ্ত।
              </p>
            </div>
          </SwiperSlide>

          {/* Card 5 */}
          <SwiperSlide>
            <div className="h-90 bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:-translate-y-2 transition transform flex flex-col items-center justify-center text-center">
              <div className="flex justify-center mb-4">
                <HeartPulse size={68} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">সুস্থতা আমাদের লক্ষ্য</h3>
              <p className="text-gray-600 text-lg">
                নির্ভরযোগ্য পণ্য দিয়ে প্রতিদিনের সুস্থতা ও স্বাচ্ছন্দ্য বৃদ্ধিই আমাদের লক্ষ্য।
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

    </div>
  );
};
