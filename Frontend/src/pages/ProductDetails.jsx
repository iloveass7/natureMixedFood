import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Lock, Truck, Leaf } from "lucide-react";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/product/singleProduct/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Expected JSON but got: ${contentType}. Response: ${text}`
          );
        }

        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full text-center py-10">Loading product details...</div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-10 text-red-500">
        Error loading product: {error}
      </div>
    );
  }

  if (!product) {
    return <div className="w-full text-center py-10">Product not found</div>;
  }

  return (
    <div className="w-full min-h-screen px-4 md:px-36 py-10 pb-16 flex flex-col lg:flex-row gap-8">
      {/* LEFT - IMAGES */}
      <div className="flex flex-col-reverse lg:flex-row gap-4 w-full lg:w-2/4 h-full">
        {/* Thumbnails Bottom on sm/md, Left on lg */}
        <div className="flex gap-4 overflow-x-auto sm:justify-center md:justify-center lg:flex-col lg:overflow-y-auto lg:justify-start">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="thumb"
              className={`w-24 h-24 sm:mx-5 object-cover cursor-pointer border ${
                selectedImage === idx ? "border-green-500" : "border-gray-300"
              } rounded`}
              onClick={() => setSelectedImage(idx)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 mx-5 lg:mx-7 flex items-center justify-center h-full">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="max-w-full h-auto rounded-lg object-contain"
          />
        </div>
      </div>

      {/* RIGHT - DETAILS */}
      <div className="w-full sm:px-5 lg:w-2/4 flex flex-col space-y-0 h-full justify-between">
        {/* Title and Subtitle */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {product.name}
          </h2>
          <p className="text-green-600 text-xl font-semibold mb-6">
            {product.bestSeller ? "Best Seller" : "Premium Quality"}
          </p>
          <hr className="border-green-700 mb-3" />
        </div>

        {/* Product Description */}
        <div className="text-gray-700 text-xl leading-relaxed space-y-2">
          {product.description.split("\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Price */}
        <div className="pt-2 my-5">
          <span className="text-2xl font-bold">${product.price}</span>
        </div>

        <hr className="border-green-700 mb-6" />

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-5">
          <label className="text-gray-600 text-xl font-semibold">
            Quantity:
          </label>
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
              <p className="text-gray-600 text-lg">
                বিভিন্ন পেমেন্ট পদ্ধতি থেকে বেছে নিন
              </p>
            </div>
          </div>

          {/* Fast Delivery */}
          <div className="flex items-center gap-4 bg-gray-50 shadow-xl rounded my-4 p-4 hover:bg-green-100">
            <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
              <Truck size={24} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-xl">গ্রিন ডেলিভারি</h4>
              <p className="text-gray-600 text-lg">
                ৩-৫ দিনের মধ্যে আপনার পণ্য পৌঁছে যাবে
              </p>
            </div>
          </div>

          {/* 100% Natural */}
          <div className="flex items-center gap-4 bg-gray-50 shadow-xl rounded my-4 p-4 hover:bg-green-100">
            <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
              <Leaf size={24} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-xl">১০০% ন্যাচারাল</h4>
              <p className="text-gray-600 text-lg">
                প্রাকৃতিক উৎপাদন ব্যবহার করতে আমরা প্রতিশ্রুতিবদ্ধ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
