import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, LogOut } from 'lucide-react';
import Cart from '../pages/Cart';
import SearchSidebar from './SearchSidebar';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const isUserLoggedIn = localStorage.getItem('token') || localStorage.getItem('userData');
  const isAdminLoggedIn = localStorage.getItem('adminToken');
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('adminToken');
    navigate('/login');
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const dispatchSidebarToggle = (open) => {
    window.dispatchEvent(new CustomEvent("toggleSidebars", { detail: open }));
  };

  return (
    <>
      <nav className="bg-green-900 text-white shadow-md sticky top-0 z-50 w-full">
        <div className="max-w-8xl mx-auto px-4 md:px-20 lg:px-30 py-4 flex items-center">
          <div className="flex-1 flex justify-start">
            <Link to="/">
              <img src="logo.png" alt="MyLogo" className="h-15 sm:h-20 mx-10" />
            </Link>
          </div>

          <ul className="hidden md:flex flex-10 justify-center gap-10 text-[1.6rem] font-semibold md:text-[1.3rem] lg:text-[1.5rem]">
            <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
            <li><Link to="/blogs" className="hover:text-yellow-500">Blogs</Link></li>
            <li><Link to="/about" className="hover:text-yellow-500">About</Link></li>
            <li>
              {isAdminLoggedIn ? (
                <Link to="/admin" className="hover:text-yellow-500">Admin Profile</Link>
              ) : isUserLoggedIn ? (
                <Link to="/profile" className="hover:text-yellow-500">{userData?.name || 'Profile'}</Link>
              ) : (
                <Link to="/login" className="hover:text-yellow-500">Login</Link>
              )}
            </li>
          </ul>

          <div className="flex-1 flex justify-end items-center gap-10 md:gap-6 lg:gap-10">
            <button
              onClick={() => {
                setSearchOpen(true);
                dispatchSidebarToggle(true);
              }}
              title="Search"
              className="hover:text-yellow-500"
            >
              <Search size={31} />
            </button>

            {/* Only show cart if user is logged in (not admin) */}
            {isUserLoggedIn && !isAdminLoggedIn && (
              <button
                onClick={() => {
                  setCartOpen(true);
                  dispatchSidebarToggle(true);
                }}
                className="relative hover:text-yellow-500"
                title="Cart"
              >
                <ShoppingCart size={31} />
                <span className="absolute -top-1 -right-2 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
            )}

            {/* Only show logout if either user or admin is logged in */}
            {(isUserLoggedIn || isAdminLoggedIn) && (
              <button onClick={handleLogout} className="hover:text-red-500" title="Logout">
                <LogOut size={31} />
              </button>
            )}

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X size={31} /> : <Menu size={31} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-10 pt-8 pb-10 bg-green-900">
            <ul className="flex flex-col gap-6 text-2xl font-semibold">
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
              <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
              <li>
                {isAdminLoggedIn ? (
                  <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Profile</Link>
                ) : isUserLoggedIn ? (
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>{userData?.name || 'Profile'}</Link>
                ) : (
                  <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>

      <Cart
        isOpen={cartOpen}
        onClose={() => {
          setCartOpen(false);
          dispatchSidebarToggle(false);
        }}
      />

      <SearchSidebar
        isOpen={searchOpen}
        onClose={() => {
          setSearchOpen(false);
          setSearchQuery('');
          dispatchSidebarToggle(false);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
    </>
  );
};

export default Navbar;