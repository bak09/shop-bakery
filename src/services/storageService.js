import { mockProducts } from "../data/mockData";

export const STORAGE_KEYS = {
  products: "bakery-products",
  orders: "bakery-orders",
  apiFailure: "bakery-api-failure",
};

function parseJson(value, fallbackValue) {
  try {
    return value ? JSON.parse(value) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

export const storageService = {
  readProducts() {
    const products = parseJson(
      localStorage.getItem(STORAGE_KEYS.products),
      mockProducts
    );

    if (!localStorage.getItem(STORAGE_KEYS.products)) {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    }

    return products;
  },

  writeProducts(products) {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    return products;
  },

  readOrders() {
    return parseJson(localStorage.getItem(STORAGE_KEYS.orders), []);
  },

  writeOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    return orders;
  },

  getApiFailure() {
    return localStorage.getItem(STORAGE_KEYS.apiFailure) === "true";
  },

  setApiFailure(enabled) {
    localStorage.setItem(STORAGE_KEYS.apiFailure, String(enabled));
    return enabled;
  },
};
