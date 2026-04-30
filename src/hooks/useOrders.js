import { useCallback, useEffect, useState } from "react";
import { orderService } from "../services/orderService";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  const loadOrders = useCallback(async (signal) => {
    setLoadingOrders(true);
    setOrdersError("");

    try {
      const data = await orderService.getOrders(signal);
      setOrders(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setOrdersError(error.message || "Failed to load orders.");
      }
    } finally {
      if (!signal?.aborted) {
        setLoadingOrders(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadOrders(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadOrders]);

  const createOrder = useCallback(async (order) => {
    setOrdersError("");
    const updatedOrders = await orderService.createOrder(order);
    setOrders(updatedOrders);
    return updatedOrders;
  }, []);

  const changeOrderStatus = useCallback(async (orderId, status) => {
    setOrdersError("");
    const updatedOrders = await orderService.updateOrderStatus(orderId, status);
    setOrders(updatedOrders);
    return updatedOrders;
  }, []);

  return {
    orders,
    loadingOrders,
    ordersError,
    createOrder,
    changeOrderStatus,
  };
}
