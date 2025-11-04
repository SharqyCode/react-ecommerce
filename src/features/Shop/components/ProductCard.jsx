import { IconButton, Rating, Typography } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

export default function ProductCard({ product, isHomePage }) {
  const { addProduct } = useCart();
  return (
    <Link
      to={`/products/${product.slug || product._id}`}
      className={`${
        isHomePage
          ? "w-60"
          : "w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.333rem)] lg:w-[calc(25%-1.5rem)] "
      }  relative block bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-md hover:shadow-[#1976d2] transition-all duration-300`}
    >
      <img
        src={product.thumbnail || "https://placehold.co/300x300?text=No+Image"}
        alt={product.name || "Product"}
        className=" h-60 object-contain transition-transform duration-300"
      />

      <div className="p-4">
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
        <p className="text-[#1976d2] dark:text-[#73ceff] font-semibold text-2xl mb-3 flex">
          <span className="text-sm">$</span>
          {product.price.toFixed(2)}
        </p>
       {/*  <Link
          to={`/products/${product.slug||product._id || product.id}`}
          className="inline-block bg-[#1976d2] hover:bg-[#73ceff] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
        >
          View / Add to Cart
        </Link> */}
        <div className="flex items-center">
          <Rating readOnly value={product.rating} size="small" />
          <Typography variant="subtitle2" color="secondary">
            ({product.numReviews})
          </Typography>
        </div>
        {/* <div className="h-full flex flex-col justify-end items-center">
          <button className="inline-block bg-[#1976d2] hover:bg-[#73ceff] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
            View
          </button>
        </div> */}
      </div>
    </Link>
  );
}
