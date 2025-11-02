import React from "react";
import { Route, Routes } from "react-router-dom";
import ShopLayout from "../Layout/ShopLayout";
import LandingPage from "../components/LandingPage";
import Products from "../components/Products";
import CartPage from "../components/CartPage";
import ProductDetail from "../components/ProductDetail";

export default function ShopRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ShopLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}
