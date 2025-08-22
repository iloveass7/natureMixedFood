import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { api } from "../../config/api";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");


  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data: raw } = await api.get("/order/getOrders");
      const orders = Array.isArray(raw) ? raw : raw?.orders || [];

      // Hydrate product details for each order
      const ordersWithProducts = await Promise.all(
        orders.map(async (order) => {
          const productsWithDetails = await Promise.all(
            order.products.map(async (item) => {
              try {
                const { data: product } = await api.get(
                  `/product/singleProduct/${item.product}`
                );
                return { ...item, product: product || { name: "Unknown Product" } };
              } catch (e) {
                console.error("Product fetch failed:", item.product, e);
                return { ...item, product: { name: "Unknown Product" } };
              }
            })
          );
          return { ...order, products: productsWithDetails };
        })
      );

      setOrders(ordersWithProducts);

      // Build status map
      const statuses = ordersWithProducts.reduce((acc, o) => {
        acc[o._id] = o.status;
        return acc;
      }, {});
      setOrderStatus(statuses);
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
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
    const proceed =
      newStatus === "Delivered"
        ? window.confirm("Mark as Delivered? This will delete the order.")
        : true;

    if (!proceed) return;

    try {
      const { data, status } = await api.put(
        `/order/updateOrderStatus/${id}`,
        { status: newStatus }
        // No need to pass headers; your api interceptor adds Authorization
      );

      if (!(status >= 200 && status < 300)) {
        throw new Error(data?.message || "Failed to update order");
      }

      alert(data?.message || "Order updated");
      await fetchOrders(); // refresh list
    } catch (err) {
      console.error("Error updating order status:", err);
      alert(err.response?.data?.message || err.message || "Failed to update order");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <h3 className="text-4xl font-extrabold mb-9 text-green-800">
        Order Lists and Details
      </h3>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="text-2xl font-semibold mb-1">
                  {/* Show guest name if no user, otherwise show user name */}
                  {order.user
                    ? order.user.name
                    : order.guestInfo?.name || `Guest Order`}
                </h4>
                <p className="text-gray-400 my-1 text-lg font-semibold">
                  Order ID: {order._id}
                </p>
                <p className="text-gray-600 my-1">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-[1.2rem] text-green-700 font-bold my-1">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
                <p className={`text-lg font-semibold ${order.status === "Processing" ? "text-amber-600" :
                  order.status === "Out for Delivery" ? "text-pink-500" :
                    "text-green-600"
                  }`}>
                  Status: {order.status}
                </p>
              </div>

              <button
                className="bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded text-lg transition"
                onClick={() => toggleOrder(order._id)}
              >
                {expandedOrder === order._id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {expandedOrder === order._id && (
              <div className="mt-4 p-5 bg-green-50 rounded-lg space-y-4">
                {/* Order Products - Enhanced Section */}
                <div>
                  <h5 className="font-extrabold text-xl mb-3 text-green-800 border-b border-amber-400 pb-2">
                    Ordered Products
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-green-600">
                      <thead className="bg-green-800">
                        <tr>
                          <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-bold text-amber-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-bold text-amber-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-bold text-amber-500 uppercase tracking-wider">
                            Qty
                          </th>
                          <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-bold text-amber-500 uppercase tracking-wider">
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.products.map((productItem, index) => (
                          <tr key={index}>
                            <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {productItem.product?.images?.[0] && (
                                  <img
                                    src={productItem.product.images[0]}
                                    alt={productItem.product.name}
                                    className="w-12 h-12 sm:w-20 sm:h-20 object-cover rounded mr-2 sm:mr-4"
                                  />
                                )}
                                <div className="min-w-0">
                                  <div className="text-sm sm:text-[1.2rem] font-medium text-gray-900 truncate">
                                    {productItem.product?.name || "Unknown Product"}
                                  </div>
                                  <div className="text-xs sm:text-[0.9rem] text-gray-500 truncate max-w-[150px] sm:max-w-[250px]">
                                    {productItem.product?.description || "No description available"}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-3 sm:px-5 sm:py-4 whitespace-nowrap text-sm sm:text-lg font-bold text-gray-500">
                              ${productItem.product?.price?.toFixed(2) || "0.00"}
                            </td>
                            <td className="px-2 py-3 sm:px-9 sm:py-4 whitespace-nowrap text-sm sm:text-lg text-gray-500">
                              {productItem.quantity}
                            </td>
                            <td className="px-2 py-3 sm:px-4 sm:py-4 whitespace-nowrap text-sm sm:text-lg text-gray-500 font-bold">
                              ${(
                                (productItem.product?.price || 0) * productItem.quantity
                              ).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div>
                    <h5 className="font-extrabold text-xl mb-3 text-green-800 border-b pb-2">
                      Delivery Information
                    </h5>
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold text-[1.1rem]">Customer:</span>{" "}
                        {order.user
                          ? order.user.name
                          : order.guestInfo?.name || 'Guest'}
                      </p>
                      <p>
                        <span className="font-semibold text-[1.1rem]">Contact:</span>{" "}
                        {order.number}
                      </p>
                      <p>
                        <span className="font-semibold text-[1.1rem]">Location:</span>{" "}
                        {order.address?.location}
                      </p>
                      <p>
                        <span className="font-semibold text-[1.1rem]">District:</span>{" "}
                        {order.address?.district}
                      </p>
                      <p>
                        <span className="font-semibold text-[1.1rem]">Division:</span>{" "}
                        {order.address?.division}
                      </p>
                    </div>
                  </div>

                  {/* Status Control */}
                  <div>
                    <h5 className="font-extrabold text-xl mb-3 text-green-800 border-b pb-2">
                      Update Status
                    </h5>
                    <div className="flex items-center gap-4">
                      <select
                        value={orderStatus[order._id] || "Processing"}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border border-gray-400 rounded px-4 py-2 text-lg bg-white flex-1"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
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