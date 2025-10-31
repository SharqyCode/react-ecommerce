// src/Layout/components/Products.jsx
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Products.css";
import { getAllProducts, getProductsByCategory } from "../../api/productsApi";

const Products = ({ isHomePage = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");

  const parseNumber = (value) => {
    const trimmed = String(value).trim();
    if (trimmed === "") return null;
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : null;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data = category
          ? await getProductsByCategory(category)
          : await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const min = parseNumber(minInput);
  const max = parseNumber(maxInput);

  const minAvailablePrice = products.length
    ? Math.min(...products.map((p) => Number(p.price) || 0))
    : 0;

  const effectiveMin =
    min && min < minAvailablePrice ? minAvailablePrice : min;

  const filteredProducts = products.filter((p) => {
    const name = p.name?.toLowerCase() || "";
    const categoryName =
      typeof p.category === "string"
        ? p.category.toLowerCase()
        : p.category?.name?.toLowerCase() || "";

    const matchesSearch = name.includes(searchQuery);
    const matchesCategory = category
      ? categoryName === category.toLowerCase()
      : true;

    const price = Number(p.price) || 0;
    const matchesMin = effectiveMin !== null ? price >= effectiveMin : true;
    const matchesMax = max !== null ? price <= max : true;

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  const productsToShow = isHomePage
    ? filteredProducts.slice(0, 4)
    : filteredProducts;

  const title = isHomePage
    ? "Featured Products"
    : category
    ? `Products in "${category}"`
    : searchQuery
    ? `Search results for "${searchQuery}"`
    : "All Products";

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="products-section">
      <aside className="filter-sidebar">
        <h3>Filter by Price</h3>
        <div className="price-filter">
          <div className="filter-input">
            <label>Min:</label>
            <input
              type="number"
              min="0"
              placeholder="No min"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
            />
          </div>
          <div className="filter-input">
            <label>Max:</label>
            <input
              type="number"
              min="0"
              placeholder="No max"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
            />
          </div>
          <button
            className="clear-filters-btn"
            onClick={() => {
              setMinInput("");
              setMaxInput("");
            }}
          >
            Clear Filters
          </button>
        </div>
      </aside>

      <div className="products-content">
        <h2>{title}</h2>

        {filteredProducts.length === 0 ? (
          <p>No products found matching your filters.</p>
        ) : (
          <div className="product-grid">
            {productsToShow.map((p) => (
              <div className="product-card" key={p._id || p.id}>
                <Link to={`/products/${p._id || p.id}`} className="card-link">
                  <img
                    src={
                      p.images && p.images.length
                        ? p.images[0]
                        : p.thumbnail ||
                          "https://placehold.co/300x300?text=No+Image"
                    }
                    alt={p.name || "Product"}
                  />
                  <h3>{p.name}</h3>
                  <p className="description">
                    {p.description
                      ? p.description.length > 80
                        ? `${p.description.slice(0, 80)}...`
                        : p.description
                      : ""}
                  </p>
                </Link>
                <p className="price">${p.price}</p>
                <Link to={`/products/${p._id || p.id}`}>
                  <button className="add-cart-btn">View / Add to Cart</button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {isHomePage && (
          <Link to="/products" className="view-all-btn">
            View All Products
          </Link>
        )}
      </div>
    </section>
  );
};

export default Products;
