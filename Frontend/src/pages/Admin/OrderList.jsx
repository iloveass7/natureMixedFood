import { useEffect, useState } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState({});

  const token = localStorage.getItem("token"); // Adjust if stored elsewhere

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/order/getOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setOrders(data);
        const statuses = {};
        data.forEach((order) => (statuses[order._id] = order.status));
        setOrderStatus(statuses);
      } else {
        alert(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const statusOptions = ["Processing", "Out for Delivery", "Delivered"];

  const handleStatusChange = async (id, newStatus) => {
    const confirmChange =
      newStatus === "Delivered"
        ? window.confirm("Mark as Delivered? This will delete the order.")
        : true;

    if (!confirmChange) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/order/updateOrderStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update order");
        return;
      }

      alert(data.message);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <h3 className="mt-1 text-4xl font-extrabold mb-9 text-green-800 mx-4">
        Order Lists and Details
      </h3>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg py-5 px-6 mx-4 shadow-xl hover:shadow-2xl transition"
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h4 className="text-2xl font-semibold">
                  {order?.user?.name || order._id}
                </h4>
                <p className="text-gray-600 text-lg">
                  Date: {new Date(order.createdAt).toLocaleDateString()} | Time:{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>

              <button
                className="bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded text-lg"
                onClick={() => toggleOrder(order._id)}
              >
                {expandedOrder === order._id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {expandedOrder === order._id && (
              <div className="mt-4 p-5 bg-green-100 rounded space-y-4">
                {/* Order Products */}
                <div>
                  <h5 className="font-bold text-lg mb-2">Order Details:</h5>
                  <p>
                    {order.products
                      .map(
                        (p) => `${p.product?.name || "Product"} x${p.quantity}`
                      )
                      .join(", ")}
                  </p>
                </div>

                {/* Address */}
                <div>
                  <h5 className="font-bold text-lg mb-2">Address:</h5>
                  <p>
                    Location: {order.address?.location}, District:{" "}
                    {order.address?.district}, Division:{" "}
                    {order.address?.division}, Postal:{" "}
                    {order.address?.postalCode}
                  </p>
                  <p>Phone: {order.number}</p>
                </div>

                {/* Status Dropdown */}
                <div>
                  <h5 className="font-bold text-lg mb-2">Order Status:</h5>
                  <select
                    value={orderStatus[order._id] || "Processing"}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border border-gray-400 rounded px-4 py-2 text-lg bg-white"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
