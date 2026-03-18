import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light"); // light | dark

  useEffect(() => {
    // small visual effect for demo; safe for CRA
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div>
      <h3 className="card__title">Window Theme</h3>
      <p className="card__desc">Switch the storefront look</p>

      <div className="actions">
        <button
          className="btn btn--small"
          type="button"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          Switch
        </button>
        <span className="price" style={{ fontWeight: 600 }}>
          {theme.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
