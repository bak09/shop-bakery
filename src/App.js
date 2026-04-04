import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/public/Home";
import Catalog from "./pages/public/Catalog";
import ProductDetails from "./pages/public/ProductDetails";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Cart from "./pages/public/Cart";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import Orders from "./pages/admin/Orders";
import NotFound from "./pages/NotFound";
import { mockProducts } from "./data/mockData";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('bakeryProducts');
    return saved ? JSON.parse(saved) : mockProducts;
  });

  const handleAddProduct = (data) => {
    setProducts((prev) => {
      const newProducts = [
        ...prev,
        {
          ...data,
          id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        },
      ];
      localStorage.setItem('bakeryProducts', JSON.stringify(newProducts));
      return newProducts;
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => {
      const newProducts = prev.filter((p) => p.id !== id);
      localStorage.setItem('bakeryProducts', JSON.stringify(newProducts));
      return newProducts;
    });
  };
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [sortOrder, setSortOrder] = useState("default");
  const [toast, setToast] = useState("");

  const handleAddToCart = ({ product, qty, note, coupon }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? {
                ...i,
                qty: i.qty + qty,
                note: note || i.note,
                coupon: coupon || i.coupon,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty,
          note,
          coupon,
        },
      ];
    });

    setToast(`✅ Добавлено: ${product.name} x ${qty}`);
    setTimeout(() => setToast(""), 1500);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
    setToast("🧹 Корзина очищена");
    setTimeout(() => setToast(""), 1500);
  };

  const { total, finalTotal } = useMemo(() => {
    const t = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const hasCoupon = cart.some((item) => item.coupon);
    const discount = hasCoupon ? 0.1 : 0;
    return {
      total: t,
      finalTotal: Math.round(t * (1 - discount)),
    };
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout cartCount={cartCount} onClearCart={handleClearCart} />}>
          <Route index element={<Home products={products} onAddToCart={handleAddToCart} search={search} setSearch={setSearch} category={category} setCategory={setCategory} sortOrder={sortOrder} setSortOrder={setSortOrder} cart={cart} total={total} finalTotal={finalTotal} removeFromCart={handleRemoveFromCart} />} />
          <Route path="catalog" element={<Catalog products={products} />} />
          <Route path="catalog/:id" element={<ProductDetails products={products} onAddToCart={handleAddToCart} />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart cart={cart} total={total} finalTotal={finalTotal} removeFromCart={handleRemoveFromCart} />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsAdmin products={products} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct} />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {toast && <div className="toast toast--fixed">{toast}</div>}
    </>
  );
}

