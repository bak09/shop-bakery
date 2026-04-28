import { useMemo } from "react";

export default function useProductFilters(products, search, category, sortOrder) {
  return useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory = category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    const sortedProducts = [...filteredProducts];

    switch (sortOrder) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sortedProducts;
  }, [products, search, category, sortOrder]);
}
