import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const categories = [
  "Electronics",
  "Apparel",
  "Home Goods",
  "Books",
  "Sports",
  "Sale",
];

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
    <nav className="bg-gray-100 dark:bg-[#1c1c1c] py-3 shadow-md transition-colors duration-300">
      {/* <ul className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              type="button"
              className="bg-gray-200 dark:bg-[#2a2a2a] text-gray-800 dark:text-white px-5 py-2 rounded-md font-medium transition-colors duration-300 hover:bg-[#1976d2] hover:text-white focus:outline-none"
            >
              {cat}
            </button>
          </li>
        ))}
      </ul> */}
      <ul className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <li key={cat.value}>
            <Link
              to={`/products?category=${encodeURIComponent(cat.value)}`}
              className={`${
                activeCategory === cat.value ? "active" : ""
              } bg-gray-200 dark:bg-[#2a2a2a] text-gray-800 dark:text-white px-5 py-2 rounded-md font-medium transition-colors duration-300 hover:bg-[#1976d2] hover:text-white focus:outline-none"`}
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
