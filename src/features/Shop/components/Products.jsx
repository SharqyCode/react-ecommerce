import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products = [], isHomePage }) => {
  if (!products.length) {
    return (
      <div className="py-20 text-center text-gray-700 dark:text-gray-300">
        No products available.
      </div>
    );
  }

  return (
    <section
      className={`
        ${isHomePage ? "py-16 px-10 md:px-20" : "py-20 px-6 md:px-12"}
        bg-gray-50 dark:bg-[#121212]
        transition-colors duration-300
      `}
    >
      {!isHomePage && (
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900 dark:text-white">
          Our Products
        </h2>
      )}

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="
              bg-white 
              dark:bg-[#1e1e1e]
              border 
              border-gray-200 
              dark:border-gray-700
              rounded-xl 
              overflow-hidden 
              shadow-md 
              hover:shadow-xl 
              transform 
              hover:-translate-y-2 
              transition-all 
              duration-300
              hover:border-[#73ceff]
              dark:hover:border-[#1976d2]
            "
          >
            <Link to={`/products/${product._id}`}>
              <img
                src={
                  product.image || "https://placehold.co/400x300?text=No+Image"
                }
                alt={product.name}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {product.name}
              </h3>
              <p className="text-[#1976d2] dark:text-[#73ceff] font-medium text-lg mb-4">
                ${product.price.toFixed(2)}
              </p>
              <Link
                to={`/products/${product._id}`}
                className="
                  bg-[#1976d2] 
                  hover:bg-[#73ceff] 
                  text-white 
                  px-4 
                  py-2 
                  rounded-md 
                  text-sm 
                  font-medium 
                  transition-colors 
                  duration-300
                "
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
