import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout = ({ cartCount, onClearCart }) => {
  return (
    <>
      <Header cartCount={cartCount} onClearCart={onClearCart} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;