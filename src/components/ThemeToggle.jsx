import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="actions">
      <button className="btn btn--small" type="button" onClick={toggleTheme}>
        Switch theme
      </button>
      <span className="price" style={{ fontWeight: 600 }}>
        {theme === "light" ? "Light mode" : "Dark mode"}
      </span>
    </div>
  );
};

export default React.memo(ThemeToggle);
