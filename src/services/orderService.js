import { simulateRequest } from "./requestService";
import { storageService } from "./storageService";

export const orderService = {
  async getOrders(signal) {
    return simulateRequest(() => storageService.readOrders(), signal);
  },

  async createOrder(order) {
    return simulateRequest(() => {
      const currentOrders = storageService.readOrders();
      const nextId = currentOrders.length
        ? Math.max(...currentOrders.map((item) => item.id)) + 1
        : 1;

      const newOrder = {
        ...order,
        id: nextId,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      return storageService.writeOrders([newOrder, ...currentOrders]);
    });
  },

  async updateOrderStatus(orderId, status) {
    return simulateRequest(() => {
      const currentOrders = storageService.readOrders();
      const updatedOrders = currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      );

      return storageService.writeOrders(updatedOrders);
    });
  },
};
