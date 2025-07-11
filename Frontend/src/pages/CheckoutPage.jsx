import React, { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getCart, getLocalCart } from "../utils/cart.jsx";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Check if we're coming from the cart page
    const fromCart = location.state?.fromCart || false;

    if (fromCart) {
      // Use local_cart when coming from cart page
      setCart(getLocalCart());
    } else {
      // Otherwise use buy-now cart if it exists, or fall back to local_cart
      const buyNowCart = getCart();
      setCart(buyNowCart.length > 0 ? buyNowCart : getLocalCart());
    }
  }, [location.state]);

  return (
    <div className="bg-white px-4 py-13 md:px-10 lg:px-32">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT - SHIPPING FORM */}
        <div className="w-full lg:w-2/3 space-y-10">
          {/* CHECKOUT HEADER */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-900 uppercase border-b pb-2">
            Checkout
          </h2>

          {/* FORM */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base sm:text-lg md:text-xl">
            <input
              type="text"
              placeholder="First Name"
              required
              className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="text"
              placeholder="Phone Number"
              required
              className="md:col-span-2 border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="text"
              placeholder="Location"
              required
              className="md:col-span-2 border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="text"
              placeholder="District"
              required
              className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="text"
              placeholder="Division"
              required
              className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="text"
              placeholder="Postal Code"
              required
              className="md:col-span-2 border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
          </form>

          {/* CONTINUE BUTTON */}
          <button className="w-full bg-green-700 text-white py-4 rounded text-lg sm:text-xl font-bold hover:bg-amber-400 transition">
            Continue
          </button>

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
              unchecked
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
            <h3 className="font-semibold mb-3 text-lg sm:text-xl text-green-600">
              Arrives in 4–7 days
            </h3>

            {cart.map((item, index) => (
              <div key={index} className="flex gap-4 sm:gap-6 mb-6">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded border border-white"
                />
                <div className="text-sm sm:text-base text-gray-700">
                  <p className="font-semibold">{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    <span className="text-green-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                  <div className="flex gap-3 mt-1">
                    <button className="underline hover:text-green-500">
                      Edit
                    </button>
                    <button className="underline hover:text-red-500">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
