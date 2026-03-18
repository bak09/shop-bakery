import React from "react";
import MainContent from "../components/MainContent";

export default function Home({
  products,
  onAddToCart,
  search,
  setSearch,
  category,
  setCategory,
  sortOrder,
  setSortOrder,
  cart,
  total,
  finalTotal,
  removeFromCart,
}) {
  return (
    <>
      <main className="main">
        <div className="container">
          <section className="section">
            <div className="filter-panel">
              <input
                className="input"
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Все">Все</option>
                <option value="Выпечка">Выпечка</option>
                <option value="Хлеб">Хлеб</option>
                <option value="Десерты">Десерты</option>
              </select>

              <select
                className="input"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Цена ↑</option>
                <option value="price-desc">Цена ↓</option>
                <option value="name-asc">Имя A-Z</option>
              </select>
            </div>
          </section>
        </div>
      </main>

      <MainContent products={products} onAddToCart={onAddToCart} />

      <main className="main">
        <div className="container">
          <section className="section">
            <h2 className="section__title">Тележка</h2>

            <div className="card">
              {cart.length === 0 ? (
                <p className="muted">Корзина пуста</p>
              ) : (
                <div className="cart-list">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div>
                        <p className="cart-item__name">
                          {item.name} x {item.qty}
                        </p>
                        <p className="muted">
                          {item.price} ₸ × {item.qty} = {item.price * item.qty} ₸
                        </p>
                        {item.note && (
                          <p className="muted">Примечание: {item.note}</p>
                        )}
                        {item.coupon && (
                          <p className="muted">Купон: {item.coupon}</p>
                        )}
                      </div>

                      <button
                        className="btn btn--small btn--danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <hr />

              <p>
                <strong>Итого:</strong> {total} ₸
              </p>
              <p>
                <strong>Итоговый результат:</strong> {finalTotal} ₸
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}