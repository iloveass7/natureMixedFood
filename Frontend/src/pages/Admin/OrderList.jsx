import { useState } from "react";

const OrderList = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState({});

  const orders = [
    { id: 1, name: "Tiger Salman", date: "2024-07-05", time: "10:15 AM", details: "dalal tor mayre chudi, bon re chudi malaysia aia, 1x Baby Oil" },
    { id: 2, name: "Bomi Labib", date: "2024-07-04", time: "02:40 PM", details: "dalal tor mayre chudi, bon re chudi malaysia aia, 1x Baby Oil" },
    { id: 3, name: "Spotify Shafin", date: "2024-07-03", time: "11:25 AM", details: "dalal tor mayre chudi, bon re chudi malaysia aia, 1x Baby Oil" },
    { id: 4, name: "Chodu Labib", date: "2024-07-05", time: "10:15 AM", details: "dalal tor mayre chudi, bon re chudi malaysia aia, 1x Baby Oil" },
    { id: 5, name: "Kala Choda Asif", date: "2024-07-04", time: "02:40 PM", details: "dalal tor mayre chudi, bon re chudi malaysia aia, 1x Baby Oil" },
    { id: 6, name: "Big Noti Chuck", date: "2024-07-03", time: "11:25 AM", details: "dalal tor mayre chudi, bon re chudi malaysia aia, 1x Baby Oil" },
  ];

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const statusOptions = ["Processing", "Out for Delivery", "Delivered"];

  const handleStatusChange = (id, newStatus) => {
    setOrderStatus((prev) => ({ ...prev, [id]: newStatus }));
  };

  return (
    <div>
      <h3 className="mt-1 text-4xl font-extrabold mb-9 text-green-800">Order Lists and Details</h3>

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-300 rounded-lg py-5 px-6 shadow hover:shadow-lg transition">
            
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h4 className="text-2xl font-semibold">{order.name}</h4>
                <p className="text-gray-600 text-lg">Date: {order.date} | Time: {order.time}</p>
              </div>

              <button
                className="bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded text-lg"
                onClick={() => toggleOrder(order.id)}
              >
                {expandedOrder === order.id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {/* Order Details with Status Dropdown */}
            {expandedOrder === order.id && (
              <div className="mt-4 p-5 bg-green-100 rounded space-y-4">
                
                <div>
                  <h5 className="font-bold text-lg mb-2">Order Details:</h5>
                  <p>{order.details}</p>
                </div>

                <div>
                  <h5 className="font-bold text-lg mb-2">Order Status:</h5>
                  <select
                    value={orderStatus[order.id] || "Processing"}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
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
