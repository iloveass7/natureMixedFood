import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  Syringe,
  PackageSearch,
  Factory,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";

const InfoCardsSection = () => {
  return (
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
  );
};
export default InfoCardsSection;