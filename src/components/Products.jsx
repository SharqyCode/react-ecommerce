import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const allProducts = [
  {
    id: 1,
    name: 'Smart Watch',
    price: '$199',
    img: 'https://placehold.co/300x300/e0e0e0/333?text=Smart+Watch',
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: '$149',
    img: 'https://placehold.co/300x300/d0d0d0/333?text=Earbuds',
  },
  {
    id: 3,
    name: 'Running Sneakers',
    price: '$129',
    img: 'https://placehold.co/300x300/c0c0c0/333?text=Sneakers',
  },
  {
    id: 4,
    name: 'Gaming Headset',
    price: '$99',
    img: 'https://placehold.co/300x300/b0b0b0/333?text=Headset',
  },
  {
    id: 5,
    name: '4K Monitor',
    price: '$349',
    img: 'https://placehold.co/300x300/a0a0a0/333?text=Monitor',
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    price: '$159',
    img: 'https://placehold.co/300x300/909090/333?text=Keyboard',
  },
  {
    id: 7,
    name: 'Leather Backpack',
    price: '$89',
    img: 'https://placehold.co/300x300/808080/333?text=Backpack',
  },
  {
    id: 8,
    name: 'Coffee Maker',
    price: '$59',
    img: 'https://placehold.co/300x300/707070/333?text=Coffee+Maker',
  },
];

const Products = ({ isHomePage = false }) => {
  const productsToShow = isHomePage
    ? allProducts.slice(0, 4)
    : allProducts;
  const title = isHomePage ? 'Featured Products' : 'All Products';

  return (
    <section className="products">
      <h2>{title}</h2>
      <div className="product-grid">
        {productsToShow.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
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
