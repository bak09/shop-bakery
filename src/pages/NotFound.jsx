import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="main">
      <div className="container">
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <h1>404 - Page Not Found</h1>
          <p className="muted">The route you entered does not exist in this SPA.</p>
          <Link className="btn btn--small" to="/">
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
