import React, { useState, useEffect } from "react";
import { SearchIcon, ShoppingBasket, UserRound, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { products } = useCart(); // ensure context provides cartItems
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [pulse, setPulse] = useState(false);

  const itemCount =
    products?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  // Trigger pulse animation when cart count changes
  useEffect(() => {
    if (itemCount > 0) {
      setPulse(true);
      const timeout = setTimeout(() => setPulse(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [itemCount]);

  return (
    <nav className="bg-[#1c1c1c] text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#1976d2] hover:text-[#73ceff] transition-colors duration-300"
        >
          ShopEase
        </Link>

        {/* Desktop Search Bar */}
        <motion.div
          className="hidden md:flex items-center bg-[#2a2a2a] rounded-md overflow-hidden"
          animate={{
            width: searchFocused ? "40%" : "30%",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <input
            type="text"
            placeholder="Search products..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent text-sm text-gray-200 px-4 py-2 w-full outline-none placeholder-gray-400"
          />
          <button className="px-3 py-2 text-gray-300 hover:text-[#73ceff] transition-colors duration-200">
            <SearchIcon className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-[#73ceff] transition-colors ${
                  isActive ? "text-[#73ceff]" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `hover:text-[#73ceff] transition-colors ${
                  isActive ? "text-[#73ceff]" : ""
                }`
              }
            >
              Products
            </NavLink>
          </li>

          {/* Cart Link with Animated Badge */}
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center gap-1 hover:text-[#73ceff] transition-colors ${
                  isActive ? "text-[#73ceff]" : ""
                }`
              }
            >
              <ShoppingBasket className="w-5 h-5" />
              <span>Cart</span>

              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: pulse ? [1, 1.3, 1] : 1,
                    }}
                    exit={{ scale: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-2 -right-3 bg-[#1976d2] text-white text-[10px] font-bold rounded-full px-[6px] py-[2px] shadow-md"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </li>

          {/* Auth Buttons */}
          <li>
            {!user ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center gap-1 hover:text-[#73ceff] transition-colors ${
                    isActive ? "text-[#73ceff]" : ""
                  }`
                }
              >
                <UserRound className="w-5 h-5" />
                <span>Login</span>
              </NavLink>
            ) : (
              <button
                onClick={logout}
                className="flex items-center gap-1 hover:text-[#73ceff] transition-colors"
              >
                <UserRound className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-[#73ceff] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* --- Mobile Slide Drawer --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            ></motion.div>

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-3/4 sm:w-2/3 bg-[#1c1c1c] border-l border-gray-700 shadow-xl z-50 flex flex-col p-6 space-y-6 md:hidden"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-[#73ceff]">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-[#73ceff] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search */}
              <div className="flex items-center bg-[#2a2a2a] rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent text-gray-200 px-4 py-2 w-full outline-none placeholder-gray-400"
                />
                <button className="px-3 py-2 text-gray-300 hover:text-[#73ceff] transition-colors">
                  <SearchIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-4 text-sm font-medium">
                <NavLink
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-[#73ceff] transition-colors ${
                      isActive ? "text-[#73ceff]" : ""
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-[#73ceff] transition-colors ${
                      isActive ? "text-[#73ceff]" : ""
                    }`
                  }
                >
                  Products
                </NavLink>

                {/* Cart (with badge) */}
                <NavLink
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-1 hover:text-[#73ceff] transition-colors ${
                      isActive ? "text-[#73ceff]" : ""
                    }`
                  }
                >
                  <ShoppingBasket className="w-5 h-5" />
                  <span>Cart</span>
                  {itemCount > 0 && (
                    <motion.span
                      key="cart-badge-mobile"
                      initial={{ scale: 0 }}
                      animate={{ scale: pulse ? [1, 1.3, 1] : 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute -top-2 -right-3 bg-[#1976d2] text-white text-[10px] font-bold rounded-full px-[6px] py-[2px] shadow-md"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </NavLink>

                {/* Auth */}
                {!user ? (
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:text-[#73ceff] transition-colors ${
                        isActive ? "text-[#73ceff]" : ""
                      }`
                    }
                  >
                    <UserRound className="w-5 h-5" />
                    <span>Login</span>
                  </NavLink>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-1 hover:text-[#73ceff] transition-colors"
                  >
                    <UserRound className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
