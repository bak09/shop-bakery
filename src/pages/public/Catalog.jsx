import React from "react";
import { Link } from "react-router-dom";

export default function Catalog({ products }) {
  return (
    <div className="container">
      <h2>Catalog</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
            <img src={p.image} alt={p.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>Price:</strong> {p.price} ₸</p>
            <Link to={`/catalog/${p.id}`} style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.5rem 1rem', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
