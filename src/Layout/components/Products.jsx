import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Products.css";
import { getAllProducts } from "../../api/productsApi";

const Products = ({ isHomePage = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


const filteredProducts = products.filter((p) => {
  const productCategory =
    typeof p.category === "string"
      ? p.category.toLowerCase()
      : p.category?.name?.toLowerCase() || "";

  const matchCategory =
    !category || productCategory === category.toLowerCase();

  const matchSearch = p.name?.toLowerCase().includes(searchQuery);

  return matchCategory && matchSearch;
});


  const productsToShow = isHomePage
    ? filteredProducts.slice(0, 4)
    : filteredProducts;

  const title = isHomePage
    ? "Featured Products"
    : category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
    : searchQuery
    ? `Search results for "${searchQuery}"`
    : "All Products";

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (filteredProducts.length === 0)
    return <p>No products found matching "{searchQuery || category}"</p>;

  return (
    <section className="products">
      <h2>{title}</h2>
      <div className="product-grid">
        {productsToShow.map((p) => (
          <div className="product-card" key={p._id || p.id}>
            <img
              src={p.image || "https://placehold.co/300x300?text=No+Image"}
              alt={p.name}
            />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>

      {isHomePage && (
        <Link to="/products" className="view-all-btn">
          View All Products
        </Link>
      )}
    </section>
  );
};

export default Products;
