import React from 'react';
import './CategoriesBar.css';
import { Link } from "react-router-dom";


const CategoriesBar = () => {

  return (
    <nav className="categories-bar">
      <ul>
        <li>
          <Link to="/products?category=electronics">Electronics</Link>
        </li>
        <li>
          <button type="button" className="category-action-btn">
            Apparel
          </button>
        </li>
        <li>
          <button type="button" className="category-action-btn">
            Home Goods
          </button>
        </li>
        <li>
          <button type="button" className="category-action-btn">
            Books
          </button>
        </li>
        <li>
          <button type="button" className="category-action-btn">
            Sports
          </button>
        </li>
        <li>
          <button type="button" className="category-action-btn">
            Sale
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CategoriesBar;

