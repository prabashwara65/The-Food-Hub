import React from "react";

const SingleOrder = ({ order }) => {
  if (!order) return null; // safety check

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Total:</strong> Rs {order.amount}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>

      <h3 className="mt-4 font-semibold">Items:</h3>
      <ul className="list-disc ml-5">
        {order.items.map((item) => (
          <li key={item.menuId}>
            {item.menuTitle} - Quantity: {item.quantity} - Rs {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleOrder;
