import React, { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getLocalCart, saveLocalCart, clearCart } from "../utils/cart.jsx";

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
    quantity: 0,
    productName: ""
  });
  const [removedItemId, setRemovedItemId] = useState(null);

  useEffect(() => {
    const loadCart = () => {
      const storedCart = getLocalCart();
      setCart(storedCart);
    };

    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const showNotification = (message, type = "update", quantity = 0, productName = "") => {
    setNotification({ show: true, message, type, quantity, productName });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 2000);
  };

  const handleQuantityChange = (productId, delta) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === productId) {
          const newQty = (item.quantity || 1) + delta;
          if (newQty <= 0) {
            setRemovedItemId(productId);
            setTimeout(() => setRemovedItemId(null), 500);
            showNotification(
              `${item.name} removed from cart`,
              "remove",
              0,
              item.name
            );
            return null;
          }
          
          const action = delta > 0 ? "Increased" : "Decreased";
          showNotification(
            `${action} ${item.name} quantity`,
            "update",
            newQty,
            item.name
          );
          
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter(Boolean);

    setCart(updatedCart);
    saveLocalCart(updatedCart);
  };

  const handleClearCart = () => {
    showNotification("Cart cleared", "remove");
    clearCart();
    setCart([]);
    setTimeout(() => window.location.reload(), 1000);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-xl">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto p-6 px-9">
              <div className="flex items-start justify-between">
                <h2 className="text-[1.8rem] text-green-700 font-bold">
                  Shopping Cart
                </h2>
                <button
                  type="button"
                  className="text-amber-400 hover:text-green-700 mt-2"
                  onClick={onClose}
                >
                  <X size={30} />
                </button>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  {cart.length === 0 ? (
                    <div className="flex items-center justify-center h-full min-h-[550px] lg:min-h-[650px]">
                      <p className="text-center text-gray-500 text-xl">
                        Your cart is empty.
                      </p>
                    </div>
                  ) : (
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cart.map((item, idx) => (
                        <li 
                          key={idx} 
                          className={`py-6 flex gap-4 transition-all duration-300 ${
                            removedItemId === item._id ? "bg-red-100" : ""
                          }`}
                        >
                          <img
                            src={item.images?.[0] || "placeholder.jpg"}
                            alt={item.name}
                            className="w-25 h-25 rounded border object-cover"
                          />
                          <div className="flex-1 flex flex-col">
                            <div>
                              <p className="text-xl font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="mt-1 text-lg text-gray-500">
                                {item.description?.slice(0, 50) ||
                                  "No description"}
                              </p>
                            </div>
                            <div className="flex-1 flex items-end justify-between">
                              <div className="flex items-center mt-2 space-x-2">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(item._id, -1)
                                  }
                                  className="w-8 h-8 bg-green-700 hover:bg-amber-400 rounded-md flex items-center justify-center transition"
                                >
                                  <Minus className="text-white" size={18} />
                                </button>

                                <span className="text-base font-medium px-4">
                                  {item.quantity || 1}
                                </span>

                                <button
                                  onClick={() =>
                                    handleQuantityChange(item._id, 1)
                                  }
                                  className="w-8 h-8 bg-green-700 hover:bg-amber-400 rounded-md flex items-center justify-center transition"
                                >
                                  <Plus className="text-white" size={18} />
                                </button>
                              </div>

                              <p className="font-medium text-green-600 text-lg">
                                $
                                {(item.price * (item.quantity || 1)).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between text-base text-xl font-bold text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    setTimeout(
                      () =>
                        navigate("/checkout", { state: { fromCart: true } }),
                      100
                    );
                  }}
                  className="w-full bg-green-700 border border-transparent rounded-md py-3 px-4 text-base font-medium text-lg text-white hover:bg-amber-400"
                  disabled={cart.length === 0}
                >
                  Checkout
                </button>

                <button
                  onClick={handleClearCart}
                  className="w-full bg-red-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-lg text-white hover:bg-red-700"
                  disabled={cart.length === 0}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Notification Popup */}
      {notification.show && (
        <div className={`fixed bottom-10 left-280 transform -translate-x-1/2 ${
          notification.type === "remove" ? "bg-red-500" : 
          notification.type === "update" ? "bg-amber-500" : "bg-green-600"
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
              d={notification.type === "remove" ? "M6 18L18 6M6 6l12 12" : "M5 13l4 4L19 7"}
            />
          </svg>
          <div >
            <span className="font-medium">{notification.message}</span>
            {notification.type === "update" && (
              <span className="ml-2 font-bold">(Now: {notification.quantity})</span>
            )}
          </div>
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
    </div>
  );
};

export default Cart;