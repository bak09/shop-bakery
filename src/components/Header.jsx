import React from "react";

export default function Header({ page, onNavigate, cartCount, onClearCart }) {
  const goHomeSection = (id) => {
    onNavigate("home");
    // дождаться отрисовки Home
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand" role="button" tabIndex={0} onClick={() => onNavigate("home")}>
          <span className="brand__logo">🥐</span>
          <span className="brand__name">Shop Bakery</span>
        </div>

        <nav className="nav">
          <button
            className={`nav__btn ${page === "home" ? "nav__btn--active" : ""}`}
            type="button"
            onClick={() => onNavigate("home")}
          >
            Home
          </button>

          <button className="nav__btn" type="button" onClick={() => goHomeSection("popular")}>
            Popular
          </button>

          <button className="nav__btn" type="button" onClick={() => goHomeSection("contact")}>
            Contact
          </button>

          <button
            className={`nav__btn ${page === "products" ? "nav__btn--active" : ""}`}
            type="button"
            onClick={() => onNavigate("products")}
          >
            CRUD Products
          </button>
        </nav>

        <div className="cart">
          <span className="cart__badge">🛒 {cartCount}</span>
          <button className="nav__btn nav__btn--danger" type="button" onClick={onClearCart}>
            Clear
          </button>
        </div>
      </div>
    </header>
  );
}