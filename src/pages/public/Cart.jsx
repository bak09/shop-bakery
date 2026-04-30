import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

export default function Cart() {
  const { cart, totals, removeFromCart, clearCart } = useShop();

  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">Cart</h2>
            {cart.length > 0 ? (
              <button className="btn btn--small btn--danger" onClick={clearCart}>
                Clear cart
              </button>
            ) : null}
          </div>

          <div className="card">
            {cart.length === 0 ? (
              <div>
                <p className="muted">Your cart is empty.</p>
                <Link className="btn btn--small" to="/catalog">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="cart-list">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <p className="cart-item__name">
                        {item.name} x {item.qty}
                      </p>
                      <p className="muted">
                        {item.price} KZT x {item.qty} = {item.price * item.qty} KZT
                      </p>
                      {item.note ? <p className="muted">Note: {item.note}</p> : null}
                      {item.coupon ? <p className="muted">Coupon: {item.coupon}</p> : null}
                    </div>

                    <button
                      className="btn btn--small btn--danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <hr />
            <p>
              <strong>Subtotal:</strong> {totals.subtotal} KZT
            </p>
            <p>
              <strong>Discount:</strong> {Math.round(totals.discountRate * 100)}%
            </p>
            <p>
              <strong>Final total:</strong> {totals.finalTotal} KZT
            </p>
            {cart.length > 0 ? (
              <div className="actions">
                <Link className="btn" to="/checkout">
                  Proceed to checkout
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
