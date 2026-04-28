import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useProductFilters from "../hooks/useProductFilters";
import useProducts from "../hooks/useProducts";

const ShopContext = createContext(null);

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
}

export function ShopProvider({ children }) {
  const {
    products,
    loading,
    error,
    createProduct,
    deleteProduct,
    resetProducts,
    refreshProducts,
  } = useProducts();
  const [cart, setCart] = useLocalStorage("bakery-cart", []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredProducts = useProductFilters(products, search, category, sortOrder);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const hasCoupon = cart.some((item) => item.coupon === "SALE10");
    const discountRate = hasCoupon ? 0.1 : 0;

    return {
      subtotal,
      discountRate,
      finalTotal: Math.round(subtotal * (1 - discountRate)),
    };
  }, [cart]);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      search,
      setSearch,
      category,
      setCategory,
      sortOrder,
      setSortOrder,
      filteredProducts,
      categories,
      cart,
      cartCount,
      totals,
      toast,
      addToCart({ product, qty = 1, note = "", coupon = "" }) {
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.id === product.id);

          if (existingItem) {
            return prevCart.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    qty: item.qty + qty,
                    note: note || item.note,
                    coupon: coupon || item.coupon,
                  }
                : item
            );
          }

          return [
            ...prevCart,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              qty,
              note,
              coupon,
            },
          ];
        });

        setToast(`${product.name} added to cart`);
      },
      removeFromCart(productId) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        setToast("Item removed from cart");
      },
      clearCart() {
        setCart([]);
        setToast("Cart cleared");
      },
      async addProduct(product) {
        await createProduct(product);
        setToast("Product created successfully");
      },
      async removeProduct(productId) {
        await deleteProduct(productId);
        setToast("Product deleted successfully");
      },
      async restoreProducts() {
        await resetProducts();
        setToast("Catalog restored to starter data");
      },
      refreshProducts,
    }),
    [
      products,
      loading,
      error,
      search,
      category,
      sortOrder,
      filteredProducts,
      categories,
      cart,
      cartCount,
      totals,
      toast,
      setCart,
      createProduct,
      deleteProduct,
      resetProducts,
      refreshProducts,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
