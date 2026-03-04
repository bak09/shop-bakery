import React, { useState } from "react";
import Counter from "./Counter";
import InputComponent from "./InputComponent";
import ThemeToggle from "./ThemeToggle";
import HoverCard from "./HoverCard";
import ButtonClick from "./ButtonClick";
import { GlowBackground } from "./GlowBackground";

export default function MainContent({ products = [], onAddToCart = () => {} }) {
  const [toast, setToast] = useState("");

  const handleAdd = (p) => {
    onAddToCart(p);
    setToast(`✅ Added to cart: ${p.name}`);
    setTimeout(() => setToast(""), 1400);
  };

  return (
    <main className="main" id="home">
      <div className="container" style={{ position: "relative" }}>
        <GlowBackground />
        <section className="hero">
          <h1 className="hero__title">Fresh bakery — delivered to you</h1>
          <p className="hero__subtitle">
            Browse products, add to cart, and manage items via CRUD (Admin page).
          </p>

          {toast && <div className="toast">{toast}</div>}

          <button
            className="btn"
            type="button"
            onClick={() => {
              const el = document.getElementById("popular");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Popular
          </button>
        </section>

        <section className="section" id="popular">
          <h2 className="section__title">Popular Today</h2>

          <div className="grid">
            {products.map((p) => (
              <article className="card" key={p.id}>
                <div className="card__top">
                  <div className="card__icon">🍞</div>
                  <div>
                    <h3 className="card__title">{p.name}</h3>
                    <p className="card__desc">{p.desc}</p>
                  </div>
                </div>

                <div className="card__bottom">
                  <span className="price">{p.price} ₸</span>
                  <button className="btn btn--small" type="button" onClick={() => handleAdd(p)}>
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ✅ JSX LAB SECTION */}
        <section className="section" id="jsx-lab">
          <h2 className="section__title">JSX Components & Events</h2>

          <div className="grid grid--two">
            <div className="card"><Counter /></div>
            <div className="card"><InputComponent /></div>
            <div className="card"><ThemeToggle /></div>
            <div className="card"><HoverCard /></div>
            <div className="card"><ButtonClick /></div>
          </div>
        </section>
      </div>
    </main>
  );
}
