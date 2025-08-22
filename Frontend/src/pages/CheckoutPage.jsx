import React, { useState, useEffect } from "react";
import { Wallet, Plus, Minus, CheckCircle, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCart,
  getLocalCart,
  saveLocalCart,
  clearCart,
} from "../utils/cart.jsx";
import { api } from "../config/api";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    district: "",
    division: "",
    email: "",
  });

  useEffect(() => {
    // Check for pending order after reload
    const pendingOrder = localStorage.getItem('pendingOrder');
    if (pendingOrder) {
      const orderData = JSON.parse(pendingOrder);
      setOrderConfirmation(orderData);
      setShowConfirmation(true);
      localStorage.removeItem('pendingOrder');

      // Set 1min timeout for auto-redirect
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 60000);

      return () => clearTimeout(redirectTimer);
    }

    // Original cart loading logic
    const fromCart = location.state?.fromCart || false;
    if (fromCart) {
      setCart(getLocalCart());
    } else {
      const buyNowCart = getCart();
      setCart(buyNowCart.length > 0 ? buyNowCart : getLocalCart());
    }

    // Original user data loading
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userData");

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData(user);
        setFormData((prev) => ({
          ...prev,
          fullName: user.name || "",
          phone: user.phone || "",
          district: user.district || "",
          division: user.division || "",
          email: user.email || "",
        }));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [location.state, navigate]);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    saveLocalCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    saveLocalCart(updatedCart);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    navigate("/");
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      const required = {
        "Full Name": formData.fullName?.trim(),
        Phone: formData.phone?.trim(),
        Location: formData.location?.trim(),
        District: formData.district?.trim(),
        Division: formData.division?.trim(),
        Email: formData.email?.trim(),
        "Cart Items": cart.length > 0,
      };

      const missing = Object.entries(required)
        .filter(([_, v]) => !v)
        .map(([k]) => k);

      if (missing.length) {
        throw new Error(`Please fill all required fields: ${missing.join(", ")}`);
      }

      // Build payload
      const orderData = {
        user: userData?._id || null,
        guestInfo: !userData
          ? {
            name: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
          }
          : undefined,
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        address: {
          location: formData.location.trim(),
          district: formData.district.trim(),
          division: formData.division.trim(),
        },
        number: formData.phone.trim(),
      };

      // Submit via axios instance (Authorization header is added by your interceptor if a token exists)
      const { data, status } = await api.post("/order/order", orderData);

      const ok =
        status >= 200 &&
        status < 300 &&
        // accept either { success: true } or { order: {...} }
        ((typeof data?.success === "boolean" ? data.success : true) || !!data?.order);

      if (!ok) {
        throw new Error(data?.message || "Failed to place order");
      }

      clearCart();

      // Persist for post-reload confirmation flow
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          orderId: data?.order?._id,
          orderDetails: data?.order,
        })
      );

      window.location.reload();
    } catch (err) {
      console.error("Order submission error:", err);
      setError(err.response?.data?.message || err.message || "Failed to place order");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-4 py-13 md:px-10 lg:px-32 relative">
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl h-auto w-full text-center border-2 border-green-600">
            <button
              onClick={closeConfirmation}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <CheckCircle className="mx-auto text-green-500" size={48} />
            <h1 className="text-2xl font-bold mt-4">Order Placed Successfully!</h1>
            <p className="mt-2">Your order ID: {orderConfirmation?.orderId}</p>
            <p className="mt-4">
              Thank you for your purchase. We'll process your order shortly.
            </p>
            <button
              onClick={closeConfirmation}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Original JSX remains unchanged below */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT - SHIPPING FORM */}
        <div className="w-full lg:w-2/3 space-y-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-900 uppercase border-b pb-2">
            Checkout
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmitOrder}
            className="space-y-4 text-base sm:text-lg md:text-xl"
          >
            {/* Full Name - Full width row */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full border border-green-800 px-4 py-4 rounded hover:bg-green-100"
              />
            </div>

            {/* Phone Number - Full width row */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-green-800 px-4 py-4 rounded hover:bg-green-100"
              />
            </div>

            {/* Email - Full width row */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-green-800 px-4 py-4 rounded hover:bg-green-100"
              />
            </div>

            {/* Street Address - Full width row */}
            <div>
              <input
                type="text"
                name="location"
                placeholder="Street Address"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full border border-green-800 px-4 py-4 rounded hover:bg-green-100"
              />
            </div>

            {/* District and Division - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-green-800 px-4 py-4 rounded hover:bg-green-100"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="division"
                  placeholder="Division"
                  value={formData.division}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-green-800 px-4 py-4 rounded hover:bg-green-100"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className={`
                  relative overflow-hidden
                  w-full max-w-md
                  bg-gradient-to-r from-green-600 to-green-800
                  text-white 
                  py-5 px-8 
                  rounded-lg
                  text-xl font-bold 
                  shadow-lg
                  hover:from-green-700 hover:to-green-900
                  transition-all duration-300
                  transform hover:scale-105
                  ${loading || cart.length === 0
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                  }
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Wallet className="mr-2" size={20} />
                    Place Order
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* PAYMENT */}
          <div className="flex justify-between items-start sm:items-center gap-4 border px-4 sm:px-5 py-4 sm:py-5 rounded hover:bg-green-100 text-base sm:text-xl">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white border">
                <Wallet size={26} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  Cash on Delivery (COD)
                </p>
                <p className="text-sm sm:text-base text-gray-500">
                  You'll pay when the order is delivered to your address.
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="payment"
              defaultChecked
              readOnly
              className="w-5 h-5 accent-green-600"
            />
          </div>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div className="w-full lg:w-1/3 space-y-8">
          <h2 className="text-4xl sm:text-4xl font-bold uppercase text-green-800 py-3">
            Order Summary
          </h2>

          {/* Price Summary */}
          <div className="border border-green-800 p-4 sm:p-6 rounded shadow hover:bg-green-100 text-base sm:text-xl">
            <div className="flex justify-between mb-2">
              <span className="font-bold">Subtotal</span>
              <span className="text-green-600 font-semibold">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2 font-semibold">
              <span className="font-bold">Taxes</span>
              <span>—</span>
            </div>
            <div className="flex justify-between mb-4 font-semibold">
              <span className="font-bold">Shipping ({cart.length} items)</span>
              <span>—</span>
            </div>
            <hr />
            <div className="flex justify-between mt-4">
              <span className="font-bold">Total</span>
              <span className="text-green-600 font-semibold">
                $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>

          {/* Bag Summary */}
          <div>
            <h3 className="font-bold my-7 text-lg sm:text-4xl text-green-800">
              Order Details
            </h3>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500 text-xl py-27">
                Your cart is empty.
              </p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex gap-4 sm:gap-6 mb-6">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 sm:w-25 sm:h-25 object-cover rounded border border-white"
                  />
                  <div className="text-sm sm:text-base text-gray-700 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-lg">{item.name}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-4">
                        <span>Quantity:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            className={`w-6 h-6 ${item.quantity <= 1
                                ? "bg-gray-200"
                                : "bg-gray-100 hover:bg-amber-400"
                              } rounded-md flex items-center justify-center transition`}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="text-gray-700" size={14} />
                          </button>
                          <span className="text-base font-medium px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="w-6 h-6 bg-gray-100 hover:bg-amber-400 rounded-md flex items-center justify-center transition"
                          >
                            <Plus className="text-gray-700" size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-green-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-600 text-white mt-3 px-4 py-1 rounded text-sm hover:bg-red-800 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;