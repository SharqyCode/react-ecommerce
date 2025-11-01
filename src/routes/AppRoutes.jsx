// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import Shop from "../pages/Shop";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AdminUsers from "../features/admin/pages/AdminUsers";
import AdminProducts from "../features/admin/pages/AdminProducts";
import AdminOrders from "../features/admin/pages/AdminOrders";
import RegisterPage from "../features/auth/components/RegisterPage";
import LoginPage from "../features/auth/components/LoginPage";
import ForgotPassword from "../features/auth/components/ForgotPassword";
import ShopLayout from "../features/Shop/ShopLayout";
import LandingPage from "../features/Shop/components/LandingPage";
// import Products from "../features/Shop/components/Products";
import Cart from "../features/pages/Cart";
import PaymentLayout from "../features/pages/Layout/paymentLayout";

import { RoleGuard } from "./protection/RoleGuard";
import Unauthorized from "../pages/Unauthorized";
import LoggedInGuard from "./protection/LoggedInGuard";
import CartPage from "../features/cart/CartPage";
import PaySuccess from "../features/cart/PaySuccess";
import PayCancel from "../features/cart/PayCancel";
import { useThemeContext } from "../context/ThemeContext";
import { useEffect } from "react";
// import LandingPage from "../Layout/components/LandingPage";
import Products from "../features/Shop/components/Products";
import ProductDetail from "../features/Shop/components/ProductDetail";

export default function AppRoutes() {
  const { mode } = useThemeContext();
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
  return (
    <Router>
      <Routes>
        {/* Client-facing routes */}
        <Route path="/" element={<ShopLayout />}>
          {/* <Route path="/shop" element={<Shop />} /> */}
          <Route index element={<LandingPage />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>
        {/* Start Authentication Routes */}
        <Route element={<LoggedInGuard />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot" element={<ForgotPassword />} />
        </Route>
        {/* End Authentication Routes */}
        <Route path="/payment" element={<PaymentLayout />}>
          <Route path="success" element={<PaySuccess />} />
          <Route path="cancel" element={<PayCancel />} />
        </Route>
        {/* Admin routes nested under /admin */}
        <Route
          path="/admin"
          element={
            <RoleGuard allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleGuard>
          }
        >
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />/
        <Route path="/unauthorized" element={<Unauthorized />} />/
      </Routes>
    </Router>
  );
}
