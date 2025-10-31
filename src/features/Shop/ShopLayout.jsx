import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Products from "./components/Products";
import CategoriesBar from "./components/CategoriesBar";
import Footer from "./components/Footer"; // Import the new Footer
import "./Layout.css";
import { Snackbar } from "@mui/material";
import ThemeToggleButton from "../../components/theme/ThemeToggleButton";
import Navbar from "./components/Navbar";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

// SVG Icon for the Search button
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="18px"
    height="18px"
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

// SVG Icon for the Cart
const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20px"
    height="20px"
  >
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.9 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

// --- NEW Profile Icon ---
const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20px"
    height="20px"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
// --- End of new icon ---

function ShopLayout() {
  const { user } = useAuth();

  const { mode } = useThemeContext();
  console.log(mode);
  return (
    <div className={`${mode}`}>
      <div className="flex justify-end p-2">
        <ThemeToggleButton />
      </div>
      <header className="Layout-header">
        <Navbar />
      </header>
      <CategoriesBar />
      <main>
        <Outlet />
      </main>
      {/* --- NEW Footer --- */}
      <Footer />
    </div>
  );
}

export default ShopLayout;
