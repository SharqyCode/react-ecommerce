import React, { useState, useEffect } from "react";
import { SearchIcon, ShoppingBasket, UserRound, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import ThemeToggleButton from "../../../components/theme/ThemeToggleButton";
import { useSearch } from "../../../context/SearchContext";
export default function Navbar({ onSearch }) {
  const { user, logout } = useAuth();
  const { products } = useCart();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { setSearchQuery } = useSearch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      setIsAuthenticated(Boolean(localStorage.getItem("token")));
      const handleStorage = () => setIsAuthenticated(Boolean(localStorage.getItem("token")));
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }, []);
  
    
  const handleSearchSubmit = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  const itemCount =
    products?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
  const subtotal =
    products?.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    ) || 0;

  useEffect(() => {
    if (itemCount > 0) {
      setPulse(true);
      const timeout = setTimeout(() => setPulse(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [itemCount]);

  return (
    <nav className="bg-gray-100 dark:bg-[#1c1c1c] text-gray-900 dark:text-white shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#1976d2] dark:text-[#73ceff] hover:text-[#73ceff] dark:hover:text-[#1976d2] transition-colors duration-300"
        >
          ShopEase
        </Link>

        {/* Search Bar */}

        <motion.div
          className="hidden md:flex items-center bg-gray-200 dark:bg-[#2a2a2a] rounded-md overflow-hidden"
          animate={{
            width: searchFocused ? "40%" : "30%",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <input
            onKeyDown={(e) => {
              searchTerm && e.key === "Enter"
                ? handleSearchSubmit(searchTerm)
                : "";
            }}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent text-sm text-gray-800 dark:text-gray-200 px-4 py-2 w-full outline-none placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            onClick={() => {
              handleSearchSubmit(searchTerm);
            }}
            type="submit"
            className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors duration-200"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors ${
                  isActive ? "text-[#1976d2] dark:text-[#73ceff]" : ""
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
                `hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors ${
                  isActive ? "text-[#1976d2] dark:text-[#73ceff]" : ""
                }`
              }
            >
              Products
            </NavLink>
          </li>

          {/* Cart with mini preview */}
          <li
            className="relative"
            onMouseEnter={() => setShowMiniCart(true)}
            onMouseLeave={() => setShowMiniCart(false)}
          >
            <button className="relative flex items-center gap-1 hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors">
              <ShoppingBasket className="w-5 h-5" />
              <span>Cart</span>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: pulse ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute -top-2 -right-3 bg-[#1976d2] dark:bg-[#73ceff] text-white text-[10px] font-bold rounded-full px-[6px] py-[2px] shadow-md"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Mini Cart Dropdown */}
            <AnimatePresence>
              {showMiniCart && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-72 bg-white dark:bg-[#2a2a2a] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 transition-colors"
                >
                  <div className="p-3 max-h-80 overflow-y-auto space-y-3">
                    {products?.length > 0 ? (
                      products.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-2"
                        >
                          <img
                            src={item.image || "https://placehold.co/60x60"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="flex-1 text-sm">
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {item.name}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                              {item.quantity} × ${item.price?.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center text-sm py-4">
                        Your cart is empty.
                      </p>
                    )}
                  </div>

                  {products?.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                      <div className="flex justify-between text-sm font-medium mb-3 text-gray-900 dark:text-gray-200">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate("/cart")}
                          className="flex-1 bg-[#1976d2] hover:bg-[#73ceff] text-white rounded-md py-1.5 text-sm transition"
                        >
                          View Cart
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Auth */}
          <li>
            {!user ? (
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `flex items-center gap-1 hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors ${
                    isActive ? "text-[#1976d2] dark:text-[#73ceff]" : ""
                  }`
                }
              >
                <UserRound className="w-5 h-5" />
                <span>Login</span>
              </NavLink>
            ) : (
              <div className="flex gap-2">
              <button
                onClick={()=>logout(navigate)}
                className="flex items-center gap-1 hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors"
              >
                <UserRound className="w-5 h-5" />
                <span>Logout</span>
              </button>
               <li className="flex gap-2">
                 
                    <UserRound/>
                    <NavLink to={"/profile"}>
                      <span>Profile</span>
                    </NavLink>
                  
                </li>
              
                </div>
            )}
          </li>

          {/* Theme Toggle */}
          <li className="ml-2">
            <ThemeToggleButton />
          </li>
           
              {/* <>
                <li>
                  <a href="#" className="profile-link">
                    <UserRound/>
                    <NavLink to={"/profile"}>
                      <span>Profile</span>
                    </NavLink>
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="profile-link" style={{ background: "transparent", border: 0, cursor: "pointer" }}>
                    <span>Logout</span>
                  </button>
                </li>
              </> */}
         
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300 hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* --- Mobile Drawer --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            ></motion.div>

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-3/4 sm:w-2/3 bg-gray-100 dark:bg-[#1c1c1c] border-l border-gray-300 dark:border-gray-700 shadow-xl z-50 flex flex-col p-6 space-y-6 md:hidden transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-[#1976d2] dark:text-[#73ceff]">
                  Menu
                </h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search */}
              <div className="flex items-center bg-gray-200 dark:bg-[#2a2a2a] rounded-md overflow-hidden">
                <input
                  value={searchTerm}
                 
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent text-gray-800 dark:text-gray-200 px-4 py-2 w-full outline-none placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button onClick={handleSearchSubmit} className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors">
                  <SearchIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-4 text-sm font-medium">
                <NavLink
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors ${
                      isActive ? "text-[#1976d2] dark:text-[#73ceff]" : ""
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors ${
                      isActive ? "text-[#1976d2] dark:text-[#73ceff]" : ""
                    }`
                  }
                >
                  Products
                </NavLink>

                <NavLink
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-1 hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors ${
                      isActive ? "text-[#1976d2] dark:text-[#73ceff]" : ""
                    }`
                  }
                >
                  <ShoppingBasket className="w-5 h-5" />
                  <span>Cart</span>
                </NavLink>

                {!user ? (
                  <NavLink
                    to="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors ${
                        isActive ? "text-[#1976d2] dark:text-[#73ceff]" : ""
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
                    className="flex items-center gap-1 hover:text-[#1976d2] dark:hover:text-[#73ceff] transition-colors"
                  >
                    <UserRound className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                )}

                {/* Theme Toggle for mobile */}
                <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
                  <ThemeToggleButton />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
