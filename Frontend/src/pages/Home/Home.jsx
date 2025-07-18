import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import ProductsSection from "./ProductsSection";
import InfoCardsSection from "./InfoCardsSection";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChatIcons, setShowChatIcons] = useState(true);
  const navigate = useNavigate();

  const productsRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/product/getAllProducts");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleToggle = (e) => {
      setShowChatIcons(!e.detail);
    };

    window.addEventListener("toggleSidebars", handleToggle);
    return () => window.removeEventListener("toggleSidebars", handleToggle);
  }, []);

  return (
    <div className="w-full">
      <HeroSection scrollToProducts={() => productsRef.current?.scrollIntoView({ behavior: "smooth" })} />

      <div ref={productsRef}>
        <ProductsSection products={products} loading={loading} />
      </div>

      <InfoCardsSection />

      {/* Chat Buttons */}
      {showChatIcons && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
          {/* Messenger */}
          <a
            href="https://www.facebook.com/messages/t/203126496213736"
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on Messenger"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 3C8.268 3 2 8.983 2 16c0 3.949 1.802 7.498 4.723 9.985V30l4.346-2.39C12.002 28.19 13.968 28.5 16 28.5c7.732 0 14-5.983 14-12.5S23.732 3 16 3zm2.557 17.243-3.017-3.199-6.371 3.199 6.907-7.428 3.017 3.199 6.371-3.199-6.907 7.428z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/8801725099545"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.92 7.92 0 008.005 0c-4.386 0-7.965 3.579-7.965 7.964 0 1.403.367 2.776 1.063 3.982L.014 16l4.176-1.088a7.965 7.965 0 003.815.971h.004c4.386 0 7.965-3.579 7.965-7.965a7.92 7.92 0 00-2.373-5.592zM8.005 14.61a6.57 6.57 0 01-3.338-.899l-.24-.143-2.478.646.661-2.416-.156-.247a6.57 6.57 0 01-1.016-3.518c0-3.636 2.956-6.591 6.591-6.591 1.76 0 3.413.686 4.657 1.93a6.556 6.556 0 011.93 4.656c0 3.635-2.956 6.582-6.611 6.582zm3.759-4.887c-.206-.103-1.219-.602-1.407-.672-.188-.07-.325-.103-.463.103-.138.206-.532.671-.653.809-.121.138-.241.155-.447.052-.206-.103-.868-.319-1.653-1.018-.611-.544-1.023-1.218-1.144-1.423-.121-.206-.013-.317.09-.42.092-.092.206-.241.31-.362.104-.121.138-.206.207-.344.07-.138.035-.258-.017-.362-.052-.103-.463-1.119-.635-1.53-.167-.403-.338-.348-.463-.354-.121-.005-.258-.006-.396-.006a.765.765 0 00-.553.258c-.19.206-.725.708-.725 1.73s.743 2.003.846 2.14c.103.138 1.464 2.235 3.55 3.133.497.214.883.342 1.183.438.497.158.949.136 1.306.083.398-.059 1.219-.498 1.391-.98.172-.483.172-.896.121-.98-.052-.086-.19-.138-.396-.241z" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
