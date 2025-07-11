import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Lock, Truck, Leaf, Plus, Minus } from "lucide-react";
import Loader from "../components/Loader";
import { addToCart, getLocalCart, saveLocalCart } from "../utils/cart";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
    quantity: 0
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/product/singleProduct/${id}`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProduct(data);

        const cart = getLocalCart();
        const cartItem = cart.find(item => item._id === data._id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
          setIsInCart(true);
        } else {
          setQuantity(0);
          setIsInCart(false);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const showNotification = (message, type = "add", quantity = 0) => {
    setNotification({ show: true, message, type, quantity });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 2000);
  };

  const updateCartItemQuantity = (newQuantity) => {
    if (!product) return;

    const cart = getLocalCart();
    const existingIndex = cart.findIndex(item => item._id === product._id);

    if (existingIndex >= 0) {
      if (newQuantity <= 0) {
        cart.splice(existingIndex, 1);
        setIsInCart(false);
        showNotification(`${product.name} removed from cart`, "remove");
      } else {
        cart[existingIndex].quantity = newQuantity;
        setIsInCart(true);
        showNotification(`Updated ${product.name} quantity`, "update", newQuantity);
      }
    } else if (newQuantity > 0) {
      cart.push({ ...product, quantity: newQuantity });
      setIsInCart(true);
      showNotification(`${product.name} added to cart`, "add", newQuantity);
    }

    saveLocalCart(cart);
    setQuantity(newQuantity);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    if (isInCart) {
      updateCartItemQuantity(newQuantity);
    } else {
      setQuantity(newQuantity);
    }
  };

  const decrementQuantity = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    if (isInCart) {
      updateCartItemQuantity(newQuantity);
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product || quantity <= 0) return;

    updateCartItemQuantity(quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="min-h-auto w-full px-4 md:px-36 py-10 pb-16 relative">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 px-4 h-[700px] flex flex-col justify-between">
          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center border border-green-700 rounded-md overflow-hidden max-h-[600px] hover:bg-green-200">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="object-contain max-h-full max-w-full cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            />
          </div>

          {/* Thumbnails */}
          <div className="pt-4 h-[100px] flex justify-center gap-3 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-21 h-21 object-cover cursor-pointer border ${selectedImage === idx ? "border-green-500" : "border-gray-300"} rounded`}
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/2 h-[700px] overflow-y-auto pr-2">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{product.name}</h2>
          <p className="text-green-700 text-xl font-semibold mb-6">
            {product.bestSeller ? "Best Seller" : "Premium Quality"}
          </p>
          <hr className="border-green-700 mb-3" />

          <div className="text-gray-700 text-xl leading-relaxed space-y-2">
            {product.description.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="text-2xl font-bold mt-6">${product.price}</div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 mt-4">
            <label className="text-gray-600 text-xl font-semibold">Quantity:</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={decrementQuantity}
                className={`w-8 h-8 ${quantity <= 0 ? 'bg-gray-200' : 'bg-gray-100 hover:bg-amber-400'} rounded-md flex items-center justify-center transition`}
                disabled={quantity <= 0}
              >
                <Minus className="text-gray-700" size={18} />
              </button>
              <span className="text-base font-medium px-4">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="w-8 h-8 bg-gray-100 hover:bg-amber-400 rounded-md flex items-center justify-center transition"
              >
                <Plus className="text-gray-700" size={18} />
              </button>
            </div>
          </div>

          {/* Add to Cart / Already in Cart */}
          {isInCart ? (
            <div className={`rounded py-4 text-white bg-amber-500 mt-10 text-center text-xl font-bold ${quantity > 0 ? 'text-green-700' : 'text-gray-500'}`}>
              {quantity > 0 ? 'Product already in cart' : 'Increase quantity to add to cart'}
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={quantity <= 0}
              className={`mt-10 text-xl ${isAdded
                ? "bg-amber-500"
                : quantity <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-amber-500"} 
              text-white w-full py-4 rounded font-bold flex items-center justify-center gap-2 transition`}
            >
              {isAdded ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-xl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart size={20} /> {quantity <= 0 ? 'Increase quantity to add' : 'Add to Cart'}
                </>
              )}
            </button>
          )}

          {/* Info Cards */}
          <div className="flex flex-col space-y-3 mt-6">
            <div className="flex items-center gap-4 bg-gray-50 shadow-md rounded p-4 hover:bg-green-200">
              <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                <Lock size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-xl">নিরাপদ পেমেন্ট</h4>
                <p className="text-gray-600 text-lg">বিভিন্ন পেমেন্ট পদ্ধতি থেকে বেছে নিন</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 shadow-md rounded p-4 hover:bg-green-100">
              <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                <Truck size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-xl">গ্রিন ডেলিভারি</h4>
                <p className="text-gray-600 text-lg">৩-৫ দিনের মধ্যে আপনার পণ্য পৌঁছে যাবে</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 shadow-md rounded p-4 hover:bg-green-100">
              <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
                <Leaf size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-xl">১০০% ন্যাচারাল</h4>
                <p className="text-gray-600 text-lg">
                  প্রাকৃতিক উৎপাদন ব্যবহার করতে আমরা প্রতিশ্রুতিবদ্ধ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center overflow-auto">
          <div className="relative w-full h-full flex items-center justify-center p-6">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-8 text-5xl text-amber-500 font-bold hover:text-red-600 z-50"
              title="Close"
            >
              &times;
            </button>
            <img
              src={product.images[selectedImage]}
              alt="Zoomed"
              className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Notification Popup */}
      {notification.show && (
        <div className={`fixed bottom-10 left-320 transform -translate-x-1/2 ${notification.type === "remove" ? "bg-red-500" :
            notification.type === "update" ? "bg-amber-500" : "bg-green-600"
          } text-white text-lg px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-out text-lg`}>
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
          <div>
            <span className="font-medium">{notification.message}</span>
            {notification.type === "update" && (
              <span className="ml-2 font-bold">(Now: {quantity})</span>
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

export default ProductDetails;