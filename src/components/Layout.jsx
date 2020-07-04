import React, { useContext } from "react";
import Navbar from "./Navbar";
import HeaderText from "./HeaderText";
import Banner from "./Banner";
import { BetContext } from "../context/BetContext";
import FlashMessage from "./FlashMessage";

const Layout = ({ children, headerText, currentActive }) => {
  const { setFlashMsg, flashMsg } = useContext(BetContext);
  return (
    <div className="container">
      <div className="Bannerz">
        <Banner />
      </div>
      <div className="navBar">
        <Navbar currentActive={currentActive} />
      </div>
      <div className="headText">
        <HeaderText headerText={headerText} />
      </div>
      <div className="mainContent">
        {flashMsg.msgText ? <FlashMessage flashMsg={flashMsg} /> : null}
        {children}
      </div>
    </div>
  );
};

export default Layout;
