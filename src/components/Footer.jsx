import React from "react";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__inner">
        <p className="muted">© {new Date().getFullYear()} Shop Bakery. All rights reserved.</p>
        <p className="muted">Made for React SPA semester project.</p>
      </div>
    </footer>
  );
}
