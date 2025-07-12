import React, { useState, useEffect } from "react";
import { Wallet, Plus, Minus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCart,
  getLocalCart,
  saveLocalCart,
  clearCart,
} from "../utils/cart.jsx";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    district: "",
    division: "",
    email: "",
  });

  useEffect(() => {
    const fromCart = location.state?.fromCart || false;

    if (fromCart) {
      setCart(getLocalCart());
    } else {
      const buyNowCart = getCart();
      setCart(buyNowCart.length > 0 ? buyNowCart : getLocalCart());
    }

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userData");

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData(user);
        setFormData((prev) => ({
          ...prev,
          firstName: user.name?.split(" ")[0] || "",
          lastName: user.name?.split(" ")[1] || "",
          phone: user.phone || "",
          district: user.district || "",
          division: user.division || "",
          email: user.email || "",
        }));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [location.state]);

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

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.phone ||
        !formData.location ||
        !formData.district ||
        !formData.division
      ) {
        throw new Error("Please fill all required fields");
      }

      if (!/^\d+$/.test(formData.phone)) {
        throw new Error("Phone number must contain only numbers");
      }

      if (cart.length === 0) {
        throw new Error("Your cart is empty");
      }

      const orderData = {
        user: userData?._id || null,
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalPrice: cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        address: {
          location: formData.location,
          district: formData.district,
          division: formData.division,
        },
        number: Number(formData.phone),
      };

      const response = await fetch("http://localhost:8000/api/order/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      const result = await response.json();
      clearCart();

      navigate("/order-confirmation", {
        state: {
          orderId: result.order._id,
          orderDetails: result.order,
        },
      });
    } catch (err) {
      setError(err.message);
      console.error("Order submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-4 py-13 md:px-10 lg:px-32">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section - Shipping Form */}
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base sm:text-lg md:text-xl"
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Numbers only)"
              value={formData.phone}
              onChange={handleInputChange}
              required
              pattern="[0-9]*"
              className="md:col-span-2 border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="text"
              name="location"
              placeholder="Location (Street Address, House No)"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="md:col-span-2 border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleInputChange}
              required
              className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="text"
              name="division"
              placeholder="Division"
              value={formData.division}
              onChange={handleInputChange}
              required
              className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="md:col-span-2 border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />

            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="relative overflow-hidden w-full max-w-md bg-gradient-to-r from-green-600 to-green-800 text-white py-5 px-8 rounded-lg text-xl font-bold shadow-lg hover:from-green-700 hover:to-green-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
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
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                </span>
              </button>
            </div>
          </form>

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

        {/* Right Section - Order Summary */}
        <div className="w-full lg:w-1/3 space-y-8">
          <h2 className="text-4xl sm:text-4xl font-bold uppercase text-green-800 py-3">
            Order Summary
          </h2>

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
                            className={`w-6 h-6 ${
                              item.quantity <= 1
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