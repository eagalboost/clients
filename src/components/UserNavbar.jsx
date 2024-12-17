import React from "react";
import UserNavbarDesktop from "./UserNavbarDesktop";
import UserNavbarMobile from "./UserNavbarMobile";

const UserNavbar = () => {
  return (
    <>
      <UserNavbarMobile />
      <UserNavbarDesktop />
    </>
  );
};

export default UserNavbar;
