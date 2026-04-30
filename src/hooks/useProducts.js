import { useCallback, useEffect, useState } from "react";
import { productService } from "../services/productService";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async (signal) => {
    setLoading(true);
    setError("");

    try {
      const data = await productService.getProducts(signal);
      setProducts(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message || "Failed to load products.");
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadProducts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadProducts]);

  const createProduct = useCallback(async (product) => {
    setError("");
    const updatedProducts = await productService.createProduct(product);
    setProducts(updatedProducts);
    return updatedProducts;
  }, []);

  const updateProduct = useCallback(async (productId, updates) => {
    setError("");
    const updatedProducts = await productService.updateProduct(productId, updates);
    setProducts(updatedProducts);
    return updatedProducts;
  }, []);

  const deleteProduct = useCallback(async (productId) => {
    setError("");
    const updatedProducts = await productService.deleteProduct(productId);
    setProducts(updatedProducts);
    return updatedProducts;
  }, []);

  const resetProducts = useCallback(async () => {
    setError("");
    const updatedProducts = await productService.resetProducts();
    setProducts(updatedProducts);
    return updatedProducts;
  }, []);

  const refreshProducts = useCallback(async () => {
    const controller = new AbortController();
    await loadProducts(controller.signal);
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    refreshProducts,
  };
}
