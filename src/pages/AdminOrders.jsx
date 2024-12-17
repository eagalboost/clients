import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        { withCredentials: true }
      );
      setOrders(response.data);
    } catch (error) {
      setError("Error fetching orders. Please try again later.");
      console.error("Error fetching orders:", error);
    }
  }, []);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Render table row for each order
  const renderOrderRow = (order, index) => {
    return (
      <tr
        key={order._id}
        className={`border-t ${
          index % 2 === 0 ? "bg-[#1e1e1e]" : "bg-[#2b2b2b]"
        }`}
      >
        <td className="px-6 py-3 font-openSans text-[#f5f5f5]">{order._id}</td>
        <td className="px-6 py-3 font-openSans text-[#cccccc]">
          {order.title}
        </td>
        <td className="px-6 py-3 font-openSans text-[#cccccc]">
          {order.buyerUsername}
        </td>
        <td className="px-6 py-3 font-openSans text-[#cccccc]">
          ${order.price}
        </td>
        <td className="px-6 py-3">
          <button className="px-4 py-2 font-openSans bg-primaryRgb text-[#ffffff] rounded-lg hover:bg-[#388e3c]">
            View
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-[#f5f5f5] text-2xl font-roboto font-bold mb-4">
        Orders
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="overflow-x-auto bg-[#222222] rounded-lg shadow-lg">
        <table className="min-w-full bg-[#222222]">
          <thead className="bg-[#2a2a2a]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-primaryRgb uppercase tracking-wider font-openSans">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-primaryRgb uppercase tracking-wider font-openSans">
                Service Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-primaryRgb uppercase tracking-wider font-openSans">
                Buyer
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-primaryRgb uppercase tracking-wider font-openSans">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-primaryRgb uppercase tracking-wider font-openSans">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => renderOrderRow(order, index))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-3 text-center text-[#aaaaaa]"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
