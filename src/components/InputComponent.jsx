import React, { useState } from "react";

const InputComponent = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <h3 className="card__title">Order Note</h3>
      <p className="card__desc">Add a note for your bakery order</p>

      <input
        className="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Example: No nuts, extra cream"
      />

      <p className="muted" style={{ marginTop: 10 }}>
        Note: <b>{text || "No note yet"}</b>
      </p>
    </div>
  );
};

export default React.memo(InputComponent);
