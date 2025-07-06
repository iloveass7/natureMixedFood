import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import SearchSidebar from "./components/SearchSidebar";
import Home from "./pages/Home/Home";
import HeroSection from "./pages/Home/HeroSection";
import ProductsSection from "./pages/Home/ProductsSection";
import InfoCardsSection from "./pages/Home/InfoCardsSection";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddBlog from "./pages/Admin/AddBlog";
import AddProduct from "./pages/Admin/AddProduct";
import EditImages from "./pages/Admin/EditImages";
import OrderList from "./pages/Admin/OrderList";
import AdminLogin from "./pages/AdminLogin";
import EditProduct from "./pages/Admin/EditProduct"; // Assuming this is a component for editing products
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AllBlogs from "./pages/AllBlogs";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/products" element={<ProductsSection />} />
        <Route path="/info-cards" element={<InfoCardsSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchSidebar />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/blogs" element={<AllBlogs />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/add-blog"
          element={
            <AdminPrivateRoute>
              <AddBlog />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminPrivateRoute>
              <AddProduct />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/edit-product"
          element={
            <AdminPrivateRoute>
              <OrderList />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/edit-images"
          element={
            <AdminPrivateRoute>
              <EditImages />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminPrivateRoute>
              <OrderList />
            </AdminPrivateRoute>
          }
        />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

