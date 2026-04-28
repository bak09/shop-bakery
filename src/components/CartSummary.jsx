import React from "react";

const CartSummary = ({
  cart,
  coupon,
  onApplyCoupon,
  note,
  total,
  discountedTotal,
}) => {
  return (
    <section className="section">
      <h2 className="section__title">Cart Summary</h2>

      <div className="card">
        <p>
          <strong>Items in cart:</strong> {cart.length}
        </p>

        <p>
          <strong>Order note:</strong> {note || "No note"}
        </p>

        <p>
          <strong>Coupon:</strong> {coupon || "No coupon applied"}
        </p>

        {!coupon && (
          <button className="btn btn--small" onClick={onApplyCoupon}>
            Apply SWEET10
          </button>
        )}

        <hr />

        <p>
          <strong>Total:</strong> {total} ₸
        </p>

        <p>
          <strong>Final Total:</strong> {discountedTotal} ₸
        </p>
      </div>
    </section>
  );
};

export default React.memo(CartSummary);