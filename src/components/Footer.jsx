import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-8 text-white py-10 border-t border-primaryRgb">
      <div className="container mx-auto px-5 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="Eagle Boost Logo"
                className="mb-5 w-40 mx-auto lg:mx-0"
              />
            </Link>
            <p className="text-gray-400 leading-6">
              We provide cutting-edge IT services including digital marketing,
              app development, web design, cybersecurity, and much more. Our
              mission is to deliver top-notch solutions to enhance your online
              presence.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primaryRgb mb-3">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-primaryRgb transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-primaryRgb transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primaryRgb transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-gray-400 hover:text-primaryRgb transition"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primaryRgb mb-3">
              Services
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/programming-tech"
                  className="text-gray-400 hover:text-primaryRgb transition"
                >
                  Programming & Tech
                </Link>
              </li>
              <li>
                <Link
                  to="/graphics-design"
                  className="text-gray-400 hover:text-primaryRgb transition"
                >
                  Graphics & Design
                </Link>
              </li>
              <li>
                <Link
                  to="/digital-marketing"
                  className="text-gray-400 hover:text-primaryRgb transition"
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  to="/video-animation"
                  className="text-gray-400 hover:text-primaryRgb transition"
                >
                  Video & Animation
                </Link>
              </li>
              <li>
                <Link
                  to="/business"
                  className="text-gray-400 hover:text-primaryRgb transition"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  to="/writing-translation"
                  className="text-gray-400 hover:text-primaryRgb transition"
                >
                  Writing & Translation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primaryRgb mb-3">
              Contact Us
            </h2>
            <p className="text-gray-400 mb-1">Dhaka, Bangladesh</p>
            <p className="text-gray-400 mb-1">Email: info@eaglesboost.com</p>
            <p className="text-gray-400 mb-3">Phone: +880-1234-567-890</p>
            <div className="flex space-x-5">
              <Link
                to="#"
                className="text-gray-400 hover:text-primaryRgb transition"
              >
                <Facebook />
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-primaryRgb transition"
              >
                <Twitter />
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-primaryRgb transition"
              >
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-10" />
        <p className="text-center text-gray-400">
          &copy; {new Date().getFullYear()} Eagle Boost Digital. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
