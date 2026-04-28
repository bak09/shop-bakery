import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useShop } from "../context/ShopContext";

const Header = () => {
  const { cartCount } = useShop();

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
            className={({ isActive }) =>
              `nav__btn ${isActive ? "nav__btn--active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `nav__btn ${isActive ? "nav__btn--active" : ""}`
            }
          >
            Catalog
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav__btn ${isActive ? "nav__btn--active" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `nav__btn ${isActive ? "nav__btn--active" : ""}`
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="cart">
          <NavLink to="/cart" className="cart__badge">
            Cart {cartCount}
          </NavLink>
          <NavLink to="/admin/login" className="nav__btn" style={{ marginLeft: "1rem" }}>
            Admin
          </NavLink>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default React.memo(Header);
