import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Send,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-24">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <div>
            <h2 className="text-[1.7rem] sm:text-[2.1rem] font-bold leading-snug text-center text-white">
              We bake emails too. <br /> Sign up to receive the latest news.
            </h2>
            <hr className="mt-4 border-white border-opacity-40 w-full mx-auto" />
          </div>

          {/* Social + Contact Icons */}
          <div className="flex justify-center items-center flex-wrap justify-center gap-4 pt-2">
            <a
              href="#"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-300 transition"
              title="Facebook"
            >
              <Facebook size={26} />
            </a>
            <a
              href="#"
              className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-300 transition"
              title="Instagram"
            >
              <Instagram size={26} />
            </a>
            <a
              href="#"
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-300 transition"
              title="YouTube"
            >
              <Youtube size={26} />
            </a>
            <a
              href="#"
              className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-300 transition"
              title="Email"
            >
              <Mail size={26} />
            </a>
            <a
              href="#"
              className="p-2 bg-amber-600 text-white rounded-full hover:bg-amber-300 transition"
              title="Phone"
            >
              <Phone size={26} />
            </a>
          </div>
        </div>

        {/* Right Section (Logo & Text) */}
        <div className="w-full lg:w-1/3 flex flex-col items-center text-center lg:items-center lg:text-left space-y-4">
          <img
            src="/log.png"
            alt="Company Logo"
            className="w-58 sm:w-58 lg:w-58 lg:text-center object-contain"
          />
          <p className="text-center sm:text-[1.1rem] text-[1.05rem] text-white opacity-80 leading-relaxed">
            We are dedicated to delivering natural, handcrafted products right
            to your doorstep.
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="pt-13 text-sm text-center text-white opacity-90">
        © {new Date().getFullYear()} Nature Mixed Food. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
