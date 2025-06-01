import React from "react";
import Navbar from "./Navbar"; // Adjust the path if needed
import Footer from "./Footer"
import { Outlet } from "react-router-dom";
import "./Layout.css"; //

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
