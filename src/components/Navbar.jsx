import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <header className="navbar">
    <div className="nav-logo">e-SalesOne</div>

    <nav className="nav-menu">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/catalog" className="nav-link">Catalog</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
    </nav>

    <div className="nav-icons">
      <button aria-label="Search" className="icon-button">🔍</button>
      <button aria-label="User" className="icon-button">👤</button>
      <button aria-label="Cart" className="icon-button">🛍️</button>
    </div>
  </header>
);

export default Navbar;
