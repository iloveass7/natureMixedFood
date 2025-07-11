import React, { useState, useEffect } from "react";
import { Wallet, Plus, Minus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getCart, getLocalCart, saveLocalCart } from "../utils/cart.jsx";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  // Form fields state - merged firstName and lastName into fullName
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    district: '',
    division: '',
    email: ''
  });

  useEffect(() => {
    // Check if we're coming from the cart page
    const fromCart = location.state?.fromCart || false;

    if (fromCart) {
      setCart(getLocalCart());
    } else {
      const buyNowCart = getCart();
      setCart(buyNowCart.length > 0 ? buyNowCart : getLocalCart());
    }

    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('userData');
    
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData(user);
        // Pre-fill form with user data (except location)
        setFormData({
          fullName: user.name || '',
          phone: user.phone || '',
          location: '', // Location remains empty
          district: user.district || '',
          division: user.division || '',
          email: user.email || ''
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [location.state]);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    saveLocalCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    saveLocalCart(updatedCart);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="md:col-span-2 border border-green-800 px-4 py-4 rounded hover:bg-green-100"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
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
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className={`w-6 h-6 ${item.quantity <= 1 ? 'bg-gray-200' : 'bg-gray-100 hover:bg-amber-400'} rounded-md flex items-center justify-center transition`}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="text-gray-700" size={14} />
                          </button>
                          <span className="text-base font-medium px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
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