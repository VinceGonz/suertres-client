import React from "react";
import Navbar from "./Navbar";
import HeaderText from "./HeaderText";
import Banner from "./Banner";

const Layout = ({ children, headerText, currentActive }) => {
  return (
    <div>
      <Banner />
      <Navbar currentActive={currentActive} />
      <HeaderText headerText={headerText} />
      {children}
    </div>
  );
};

export default Layout;
