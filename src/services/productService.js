import { mockProducts } from "../data/mockData";

const PRODUCTS_KEY = "bakery-products";
const API_FAILURE_KEY = "bakery-api-failure";
const REQUEST_DELAY = 500;

function createAbortError() {
  const error = new Error("Request aborted");
  error.name = "AbortError";
  return error;
}

function readStoredProducts() {
  const savedProducts = localStorage.getItem(PRODUCTS_KEY);

  if (!savedProducts) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(mockProducts));
    return mockProducts;
  }

  try {
    return JSON.parse(savedProducts);
  } catch {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(mockProducts));
    return mockProducts;
  }
}

function writeStoredProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return products;
}

function simulateRequest(callback, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(createAbortError());
      return;
    }

    const timer = window.setTimeout(() => {
      if (localStorage.getItem(API_FAILURE_KEY) === "true") {
        reject(
          new Error(
            "Simulated API failure. Disable failure mode from the admin dashboard and try again."
          )
        );
        return;
      }

      try {
        resolve(callback());
      } catch (error) {
        reject(error);
      }
    }, REQUEST_DELAY);

    if (signal) {
      signal.addEventListener(
        "abort",
        () => {
          window.clearTimeout(timer);
          reject(createAbortError());
        },
        { once: true }
      );
    }
  });
}

export const productService = {
  async getProducts(signal) {
    return simulateRequest(() => readStoredProducts(), signal);
  },

  async createProduct(product) {
    return simulateRequest(() => {
      const currentProducts = readStoredProducts();
      const nextId = currentProducts.length
        ? Math.max(...currentProducts.map((item) => item.id)) + 1
        : 1;

      return writeStoredProducts([...currentProducts, { ...product, id: nextId }]);
    });
  },

  async deleteProduct(productId) {
    return simulateRequest(() => {
      const currentProducts = readStoredProducts();
      return writeStoredProducts(
        currentProducts.filter((product) => product.id !== productId)
      );
    });
  },

  async resetProducts() {
    return simulateRequest(() => writeStoredProducts(mockProducts));
  },

  getApiFailure() {
    return localStorage.getItem(API_FAILURE_KEY) === "true";
  },

  setApiFailure(enabled) {
    localStorage.setItem(API_FAILURE_KEY, String(enabled));
    return enabled;
  },
};
