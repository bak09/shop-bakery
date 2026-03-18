import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import "./styles.css";

function CartPage({ cart, total, finalTotal, removeFromCart }) {
  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <h2 className="section__title">Корзина</h2>

          <div className="card">
            {cart.length === 0 ? (
              <p className="muted">Корзина пуста</p>
            ) : (
              <div className="cart-list">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <p className="cart-item__name">
                        {item.name} x {item.qty}
                      </p>
                      <p className="muted">
                        {item.price} ₸ × {item.qty} = {item.price * item.qty} ₸
                      </p>
                      {item.note && (
                        <p className="muted">Примечание: {item.note}</p>
                      )}
                      {item.coupon && (
                        <p className="muted">Купон: {item.coupon}</p>
                      )}
                    </div>

                    <button
                      className="btn btn--small btn--danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            )}

            <hr />

            <p>
              <strong>Итого:</strong> {total} ₸
            </p>
            <p>
              <strong>Итоговый результат:</strong> {finalTotal} ₸
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  const [products, setProducts] = useState([
    { id: 1, name: "Круассан", price: 800, category: "Выпечка", desc: "Слоёный, масляный, свежий." },
    { id: 2, name: "Чизкейк", price: 1500, category: "Десерты", desc: "Нежный сырный десерт." },
    { id: 3, name: "Багет", price: 600, category: "Хлеб", desc: "Французский багет с хрустящей коркой." },
  ]);

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [sortOrder, setSortOrder] = useState("default");
  const [toast, setToast] = useState("");

  const handleAddProduct = (data) => {
    setProducts((prev) => [
      ...prev,
      {
        ...data,
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
      },
    ]);
    setToast("✅ Товар добавлен в каталог");
    setTimeout(() => setToast(""), 1500);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setToast("🗑 Товар удалён");
    setTimeout(() => setToast(""), 1500);
  };

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

  const filteredProducts = useMemo(() => {
    let list = products;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q)
      );
    }

    if (category !== "Все") {
      list = list.filter((p) => p.category === category);
    }

    switch (sortOrder) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [products, search, category, sortOrder]);

  let content = null;
  if (page === "home") {
    content = (
      <Home
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        cart={cart}
        total={total}
        finalTotal={finalTotal}
        removeFromCart={handleRemoveFromCart}
      />
    );
  } else if (page === "products") {
    content = (
      <main className="main">
        <Products
          products={products}
          onAddProduct={handleAddProduct}
          onDelete={handleDeleteProduct}
        />
      </main>
    );
  } else if (page === "cart") {
    content = (
      <CartPage
        cart={cart}
        total={total}
        finalTotal={finalTotal}
        removeFromCart={handleRemoveFromCart}
      />
    );
  }

  return (
    <>
      <Header
        page={page}
        onNavigate={setPage}
        cartCount={cartCount}
        onClearCart={handleClearCart}
      />

      {content}

      <Footer />

      {toast && <div className="toast toast--fixed">{toast}</div>}
    </>
  );
}

