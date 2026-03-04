import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import "./styles.css";

const LS_PRODUCTS_KEY = "shop_bakery_products_v1";
const LS_CART_KEY = "shop_bakery_cart_v1";

const defaultProducts = [
  { id: 1, name: "Butter Croissant", price: 990, desc: "Flaky, classic French croissant." },
  { id: 2, name: "Cinnamon Roll", price: 1190, desc: "Soft roll with cinnamon and glaze." },
  { id: 3, name: "Chocolate Muffin", price: 890, desc: "Rich cocoa muffin with chips." },
];

function safeParseLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export default function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState(() => safeParseLS(LS_PRODUCTS_KEY, defaultProducts));
  const [cart, setCart] = useState(() => safeParseLS(LS_CART_KEY, []));

  useEffect(() => {
    localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LS_CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  const createProduct = ({ name, price, desc }) => {
    setProducts((prev) => {
      const maxId = prev.reduce((m, p) => Math.max(m, p.id), 0);
      return [...prev, { id: maxId + 1, name, price, desc }];
    });
  };

  const updateProduct = (id, patch) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <Header page={page} onNavigate={setPage} cartCount={cartCount} onClearCart={clearCart} />

      {page === "home" ? (
        <Home products={products} onAddToCart={addToCart} />
      ) : (
        <Products products={products} onCreate={createProduct} onUpdate={updateProduct} onDelete={deleteProduct} />
      )}

      <Footer />
    </>
  );
}