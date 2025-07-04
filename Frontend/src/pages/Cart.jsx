import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-start justify-between">
                <h2 className="text-[1.7rem] text-green-700 px-3 font-bold">Shopping Cart</h2>
                <button
                  type="button"
                  className="text-amber-400 hover:text-green-700"
                  onClick={onClose}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {/* Cart items will go here */}
                    <li className="py-6 flex">
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <p className="text-xl font-medium text-gray-900">Product Name</p>
                          <p className="mt-1 text-lg text-gray-500">Product Details</p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <p className="text-gray-500 text-sm">Qty 1</p>
                          <p className="font-medium text-green-600 text-lg">$99.00</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between text-base text-xl font-bold text-gray-900">
                <p>Subtotal</p>
                <p>$99.00</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    onClose();
                    setTimeout(() => navigate('/checkout'), 100);
                  }}
                  className="w-full bg-green-700 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-amber-400"
                >
                  Checkout
                </button>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};