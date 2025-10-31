import { SearchIcon, ShoppingBasket, UserRound } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar dark">
      <Link to="/" className="nav-logo">
        ShopEase
      </Link>

      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button className="search-btn">
          <SearchIcon />
        </button>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <NavLink to={"/cart"} className="cart-link">
            <ShoppingBasket />
            <span>Cart</span>
          </NavLink>
        </li>
        {/* --- NEW Login Link --- */}
        <li>
          {!user ? (
            <NavLink className="profile-link" to={"/login"}>
              <UserRound />
              <span>Login</span>
            </NavLink>
          ) : (
            <NavLink
              className="profile-link"
              onClick={() => {
                logout();
              }}
            >
              <UserRound />
              <span>Logout</span>
            </NavLink>
          )}
        </li>
        {/* --- End of new link --- */}
      </ul>
    </nav>
  );
}
