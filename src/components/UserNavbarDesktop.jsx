import React, { useEffect, useState } from "react";
import placeholder from "../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { Bell, MessageSquare, Heart } from "lucide-react";
import Logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { handleLogout } from "../utils/authUtils";

const UserNavbarDesktop = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(placeholder);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.img) {
      setProfileImage(userData.img);
    }
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const logout = () => {
    handleLogout(dispatch, navigate);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const DropdownMenu = () => (
    <div className="absolute right-0 mt-5 w-48 bg-[#333333] rounded-md shadow-lg">
      <ul className="py-1">
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 text-primaryText hover:text-primaryRgb transition-colors duration-300 border-b border-[#444444]"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="block px-4 py-2 text-primaryText hover:text-primaryRgb transition-colors duration-300 border-b border-[#444444]"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            to="/billing"
            className="block px-4 py-2 text-primaryText hover:text-primaryRgb transition-colors duration-300 border-b border-[#444444]"
          >
            Billings & Payments
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="block px-4 py-2 text-primaryText hover:text-primaryRgb transition-colors duration-300 border-b border-[#444444]"
          >
            Orders
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
  );

  return (
    <div className="hidden lg:flex justify-between items-center w-full px-8 lg:px-0 py-2">
      <div className="flex-shrink-0">
        <Link to="/">
          <img src={Logo} alt="Logo Of Eagle Boost" className="w-[100%]" />
        </Link>
      </div>

      <div className="flex-grow mx-8">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full border-none px-4 py-2 rounded-md border bg-[#333333] text-primaryText focus:outline-none focus:bg-[#444444] transition-colors duration-300 shadow-[0_4px_8px_rgba(255,255,255,0.1)]"
        />
      </div>

      <div className="flex items-center gap-4 ml-4 mr-10">
        {[{ label: "Notifications", Icon: Bell, path: null },
          { label: "Messages", Icon: MessageSquare, path: "/messages" },
          { label: "Favorites", Icon: Heart, path: null },
        ].map(({ label, Icon, path }, index) => (
          <button
            key={index}
            aria-label={label}
            onClick={() => path && handleNavigation(path)}
            className="text-primaryText hover:text-primaryRgb transition-colors duration-300"
          >
            <Icon size={24} />
          </button>
        ))}
      </div>

      <div className="relative z-20">
        <button
          onClick={toggleDropdown}
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
          className="focus:outline-none"
        >
          <img
            src={profileImage}
            alt="Profile image of user"
            className="w-12 h-12 rounded-full"
          />
        </button>
        {isDropdownOpen && <DropdownMenu />}
      </div>
    </div>
  );
};

export default UserNavbarDesktop;
