import React from "react";
import "./CategoriesBar.css";
import { Link, useSearchParams } from "react-router-dom";

const CategoriesBar = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  const categories = [
    { label: "Electronics", value: "Electronics" },
    { label: "Apparel", value: "Fashion" },
    { label: "Home Goods", value: "Home & Kitchen" },
    { label: "Books", value: "Books" },
    { label: "Sports", value: "Sports & Outdoors" },
    { label: "Beauty & Health", value: "Beauty & Health" },
    { label: "Toys & Games", value: "Toys & Games" },
    { label: "Automotive", value: "Automotive" },
    { label: "Pet Supplies", value: "Pet Supplies" },
    { label: "Groceries", value: "Groceries" },
  ];

  return (
    <nav className="categories-bar">
      <ul>
        {categories.map((cat) => (
          <li key={cat.value}>
            <Link
              to={`/products?category=${encodeURIComponent(cat.value)}`}
              className={activeCategory === cat.value ? "active" : ""}
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesBar;
