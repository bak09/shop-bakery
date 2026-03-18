import React, { useState } from "react";

export default function Products({ products, onAddProduct, onDelete }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Pastry",
    desc: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.desc) {
      alert("Fill all fields");
      return;
    }

    onAddProduct({
      name: form.name,
      price: Number(form.price),
      category: form.category,
      desc: form.desc,
    });

    setForm({
      name: "",
      price: "",
      category: "Pastry",
      desc: "",
    });
  };

  return (
    <div className="container">

      <h2>Admin Panel</h2>

      {/* ➕ ДОБАВЛЕНИЕ */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
        />

        <button>Add Product</button>
      </form>

      {/* 📦 СПИСОК */}
      {products.map(p => (
        <div key={p.id}>
          {p.name} — {p.price} ₸
          <button onClick={() => onDelete(p.id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}