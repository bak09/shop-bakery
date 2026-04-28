import React from "react";
import { Link, useParams } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart, loading } = useShop();
  const product = products.find((item) => item.id === Number(id));

  if (loading) {
    return (
      <main className="main">
        <div className="container">
          <div className="card">
            <p className="muted">Loading product details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="main">
        <div className="container">
          <section className="section">
            <h2 className="section__title">Product not found</h2>
            <Link className="btn btn--small" to="/catalog">
              Back to catalog
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <h2 className="section__title">{product.name}</h2>
          <div className="card card--detail">
            <img
              className="product-media product-media--large"
              src={product.image}
              alt={product.name}
            />
            <p>
              <strong>Price:</strong> {product.price} KZT
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <button
              className="btn"
              onClick={() => addToCart({ product, qty: 1, note: "", coupon: "" })}
            >
              Add to cart
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
