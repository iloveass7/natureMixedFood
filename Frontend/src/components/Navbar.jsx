import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, LogOut } from 'lucide-react';
import { Cart } from '../pages/Cart';
import { SearchSidebar } from './SearchSidebar';
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('authToken') || localStorage.getItem('userData');

  // Get user data if available
  const userData = localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : null;

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
    window.location.reload();
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement your actual search logic here
    // This will update the search results in the sidebar
  };

  return (
    <>
      <nav className="bg-green-900 text-white px-1 py-5 fixed w-full z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left - Logo */}
          <div className="w-1/4">
            <Link to="/">
              <img
                src="vite.svg"
                alt="MyLogo"
                className="h-10 w-10" // Adjust height as needed
              />
            </Link>
          </div>

          {/* Center - Links (fixed position) */}
          <ul className="hidden md:flex gap-6 text-xl font-semibold w-2/4 justify-center">
            <li><Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
            <li><Link to="/blogs" className="hover:text-yellow-500 transition-colors">Blogs</Link></li>
            <li><Link to="/about" className="hover:text-yellow-500 transition-colors">About Us</Link></li>
            <li>
              {isLoggedIn ? (
                <Link to="/profile" className="hover:text-yellow-500 transition-colors">
                  {userData?.name || 'Profile'}
                </Link>
              ) : (
                <Link to="/login" className="hover:text-yellow-500 transition-colors">Login</Link>
              )}
            </li>
          </ul>

          {/* Right - Icons (Search, Cart, Logout) */}
          <div className="flex items-center justify-end gap-4 w-1/4">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-yellow-500 transition-colors"
              title="Search"
            >
              <Search size={24} />
            </button>

            {/* Cart Icon (only when logged in) */}
            {isLoggedIn && (
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:text-yellow-500 transition-colors relative"
                title="Cart"
              >
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            )}

            {/* Logout Icon (only when logged in) */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="p-2 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={24} />
              </button>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 hover:text-teal-400 transition-colors"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Links */}
        {menuOpen && (
          <div className="md:hidden mt-3 space-y-2 px-4 pb-4">
            <ul className="flex flex-col gap-2">
              <li><Link to="/" className="block hover:text-teal-400 transition-colors" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/blogs" className="block hover:text-teal-400 transition-colors" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
              <li><Link to="/about" className="block hover:text-teal-400 transition-colors" onClick={() => setMenuOpen(false)}>About Us</Link></li>
              <li>
                <button onClick={() => { setSearchOpen(true); setMenuOpen(false); }} className="block hover:text-teal-400 transition-colors w-full text-left flex items-center gap-2">
                  <Search size={18} /> Search
                </button>
              </li>
              {isLoggedIn && (
                <li><button onClick={() => { setCartOpen(true); setMenuOpen(false); }} className="block hover:text-teal-400 transition-colors w-full text-left flex items-center gap-2">
                  <ShoppingCart size={18} /> Cart
                </button></li>
              )}
              <li>
                {isLoggedIn ? (
                  <Link to="/profile" className="block hover:text-teal-400 transition-colors flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                    {userData?.name || 'Profile'}
                  </Link>
                ) : (
                  <Link to="/login" className="block hover:text-teal-400 transition-colors flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </li>
              {isLoggedIn && (
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left hover:text-red-500 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Cart Sidebar */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Search Sidebar */}
      <SearchSidebar
        isOpen={searchOpen}
        onClose={() => {
          setSearchOpen(false);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
    </>
  );
};