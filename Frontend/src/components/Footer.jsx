import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-7xl mx-67 py-12 px-1 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          
          {/* Left Column - Brand Info */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold">
              <img
                src="vite.svg"
                alt="Nature Mixed Food"
                className="h-20 w-20"
              />
            </h3>
            <p className="text-gray-400 text-lg">
              Bringing you the best content and services since 2024.
            </p>
            
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook size={26} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram size={26} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={26} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube size={26} />
              </a>
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="px-27 space-y-4">
            <h4 className="text-2xl font-bold">Quick Links</h4>
            <ul className="space-y-2 text-lg">
              <li>
                <Link to="/" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-teal-400 transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-4 px-20">
            <h4 className="text-2xl font-bold">Contact Us</h4>
            <div className="space-y-2 text-lg text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail size={28} className="text-teal-400" />
                <span>contact@mylogo.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-teal-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-gray-900 rounded-l focus:outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-teal-400">
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-teal-400">
              Terms of Service
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/faq" className="text-sm text-gray-400 hover:text-teal-400">
              FAQ
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MyLogo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
