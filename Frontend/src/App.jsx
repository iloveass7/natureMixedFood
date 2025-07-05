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

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-images" element={<EditImages />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop";
// import Footer from "./components/footer";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AuthPage from "./pages/AuthPage";
// import Profile from "./pages/Profile";
// import Cart from "./pages/Cart";
// import SearchSidebar from "./components/SearchSidebar";
// import Home from "./pages/Home/Home";
// import HeroSection from "./pages/Home/HeroSection";
// import ProductsSection from "./pages/Home/ProductsSection";
// import InfoCardsSection from "./pages/Home/InfoCardsSection";
// import ProductDetails from "./pages/ProductDetails";
// import CheckoutPage from "./pages/CheckoutPage";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import AddBlog from "./pages/Admin/AddBlog";
// import AddProduct from "./pages/Admin/AddProduct";
// import EditImages from "./pages/Admin/EditImages";
// import OrderList from "./pages/Admin/OrderList";
// import AdminLogin from "./pages/AdminLogin";

// const App = () => {
//   // Admin authentication check
//   const isAdminAuthenticated = () => {
//     return localStorage.getItem("adminToken") !== null;
//   };

//   // Protected Admin Route component
//   const ProtectedAdminRoute = ({ element: Element, ...rest }) => {
//     return isAdminAuthenticated() ? (
//       <Element {...rest} />
//     ) : (
//       <Navigate to="/admin-login" replace />
//     );
//   };

//   return (
//     <Router>
//       <ScrollToTop />
//       <Navbar />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/hero" element={<HeroSection />} />
//         <Route path="/products" element={<ProductsSection />} />
//         <Route path="/info-cards" element={<InfoCardsSection />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/search" element={<SearchSidebar />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/checkout" element={<CheckoutPage />} />
//         <Route path="/admin-login" element={<AdminLogin />} />

//         {/* Protected Admin Routes */}
//         <Route
//           path="/admin"
//           element={<ProtectedAdminRoute element={AdminDashboard} />}
//         />
//         <Route
//           path="/admin/add-blog"
//           element={<ProtectedAdminRoute element={AddBlog} />}
//         />
//         <Route
//           path="/admin/add-product"
//           element={<ProtectedAdminRoute element={AddProduct} />}
//         />
//         <Route
//           path="/admin/edit-images"
//           element={<ProtectedAdminRoute element={EditImages} />}
//         />
//         <Route
//           path="/admin/orders"
//           element={<ProtectedAdminRoute element={OrderList} />}
//         />

//         {/* Fallback route */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;