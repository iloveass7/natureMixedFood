import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Footer } from "./components/footer";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthPage } from "./pages/AuthPage";
import { Profile } from "./pages/Profile";
import { Cart } from "./pages/Cart";
import { SearchSidebar } from "./components/SearchSidebar";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/AdminDashboard";
import AddBlog from "./pages/Admin/AddBlog";
import AddProduct from "./pages/Admin/AddProduct";
import EditImages from "./pages/Admin/EditImages";
import OrderList from "./pages/Admin/OrderList";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchSidebar />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-images" element={<EditImages />} />
        <Route path="/admin/orders" element={<OrderList />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;