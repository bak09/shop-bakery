import React from "react";

export default function Cart({ cart, total, finalTotal, removeFromCart }) {
  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <h2 className="section__title">Корзина</h2>

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
  );
}