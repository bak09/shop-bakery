import React, { useMemo, useState } from "react";

export default function Products({ products, onCreate, onUpdate, onDelete }) {
  const [form, setForm] = useState({ name: "", price: "", desc: "" });
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        String(p.price).includes(q)
    );
  }, [products, query]);

  const reset = () => {
    setForm({ name: "", price: "", desc: "" });
    setEditingId(null);
  };

  const submit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const desc = form.desc.trim();
    const priceNum = Number(form.price);

    if (!name || !desc || !Number.isFinite(priceNum) || priceNum <= 0) {
      alert("Fill fields correctly: name, description, price > 0");
      return;
    }

    if (editingId === null) {
      onCreate({ name, desc, price: priceNum });
    } else {
      onUpdate(editingId, { name, desc, price: priceNum });
    }
    reset();
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, price: String(p.price), desc: p.desc });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <h2 className="section__title">CRUD: Products (LocalStorage)</h2>

          <form className="form" onSubmit={submit}>
            <div className="form__row">
              <div className="field">
                <label className="label">Name</label>
                <input
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder="E.g., Strawberry Tart"
                />
              </div>

              <div className="field">
                <label className="label">Price (₸)</label>
                <input
                  className="input"
                  value={form.price}
                  onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
                  placeholder="e.g., 1490"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <input
                className="input"
                value={form.desc}
                onChange={(e) => setForm((s) => ({ ...s, desc: e.target.value }))}
                placeholder="Short description"
              />
            </div>

            <div className="form__actions">
              <button className="btn" type="submit">
                {editingId === null ? "Create" : "Update"}
              </button>
              <button className="btn btn--ghost" type="button" onClick={reset}>
                Reset
              </button>

              <div className="search">
                <input
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                />
              </div>
            </div>
          </form>
        </section>

        <section className="section">
          <h3 className="section__title">Products List</h3>

          <div className="grid">
            {filtered.map((p) => (
              <article className="card" key={p.id}>
                <div className="card__top">
                  <div className="card__icon">🧁</div>
                  <div>
                    <h3 className="card__title">{p.name}</h3>
                    <p className="card__desc">{p.desc}</p>
                  </div>
                </div>

                <div className="card__bottom">
                  <span className="price">{p.price} ₸</span>
                  <div className="actions">
                    <button className="btn btn--small" type="button" onClick={() => startEdit(p)}>
                      Edit
                    </button>
                    <button
                      className="btn btn--small btn--danger"
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete "${p.name}"?`)) onDelete(p.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}