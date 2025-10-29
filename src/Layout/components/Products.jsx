import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import { getAllProducts } from "../../api/productsApi";

const Products = ({ isHomePage = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const productsToShow = isHomePage ? products.slice(0, 4) : products;
  const title = isHomePage ? "Featured Products" : "All Products";

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="products">
      <h2>{title}</h2>
      <div className="product-grid">
        {productsToShow.map((p) => (
          <div className="product-card" key={p._id || p.id}>
            <img
              // src={p.image || "https://via.placeholder.com/300"}
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
