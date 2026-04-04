import React from "react";
import { NavLink } from "react-router-dom";

export default function Header({ cartCount, onClearCart }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/" className="brand">
          <span className="brand__logo">🥐</span>
          <span className="brand__name">Shop Bakery</span>
        </NavLink>

        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav__btn ${isActive ? "nav__btn--active" : ""}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) => `nav__btn ${isActive ? "nav__btn--active" : ""}`}
          >
            Catalog
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `nav__btn ${isActive ? "nav__btn--active" : ""}`}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `nav__btn ${isActive ? "nav__btn--active" : ""}`}
          >
            Contact
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => `nav__btn ${isActive ? "nav__btn--active" : ""}`}
          >
            Cart
          </NavLink>
        </nav>

        <div className="cart">
          <NavLink to="/cart" className="cart__badge">
            🛒 {cartCount}
          </NavLink>
          <button className="nav__btn nav__btn--danger" type="button" onClick={onClearCart}>
            Clear
          </button>
          <NavLink to="/admin/login" className="nav__btn" style={{ marginLeft: '1rem' }}>
            Admin
          </NavLink>
        </div>
      </div>
    </header>
  );
}