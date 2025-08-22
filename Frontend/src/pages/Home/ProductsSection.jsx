import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { addToCart, replaceCartWithSingleItem } from "../../utils/cart.jsx";

const ProductsSection = ({ products, loading }) => {
  const [showAll, setShowAll] = useState(false); // for large (lg+) grid only
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const getUserType = () => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("userData");

    try {
      const user = userData ? JSON.parse(userData) : null;
      if (adminToken) return "admin";
      if (token) return "user";
      if (user?.name === "Guest") return "guest";
      return "none";
    } catch {
      return "none";
    }
  };

  const showNotification = (message, type = "add") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
      if (type === "login-required") navigate("/login");
    }, 1500);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    const userType = getUserType();

    if (userType === "admin") {
      showNotification("Admins cannot add items to cart", "error");
      return;
    }
    if (userType === "none") {
      showNotification("Please login to add items to cart", "login-required");
      return;
    }

    addToCart(product);
    showNotification(`${product.name} added to cart`, "add");
  };

  const handleBuyNow = (product, e) => {
    e.stopPropagation();
    const userType = getUserType();

    if (userType === "admin") {
      showNotification("Admins cannot place orders", "error");
      return;
    }
    if (userType === "none") {
      showNotification("Please login to place orders", "login-required");
      return;
    }

    replaceCartWithSingleItem(product);
    showNotification("Ready for checkout", "buy");
    navigate("/checkout", { state: { fromCart: false } });
  };

  if (loading) return <Loader />;

  // Large screens: grid shows 8 items by default (4 cols × 2 rows); “Show More” reveals all
  const VISIBLE_GRID_COUNT = 8;
  const gridProducts = showAll ? products : products.slice(0, VISIBLE_GRID_COUNT);
  const shouldShowButton = products.length > VISIBLE_GRID_COUNT;

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
          <h3 className="text-xl font-bold overflow-hidden leading-tight" title={product.name}>
            {product.name.length > 15 ? product.name.slice(0, 15) + "..." : product.name}
          </h3>

          <p className="text-gray-500 text-[14px] mt-1">Delivered in 2-4 days</p>
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
          {/* Mobile + Tablet (≤ lg): show ALL items in horizontal scroll */}
          <div className="flex lg:hidden gap-4 overflow-x-auto pb-4 mb-12 px-1 snap-x snap-mandatory scroll-smooth">
            {products.map((product) => (
              <div className="snap-center shrink-0" key={product._id}>
                {renderCard(product)}
              </div>
            ))}
          </div>

          {/* Desktop (lg+): grid with “Show More” */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 mb-8">
            {gridProducts.map((product) => renderCard(product))}
          </div>

          {shouldShowButton && (
            <div className="hidden lg:flex justify-center mb-6">
              <button
                className="bg-green-700 text-white px-8 py-2 rounded text-lg font-medium hover:bg-yellow-500 transition"
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Notification Popup */}
      {notification.show && (
        <div
          className={`fixed bottom-10 left-280 transform -translate-x-1/2 ${
            notification.type === "buy"
              ? "bg-blue-600"
              : notification.type === "error"
              ? "bg-red-600"
              : notification.type === "login-required"
              ? "bg-amber-500"
              : "bg-green-600"
          } text-white text-lg px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-out`}
        >
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
              d={
                notification.type === "error"
                  ? "M6 18L18 6M6 6l12 12"
                  : notification.type === "login-required"
                  ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  : "M5 13l4 4L19 7"
              }
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
