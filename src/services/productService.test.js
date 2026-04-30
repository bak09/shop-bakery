import { productService } from "./productService";
import { STORAGE_KEYS } from "./storageService";

describe("productService", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("creates a product and persists it", async () => {
    const promise = productService.createProduct({
      name: "Test Cake",
      price: 999,
      category: "Dessert",
      description: "For automated test",
      image: "test.jpg",
    });

    jest.runAllTimers();
    const products = await promise;

    expect(products.some((product) => product.name === "Test Cake")).toBe(true);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.products))).toHaveLength(
      products.length
    );
  });

  it("updates an existing product", async () => {
    const initialProducts = await (async () => {
      const promise = productService.getProducts();
      jest.runAllTimers();
      return promise;
    })();

    const promise = productService.updateProduct(initialProducts[0].id, {
      name: "Updated Name",
    });

    jest.runAllTimers();
    const updatedProducts = await promise;

    expect(updatedProducts[0].name).toBe("Updated Name");
  });
});
