import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

export default function Checkout() {
  const { cart, totals, checkout } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    comment: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.customerName.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Please complete name, phone, and address before checkout.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      await checkout(form);
      navigate("/cart");
    } catch (submitError) {
      setError(submitError.message || "Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">Checkout</h2>
            <p className="muted">Confirm delivery details and save the order.</p>
          </div>

          {cart.length === 0 ? (
            <div className="card">
              <p className="muted">Your cart is empty. Add products before checkout.</p>
              <Link className="btn btn--small" to="/catalog">
                Open catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid--two">
              <form className="card" onSubmit={handleSubmit}>
                <input
                  className="input"
                  placeholder="Customer name"
                  value={form.customerName}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, customerName: event.target.value }))
                  }
                />
                <input
                  className="input"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, phone: event.target.value }))
                  }
                />
                <input
                  className="input"
                  placeholder="Delivery address"
                  value={form.address}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, address: event.target.value }))
                  }
                />
                <textarea
                  className="input"
                  rows="4"
                  placeholder="Additional comment"
                  value={form.comment}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, comment: event.target.value }))
                  }
                />
                {error ? <p className="form-error">{error}</p> : null}
                <button className="btn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving order..." : "Place order"}
                </button>
              </form>

              <div className="card">
                <h3 className="card__title">Order summary</h3>
                <div className="cart-list">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div>
                        <p className="cart-item__name">
                          {item.name} x {item.qty}
                        </p>
                        <p className="muted">{item.price * item.qty} KZT</p>
                        {item.note ? <p className="muted">Note: {item.note}</p> : null}
                        {item.coupon ? (
                          <p className="muted">Coupon: {item.coupon}</p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
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
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
