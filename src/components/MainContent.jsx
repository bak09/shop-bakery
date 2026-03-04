import React, { useState } from "react";
import Counter from "./Counter";
import InputComponent from "./InputComponent";
import ThemeToggle from "./ThemeToggle";
import HoverCard from "./HoverCard";
import ButtonClick from "./ButtonClick";
import { GlowBackground } from "./GlowBackground";

export default function MainContent({ products = [], onAddToCart = () => {} }) {
  const [toast, setToast] = useState("");

  const handleAdd = (product) => {
    onAddToCart(product);
    setToast(`Added to cart: ${product.name}`);
    setTimeout(() => setToast(""), 1400);
  };

  return (
    <main className="main" id="home">
      <div className="container" style={{ position: "relative" }}>
        <GlowBackground />

        <section className="hero">
          <h1 className="hero__title">Fresh bakery - delivered to you</h1>
          <p className="hero__subtitle">
            Browse products, add to cart, and manage items via CRUD (Admin page).
          </p>

          {toast && <div className="toast">{toast}</div>}

          <button
            className="btn"
            type="button"
            onClick={() => {
              const section = document.getElementById("popular");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Popular
          </button>
        </section>

        <section className="section" id="popular">
          <h2 className="section__title">Popular Today</h2>

          <div className="grid">
            {products.map((product) => (
              <article className="card" key={product.id}>
                <div className="card__top">
                  <div className="card__icon">Bakery</div>
                  <div>
                    <h3 className="card__title">{product.name}</h3>
                    <p className="card__desc">{product.desc}</p>
                  </div>
                </div>

                <div className="card__bottom">
                  <span className="price">{product.price} KZT</span>
                  <button className="btn btn--small" type="button" onClick={() => handleAdd(product)}>
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="jsx-lab">
          <h2 className="section__title">Bakery Interactive Tools</h2>

          <div className="grid grid--two">
            <div className="card">
              <Counter />
            </div>
            <div className="card">
              <InputComponent />
            </div>
            <div className="card">
              <ThemeToggle />
            </div>
            <div className="card">
              <HoverCard />
            </div>
            <div className="card card--wide">
              <ButtonClick />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
