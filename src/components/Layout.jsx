import React from "react";
import Navbar from "./Navbar";
import HeaderText from "./HeaderText";
import Banner from "./Banner";

const Layout = ({ children, headerText }) => {
  return (
    <div>
      <Banner />
      <Navbar />
      <HeaderText headerText={headerText} />
      {children}
    </div>
  );
};

export default Layout;
