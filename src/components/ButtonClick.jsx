import React, { useState } from "react";

const ButtonClick = () => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <h3 className="card__title">Promo Coupon</h3>
      <p className="card__desc">Activate a bakery discount code</p>

      <button
        className="btn btn--small"
        type="button"
        onClick={() => setMessage("Coupon active: SWEET10")}
      >
        Get Coupon
      </button>

      {message && (
        <p className="muted" style={{ marginTop: 10 }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default React.memo(ButtonClick);
