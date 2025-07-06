import { useState } from "react";
import { Link } from "react-router-dom";
import AddBlog from "./AddBlog";
import AddProduct from "./AddProduct";
import EditImages from "./EditImages";
import OrderList from "./OrderList";
import EditProduct from "./EditProduct";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      
      {/* Sidebar */}
      <div className="w-full lg:w-102 bg-white shadow-xl flex flex-col justify-between p-6 px-8 space-y-5">
        
        {/* Top Section */}
        <div className="space-y-5">
          <h2 className="lg:my-8 text-center lg:text-[2.4rem] md:text-4xl font-extrabold mb-6 text-green-800">Hello Admin</h2>

          <button
            className={`border border-green-800 w-full text-left px-4 py-3 font-semibold rounded text-lg hover:bg-green-200 hover:text-black ${
              activeTab === "orders" ? "bg-green-800 text-white" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Order Lists and Details
          </button>

          <button
            className={`border border-green-800 w-full text-left px-4 py-3 font-semibold rounded text-lg hover:bg-green-200 hover:text-black ${
              activeTab === "add" ? "bg-green-800 text-white" : ""
            }`}
            onClick={() => setActiveTab("add")}
          >
            Add Products
          </button>

          <button
            className={`border border-green-800 w-full text-left px-4 py-3 font-semibold rounded text-lg hover:bg-green-200 hover:text-black ${
              activeTab === "modify" ? "bg-green-800 text-white" : ""
            }`}
            onClick={() => setActiveTab("modify")}
          >
            Edit Products
          </button>
          
          <button
            className={`border border-green-800 w-full text-left px-4 py-3 font-semibold rounded text-lg hover:bg-green-200 hover:text-black ${
              activeTab === "images" ? "bg-green-800 text-white" : ""
            }`}
            onClick={() => setActiveTab("images")}
          >
            Edit Images
          </button>

          <button
            className={`border border-green-800 w-full text-left px-4 py-3 font-semibold rounded text-lg hover:bg-green-200 hover:text-black ${
              activeTab === "blogs" ? "bg-green-800 text-white" : ""
            }`}
            onClick={() => setActiveTab("blogs")}
          >
            Add Blogs
          </button>

        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12">
        {activeTab === "orders" && <OrderList />}
        {activeTab === "add" && <AddProduct />}
        {activeTab === "modify" && <EditProduct />}
        {activeTab === "images" && <EditImages />}
        {activeTab === "blogs" && <AddBlog />}
      </div>
    </div>
  );
};

export default AdminDashboard;
