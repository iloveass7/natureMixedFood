import React from "react";
import { Wallet } from "lucide-react";

const CheckoutPage = () => {
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
                            className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="md:col-span-2 border border-green-800 px-4 py-4 rounded hover:bg-green-100"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            className="md:col-span-2 border border-green-800 px-4 py-4 rounded hover:bg-green-100"
                            required
                        />
                        <input
                            type="text"
                            placeholder="District"
                            className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Division"
                            className="border border-green-800 px-4 py-4 rounded hover:bg-green-100"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Postal Code"
                            className="md:col-span-2 border border-green-800 px-4 py-4 rounded hover:bg-green-100"
                            required
                        />
                    </form>

                    {/* CONTINUE BUTTON */}
                    <button className="w-full bg-green-700 text-white py-4 rounded text-lg sm:text-xl font-bold hover:bg-amber-400 transition">
                        Continue
                    </button>

                    {/* PAYMENT */}
                    <div className="flex justify-between items-start sm:items-center gap-4 border px-4 sm:px-5 py-4 sm:py-5 rounded hover:bg-green-100 text-base sm:text-xl">
                        {/* Left - Icon and Text */}
                        <div className="flex items-start sm:items-center gap-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white border">
                                <Wallet size={26} className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-gray-800 font-medium">Cash on Delivery (COD)</p>
                                <p className="text-sm sm:text-base text-gray-500">
                                    You'll pay when the order is delivered to your address.
                                </p>
                            </div>
                        </div>

                        {/* Right - Radio Input */}
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
                            <span className="text-green-600 font-semibold">$74.98 CDN</span>
                        </div>
                        <div className="flex justify-between mb-2 font-semibold">
                            <span className="font-bold">Taxes</span>
                            <span>—</span>
                        </div>
                        <div className="flex justify-between mb-4 font-semibold">
                            <span className="font-bold">Shipping (2 items)</span>
                            <span>—</span>
                        </div>
                        <hr />
                        <div className="flex justify-between mt-4">
                            <span className="font-bold">Total</span>
                            <span className="text-green-600 font-semibold">$74.98 CDN</span>
                        </div>
                    </div>

                    {/* Bag Summary */}
                    <div>
                        <h3 className="font-semibold mb-3 text-lg sm:text-xl text-green-600">
                            Arrives in 4–7 days
                        </h3>

                        {/* Product Items */}
                        {[1, 2].map((item) => (
                            <div key={item} className="flex gap-4 sm:gap-6 mb-6">
                                <img
                                    src="lg.png"
                                    alt="Product"
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded border border-white"
                                />
                                <div className="text-sm sm:text-base text-gray-700">
                                    <p className="font-semibold">Men's UA Hustle Fleece Hoodie</p>
                                    <p>Color: True Gray Heather (025), XL</p>
                                    <p>
                                        <span className="text-green-600">$49.99</span>
                                    </p>
                                    <div className="flex gap-3 mt-1">
                                        <button className="underline hover:text-green-500">Edit</button>
                                        <button className="underline hover:text-red-500">Remove</button>
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
