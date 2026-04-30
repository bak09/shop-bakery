import React, { useState } from "react";
import { useShop } from "../../context/ShopContext";

const ProductsAdmin = () => {
  const {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    removeProduct,
    restoreProducts,
  } = useShop();
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    imageFile: null,
  });
  const [formError, setFormError] = useState("");

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      imageFile: null,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setForm((prev) => ({
        ...prev,
        image: loadEvent.target.result,
        imageFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category || !form.description) {
      setFormError("Complete all required fields before saving a product.");
      return;
    }

    const imageUrl =
      form.image ||
      `https://source.unsplash.com/featured/?${encodeURIComponent(
        `${form.name} bakery dessert food`
      )}`;

    try {
      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        description: form.description.trim(),
        image: imageUrl,
      };

      if (form.id) {
        await editProduct(form.id, payload);
      } else {
        await addProduct(payload);
      }

      setFormError("");
      resetForm();
    } catch (error) {
      setFormError(error.message || "Failed to save product.");
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      price: String(product.price),
      category: product.category,
      description: product.description,
      image: product.image,
      imageFile: null,
    });
    setFormError("");
  };

  return (
    <div className="container">
      <div className="section__header">
        <h2 className="section__title">Manage Products</h2>
        <button className="btn btn--ghost btn--small" onClick={restoreProducts}>
          Reset starter data
        </button>
      </div>

      {error ? <div className="status status--error">{error}</div> : null}

      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 className="card__title">
          {form.id ? "Edit Product" : "Add New Product"}
        </h3>
        <div className="admin-form">
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <input
            className="input"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(event) => setForm({ ...form, price: event.target.value })}
          />
          <input
            className="input"
            placeholder="Category"
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
          />
          <textarea
            className="input"
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
          />

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Product image
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {form.image ? (
              <div>
                <img
                  src={form.image}
                  alt="Preview"
                  className="product-media product-media--preview"
                />
              </div>
            ) : null}
            <small className="muted">
              Upload an image or leave it empty to use a placeholder photo.
            </small>
          </div>

          {formError ? <p className="form-error">{formError}</p> : null}
          <div className="actions">
            <button className="btn" onClick={handleSave}>
              {form.id ? "Update product" : "Add product"}
            </button>
            {form.id ? (
              <button className="btn btn--ghost" onClick={resetForm}>
                Cancel edit
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div>
        <h3 className="section__title">Current Products</h3>
        {loading ? (
          <div className="card">
            <p className="muted">Refreshing products...</p>
          </div>
        ) : null}
        <div className="grid">
          {products.map((product) => (
            <article key={product.id} className="card">
              <img
                src={product.image}
                alt={product.name}
                className="product-media"
              />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> {product.price} KZT
              </p>
              <div className="actions">
                <button className="btn btn--ghost" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button
                  className="btn btn--danger"
                  onClick={() => removeProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsAdmin;
