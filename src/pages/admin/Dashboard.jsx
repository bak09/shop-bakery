import React from "react";
import { NavLink } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { productService } from "../../services/productService";

const Dashboard = () => {
  const { products, cart, orders, refreshProducts } = useShop();
  const apiFailureEnabled = productService.getApiFailure();

  const handleToggleFailure = async () => {
    productService.setApiFailure(!apiFailureEnabled);
    await refreshProducts();
  };

  return (
    <div>
      <h2 className="section__title">Admin Dashboard</h2>
      <div className="grid grid--two">
        <div className="card">
          <h3 className="card__title">Project snapshot</h3>
          <p className="card__desc">
            Use this page during the defense to explain what is persisted and
            how routes are protected.
          </p>
          <p>
            <strong>Products in catalog:</strong> {products.length}
          </p>
          <p>
            <strong>Items in cart:</strong> {cart.length}
          </p>
          <p>
            <strong>Orders saved:</strong> {orders.length}
          </p>
        </div>

        <div className="card">
          <h3 className="card__title">API failure demo</h3>
          <p className="card__desc">
            Toggle simulated API failure to show how the catalog and admin pages
            render error states.
          </p>
          <p>
            <strong>Failure mode:</strong>{" "}
            {apiFailureEnabled ? "Enabled" : "Disabled"}
          </p>
          <button className="btn" onClick={handleToggleFailure}>
            {apiFailureEnabled ? "Disable failure mode" : "Enable failure mode"}
          </button>
        </div>
      </div>

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <p>
          Use the admin area to create and delete products, then refresh the page
          to prove persistence.
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
          <NavLink to="/admin/products" className="btn">
            Manage Products
          </NavLink>
          <NavLink to="/admin/orders" className="btn btn--ghost">
            View orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
