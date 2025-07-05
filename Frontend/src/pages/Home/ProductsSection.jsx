import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductsSection = ({ products, loading }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const visibleProducts = showAll ? products : products.slice(0, 5);

  if (loading) {
    return <div className="w-full text-center py-10">Loading products...</div>;
  }

  return (
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

                {/* Action Buttons */}
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
                      navigate('/checkout', { state: { product } });
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
  );
};
export default ProductsSection;