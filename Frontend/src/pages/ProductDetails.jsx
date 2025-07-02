import { useState } from "react";
import { ShoppingCart, Lock, Truck, Leaf } from "lucide-react";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    "https://plus.unsplash.com/premium_photo-1750353386208-7e189f9845ef?q=80&w=687&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1750875936215-0c35c1742cd6?q=80&w=688&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1750439889444-dad033c8e825?q=80&w=687&auto=format&fit=crop",
  ];

  return (
    <div className="w-full min-h-screen px-4 md:px-20 py-36 flex flex-col lg:flex-row gap-10">
      
      {/* LEFT - IMAGES */}
      <div className="flex flex-col md:flex-row gap-4 w-full lg:w-2/3">
        
        {/* Thumbnail List */}
        <div className="space-x-3 flex md:flex-col gap-6 overflow-x-auto md:overflow-y-auto">
          {productImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="thumb"
              className={`w-30 h-30  object-cover cursor-pointer border ${
                selectedImage === idx ? "border-green-500" : "border-gray-300"
              } rounded`}
              onClick={() => setSelectedImage(idx)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 mx-7">
          <img
            src={productImages[selectedImage]}
            alt="Product"
            className="w-200 h-240 rounded-lg"
          />
        </div>
      </div>

      {/* RIGHT - DETAILS */}
      <div className="w-full lg:w-2/4 flex flex-col space-y-6">
        
        {/* Title and Subtitle */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">HealthCare Product</h2>
          <p className="text-green-600 text-xl font-semibold mb-8">Promotes Better Health</p>
          <hr className="border-green-700 mb-3" />
        </div>

        {/* Product Description */}
        <div className="text-gray-700 text-xl leading-relaxed space-y-2">
          <p>
            This healthcare product is designed to enhance your well-being and daily performance.
          </p>
          <p>
            It offers premium quality, comfort, and durability to support your active lifestyle. 
            Ideal for individuals seeking reliable health-focused solutions.
          </p>
        </div>

        {/* Price */}
        <div className="pt-2 mb-6">
          <span className="text-2xl font-bold">$225</span>
        </div>

        <hr className="border-green-700 mb-6" />

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-5">
          <label className="text-gray-600 text-xl font-semibold">Quantity:</label>
          <select className="border border-gray-300 py-2 px-4 rounded hover:border-green-500">
            {[1, 2, 3, 4, 5].map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart */}
        <div className="pt-2">
          <button className="text-lg bg-green-600 hover:bg-amber-500 text-white w-2/4 py-4 rounded font-bold flex items-center justify-center gap-2 transition">
            <ShoppingCart size={20} /> Add to Cart
          </button>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col space-y-4 mt-8">
          {/* Secure Payment */}
          <div className=" flex items-center gap-4 bg-gray-50 shadow-xl rounded p-4 hover:bg-green-100">
            <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
              <Lock size={24} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-xl">নিরাপদ পেমেন্ট</h4>
              <p className="text-gray-600 text-lg">বিভিন্ন পেমেন্ট পদ্ধতি থেকে বেছে নিন</p>
            </div>
          </div>

          {/* Fast Delivery */}
          <div className="flex items-center gap-4 bg-gray-50 shadow-xl rounded my-4 p-4 hover:bg-green-100">
            <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
              <Truck size={24} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-xl">গ্রিন ডেলিভারি</h4>
              <p className="text-gray-600 text-lg">৩-৫ দিনের মধ্যে আপনার পণ্য পৌঁছে যাবে</p>
            </div>
          </div>

          {/* 100% Natural */}
          <div className=" flex items-center gap-4 bg-gray-50 shadow-xl rounded my-4 p-4 hover:bg-green-100">
            <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
              <Leaf size={24} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-xl">১০০% ন্যাচারাল</h4>
              <p className="text-gray-600 text-lg">প্রাকৃতিক উৎপাদন ব্যবহার করতে আমরা প্রতিশ্রুতিবদ্ধ</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
