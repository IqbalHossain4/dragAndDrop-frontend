import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
function Footer() {
  return (
    <footer className="bg-black py-6 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white md:text-xl font-semibold">Tech Charms</div>
          <div className="flex space-x-6 text-white">
            <a href="https://www.facebook.com">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com">
              <FaInstagram />
            </a>
            <a href="https://www.instagram.com">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="mt-4 text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
