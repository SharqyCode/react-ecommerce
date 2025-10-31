import React from "react";
import { Link } from "react-router-dom";
import Products from "./Products";
import CategoryCard from "./CategoryCard";

const LandingPage = () => {
  const categories = [
    {
      title: "Electronics",
      img: "https://placehold.co/400x300/555/fff?text=Electronics",
    },
    {
      title: "Apparel",
      img: "https://placehold.co/400x300/666/fff?text=Apparel",
    },
    {
      title: "Home Goods",
      img: "https://placehold.co/400x300/777/fff?text=Home+Goods",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center text-white h-[calc(100vh-70px)] bg-cover bg-center transition-colors duration-300"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/333/555?text=Welcome+Hero')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 transition-colors duration-300"></div>

        {/* Content */}
        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to{" "}
            <span className="text-[#73ceff] dark:text-[#1976d2]">ShopEase</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200 dark:text-gray-300">
            Discover the best deals and latest trends all in one place.
          </p>
          <Link
            to="/products"
            className="bg-[#1976d2] hover:bg-[#73ceff] text-white px-6 py-3 rounded-md text-lg font-medium transition-colors duration-300 inline-block shadow-md"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-100 dark:bg-[#1c1c1c] py-16 px-10 md:px-20 text-center transition-colors duration-300">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">
          Shop by Category
        </h2>

        <div className="grid gap-8 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} title={cat.title} img={cat.img} />
          ))}
        </div>
      </section>

      <Products isHomePage={true} />
    </>
  );
};

export default LandingPage;
