import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Lock, Truck, Leaf } from "lucide-react";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/product/singleProduct/${id}`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="w-full px-4 md:px-36 py-10 pb-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 px-4 h-[700px] flex flex-col justify-between">
          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center border border-green-700 rounded-md overflow-hidden max-h-[600px] hover:bg-green-200">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="object-contain max-h-full max-w-full cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            />
          </div>

          {/* Thumbnails */}
          <div className="pt-4 h-[100px] flex justify-center gap-3 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-21 h-21 object-cover cursor-pointer border ${selectedImage === idx ? "border-green-500" : "border-gray-300"
                  } rounded`}
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/2 h-[700px] overflow-y-auto pr-2">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{product.name}</h2>
          <p className="text-green-700 text-xl font-semibold mb-6">
            {product.bestSeller ? "Best Seller" : "Premium Quality"}
          </p>
          <hr className="border-green-700 mb-3" />

          <div className="text-gray-700 text-xl leading-relaxed space-y-2">
            {product.description.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="text-2xl font-bold mt-6">${product.price}</div>

          <div className="flex items-center gap-4 mt-4">
            <label className="text-gray-600 text-xl font-semibold">Quantity:</label>
            <select className="border border-gray-300 py-2 px-4 rounded hover:border-green-500">
              {[1, 2, 3, 4, 5].map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </div>

          <button className="mt-10 text-lg bg-green-600 hover:bg-amber-500 text-white w-full py-4 rounded font-bold flex items-center justify-center gap-2 transition">
            <ShoppingCart size={20} /> Add to Cart
          </button>

          {/* Feature Cards Included in Scroll */}
          <div className="flex flex-col space-y-3 mt-6">
            <div className="flex items-center gap-4 bg-gray-50 shadow-md rounded p-4 hover:bg-green-200">
              <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                <Lock size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-xl">নিরাপদ পেমেন্ট</h4>
                <p className="text-gray-600 text-lg">বিভিন্ন পেমেন্ট পদ্ধতি থেকে বেছে নিন</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 shadow-md rounded p-4 hover:bg-green-100">
              <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                <Truck size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-xl">গ্রিন ডেলিভারি</h4>
                <p className="text-gray-600 text-lg">৩-৫ দিনের মধ্যে আপনার পণ্য পৌঁছে যাবে</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 shadow-md rounded p-4 hover:bg-green-100">
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

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center overflow-auto">
          <div className="relative w-full h-full flex items-center justify-center p-6">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-8 text-5xl text-amber-500 font-bold hover:text-red-600 z-50"
              title="Close"
            >
              &times;
            </button>
            <img
              src={product.images[selectedImage]}
              alt="Zoomed"
              className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
