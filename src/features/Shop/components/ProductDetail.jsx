import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../api/productsApi"; 

import "./ProductDetail.css"; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail">
      <Link to="/products" className="back-link">← Back to products</Link>

      <div className="detail-grid">
        <div className="images-column">
          {product.images && product.images.length ? (
            product.images.map((src, i) => (
              <img key={i} src={src} alt={`${product.name} ${i}`} />
            ))
          ) : (
            <img src={product.thumbnail || "https://placehold.co/600x400?text=No+Image"} alt={product.name} />
          )}
        </div>

        <div className="info-column">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p className="desc">{product.description}</p>
          <p><strong>Category:</strong> {product.category?.name || product.category || "—"}</p>
          <p><strong>In stock:</strong> {product.inStock ? "Yes" : "No"}</p>
          <button className="add-cart-btn">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
