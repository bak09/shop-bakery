import React, { useState } from 'react';

const ProductsAdmin = ({ products, onAddProduct, onDeleteProduct }) => {
  const [form, setForm] = useState({ name: '', price: '', category: '', description: '', image: '', imageFile: null });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm(prev => ({ ...prev, image: e.target.result, imageFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!form.name || !form.price || !form.description) {
      alert('Fill all fields');
      return;
    }
    
    let imageUrl = form.image;
    if (!imageUrl) {
      // Auto-generate if no image provided
      const imageQuery = encodeURIComponent(`${form.name} bakery dessert food`);
      imageUrl = `https://source.unsplash.com/featured/?${imageQuery}`;
    }
    
    onAddProduct({
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      image: imageUrl
    });
    setForm({ name: '', price: '', category: '', description: '', image: '', imageFile: null });
  };

  return (
    <div className="container">
      <h2>Manage Products</h2>
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Add New Product</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="3" />
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Product Image:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ marginBottom: '0.5rem' }}
            />
            {form.image && (
              <div>
                <img src={form.image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
              </div>
            )}
            <small style={{ color: '#666' }}>Upload image or leave empty for auto-generation</small>
          </div>
          <button className="btn" onClick={handleAdd}>Add Product</button>
        </div>
      </div>
      <div>
        <h3>Current Products</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {products.map(p => (
            <div key={p.id} className="card">
              <img src={p.image} alt={p.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
              <h4>{p.name}</h4>
              <p>{p.description}</p>
              <p><strong>Price:</strong> {p.price} ₸</p>
              <button className="btn btn--danger" onClick={() => onDeleteProduct(p.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsAdmin;