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
        <div className="w-full min-h-screen px-4 md:px-36 py-10 pb-16 flex flex-col lg:flex-row gap-8">

            {/* LEFT - IMAGES */}
            <div className="flex flex-col-reverse lg:flex-row gap-4 w-full lg:w-2/4 h-full">

                {/* Thumbnails Bottom on sm/md, Left on lg */}
                <div className="flex gap-4 overflow-x-auto sm:justify-center md:justify-center lg:flex-col lg:overflow-y-auto lg:justify-start">          {productImages.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt="thumb"
                        className={`w-24 h-24 sm:mx-5 object-cover cursor-pointer border ${selectedImage === idx ? "border-green-500" : "border-gray-300"
                            } rounded`}
                        onClick={() => setSelectedImage(idx)}
                    />
                ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 mx-5 lg:mx-7 flex items-center justify-center h-full">
                    <img
                        src={productImages[selectedImage]}
                        alt="Product"
                        className="max-w-full h-auto rounded-lg object-contain"
                    />
                </div>
            </div>

            {/* RIGHT - DETAILS */}
            <div className="w-full sm:px-5 lg:w-2/4 flex flex-col space-y-0 h-full justify-between">

                {/* Title and Subtitle */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">HealthCare Product</h2>
                    <p className="text-green-600 text-xl font-semibold mb-6">Promotes Better Health</p>
                    <hr className="border-green-700 mb-3" />
                </div>

                {/* Product Description */}
                <div className="text-gray-700 text-xl leading-relaxed space-y-2">
                    <p>
                        This healthcare product is designed to enhance your well-being and daily performance.
                    </p>
                    <p>
                        It offers premium quality, comfort, and durability to support your active lifestyle.
                                                It offers premium quality, comfort, and durability to support your active lifestyle.

                        Ideal for individuals seeking reliable health-focused solutions.
                    </p>
                </div>

                {/* Price */}
                <div className="pt-2 my-5">
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

                {/* Add to Cart Button */}
                <div className="pt-2">
                    <button className="text-lg bg-green-600 hover:bg-amber-500 text-white w-full md:w-full py-4 rounded font-bold flex items-center justify-center gap-2 transition">
                        <ShoppingCart size={20} /> Add to Cart
                    </button>
                </div>

                {/* Feature Cards */}
                <div className="flex flex-col space-y-1 mt-1">

                    {/* Secure Payment */}
                    <div className="flex items-center gap-4 bg-gray-50 shadow-xl rounded p-4 hover:bg-green-100">
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
                    <div className="flex items-center gap-4 bg-gray-50 shadow-xl rounded my-4 p-4 hover:bg-green-100">
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

