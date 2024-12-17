import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Menu } from "lucide-react";

const GuestNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <div className="flex z-50 justify-between items-center w-full">
        <div className="relative z-20 lg:order-2 lg:ml-auto lg:mr-8">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            className="focus:outline-none lg:hidden"
          >
            <Menu color="white" size={32} />
          </button>
          <nav
            className={`absolute top-16 left-0 w-52 py-4 rounded-md shadow-lg z-50 transition-transform duration-300 transform lg:static lg:translate-x-0 lg:w-[100%] ${
              isMenuOpen
                ? "bg-[#333333] translate-x-0"
                : "-translate-x-[200%] bg-none"
            } lg:bg-none`}
          >
            <ul className="text-primaryText lg:text-primaryText lg:flex">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "Explore", path: "/explore" },
                { label: "Sign In", path: "/auth/sign-in" },
              ].map(({ label, path }, index) => (
                <li key={index} className="py-2 px-4 font-medium">
                  <Link
                    to={path}
                    className="hover:text-primaryRgb transition-all duration-300 font-openSans border-b border-[#444444] block pb-2 lg:border-none lg:pb-0"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="lg:order-1">
          <Link to="/">
            <img src={Logo} alt="Logo Of Eagle Boost" className="w-42" />
          </Link>
        </div>

        <div className="lg:order-3 flex items-center gap-4 ml-10 mr-10">
          <Link
            className="font-openSans text-primaryRgb  hover:text-primaryText hover:bg-primaryRgb transition-all border py-1 px-5 rounded-md border-primaryRgb duration-300"
            to="/auth/sign-up"
          >
            Join
          </Link>
        </div>
      </div>
    </>
  );
};

export default GuestNavbar;
