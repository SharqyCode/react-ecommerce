import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getAllProducts,
  getProductsByCategory,
} from "../../../api/productsApi";

const Products = ({ isHomePage = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState("");
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");

  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const parseNumber = (value) => {
    if (value === null || value === undefined) return null;
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

  let filteredProducts = products.filter((p) => {
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
    const matchesMin = min !== null ? price >= min : true;
    const matchesMax = max !== null ? price <= max : true;

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

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

  if (loading)
    return (
      <div className="py-20 text-center text-gray-700 dark:text-gray-300">
        Loading products...
      </div>
    );
  if (error)
    return (
      <div className="py-20 text-center text-red-500 dark:text-red-400">
        {error}
      </div>
    );

  return (
    <section className="flex flex-col md:flex-row max-w-7xl mx-auto mt-4 p-6 gap-10 bg-gray-50 dark:bg-[#121212] transition-colors duration-300">
      {/* --- Filter Sidebar --- */}
      {!isHomePage && (
        <aside className="md:w-1/4 w-full bg-white dark:bg-[#1e1e1e] p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 h-fit transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Price
          </h3>
          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Min:
              </label>
              <input
                type="number"
                min="0"
                placeholder="No min"
                value={minInput}
                onChange={(e) => setMinInput(e.target.value)}
                className="bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 px-3 py-2 rounded-md outline-none border border-gray-300 dark:border-gray-600 focus:border-[#1976d2] dark:focus:border-[#73ceff] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Max:
              </label>
              <input
                type="number"
                min="0"
                placeholder="No max"
                value={maxInput}
                onChange={(e) => setMaxInput(e.target.value)}
                className="bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 px-3 py-2 rounded-md outline-none border border-gray-300 dark:border-gray-600 focus:border-[#1976d2] dark:focus:border-[#73ceff] transition-colors"
              />
            </div>

            <button
              className="w-full mt-2 bg-[#1976d2] hover:bg-[#73ceff] text-white py-2 rounded-md font-medium transition-colors duration-300"
              onClick={() => {
                setMinInput("");
                setMaxInput("");
                setSortOrder("");
              }}
            >
              Clear Filters
            </button>
          </div>

          {/* --- Sort Section --- */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Sort By
            </h3>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 outline-none focus:border-[#1976d2] dark:focus:border-[#73ceff] transition-colors"
            >
              <option value="">Default</option>
              <option value="lowToHigh">Price: Low → High</option>
              <option value="highToLow">Price: High → Low</option>
            </select>
          </div>
        </aside>
      )}

      {/* --- Products Content --- */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {title}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No products found matching your filters.
          </p>
        ) : (
          <div
            className={`grid gap-8 ${
              isHomePage
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {productsToShow.map((p) => (
              <div
                key={p._id || p.id}
                className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <Link to={`/products/${p._id || p.id}`} className="block">
                  <img
                    src={
                      p.images?.length
                        ? p.images[0]
                        : p.thumbnail ||
                          "https://placehold.co/300x300?text=No+Image"
                    }
                    alt={p.name || "Product"}
                    className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {p.description
                      ? p.description.length > 80
                        ? `${p.description.slice(0, 80)}...`
                        : p.description
                      : ""}
                  </p>
                  <p className="text-[#1976d2] dark:text-[#73ceff] font-semibold text-lg mb-3">
                    ${p.price}
                  </p>
                  <Link
                    to={`/products/${p._id || p.id}`}
                    className="inline-block bg-[#1976d2] hover:bg-[#73ceff] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    View / Add to Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
