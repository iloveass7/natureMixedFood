import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchSidebar = ({ isOpen, onClose, searchQuery, setSearchQuery }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim()) {
        try {
          setLoading(true);
          const res = await axios.get(
            `http://localhost:8000/api/product/searchProducts?q=${searchQuery}`
          );
          setResults(res.data);
        } catch (err) {
          console.error("Search failed", err);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-[1.7rem] text-green-700 px-3 font-bold">
                  Search Products
                </h2>
                <button
                  type="button"
                  className="text-amber-500 hover:text-green-700"
                  onClick={onClose}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Input */}
              <div className="px-3 mt-4 flex">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : searchQuery ? (
                results.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 mx-3 text-xl">
                      Results for "{searchQuery}"
                    </h3>
                    <div className="space-y-3">
                      {results.map((product) => (
                        <div
                          key={product._id}
                          className="mx-3 flex items-center gap-4 p-3 bg-white shadow-lg rounded hover:bg-green-200 cursor-pointer transition"
                          onClick={() => {
                            navigate(`/product/${product._id}`);
                            onClose();
                          }}
                        >
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded border"
                          />
                          <div className="flex flex-col justify-center">
                            <p className="text-green-900 font-semibold text-md text-lg">
                              {product.name}
                            </p>
                            <p className="text-gray-600 font-bold text-sm mt-1">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No products found.</p>
                )
              ) : (
                <div className="text-center text-gray-500 justify-center flex items-center h-full">
                  <p>Enter your search query above</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;
