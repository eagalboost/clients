import React from "react";
import { useSelector } from "react-redux";
import UserNavbar from "./UserNavbar";
import GuestNavbar from "./GuestNavbar";
import AdminNavbar from "./AdminNavbar";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.isAdmin) {
    return <AdminNavbar />;
  }

  return (
    <div className="flex h-[80px] px-8 justify-between items-center border-b border-primaryRgb lg:px-24">
      {isAuthenticated ? <UserNavbar /> : <GuestNavbar />}
    </div>
  );
};

export default Navbar;
