import React from 'react';
import { Link } from 'react-router-dom';
import Products from './Products';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <>
      <section className="landing">
        <div className="landing-content">
          <h1>Welcome to ShopEase</h1>
          <p>Discover the best deals and latest trends all in one place.</p>
          <button to="/products" className="shop-btn">
            Shop Now
          </button>
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <img
              src="https://placehold.co/400x300/555/fff?text=Electronics"
              alt="Electronics"
            />
            <h3>Electronics</h3>
          </div>
          <div className="category-card">
            <img
              src="https://placehold.co/400x300/666/fff?text=Apparel"
              alt="Apparel"
            />
            <h3>Apparel</h3>
          </div>
          <div className="category-card">
            <img
              src="https://placehold.co/400x300/777/fff?text=Home+Goods"
              alt="Home Goods"
            />
            <h3>Home Goods</h3>
          </div>
        </div>
      </section>
      <Products isHomePage={true} />
    </>
  );
};

export default LandingPage;
