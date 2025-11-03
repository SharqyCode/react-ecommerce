// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { RoleGuard } from "./protection/RoleGuard";

import { useThemeContext } from "../context/ThemeContext";
import { useEffect } from "react";
import ShopRoutes from "../features/Shop/routes/ShopRoutes";
import AuthRoutes from "../features/auth/routes/AuthRoutes";
import AdminRoutes from "../features/admin/routes/AdminRoutes";
import CheckoutRoutes from "../features/checkout/routes/CheckoutRoutes";
import NotFound from "../features/fallback/pages/NotFound";
import Unauthorized from "../features/fallback/pages/Unauthorized";

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
        {/* Start Shop Routes */}
        <Route path="/*" element={<ShopRoutes />} />
        {/* End Shop Routes */}
        {/* Start Authentication Routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        {/* End Authentication Routes */}
        {/* Start Payment Routes */}
        <Route path="/payment/*" element={<CheckoutRoutes />} />
        {/* End Payment Routes */}
        {/* Start Admin Routes*/}
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* End Admin Routes*/}
      </Routes>
    </Router>
  );
}
