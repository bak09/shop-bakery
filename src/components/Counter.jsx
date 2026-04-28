
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(1);

  return (
    <div>
      <h3 className="card__title">Pastry Quantity</h3>
      <p className="card__desc">Choose pieces for your box: <b>{count}</b></p>

      <div className="actions">
        <button className="btn btn--small" type="button" onClick={() => setCount((c) => c + 1)}>
          +1
        </button>
        <button
          className="btn btn--small btn--ghost"
          type="button"
          onClick={() => setCount((c) => Math.max(1, c - 1))}
        >
          -1
        </button>
      </div>
    </div>
  );
};

export default React.memo(Counter);
