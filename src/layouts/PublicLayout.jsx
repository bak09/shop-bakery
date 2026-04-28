import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useShop } from "../context/ShopContext";

const PublicLayout = () => {
  const { toast } = useShop();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {toast ? <div className="toast toast--fixed">{toast}</div> : null}
    </>
  );
};

export default PublicLayout;
