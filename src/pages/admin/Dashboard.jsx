import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2 className="section__title">Admin Dashboard</h2>
      <div className="card">
        <p>Welcome to the admin panel. Manage your bakery products and orders.</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <NavLink to="/admin/products" className="btn">Manage Products</NavLink>
          <NavLink to="/admin/orders" className="btn">Manage Orders</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;