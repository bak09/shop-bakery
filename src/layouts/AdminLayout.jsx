import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div>
      <header className="header">
        <div className="container header__inner">
          <div className="brand">
            <span className="brand__logo">A</span>
            <span className="brand__name">Admin Panel</span>
          </div>
          <button className="btn btn--danger" onClick={logout}>
            Logout
          </button>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <nav className="admin-nav">
            <NavLink to="/admin/dashboard" className="nav__btn">
              Dashboard
            </NavLink>
            <NavLink to="/admin/products" className="nav__btn">
              Products
            </NavLink>
            <NavLink to="/admin/orders" className="nav__btn">
              Defense Notes
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
