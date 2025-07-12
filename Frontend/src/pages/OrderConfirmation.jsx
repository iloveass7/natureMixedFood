import React from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const { orderId, orderDetails } = state || {};

  if (!orderId) {
    return <div>Invalid order confirmation</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <CheckCircle className="mx-auto text-green-500" size={48} />
        <h1 className="text-2xl font-bold mt-4">Order Placed Successfully!</h1>
        <p className="mt-2">Your order ID: {orderId}</p>
        <p className="mt-4">
          Thank you for your purchase. We'll process your order shortly.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
