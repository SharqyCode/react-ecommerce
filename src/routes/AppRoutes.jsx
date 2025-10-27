// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import Shop from "../pages/Shop";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminUsers from "../admin/pages/AdminUsers";
import AdminProducts from "../admin/pages/AdminProducts";
import AdminOrders from "../admin/pages/AdminOrders";
// import AdminRoutes from "../admin/routes/adminRoutes"; // 👈 Import admin route group

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Client-facing routes */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/shop" element={<Shop />} /> */}

        {/* Admin routes nested under /admin */}
        <Route path="/admin" element={<AdminDashboard />}>
          {/* <Route index element={<AdminDashboard />} /> */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
