import { mockProducts } from "../data/mockData";
import { simulateRequest } from "./requestService";
import { storageService } from "./storageService";

export const productService = {
  async getProducts(signal) {
    return simulateRequest(() => storageService.readProducts(), signal);
  },

  async createProduct(product) {
    return simulateRequest(() => {
      const currentProducts = storageService.readProducts();
      const nextId = currentProducts.length
        ? Math.max(...currentProducts.map((item) => item.id)) + 1
        : 1;

      return storageService.writeProducts([
        ...currentProducts,
        { ...product, id: nextId },
      ]);
    });
  },

  async updateProduct(productId, updates) {
    return simulateRequest(() => {
      const currentProducts = storageService.readProducts();
      const updatedProducts = currentProducts.map((product) =>
        product.id === productId ? { ...product, ...updates, id: productId } : product
      );

      return storageService.writeProducts(updatedProducts);
    });
  },

  async deleteProduct(productId) {
    return simulateRequest(() => {
      const currentProducts = storageService.readProducts();
      return storageService.writeProducts(
        currentProducts.filter((product) => product.id !== productId)
      );
    });
  },

  async resetProducts() {
    return simulateRequest(() => storageService.writeProducts(mockProducts));
  },

  getApiFailure() {
    return storageService.getApiFailure();
  },

  setApiFailure(enabled) {
    return storageService.setApiFailure(enabled);
  },
};
