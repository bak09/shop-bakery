import React from "react";
import { useShop } from "../../context/ShopContext";

const Orders = () => {
  const { orders, loadingOrders, ordersError, updateOrderStatus } = useShop();

  return (
    <div>
      <h2 className="section__title">Orders</h2>
      {ordersError ? <div className="status status--error">{ordersError}</div> : null}
      {loadingOrders ? (
        <div className="card">
          <p className="muted">Loading orders...</p>
        </div>
      ) : null}
      {!loadingOrders && orders.length === 0 ? (
        <div className="card">
          <p className="muted">No orders yet. Complete checkout from the cart to create one.</p>
        </div>
      ) : null}
      {!loadingOrders && orders.length > 0 ? (
        <div className="grid">
          {orders.map((order) => (
            <article key={order.id} className="card">
              <div className="card__bottom">
                <h3 className="card__title">Order #{order.id}</h3>
                <span className="price">{order.finalTotal} KZT</span>
              </div>
              <p className="muted">
                {order.customerName} • {order.phone}
              </p>
              <p className="muted">{order.address}</p>
              <p className="muted">Status: {order.status}</p>
              <p className="muted">
                Created: {new Date(order.createdAt).toLocaleString()}
              </p>
              {order.comment ? <p className="muted">Comment: {order.comment}</p> : null}
              <div className="order-items">
                {order.items.map((item) => (
                  <p className="muted" key={`${order.id}-${item.id}`}>
                    {item.name} x {item.qty} = {item.price * item.qty} KZT
                  </p>
                ))}
              </div>
              <select
                className="input"
                value={order.status}
                onChange={(event) => updateOrderStatus(order.id, event.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Orders;
