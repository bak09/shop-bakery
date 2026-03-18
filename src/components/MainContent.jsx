import React, { useEffect, useState } from "react";
import { GlowBackground } from "./GlowBackground";

export default function MainContent({ products = [], onAddToCart = () => {} }) {
  const [toast, setToast] = useState("");
  const [quantities, setQuantities] = useState({});
  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [dark, setDark] = useState(false);
  const [tip, setTip] = useState("");

  useEffect(() => {
    document.body.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const applyCoupon = () => {
    setCoupon("SALE10");
    setToast("✅ Промокод SALE10 применён");
    setTimeout(() => setToast(""), 1400);
  };

  const handleAdd = (product) => {
    const qty = quantities[product.id] || 1;

    onAddToCart({
      product,
      qty,
      note,
      coupon,
    });

    setToast(`✅ Добавлено: ${product.name} x ${qty}`);
    setTimeout(() => setToast(""), 1400);
  };

  return (
    <main className="main" id="home">
      <div className="container" style={{ position: "relative" }}>
        <GlowBackground />

        <section className="hero">
          <h1 className="hero__title">Свежая выпечка — с доставкой на дом.</h1>
          <p className="hero__subtitle">
            Просматривайте товары, добавляйте их в корзину и управляйте ими через CRUD.
          </p>

          <div
            className="tip-box"
            onMouseEnter={() =>
              setTip("Совет пекаря: сегодня попробуйте круассан — это хит дня.")
            }
            onMouseLeave={() => setTip("")}
          >
            {tip || "Наведите сюда, чтобы увидеть совет пекаря"}
          </div>

          {toast && <div className="toast">{toast}</div>}

          <div className="hero-actions">
            <button
              className="btn"
              type="button"
              onClick={() => {
                const el = document.getElementById("popular");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Изучите популярные
            </button>

            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => setDark((v) => !v)}
            >
              {dark ? "Светлая тема" : "Тёмная тема"}
            </button>
          </div>
        </section>

        <section className="section" id="popular">
          <h2 className="section__title">Популярное сегодня</h2>

          {products.length === 0 ? (
            <div className="card">
              <p className="muted">Ничего не найдено</p>
            </div>
          ) : (
            <div className="grid">
              {products.map((p) => {
                const qty = quantities[p.id] || 1;

                return (
                  <article className="card" key={p.id}>
                    <div className="card__top">
                      <div className="card__icon">🍞</div>
                      <div>
                        <h3 className="card__title">{p.name}</h3>
                        <p className="card__desc">{p.desc}</p>
                        <p className="muted">Категория: {p.category}</p>
                      </div>
                    </div>

                    <div className="qty-row">
                      <span className="muted">Количество:</span>

                      <div className="qty-box">
                        <button
                          className="btn btn--small btn--ghost"
                          type="button"
                          onClick={() => decreaseQty(p.id)}
                        >
                          -1
                        </button>

                        <span className="qty-value">{qty}</span>

                        <button
                          className="btn btn--small"
                          type="button"
                          onClick={() => increaseQty(p.id)}
                        >
                          +1
                        </button>
                      </div>
                    </div>

                    <div className="card__bottom">
                      <span className="price">{p.price} ₸</span>

                      <button
                        className="btn btn--small"
                        type="button"
                        onClick={() => handleAdd(p)}
                      >
                        Добавить в корзину
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="section" id="order-tools">
          <h2 className="section__title">Ваш заказ</h2>

          <div className="grid grid--two">
            <div className="card">
              <h3 className="card__title">Примечание к заказу</h3>
              <p className="card__desc">Добавьте комментарий для пекарни.</p>

              <input
                className="input"
                type="text"
                placeholder="Например: без орехов, больше крема"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <p className="muted">
                Примечание: <strong>{note || "не указано"}</strong>
              </p>
            </div>

            <div className="card">
              <h3 className="card__title">Промокод</h3>
              <p className="card__desc">Активируйте скидку для заказа.</p>

              <button className="btn btn--small" type="button" onClick={applyCoupon}>
                Применить SALE10
              </button>

              <p className="muted">
                Купон: <strong>{coupon || "не активирован"}</strong>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
