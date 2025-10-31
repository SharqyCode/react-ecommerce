import React from "react";

const categories = [
  "Electronics",
  "Apparel",
  "Home Goods",
  "Books",
  "Sports",
  "Sale",
];

const CategoriesBar = () => {
  return (
    <nav className="bg-[#1c1c1c] py-3 shadow-md">
      <ul className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              type="button"
              className="category-action-btn bg-[#2a2a2a] text-white px-5 py-2 rounded-md font-medium transition-colors duration-300 hover:bg-[#1976d2] hover:text-white focus:outline-none"
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesBar;
