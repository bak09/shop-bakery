import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  return (
    <div>
      <header className="header">
        <div className="container header__inner">
          <div className="brand">
            <span className="brand__logo">🔧</span>
            <span className="brand__name">Admin Panel</span>
          </div>
          <button className="btn btn--danger" onClick={logout}>Logout</button>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;