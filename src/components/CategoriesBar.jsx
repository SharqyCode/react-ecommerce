import React from 'react';
import './CategoriesBar.css';

const CategoriesBar = () => {

  return (
    <nav className="categories-bar">
      <ul>
        <li>
          <button type="button" className="category-action-btn">
            Electronics
          </button>
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

