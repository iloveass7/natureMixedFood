import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { addToCart, replaceCartWithSingleItem } from "../../utils/cart.jsx";

const ProductsSection = ({ products, loading }) => {
  const [showAll, setShowAll] = useState(false);
  const [notification, setNotification] = useState({ 
    show: false, 
    message: "", 
    type: "" 
  });
  const navigate = useNavigate();

  const getProductsPerRow = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const showNotification = (message, type = "add") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 2000);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    showNotification(`${product.name} added to cart`, "add");
  };

  const handleBuyNow = (product, e) => {
    e.stopPropagation();
    replaceCartWithSingleItem(product);
    showNotification("Ready for checkout", "buy");
    navigate("/checkout", { state: { fromCart: false } });
  };

  const productsPerRow = getProductsPerRow();
  const maxVisibleWithoutButton = productsPerRow * 2;
  const shouldShowButton = products.length > maxVisibleWithoutButton;
  const visibleProducts = showAll
    ? products
    : products.slice(0, maxVisibleWithoutButton);

  if (loading) {
    return <Loader />;
  }

  const renderCard = (product) => (
    <div
      key={product._id}
      onClick={() => navigate(`/product/${product._id}`)}
      className="min-w-[80%] max-w-[90%] sm:min-w-0 sm:max-w-none h-[500px] w-full relative rounded-xl px-6 py-6 flex flex-col shadow-2xl bg-white transition-all duration-300 hover:shadow-4xl hover:-translate-y-2 cursor-pointer"
    >
      <div className="flex flex-col h-full justify-between overflow-hidden">
        {/* Badge + Image */}
        <div className="relative flex flex-col items-center">
          {product.bestSeller ? (
            <span className="absolute top-0 left-0 bg-green-700 font-semibold text-white text-[14px] px-4 py-1 rounded-full shadow">
              Best Seller
            </span>
          ) : (
            <span className="absolute top-0 left-0 bg-amber-400 font-semibold text-white text-[14px] px-4 py-1 rounded-full shadow">
              Premium Quality
            </span>
          )}
          <img
            src={product.images[0] || "lg.png"}
            alt={product.name}
            className="w-44 h-44 object-contain mt-12 mb-4"
          />
        </div>

        {/* Product Info */}
        <div className="text-center px-1 mt-2 flex-1 overflow-hidden">
          <h3
            className="text-xl font-bold overflow-hidden leading-tight"
            title={product.name}
          >
            {product.name.length > 15
              ? product.name.slice(0, 15) + "..."
              : product.name}
          </h3>

          <p className="text-gray-500 text-[14px] mt-1">
            Delivered in 2-4 days
          </p>
          <p className="text-[18px] font-bold mt-1">${product.price}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 my-4">
          <button
            onClick={(e) => handleAddToCart(product, e)}
            className="w-full bg-yellow-500 text-white py-2 rounded font-medium hover:bg-green-100 hover:text-green-600 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={(e) => handleBuyNow(product, e)}
            className="w-full bg-green-700 text-white py-2 rounded font-medium hover:bg-yellow-500 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="px-4 md:px-20 lg:px-40 py-2 relative">
      <h2 className="text-[2.5rem] sm:text-[2.5rem] md:text-[2.8rem] font-bold mb-10 text-center text-green-900 hover:text-amber-400">
        আমাদের পণ্যসমূহ
      </h2>

      {products.length === 0 ? (
        <div className="text-center py-10">No products available</div>
      ) : (
        <>
          {/* Mobile Slider View */}
          <div className="flex sm:hidden gap-4 overflow-x-auto pb-4 mb-12 px-1 snap-x snap-mandatory scroll-smooth">
            {visibleProducts.map((product) => (
              <div className="snap-center shrink-0" key={product._id}>
                {renderCard(product)}
              </div>
            ))}
          </div>

          {/* Grid View for Tablet/Desktop */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {visibleProducts.map((product) => renderCard(product))}
          </div>

          {/* Show More/Less Button */}
          {shouldShowButton && (
            <div className="flex justify-center">
              <button
                className="bg-green-700 text-white px-8 py-2 rounded text-lg font-medium hover:bg-yellow-500 transition mb-6"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Notification Popup */}
      {notification.show && (
        <div className={`fixed bottom-10 left-300 transform -translate-x-1/2 ${
          notification.type === "buy" ? "bg-blue-600" : "bg-green-600"
        } text-white text-lg px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-out`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          90% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 20px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;