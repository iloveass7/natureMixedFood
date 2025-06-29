import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const Home = () => {
  const products = [
    { id: 1, name: "Product A", price: "$20", image: "lg.png" },
    { id: 2, name: "Product B", price: "$25", image: "lg.png" },
    { id: 3, name: "Product C", price: "$30", image: "lg.png" },
    { id: 4, name: "Product D", price: "$15", image: "lg.png" },
    { id: 5, name: "Product E", price: "$50", image: "lg.png" },
    { id: 6, name: "Product F", price: "$40", image: "lg.png" },
  ];

  const sliderImages = [
    "https://plus.unsplash.com/premium_photo-1750353386208-7e189f9845ef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1750875936215-0c35c1742cd6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1750439889444-dad033c8e825?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const bannerImage = "https://images.unsplash.com/photo-1750875936215-0c35c1742cd6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row gap-4 px-2 md:px-4 py-22">
        
        {/* Banner as Background Image */}
        <div
          className="md:w-3/5 w-full h-120 bg-cover bg-center rounded-lg flex items-center justify-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
        </div>

        {/* Slider */}
        <div className="md:w-2/5 w-full h-120 rounded-lg overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="h-120"
          >
            {sliderImages.map((src, index) => (
              <SwiperSlide key={index} className="h-120">
                <img src={src} alt={`Slide ${index + 1}`} className="w-full h-120 object-cover rounded-lg" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ALL PRODUCTS SECTION */}
      <section className="px-4 md:px-40 py-16">
        <h2 className="text-4xl font-bold mb-10 text-center">All Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4" />
              <h3 className="text-lg font-medium mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.price}</p>
              <button className="bg-blue-500 text-white px-5 py-2 rounded font-semibold text-lg hover:bg-blue-600">Buy Now</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
