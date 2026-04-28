import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

export default function Home() {
  const {
    filteredProducts,
    categories,
    search,
    setSearch,
    category,
    setCategory,
    sortOrder,
    setSortOrder,
    addToCart,
    loading,
    error,
  } = useShop();
  const [quantities, setQuantities] = useState({});
  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [localToast, setLocalToast] = useState("");
  const [tip, setTip] = useState("");

  const visibleProducts = useMemo(() => filteredProducts.slice(0, 6), [filteredProducts]);

  const increaseQty = useCallback((id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  }, []);

  const decreaseQty = useCallback((id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  }, []);

  const applyCoupon = useCallback(() => {
    setCoupon("SALE10");
    setLocalToast("Promo code SALE10 applied");
    window.setTimeout(() => setLocalToast(""), 1500);
  }, []);

  const handleAdd = useCallback(
    (product) => {
      const qty = quantities[product.id] || 1;

      addToCart({
        product,
        qty,
        note,
        coupon,
      });

      setLocalToast(`${product.name} x ${qty} added to cart`);
      window.setTimeout(() => setLocalToast(""), 1500);
    },
    [addToCart, coupon, note, quantities]
  );

  return (
    <main className="main">
      <div className="container">
        <section className="hero">
          <p className="eyebrow">Semester project endterm build</p>
          <h1 className="hero__title">Fresh bakery with interactive ordering tools.</h1>
          <p className="hero__subtitle">
            Search products, filter by category, add order notes, activate a promo
            code, and send items to the cart with persistent state.
          </p>

          <div
            className="status"
            onMouseEnter={() =>
              setTip("Baker tip: today the croissant and cheesecake are the most popular items.")
            }
            onMouseLeave={() => setTip("")}
            style={{ cursor: "pointer", marginBottom: "16px" }}
          >
            {tip || "Hover here to see the baker's tip"}
          </div>

          {localToast ? <div className="toast">{localToast}</div> : null}

          <div className="hero-actions">
            <button
              className="btn"
              type="button"
              onClick={() => {
                const element = document.getElementById("popular");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Explore popular products
            </button>
            <Link className="btn btn--ghost" to="/catalog">
              Open full catalog
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="filter-panel">
            <input
              className="input"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All categories" : item}
                </option>
              ))}
            </select>

            <select
              className="input"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price ascending</option>
              <option value="price-desc">Price descending</option>
              <option value="name-asc">Name A-Z</option>
            </select>
          </div>
        </section>

        <section className="section" id="popular">
          <h2 className="section__title">Popular today</h2>

          {loading ? (
            <div className="card">
              <p className="muted">Loading products...</p>
            </div>
          ) : null}

          {error ? <div className="status status--error">{error}</div> : null}

          {!loading && !error && visibleProducts.length === 0 ? (
            <div className="card">
              <p className="muted">Nothing found</p>
            </div>
          ) : null}

          {!loading && !error && visibleProducts.length > 0 ? (
            <div className="grid">
              {visibleProducts.map((product) => {
                const qty = quantities[product.id] || 1;

                return (
                  <article className="card" key={product.id}>
                    <img className="product-media" src={product.image} alt={product.name} />
                    <div>
                      <h3 className="card__title">{product.name}</h3>
                      <p className="card__desc">{product.description}</p>
                      <p className="muted">Category: {product.category}</p>
                    </div>

                    <div className="card__bottom">
                      <span className="price">{product.price} KZT</span>
                      <Link className="btn btn--ghost btn--small" to={`/catalog/${product.id}`}>
                        Details
                      </Link>
                    </div>

                    <div className="qty-row">
                      <span className="muted">Quantity:</span>
                      <div className="qty-box">
                        <button
                          className="btn btn--small btn--ghost"
                          type="button"
                          onClick={() => decreaseQty(product.id)}
                        >
                          -1
                        </button>
                        <span className="qty-value">{qty}</span>
                        <button
                          className="btn btn--small"
                          type="button"
                          onClick={() => increaseQty(product.id)}
                        >
                          +1
                        </button>
                      </div>
                    </div>

                    <button className="btn btn--small" type="button" onClick={() => handleAdd(product)}>
                      Add to cart
                    </button>
                  </article>
                );
              })}
            </div>
          ) : null}
        </section>

        <section className="section" id="order-tools">
          <h2 className="section__title">Your order tools</h2>

          <div className="grid grid--two">
            <div className="card">
              <h3 className="card__title">Order note</h3>
              <p className="card__desc">Add a comment for the bakery before checkout.</p>
              <input
                className="input"
                type="text"
                placeholder="Example: less sugar, no nuts, extra cream"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
              <p className="muted">
                Note: <strong>{note || "not specified"}</strong>
              </p>
            </div>

            <div className="card">
              <h3 className="card__title">Promo code</h3>
              <p className="card__desc">Activate a discount for the current cart.</p>
              <button className="btn btn--small" type="button" onClick={applyCoupon}>
                Apply SALE10
              </button>
              <p className="muted">
                Coupon: <strong>{coupon || "inactive"}</strong>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
