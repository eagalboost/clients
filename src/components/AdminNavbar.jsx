import React, { useState, useEffect } from "react";
import placeholder from "../assets/user.png";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Bell, MessageSquare, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { handleLogout } from "../utils/authUtils";

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(placeholder);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.img) {
      setProfileImage(userData.img);
    }
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const logout = () => {
    handleLogout(dispatch, navigate);
  };

  return (
    <header className="bg-[#222222] h-[80px] text-primaryText flex justify-between items-center px-4 shadow-md">
      <div>
        <Link to="/admin">
          <img src={Logo} alt="Logo" className="w-48" />
        </Link>
      </div>

      <nav className="hidden lg:flex gap-6">
        <Link
          to="/admin/add-service"
          className="hover:text-primaryRgb text-base font-openSans transition-colors duration-300"
        >
          Add Service
        </Link>
        <Link
          to="/admin/services"
          className="hover:text-primaryRgb text-base font-openSans transition-colors duration-300"
        >
          Services
        </Link>
        <Link
          to="/admin/orders"
          className="hover:text-primaryRgb text-base font-openSans transition-colors duration-300"
        >
          Orders
        </Link>
        <Link
          to="/messages"
          className="hover:text-primaryRgb text-base font-openSans transition-colors duration-300"
        >
          Messages
        </Link>
      </nav>

      <div className="lg:flex hidden items-center gap-4">
        {[Bell, MessageSquare].map((Icon, index) => (
          <button
            key={index}
            aria-label="Icon"
            className="text-primaryText hover:text-primaryRgb transition-colors duration-300"
          >
            <Icon size={24} />
          </button>
        ))}
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-5 w-48 bg-[#333333] rounded-md shadow-lg z-20">
              <ul className="py-1">
                <li>
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-primaryText hover:text-primaryRgb transition-colors duration-300"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-primaryText hover:text-primaryRgb transition-colors duration-300"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-primaryText hover:text-primaryRgb transition-colors duration-300"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden z-20">
        <button onClick={toggleMenu}>
          <Menu color="white" size={32} />
        </button>
        {isMenuOpen && (
          <nav className="absolute top-24 left-0 bg-[#333333] w-[300px] pt-2 rounded-md shadow-lg">
            <ul>
              <li>
                <Link
                  to="/admin/add-service"
                  className="block px-4 py-2 text-primaryText hover:text-primaryRgb"
                >
                  Add Service
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/services"
                  className="block px-4 py-2 text-primaryText hover:text-primaryRgb"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="block px-4 py-2 text-primaryText hover:text-primaryRgb"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  className="block px-4 py-2 text-primaryText hover:text-primaryRgb"
                >
                  Messages
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-primaryText hover:text-primaryRgb"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;
