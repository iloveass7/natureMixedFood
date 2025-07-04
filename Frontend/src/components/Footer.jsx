import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-green-900 text-white w-full">
      {/* MAIN CONTAINER - Only changes padding for mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-60 py-12 md:px-20">
        
        {/* GRID - Same layout for md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-15"> 
          
          {/* LEFT COLUMN - Only centers content on mobile */}
          <div className="space-y-4 text-center sm:text-left">
            <img src="log.png" alt="Nature Mixed Food" className="h-33 mx-auto sm:mx-0" />
            <p className="text-white text-[1.4rem] font-semibold">
              Bringing you the best content and services since 2024.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4 pt-2">
              <a href="#" className="text-white hover:text-blue-500 transition">
                <Facebook size={30} />
              </a>
              <a href="#" className="text-white hover:text-pink-500 transition">
                <Instagram size={30} />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                <Twitter size={30} />
              </a>
              <a href="#" className="text-white hover:text-red-500 transition">
                <Youtube size={30} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - Only centers on mobile */}
          <div className="space-y-4 text-center sm:text-left sm:ml-auto">
            <h4 className="text-[1.9rem] font-bold py-8 px-7">Contact Us</h4>
            <div className="space-y-5 text-[1.4rem]">
              <div className="flex justify-center sm:justify-start items-center space-x-2">
                <Phone size={28} className="text-yellow-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex justify-center sm:justify-start items-center space-x-2">
                <Mail size={28} className="text-yellow-500" />
                <span>contact@email.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR - Stacks on mobile only */}
        <div className="mt-10 pt-8 border-t border-green-600 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-white">
            <Link to="/privacy" className="hover:text-amber-400">Privacy Policy</Link>
            <span className="text-gray-600">|</span>
            <Link to="/terms" className="hover:text-amber-400">Terms of Service</Link>
            <span className="text-gray-600">|</span>
            <Link to="/faq" className="hover:text-amber-400">FAQ</Link>
          </div>
          <p className="text-sm text-white mb-2">
            © {new Date().getFullYear()} Nature Mixed Food. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};