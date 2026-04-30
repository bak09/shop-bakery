import { orderService } from "./orderService";
import { STORAGE_KEYS } from "./storageService";

describe("orderService", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("creates a new order with pending status", async () => {
    const promise = orderService.createOrder({
      customerName: "Aruzhan",
      phone: "+7 700 000 00 00",
      address: "Bakery street 10",
      comment: "",
      items: [{ id: 1, name: "Croissant", price: 800, qty: 2 }],
      subtotal: 1600,
      finalTotal: 1600,
    });

    jest.runAllTimers();
    const orders = await promise;

    expect(orders[0].status).toBe("Pending");
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.orders))).toHaveLength(1);
  });

  it("updates order status", async () => {
    const createPromise = orderService.createOrder({
      customerName: "Aruzhan",
      phone: "+7 700 000 00 00",
      address: "Bakery street 10",
      comment: "",
      items: [{ id: 1, name: "Croissant", price: 800, qty: 2 }],
      subtotal: 1600,
      finalTotal: 1600,
    });

    jest.runAllTimers();
    const createdOrders = await createPromise;

    const updatePromise = orderService.updateOrderStatus(createdOrders[0].id, "Completed");
    jest.runAllTimers();
    const updatedOrders = await updatePromise;

    expect(updatedOrders[0].status).toBe("Completed");
  });
});
