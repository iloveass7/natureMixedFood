import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Users,
  BookOpen,
  Syringe,
  PackageSearch,
  Factory,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";

export const Home = () => {
  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await fetch("/api/product/getAllProducts");
        const response = await fetch(
          "http://localhost:8000/api/product/getAllProducts"
        ); // eta change korte hobe
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const visibleProducts = showAll ? products : products.slice(0, 5);

  if (loading) {
    return <div className="w-full text-center py-10">Loading products...</div>;
  }

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

      {/* ALL PRODUCTS SECTION */}
      {/* ALL PRODUCTS SECTION */}
      <section className="px-4 md:px-20 lg:px-40 py-2">
        <h2 className="text-[2.5rem] sm:text-[2.5rem] md:text-[2.8rem] font-bold mb-10 text-center text-green-900 hover:text-amber-400">
          আমাদের পণ্যসমূহ
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-10">No products available</div>
        ) : (
          <>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {visibleProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="h-142 relative w-full rounded-xl px-6 py-10 flex flex-col items-center shadow-2xl bg-white transition-all duration-300 hover:shadow-4xl hover:-translate-y-2 cursor-pointer"
                >
                  {/* Badge */}
                  <span className="absolute top-7 left-5 bg-amber-400 font-semibold text-white text-[16px] px-6 py-1 rounded-full shadow">
                    Featured
                  </span>

                  {/* Product Image */}
                  <img
                    src={product.images[0] || "lg.png"}
                    alt={product.name}
                    className="w-56 h-56 object-contain mb-3 mt-12"
                  />

                  {/* Product Info */}
                  <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-[15px] mb-3">
                    Delivered in 2-4 days
                  </p>
                  <p className="text-[20px] font-bold mb-0.5">${product.price}</p>

                  {/* Action Buttons - Now in two rows */}
                  <div className="flex flex-col gap-3 w-full mt-4">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-yellow-500 text-white py-2 rounded font-medium hover:bg-green-100 hover:text-green-600 transition"
                    >
                      Add Cart
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/checkout', { state: { product } }); // Redirect to checkout with product data
                      }}
                      className="w-full bg-green-700 text-white py-2 rounded font-medium hover:bg-yellow-500 transition"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More/Less Button */}
            {products.length > 5 && (
              <div className="flex justify-end">
                <button
                  className="bg-green-700 text-white px-8 py-2 rounded font-medium hover:bg-yellow-500 transition mb-6"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </>
        )}
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
              <h3 className="text-2xl font-bold mb-3">
                স্বাস্থ্যকেন্দ্রিক পণ্য
              </h3>
              <p className="text-gray-600 text-lg">
                আমাদের পণ্যসমূহ সকলের জন্য উন্নত স্বাস্থ্য ও সুস্থ জীবনযাপন
                নিশ্চিত করতে তৈরি।
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
                পণ্যের গুণমান ও নিরাপত্তা বজায় রাখতে নিরাপদ এবং পরিবেশবান্ধব
                প্যাকেজিং।
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
                সর্বাধুনিক প্রযুক্তিতে স্বাস্থ্যবিধি মেনে অত্যাধুনিক কারখানায়
                উৎপাদিত।
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
                গ্লোবাল অথরিটি কর্তৃক গুণগত মান ও কার্যকারিতা যাচাই সাপেক্ষে
                সনদপ্রাপ্ত।
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
                নির্ভরযোগ্য পণ্য দিয়ে প্রতিদিনের সুস্থতা ও স্বাচ্ছন্দ্য বৃদ্ধিই
                আমাদের লক্ষ্য।
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <a
        href="https://wa.me/8801725099545" // Replace with your number
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.92 7.92 0 008.005 0c-4.386 0-7.965 3.579-7.965 7.964 0 1.403.367 2.776 1.063 3.982L.014 16l4.176-1.088a7.965 7.965 0 003.815.971h.004c4.386 0 7.965-3.579 7.965-7.965a7.92 7.92 0 00-2.373-5.592zM8.005 14.61a6.57 6.57 0 01-3.338-.899l-.24-.143-2.478.646.661-2.416-.156-.247a6.57 6.57 0 01-1.016-3.518c0-3.636 2.956-6.591 6.591-6.591 1.76 0 3.413.686 4.657 1.93a6.556 6.556 0 011.93 4.656c0 3.635-2.956 6.582-6.611 6.582zm3.759-4.887c-.206-.103-1.219-.602-1.407-.672-.188-.07-.325-.103-.463.103-.138.206-.532.671-.653.809-.121.138-.241.155-.447.052-.206-.103-.868-.319-1.653-1.018-.611-.544-1.023-1.218-1.144-1.423-.121-.206-.013-.317.09-.42.092-.092.206-.241.31-.362.104-.121.138-.206.207-.344.07-.138.035-.258-.017-.362-.052-.103-.463-1.119-.635-1.53-.167-.403-.338-.348-.463-.354-.121-.005-.258-.006-.396-.006a.765.765 0 00-.553.258c-.19.206-.725.708-.725 1.73s.743 2.003.846 2.14c.103.138 1.464 2.235 3.55 3.133.497.214.883.342 1.183.438.497.158.949.136 1.306.083.398-.059 1.219-.498 1.391-.98.172-.483.172-.896.121-.98-.052-.086-.19-.138-.396-.241z" />
        </svg>
      </a>
    </div>
  );
};
