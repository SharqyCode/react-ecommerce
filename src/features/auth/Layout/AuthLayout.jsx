import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../../Shop/components/Footer";

export default function AuthLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
