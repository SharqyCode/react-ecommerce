
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useThemeContext } from "../context/ThemeContext";

import ShopRoutes from "../features/Shop/routes/ShopRoutes";
import AuthRoutes from "../features/auth/routes/AuthRoutes";
import AdminRoutes from "../features/admin/routes/AdminRoutes";
import CheckoutRoutes from "../features/checkout/routes/CheckoutRoutes";

import About from "../pages/About";
import FAQ from "../pages/FAQ";
import ShippingReturns from "../pages/ShippingReturns";
// import PrivacyPolicy from "../pages/PrivacyPolicy";


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
        {/* Shop Routes */}
        <Route path="/*" element={<ShopRoutes />} />

        {/* Authentication Routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Checkout Routes */}
        <Route path="/payment/*" element={<CheckoutRoutes />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Standalone Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="shipping-returns" element={<ShippingReturns />} />
        {/* <Route path="privacy-policy" element={<PrivacyPolicy />} /> */}

        {/* Fallback Routes */}
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
