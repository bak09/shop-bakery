import React from "react";

const Orders = () => {
  return (
    <div>
      <h2 className="section__title">Defense Notes</h2>
      <div className="card">
        <p>This page acts as a short speaking checklist for the live demonstration.</p>
        <ul>
          <li>Open the catalog and explain search, category filtering, and useMemo sorting.</li>
          <li>Open a detail page at <code>/catalog/:id</code> and add the product to the cart.</li>
          <li>Reload the app to show that auth, cart, theme, and products persist.</li>
          <li>Use the dashboard failure toggle, then reload products to demonstrate error handling.</li>
          <li>Explain the custom hooks: <code>useLocalStorage</code>, <code>useProducts</code>, and <code>useProductFilters</code>.</li>
        </ul>
      </div>
    </div>
  );
};

export default Orders;
