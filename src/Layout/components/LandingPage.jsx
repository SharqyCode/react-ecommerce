import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Products from "./Products";
import "./LandingPage.css";

import slide1 from "../img/slide1.jpg";
import slide2 from "../img/slide2.jpg";
import slide3 from "../img/slide3.jpg";
import slide4 from "../img/slide4.jpg";
import slide5 from "../img/slide5.jpg";
import slide6 from "../img/slide6.jpg";
import slide7 from "../img/slide7.jpg";
import slide8 from "../img/slide8.jpg";

import electronicsImg from "../img/electronics.jpg";
import appearelImg from "../img/appearel.jpg";
import goodsImg from "../img/goods.jpg";

const LandingPage = () => {
  const slides = [slide1, slide2, slide3,slide4,slide5,slide6,slide7,slide8];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <section className="landing">
        {slides.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
          >
            <img src={img} alt={`Slide ${index + 1}`} />
          </div>
        ))}

        <div className="landing-content">
          <h1>Welcome to ShopEase</h1>
          <p>Discover the best deals and latest trends all in one place.</p>
          <Link to="/products" className="shop-btn">
            Shop Now
          </Link>
        </div>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src={electronicsImg} alt="Electronics" />
            <h3>Electronics</h3>
          </div>
          <div className="category-card">
            <img src={appearelImg} alt="Apparel" />
            <h3>Apparel</h3>
          </div>
          <div className="category-card">
            <img src={goodsImg} alt="Home Goods" />
            <h3>Home Goods</h3>
          </div>
        </div>
      </section>

      <Products isHomePage={true} />
    </>
  );
};

export default LandingPage;
