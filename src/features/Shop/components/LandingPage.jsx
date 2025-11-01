import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Products from "./Products";

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
  const slides = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
    slide7,
    slide8,
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      {/* Hero Section with Slider */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        {/* Slides */}
        {slides.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlay Content */}
        <div className="absolute z-20 inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-3">
            Welcome to ShopEase
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover the best deals and latest trends all in one place.
          </p>
          <Link
            to="/products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-5 w-full flex justify-center space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                index === current
                  ? "bg-white scale-110"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
            <img
              src={electronicsImg}
              alt="Electronics"
              className="w-full h-56 object-cover"
            />
            <h3 className="text-xl font-semibold py-4 text-gray-700">
              Electronics
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
            <img
              src={appearelImg}
              alt="Apparel"
              className="w-full h-56 object-cover"
            />
            <h3 className="text-xl font-semibold py-4 text-gray-700">
              Apparel
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
            <img
              src={goodsImg}
              alt="Home Goods"
              className="w-full h-56 object-cover"
            />
            <h3 className="text-xl font-semibold py-4 text-gray-700">
              Home Goods
            </h3>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <Products isHomePage={true} />
    </>
  );
};

export default LandingPage;
