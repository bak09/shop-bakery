import React from "react";

export default function SearchFilterPanel({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <section className="section">
      <h2 className="section__title">Search & Filter</h2>

      <div className="filter-panel">
        <input
          className="input"
          type="text"
          placeholder="Search bakery item..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <select
          className="input"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Pastry">Pastry</option>
          <option value="Bread">Bread</option>
          <option value="Dessert">Dessert</option>
        </select>

        <select
          className="input"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
        </select>
      </div>
    </section>
  );
}