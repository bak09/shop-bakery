import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails({ products, onAddToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <main className="main">
        <div className="container">
          <section className="section">
            <h2 className="section__title">Продукт не найден</h2>
          </section>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    onAddToCart({ product, qty: 1, note: "", coupon: "" });
  };

  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <h2 className="section__title">{product.name}</h2>
          <div className="card" style={{ textAlign: 'center' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', maxWidth: '400px', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
            <p><strong>Цена:</strong> {product.price} ₸</p>
            <p><strong>Категория:</strong> {product.category}</p>
            <p><strong>Описание:</strong> {product.description}</p>
            <button className="btn" onClick={handleAddToCart}>
              Добавить в корзину
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}