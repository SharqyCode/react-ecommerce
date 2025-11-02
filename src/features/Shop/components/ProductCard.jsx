import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, isHomePage }) {
  return (
    <div
      key={product._id || product.id}
      className={`${
        isHomePage
          ? "w-60"
          : "w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.333rem)] lg:w-[calc(25%-1.5rem)] "
      }  bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
    >
      <Link to={`/products/${product._id || product.id}`} className="block">
        <img
          src={
            product.thumbnail || "https://placehold.co/300x300?text=No+Image"
          }
          alt={product.name || "Product"}
          className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {product.description
            ? product.description.length > 80
              ? `${product.description.slice(0, 80)}...`
              : product.description
            : ""}
        </p>
        <p className="text-[#1976d2] dark:text-[#73ceff] font-semibold text-lg mb-3">
          ${product.price}
        </p>
        <Link
          to={`/products/${product._id || product.id}`}
          className="inline-block bg-[#1976d2] hover:bg-[#73ceff] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
        >
          View / Add to Cart
        </Link>
      </div>
    </div>
  );
}
