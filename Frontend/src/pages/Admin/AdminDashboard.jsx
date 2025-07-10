import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddBlog from "./AddBlog";
import AddProduct from "./AddProduct";
import EditImages from "./EditImages";
import OrderList from "./OrderList";
import EditProduct from "./EditProduct";
import EditBlog from "./EditBlog";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab) => {
    setLoading(true);
    setActiveTab(tab);
  };

  // Simulate loading delay
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-102 bg-white shadow-xl flex flex-col justify-between p-6 px-8 space-y-5">
        <div className="space-y-5">
          <h2 className="lg:my-8 text-center text-4xl lg:text-[2.4rem] md:text-4xl font-extrabold mb-6 text-green-800 sm:text-4xl">
            Hello Admin
          </h2>

          {[
            { tab: "orders", label: "Order Lists and Details" },
            { tab: "add", label: "Add Products" },
            { tab: "modify", label: "Edit Products" },
            { tab: "images", label: "Edit Images" },
            { tab: "blogs", label: "Add Blogs" },
            { tab: "modblogs", label: "Edit Blogs" },
          ].map(({ tab, label }) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`border border-green-800 w-full text-left px-4 py-3 font-semibold rounded text-lg hover:bg-green-200 hover:text-black ${
                activeTab === tab ? "bg-green-800 text-white" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="mt-6">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12">
        {loading ? (
          <div className="flex justify-center items-center h-auto">
            <Loader />
          </div>
        ) : (
          <>
            {activeTab === "orders" && <OrderList />}
            {activeTab === "add" && <AddProduct />}
            {activeTab === "modify" && <EditProduct />}
            {activeTab === "images" && <EditImages />}
            {activeTab === "blogs" && <AddBlog />}
            {activeTab === "modblogs" && <EditBlog />}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
