import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const defaultProducts = [
    {
      id: 1,
      name: "Product 1",
      price: 50,
      quantity: 2,
      img: "/photo-1523275335684-37898b6baf30.avif",
    },
    {
      id: 2,
      name: "Product 2",
      price: 100,
      quantity: 1,
      img: "/photo-1505740420928-5e560c06d30e.avif",
    },
    { id: 3, name: "Product 3", price: 75, quantity: 3, img: "bag.avif" },
    { id: 4, name: "Product 4", price: 25, quantity: 3, img: "coach.avif" },
    { id: 5, name: "Product 5", price: 45, quantity: 2, img: "watch.avif" },
  ];

  const [products, setProducts] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          return parsedCart;
        }
      } catch (error) {
        console.error("Error parsing cart from Local Storage:", error);
      }
    }
    return defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        products,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
