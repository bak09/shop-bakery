import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

export default function Catalog() {
  const {
    filteredProducts,
    categories,
    search,
    setSearch,
    category,
    setCategory,
    sortOrder,
    setSortOrder,
    loading,
    error,
  } = useShop();

  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">Catalog</h2>
            <p className="muted">Search, filter, and sort the live product collection.</p>
          </div>

          <div className="filter-panel">
            <input
              className="input"
              type="text"
              placeholder="Search by product name or description"
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
              <option value="default">Default order</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </section>

        <section className="section">
          {loading ? (
            <div className="card">
              <p className="muted">Loading products...</p>
            </div>
          ) : null}
          {error ? <div className="status status--error">{error}</div> : null}
          {!loading && !error && filteredProducts.length === 0 ? (
            <div className="status status--empty">No products match the current filter.</div>
          ) : null}

          {!loading && !error && filteredProducts.length > 0 ? (
            <div className="grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="card">
                  <img className="product-media" src={product.image} alt={product.name} />
                  <h3 className="card__title">{product.name}</h3>
                  <p className="card__desc">{product.description}</p>
                  <p className="muted">{product.category}</p>
                  <div className="card__bottom">
                    <span className="price">{product.price} KZT</span>
                    <Link className="btn btn--small" to={`/catalog/${product.id}`}>
                      View details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
