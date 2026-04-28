import React from "react";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__inner">
        <p className="muted">
          Copyright {new Date().getFullYear()} Shop Bakery. All rights reserved.
        </p>
        <p className="muted">Built for the React SPA semester project.</p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
